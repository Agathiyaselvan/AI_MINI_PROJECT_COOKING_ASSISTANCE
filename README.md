# AI Recipe Assistant (RAG-Based)

## Overview

AI Recipe Assistant is a recipe search and cooking assistant application built with a FastAPI backend and a React-based frontend. It uses Retrieval-Augmented Generation (RAG) to find relevant recipes from a FAISS vector store, then generates a structured answer using a Groq LLM.

The app supports:
- ingredient-based recipe suggestions
- dish-based queries like "how to make pasta"
- missing ingredient detection
- step-by-step cooking instructions
- out-of-domain query filtering

---

## Project Architecture

- `main.py` — FastAPI backend API serving `/chat`
- `frontend/` — React/Vite frontend that sends queries to the backend
- `recipe_faiss_index/` — stored FAISS index for recipe retrieval
- `.env` — environment variables (API key)
- `.gitignore` — excludes virtual environment, secrets, and large data files

> Note: `app.py` contains old Streamlit code and is not used by the current React + FastAPI setup.

---

## Folder Structure

```
ai_mini_RAG/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api/apiClient.js
│   │   └── index.css
│   ├── script.js
│   └── style.css
├── main.py
├── app.py
├── clean.py
├── remove_columns.py
├── RAG.ipynb
├── recipes_cleaned.csv
├── recipes_with_docs.csv
├── README.md
├── .gitignore
├── .env
└── recipe_faiss_index/
    └── index.faiss
```

---

## Technology Stack

- Backend: `FastAPI`, Python
- Frontend: `React`, `Vite`, `Axios`
- Vector search: `FAISS`
- Embeddings: `HuggingFace/all-MiniLM-L6-v2`
- LLM: `Groq` (LLaMA 3.1)
- Environment: Python virtual environment

---

## Setup Guide

### 1. Clone the repository

```powershell
cd c:\Users\LENOVO\Documents\AI_MINI_PROJECT_COOKING_ASSISTANCE
https://github.com/Agathiyaselvan/AI_MINI_PROJECT_COOKING_ASSISTANCE.git
AI_MINI_PROJECT_RAG
```

### 2. Create a Python virtual environment

```powershell
python -m venv .venv
```

### 3. Activate the virtual environment

```powershell
.venv\Scripts\activate
```

### 4. Install Python dependencies

```powershell
pip install fastapi uvicorn langchain langchain-community langchain-huggingface langchain-groq sentence-transformers faiss-cpu python-dotenv
```

### 5. Configure environment variables

Create a `.env` file in the project root with:

```text
GROQ_API_KEY=your_groq_api_key_here
```

### 6. Start the backend server

```powershell
python -m uvicorn main:app --reload 
```

The backend will start at:

```text
http://127.0.0.1:8000
```

### 7. Start the frontend

From the `frontend` folder, install frontend dependencies and run the dev server:

```powershell
cd frontend
npm install
npm run dev
```

Then open the local URL shown by Vite in your browser.

> If you prefer, you can also open `frontend/index.html` directly, but using Vite is recommended for the React frontend.

---

## Usage

1. Open the frontend in your browser.
2. Enter ingredients or a dish query.
3. Submit the query.
4. The app sends the request to the FastAPI backend, which performs semantic retrieval and text generation.
5. The answer is displayed in the chat interface.

Example queries:
- `chicken, garlic, lemon`
- `low calorie meal with eggs`
- `how to make pasta`

---

## API Endpoint

### POST `/chat`

Request body:

```json
{
  "query": "your question or ingredients"
}
```

Response body:

```json
{
  "answer": "Response text from the assistant"
}
```

---

## Troubleshooting

- If the frontend says "Unable to reach the server", make sure the backend is running at `http://127.0.0.1:8000`.
- If you see a missing `GROQ_API_KEY`, confirm `.env` exists and contains a valid Groq API key.
- If query responses are incorrect, the app may be matching greeting text too broadly; that logic is handled in `main.py`.

---

## Notes

- `app.py` is not currently used by the React + FastAPI implementation.
- The FAISS index file `recipe_faiss_index/index.faiss` is needed for recipe retrieval.
- Do not commit `.env`, `.venv`, or large index files to GitHub.

---


