from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from fastapi.middleware.cors import CORSMiddleware


# Load env
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

app = FastAPI()

# Load embeddings + FAISS
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
vector_db = FAISS.load_local(
    "recipe_faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)
# Load LLM
llm = ChatGroq(
    model_name="llama-3.1-8b-instant",
    temperature=0,
    groq_api_key=groq_api_key
)

# Request model
class QueryRequest(BaseModel):
    query: str

# API endpoint
@app.post("/chat")
def chat(request: QueryRequest):
    query = request.query

    docs = vector_db.similarity_search(query, k=3)
    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""
    You are a strict cooking assistant.

    IMPORTANT RULES:
    - ONLY use the recipes provided in the context below
    - DO NOT use any external knowledge
    - DO NOT invent or modify recipes
    - Choose ONLY from the given recipes

    User ingredients:
    {query}

    Retrieved recipes:
    {context}

    TASK:
    1. Select the SINGLE most relevant recipe from the context
    2. Return its exact name
    3. Return its exact steps (do not modify)
    4. Compare user ingredients with recipe ingredients and list missing ones

    OUTPUT FORMAT:

    Recipe Name: <exact name from context>

    Steps:
    <exact steps from context>

    Missing Ingredients:
    <only list items not present in user input>
    """
    response = llm.invoke(prompt)

    return {"answer": response.content}