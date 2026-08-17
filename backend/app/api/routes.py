from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import schema
from app.services.ai_engine import process_meeting_transcript
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# --- Schemas for Incoming Requests ---
class TranscriptUpload(BaseModel):
    title: str
    meeting_type: str
    participants: str
    transcript: str

class ActionItemUpdate(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None
    owner: Optional[str] = None

# --- API Endpoints ---

@router.post("/meetings")
def create_meeting(data: TranscriptUpload, db: Session = Depends(get_db)):
    # 1. Process transcript with AI
    ai_result = process_meeting_transcript(data.transcript)
    
    # 2. Save the Meeting to the database
    new_meeting = schema.Meeting(
        title=data.title,
        meeting_type=data.meeting_type,
        participants=data.participants,
        transcript=data.transcript,
        summary=ai_result.get("summary", ""),
        key_points=ai_result.get("key_points", ""),
        decisions=ai_result.get("decisions", ""),
        risks=ai_result.get("risks", ""),
        unanswered_questions=ai_result.get("unanswered_questions", "")
    )
    db.add(new_meeting)
    db.commit()
    db.refresh(new_meeting)
    
    # 3. Save the Action Items to the database
    action_items_data = ai_result.get("action_items", [])
    for item in action_items_data:
        new_action = schema.ActionItem(
            meeting_id=new_meeting.id,
            description=item.get("description", ""),
            owner=item.get("owner", "Unassigned"),
            due_date=item.get("due_date", "Not specified"),
            priority=item.get("priority", "Medium"),
            status="Open"
        )
        db.add(new_action)
    
    db.commit()
    return {"message": "Meeting processed successfully", "meeting_id": new_meeting.id}

@router.get("/meetings")
def get_all_meetings(db: Session = Depends(get_db)):
    meetings = db.query(schema.Meeting).order_by(schema.Meeting.created_at.desc()).all()
    return meetings

@router.get("/action-items")
def get_all_action_items(db: Session = Depends(get_db)):
    items = db.query(schema.ActionItem).all()
    return items

@router.put("/action-items/{item_id}")
def update_action_item(item_id: str, update_data: ActionItemUpdate, db: Session = Depends(get_db)):
    item = db.query(schema.ActionItem).filter(schema.ActionItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Action item not found")
    
    if update_data.status:
        item.status = update_data.status
    if update_data.priority:
        item.priority = update_data.priority
    if update_data.owner:
        item.owner = update_data.owner
        
    db.commit()
    db.refresh(item)
    return item