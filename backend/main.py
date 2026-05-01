from datetime import datetime, timezone
from pathlib import Path
from typing import Optional
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

try:
    from .rag import create_vector_db, retrieve_context, retrieve_documents
except ImportError:
    from rag import create_vector_db, retrieve_context, retrieve_documents

app = FastAPI(
    title="JordanGov AI Assistant API",
    version="0.2.0",
    description="FastAPI backend for the bilingual JordanGov AI Assistant.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = None
db_error = None
feedback_store = []

SYSTEM_PROMPT = """
You are JordanGov AI Assistant.

Rules:
1. If the user asks in Arabic, respond in Arabic.
2. If the user asks in English, respond in English.
3. Use the provided context first.
4. If the answer is not found in the context, clearly say that official verification is required.
5. Keep the answer clear, structured, and helpful.
"""

class ChatRequest(BaseModel):
    message: str

class FeedbackRequest(BaseModel):
    name: str
    rating: int
    comment: str
    service_category: str

class FeedbackItem(FeedbackRequest):
    id: str
    created_at: str


def get_db():
    global db, db_error

    if db is not None:
        return db

    try:
        db = create_vector_db()
        db_error = None
        return db
    except Exception as exc:
        db_error = str(exc)
        raise

def check_ollama_status():
    try:
        response = requests.get("http://localhost:11434/api/tags", timeout=3)
        response.raise_for_status()
        return "online"
    except requests.RequestException:
        return "offline"

def build_prompt(message, context):
    return f"""
{SYSTEM_PROMPT}

Context:
{context}

User Question:
{message}

Assistant:
"""

def call_ollama(prompt):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma3:4b",
            "prompt": prompt,
            "stream": False,
        },
        timeout=120,
    )

    try:
        response.raise_for_status()
        data = response.json()
    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to reach Ollama: {exc}",
        ) from exc

    return data.get("response", "")

def format_sources(documents):
    sources = []

    for doc in documents:
        source_path = doc.metadata.get("source") if doc.metadata else None
        source_name = Path(source_path).name if source_path else "JordanGov knowledge base"
        first_line = next(
            (line.strip() for line in doc.page_content.splitlines() if line.strip()),
            "Retrieved service guidance",
        )
        label = f"{source_name} - {first_line[:140]}"
        if label not in sources:
            sources.append(label)

    return sources

@app.get("/")
def home():
    status = "ready"
    details = None

    if db is None:
        try:
            get_db()
        except Exception:
            status = "degraded"
            details = db_error

    return {
        "message": "JordanGov backend is running",
        "rag_status": status,
        "details": details,
    }

@app.get("/health")
def health():
    rag_status = "ready"
    details: Optional[str] = None

    try:
        get_db()
    except Exception:
        rag_status = "degraded"
        details = db_error

    return {
        "status": "ok" if rag_status == "ready" else "degraded",
        "api": "online",
        "rag_status": rag_status,
        "ollama_status": check_ollama_status(),
        "vector_database": "chroma",
        "details": details,
    }

@app.post("/chat")
def chat(request: ChatRequest):
    try:
        context = retrieve_context(get_db(), request.message)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"RAG initialization failed: {exc}",
        ) from exc

    full_prompt = build_prompt(request.message, context)
    answer = call_ollama(full_prompt)

    return {"response": answer}

@app.post("/rag/chat")
def rag_chat(request: ChatRequest):
    try:
        documents = retrieve_documents(get_db(), request.message)
        context = "\n\n".join([doc.page_content for doc in documents])
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"RAG initialization failed: {exc}",
        ) from exc

    full_prompt = build_prompt(request.message, context)
    answer = call_ollama(full_prompt)

    return {
        "response": answer,
        "sources": format_sources(documents),
    }

@app.get("/feedback", response_model=list[FeedbackItem])
def get_feedback():
    return feedback_store

@app.post("/feedback", response_model=FeedbackItem)
def submit_feedback(feedback: FeedbackRequest):
    if feedback.rating < 1 or feedback.rating > 5:
        raise HTTPException(status_code=422, detail="Rating must be between 1 and 5.")

    item = FeedbackItem(
        id=str(uuid4()),
        name=feedback.name,
        rating=feedback.rating,
        comment=feedback.comment,
        service_category=feedback.service_category,
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    feedback_store.append(item)
    return item
