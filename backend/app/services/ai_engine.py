import os
import google.generativeai as genai
from app.schemas.pydantic_models import AIProcessingResult
import json

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def process_meeting_transcript(transcript_text: str) -> dict:
    """
    Sends the transcript to Gemini to extract the summary, key decisions, and action items.
    """
    prompt = f"""
    You are an expert AI meeting assistant. Analyze the following meeting transcript.
    Extract the following information and return it strictly as a JSON object matching the requested schema.
    Do not invent or hallucinate data that is not in the transcript. If a due date or owner is not specified, use "Not specified" or "Unassigned".
    
    Transcript:
    \"\"\"{transcript_text}\"\"\"
    """

    try:
        # Using gemini-1.5-flash as it is fast and supports JSON schema output
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                response_schema=AIProcessingResult,
                temperature=0.2, # Low temperature for more factual extraction
            ),
        )
        
        # Parse the JSON string returned by Gemini into a Python dictionary
        result_dict = json.loads(response.text)
        return result_dict

    except Exception as e:
        print(f"AI Engine Error: {e}")
        # Return a fallback safe dictionary if the AI fails
        return {
            "summary": "AI generation failed.",
            "key_points": "",
            "decisions": "",
            "risks": "",
            "unanswered_questions": "",
            "action_items": []
        }