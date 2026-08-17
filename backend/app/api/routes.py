import hashlib
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import schema
from app.schemas import pydantic_models
from app.services.ai_engine import process_meeting_transcript
from pydantic import BaseModel

router = APIRouter()

# --- Auth Models ---
class UserAuth(BaseModel):
    email: str
    password: str

def get_password_hash(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

# --- Auth Routes ---
@router.post("/register")
def register_user(user: UserAuth, db: Session = Depends(get_db)):
    existing_user = db.query(schema.User).filter(schema.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = get_password_hash(user.password)
    new_user = schema.User(email=user.email, password_hash=hashed_pw)
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully", "email": new_user.email}

@router.post("/login")
def login_user(user: UserAuth, db: Session = Depends(get_db)):
    db_user = db.query(schema.User).filter(schema.User.email == user.email).first()
    if not db_user or db_user.password_hash != get_password_hash(user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"message": "Login successful", "email": db_user.email}

# --- Meeting Routes ---
@router.post("/meetings")
def create_meeting(meeting: pydantic_models.MeetingCreate, db: Session = Depends(get_db)):
    # 1. Send text to Gemini
    ai_result = process_meeting_transcript(meeting.transcript)
    
    # 2. Save Meeting
    db_meeting = schema.Meeting(
        title=meeting.title,
        meeting_type=meeting.meeting_type,
        participants=meeting.participants,
        transcript=meeting.transcript,
        summary=ai_result.get("summary", ""),
        decisions=ai_result.get("decisions", "")
    )
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    
    # 3. Save Action Items
    action_items_data = ai_result.get("action_items", [])
    for item in action_items_data:
        db_action = schema.ActionItem(
            meeting_id=db_meeting.id,
            description=item.get("description", ""),
            owner=item.get("owner", "Unassigned"),
            due_date=item.get("due_date", ""),
            priority=item.get("priority", "Medium"),
            status=item.get("status", "Open")
        )
        db.add(db_action)
    
    db.commit()
    return db_meeting

@router.get("/meetings")
def get_meetings(db: Session = Depends(get_db)):
    return db.query(schema.Meeting).order_by(schema.Meeting.created_at.desc()).all()

@router.delete("/meetings/{meeting_id}")
def delete_meeting(meeting_id: str, db: Session = Depends(get_db)):
    meeting = db.query(schema.Meeting).filter(schema.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    db.delete(meeting)
    db.commit()
    return {"message": "Meeting deleted successfully"}

# --- Action Item Routes ---
@router.get("/action-items")
def get_action_items(db: Session = Depends(get_db)):
    return db.query(schema.ActionItem).all()

@router.put("/action-items/{item_id}")
def update_action_item(item_id: str, status_update: pydantic_models.ActionItemUpdate, db: Session = Depends(get_db)):
    db_item = db.query(schema.ActionItem).filter(schema.ActionItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db_item.status = status_update.status
    db.commit()
    return db_item