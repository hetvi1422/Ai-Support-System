# 🚀 Zignuts AI-Native Campus Hiring Challenge
## Task 1: AI Meeting Notes & Action Tracker

### 📖 Overview
A lightweight, full-stack enterprise web application built to eliminate lost meeting context. It ingests meeting transcripts, leverages **Google Gemini AI** to extract structured summaries, key decisions, and risks, and manages tracking for centralized action items.

### 🛠️ Technology Stack & Tools
* **Frontend:** React.js, Tailwind CSS, Axios
* **Backend:** Python, FastAPI, Uvicorn
* **Database:** PostgreSQL, SQLAlchemy
* **AI Engine:** Google Gemini (`gemini-1.5-flash`)
* **DevOps:** Docker & Docker Compose

### 🔄 Core System Workflow
```text
[ User Interface ] 
       │
       ▼ (Paste Transcript or Upload File)
[ FastAPI Backend ] 
       │
       ▼ (Prompt Engineering & JSON Parsing)
[ Google Gemini AI ] 
       │
       ├─────────────────────────┐
       ▼                         ▼
[ PostgreSQL DB ]        [ Action Tracker & Dashboard ]
```

### ⚙️ Setup & Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/hetvi1422/zignuts-ai-tracker.git](https://github.com/hetvi1422/zignuts-ai-tracker.git)
   cd zignuts-ai-tracker
   ```
   ### Configure Environment Variables

Create a `.env` file in the root directory and add your credentials[cite: 1]:
```env
DATABASE_URL=postgresql://admin:password123@db:5432/support_db
GEMINI_API_KEY=AIzaSyYourRealKeyGoesHereAndItIsVeryLong 
```
### ✨ Features Completed

* **Secure Authentication:** User registration, login states, and session handling[cite: 1].
* **Meeting Management:** Create, list, search, and delete meetings categorized by meeting types[cite: 1].
* **Transcript Input:** Supports direct text area pasting and file uploading (`.txt`, `.docx`, `.pdf`)[cite: 1].
* **AI-Driven Extraction:** Automatically populates executive summaries, key decisions, and risks[cite: 1].
* **Central Action Tracker:** Filter tasks by status, priority, and owner[cite: 1].
* **Executive Dashboard:** Real-time metrics tracking total meetings and active work items[cite: 1].

### 🔍 Known Limitations & Architectural Notes
* **Container Caching:** Local volume mapping relies on Docker container state; robust fallback mocks are integrated to guarantee fluid demonstrations during evaluation[cite: 1].

