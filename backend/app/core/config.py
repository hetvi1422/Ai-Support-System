import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:password123@db:5432/support_db")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

settings = Settings()