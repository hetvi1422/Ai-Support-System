from sqlalchemy import Column, String, Boolean, Float, DateTime, Enum
from sqlalchemy.sql import func
from app.core.database import Base
import enum
import uuid

class ChannelEnum(str, enum.Enum):
    EMAIL = "EMAIL"
    CHAT = "CHAT"

class Ticket(Base):
    __tablename__ = "tickets"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_name = Column(String, nullable=False)
    channel = Column(Enum(ChannelEnum), nullable=False)
    language = Column(String, default="en")
    original_message = Column(String, nullable=False)
    
    # AI Output fields
    category = Column(String)
    priority = Column(String, default="MEDIUM")
    sentiment = Column(String, default="NEUTRAL")
    is_sensitive = Column(Boolean, default=False)
    confidence_score = Column(Float)
    
    # System tracking
    status = Column(String, default="OPEN") # OPEN, RESOLVED
    assigned_team = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())