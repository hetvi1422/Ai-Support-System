from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import uuid

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    meeting_date = Column(DateTime)
    meeting_type = Column(String) # Client, Sales, Internal, etc.
    participants = Column(String)
    transcript = Column(Text, nullable=False)
    
    # AI Generated Outputs
    summary = Column(Text)
    key_points = Column(Text)
    decisions = Column(Text)
    risks = Column(Text)
    unanswered_questions = Column(Text)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    action_items = relationship("ActionItem", back_populates="meeting", cascade="all, delete-orphan")

class ActionItem(Base):
    __tablename__ = "action_items"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    meeting_id = Column(String, ForeignKey("meetings.id"))
    description = Column(String, nullable=False)
    owner = Column(String, default="Unassigned")
    due_date = Column(String, default="Not specified")
    priority = Column(String, default="Medium") # Low, Medium, High
    status = Column(String, default="Open") # Open, In Progress, Blocked, Completed

    meeting = relationship("Meeting", back_populates="action_items")