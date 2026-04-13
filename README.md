# 🇯🇴 JordanGov AI Assistant

An AI-powered chatbot that helps users access Jordanian government services using natural language (text and voice).

---

## 🚀 Project Overview

JordanGov AI Assistant is designed to simplify access to government services by providing accurate, structured, and source-based answers using Retrieval-Augmented Generation (RAG).

---

## 🧠 Key Features

- 💬 Text-based chatbot interface
- 🎤 Voice interaction (Speech-to-Text & Text-to-Speech)
- 🔎 RAG-based retrieval from official sources
- 📄 Source citation for answers
- 🧾 Service details (requirements, fees, processing time)
- 📊 User feedback system
- 🗂 Conversation history

---

## 🏗️ System Architecture

The system follows a layered architecture:

User → Frontend → Backend → AI Layer (RAG + LLM) → Data Layer

---

## ⚙️ Technologies Used

### 🔹 AI & RAG
- Ollama
- Gemma (Local LLM)
- LangChain
- Chroma / FAISS (Vector Database)

### 🔹 Backend
- FastAPI (Python)

### 🔹 Frontend
- Next.js / React

### 🔹 Voice
- Whisper (Speech-to-Text)
- gTTS / ElevenLabs (Text-to-Speech)

---

## 📁 Project Structure
jordangov-ai-assistant/
│
├── frontend/
├── backend/
├── ai/
├── data/
├── docs/
└── README.md

---

## 📊 Data Sources

- Official Jordanian government websites
- Public service documents
- FAQs and structured service data

---

## 🔐 Why Local AI (Gemma)?

- Privacy: Data stays local
- Cost-efficient (no paid APIs)
- Full control over responses
- Better integration with RAG

---

## 👨‍💻 Team Members

- Mohammed Noor Faris Hawwari
- Abdulrahman Dirar Ali Aideh
- Mohannad Hazem Jamil Al-Mahamid
 

---

## 📅 Course

CIS 499 – Graduation Project

---

## 📌 Future Work

- Integration with e-government platforms
- Mobile application
- Advanced personalization
- Multi-language support
