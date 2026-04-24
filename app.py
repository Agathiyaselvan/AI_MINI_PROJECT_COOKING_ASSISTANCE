import streamlit as st
import os
from dotenv import load_dotenv

from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

# -----------------------------
# Load environment variables
# -----------------------------
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# -----------------------------
# Load embeddings
# -----------------------------
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# -----------------------------
# Load FAISS index
# -----------------------------
vector_db = FAISS.load_local(
    "recipe_faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)
# -----------------------------
# Load Groq LLM
# -----------------------------
llm = ChatGroq(
    model_name="llama-3.1-8b-instant",
    temperature=0,
    groq_api_key=groq_api_key
)
# -----------------------------
# Streamlit UI
# -----------------------------
st.set_page_config(page_title="Recipe Generator", page_icon="🍳")

st.title("AI Recipe Generator (RAG + Groq)")
st.write("Enter ingredients and get a recipe instantly!")

query = st.text_input("Enter ingredients (comma separated):")

if st.button("Get Recipe"):

    if query:
        # Retrieve relevant recipes
        docs = vector_db.similarity_search(query, k=3)

        context = "\n\n".join([doc.page_content for doc in docs])

        # Prompt
        prompt = f"""
You are a smart cooking assistant.

User ingredients: {query}

Based on the recipes below:
{context}

Do the following:
1. Suggest the best matching recipe
2. Provide clear step-by-step instructions
3. List missing ingredients (if any)

Format the answer neatly.
"""

        # Generate response
        response = llm.invoke(prompt)

        st.subheader("Suggested Recipe")
        st.write(response.content)

    else:
        st.warning("Please enter some ingredients!")