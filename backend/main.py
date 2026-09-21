from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="SkillBridge AI FastAPI Backend",
    description="Multilingual Career Readiness & Resume Extraction Microservice",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeAnalyzeRequest(BaseModel):
    resume_text: str

class ChatRequest(BaseModel):
    message: str
    target_role: Optional[str] = "Software Developer Intern"
    language: Optional[str] = "en"

@app.get("/")
def read_root():
    return {
        "app": "SkillBridge AI API",
        "tagline": "From Skill Gaps to Career Opportunities",
        "status": "healthy"
    }

@app.post("/api/v1/analyze-resume")
def analyze_resume_endpoint(payload: ResumeAnalyzeRequest):
    text = payload.resume_text.lower()
    known_skills = ["python", "java", "html", "css", "javascript", "react", "sql", "dsa", "git", "rest api"]
    detected = [s.upper() for s in known_skills if s in text]
    
    return {
        "status": "success",
        "detected_skills": detected,
        "missing_critical_info": [
            "GitHub repository link missing" if "github" not in text else None,
            "No SQL/Database experience" if "sql" not in text else None
        ],
        "structure_score": 82
    }

@app.post("/api/v1/chatbot")
def chatbot_endpoint(payload: ChatRequest):
    msg = payload.message.lower()
    lang = payload.language
    
    if lang == "ta":
        reply = "SkillBridge AI தமிழ் வழிகாட்டி: SQL என்பது database-ல் தரவை நிர்வகிக்க பயன்படும் மொழி ஆகும்."
    elif lang == "hi":
        reply = "SkillBridge AI हिंदी सहायक: SQL डेटाबेस को मैनेज करने के लिए अनिवार्य भाषा है।"
    else:
        reply = f"SkillBridge AI Assistant: For your role '{payload.target_role}', focus on completing your SQL and DSA learning roadmaps."
        
    return {"reply": reply}
