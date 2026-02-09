from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database settings - Prioritize DATABASE_URL environment variable, fallback to SQLite for development
    database_url: str = "sqlite:///./hackathon_todo_dev.db"

    # Auth settings
    secret_key: str = "your-super-secret-jwt-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # Better Auth settings
    better_auth_secret: str = "your-better-auth-secret-key-here"

    class Config:
        env_file = ".env"

    def __init__(self, **values):
        super().__init__(**values)
        # Override database_url if DATABASE_URL environment variable is set
        import os
        env_db_url = os.getenv("DATABASE_URL")
        if env_db_url:
            self.database_url = env_db_url


settings = Settings()