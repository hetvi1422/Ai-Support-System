from google import genai
from google.genai import types
from app.core.config import settings
from app.schemas.pydantic_models import AIAnalysisResult

# Initialize the new GenAI SDK
client = genai.Client(api_key=settings.GEMINI_API_KEY)

def process_inbound_ticket(raw_message: str, customer_name: str, language: str = 'en') -> dict:
    prompt = f"""
    Analyze this customer support ticket.
    Language to reply in: {language}
    Customer Name: {customer_name}
    Message: {raw_message}
    
    Strict Rules:
    1. CLASSIFICATION: Classify into BILLING, TECHNICAL, or CUSTOMER_SERVICE.
    2. SENTIMENT: Detect POSITIVE, NEUTRAL, FRUSTRATED, or URGENT.
    3. RISK: Set is_sensitive to True for Refunds over €50, Cancellations, GDPR, or Legal.
    4. AUTO-REPLY: True only if confidence >= 0.88 and not sensitive.
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=AIAnalysisResult,
            temperature=0.1
        ),
    )
    
    # Returns the perfectly formatted dictionary
    return response.parsed.model_dump()