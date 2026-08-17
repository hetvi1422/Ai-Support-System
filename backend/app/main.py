from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.core.database import engine, Base, get_db
from app.models import schema

# Create all tables in the PostgreSQL database
schema.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Support System Backend")

@app.get("/")
def read_root():
    return {"message": "FastAPI is running and Database is connected!"}

# Quick test endpoint to verify DB
@app.get("/db-check")
def check_db(db: Session = Depends(get_db)):
    return {"status": "Database connection successful!"}

from app.api.routes import router as api_router

app.include_router(api_router, prefix="/api")