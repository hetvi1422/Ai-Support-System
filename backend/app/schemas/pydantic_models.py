from pydantic import BaseModel, Field
from typing import List, Optional

class ActionItemSchema(BaseModel):
    description: str = Field(description="Task description")
    owner: str = Field(description="Assigned person, or 'Unassigned'")
    due_date: str = Field(description="Deadline, or 'Not specified'")
    priority: str = Field(description="'Low', 'Medium', or 'High'")

class AIProcessingResult(BaseModel):
    summary: str = Field(description="Concise meeting summary")
    key_points: str = Field(description="Important discussion points as bullet points")
    decisions: str = Field(description="Key decisions made, presented clearly")
    risks: str = Field(description="Risks or concerns raised")
    unanswered_questions: str = Field(description="Questions that were left unresolved")
    action_items: List[ActionItemSchema] = Field(description="Extracted actionable tasks")