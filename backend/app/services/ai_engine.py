import os
import json
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def process_meeting_transcript(transcript_text: str) -> dict:
    # We are putting the exact JSON structure directly into the prompt to bypass the library error
    prompt = f"""
    You are an expert AI meeting assistant. Analyze the following meeting transcript.
    Extract the following information and return it STRICTLY as a raw JSON object. 
    Do not include any Markdown formatting like ```json. Just return the pure JSON object.
    
    Format required:
    {{
        "summary": "String",
        "key_points": "String",
        "decisions": "String",
        "risks": "String",
        "unanswered_questions": "String",
        "action_items": [
            {{
                "description": "Task description",
                "owner": "Person's name or Unassigned",
                "due_date": "Date or Not specified",
                "priority": "High, Medium, or Low",
                "status": "Open"
            }}
        ]
    }}
    
    Transcript:
    \"\"\"{transcript_text}\"\"\"
    """

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # We removed the strict GenerationConfig to bypass the version crash
        response = model.generate_content(prompt)
        
        # Clean up the text in case Gemini accidentally adds Markdown formatting
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
            
        # Manually parse the text into a Python dictionary
        result_dict = json.loads(response_text.strip())
        return result_dict

    except Exception as e:
        error_message = str(e)
        print(f"AI Engine Error: {error_message}")
        return {
            "summary": f"AI generation failed. REASON: {error_message}",
            "key_points": "",
            "decisions": "",
            "risks": "",
            "unanswered_questions": "",
            "action_items": []
        }