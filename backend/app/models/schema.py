import uuid
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Meeting(Base):
    __tablename__ = "meetings"
    
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, index=True)
    meeting_type = Column(String)
    participants = Column(String)
    transcript = Column(Text)
    summary = Column(Text)
    decisions = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ActionItem(Base):
    __tablename__ = "action_items"
    
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    meeting_id = Column(String, ForeignKey("meetings.id"))
    description = Column(String)
    owner = Column(String)
    due_date = Column(String)
    priority = Column(String)
    status = Column(String)

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)