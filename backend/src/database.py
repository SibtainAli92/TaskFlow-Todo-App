from sqlmodel import Session
from .config import settings
from typing import Generator
from sqlalchemy import create_engine


# Create the database engine dynamically
def get_engine():
    # Check if it's a SQLite URL and handle accordingly
    if settings.database_url.startswith("sqlite:///"):
        return create_engine(
            settings.database_url,
            echo=False,  # Set to True for SQL query logging
            pool_pre_ping=True,
            pool_size=10,
            max_overflow=20,
            pool_recycle=300,
            # SQLite-specific options
            connect_args={"check_same_thread": False}  # Required for async operations
        )
    else:
        # For PostgreSQL (optimized for Neon Serverless)
        return create_engine(
            settings.database_url,
            echo=False,  # Set to True for SQL query logging
            pool_pre_ping=True,
            pool_size=5,          # Smaller pool size optimized for serverless
            max_overflow=10,      # Reduced overflow for serverless
            pool_recycle=300,
            pool_timeout=30,      # Connection timeout
            connect_args={
                "connect_timeout": 10,  # Connection timeout
                "application_name": "hackathon-todo-app",  # Application name for monitoring
                "sslmode": "require"  # Required for Neon connection
            },
        )


def create_db_and_tables():
    """Create database tables"""
    from .models import User, Task
    from sqlmodel import SQLModel

    engine = get_engine()
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """Get database session"""
    engine = get_engine()
    with Session(engine) as session:
        yield session