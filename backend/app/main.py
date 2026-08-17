from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.api import routes

# 1. This tells the database to automatically create our new Meeting and ActionItem tables!
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Zignuts AI Tracker")

# 2. This fixes the CORS error by telling FastAPI to accept requests from our React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# 3. This attaches our Zignuts routes to the /api URL
app.include_router(routes.router, prefix="/api")

@app.get("/")
def root():
    return {"status": "Zignuts Backend is running perfectly!"}