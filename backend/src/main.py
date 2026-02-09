from fastapi import FastAPI
from .api import auth, tasks, better_auth
from .database import create_db_and_tables
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from .middleware.security import SecurityHeadersMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables on startup
    create_db_and_tables()
    yield


app = FastAPI(
    title="hackathon-todo API",
    description="API for managing user tasks with authentication and user isolation",
    version="1.0.0",
    lifespan=lifespan
)


# Add security middleware
app.add_middleware(
    SecurityHeadersMiddleware
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API routers
app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(better_auth.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to hackathon-todo API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)