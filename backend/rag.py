from pathlib import Path

from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import CharacterTextSplitter


DATA_FILE = Path(__file__).resolve().parent / "data" / "jordan_services.txt"

def create_vector_db():
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"Data file not found: {DATA_FILE}")

    if DATA_FILE.stat().st_size == 0:
        raise ValueError(
            f"Data file is empty: {DATA_FILE}. Add service content before starting the RAG backend."
        )

    loader = TextLoader(str(DATA_FILE), encoding="utf-8")
    documents = loader.load()

    if not documents:
        raise ValueError("No documents were loaded from the data file.")

    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = splitter.split_documents(documents)

    if not docs:
        raise ValueError("No text chunks were generated from the loaded documents.")

    embeddings = OllamaEmbeddings(model="mxbai-embed-large")

    db = Chroma.from_documents(docs, embeddings)
    return db

def retrieve_documents(db, query, k=3):
    return db.similarity_search(query, k=k)

def retrieve_context(db, query):
    docs = retrieve_documents(db, query)
    context = "\n\n".join([doc.page_content for doc in docs])
    return context
