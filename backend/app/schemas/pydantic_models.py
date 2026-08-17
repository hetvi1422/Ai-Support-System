from pydantic import BaseModel, Field

class TicketIngestRequest(BaseModel):
    customer_name: str
    customer_email: str
    channel: str
    raw_message: str
    language: str = "en"

class AIAnalysisResult(BaseModel):
    category: str = Field(description="Must be BILLING, TECHNICAL, or CUSTOMER_SERVICE")
    priority: str = Field(description="Must be LOW, MEDIUM, HIGH, or URGENT")
    sentiment: str = Field(description="Must be POSITIVE, NEUTRAL, FRUSTRATED, or URGENT")
    is_sensitive: bool = Field(description="True if the message involves refunds, legal, or GDPR data")
    confidence_score: float = Field(description="Confidence score between 0.0 and 1.0")
    auto_reply_allowed: bool = Field(description="True ONLY if confidence >= 0.88, not sensitive, and is a standard FAQ")
    suggested_response: str = Field(description="The drafted response in the requested language")
    action_recommendation: str = Field(description="Next steps recommended for the human agent")