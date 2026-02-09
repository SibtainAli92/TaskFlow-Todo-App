"""
Test script to verify PostgreSQL connection works with the new configuration.
"""
import os
import sys
from contextlib import contextmanager

# Add src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from src.config import settings
from src.database import get_engine
from sqlmodel import SQLModel, select
from src.models.user import User
from src.models.task import Task

def test_connection():
    """Test the database connection with the new configuration."""
    print(f"Current database URL: {settings.database_url}")

    try:
        # Create engine with the new configuration
        engine = get_engine()

        # Test the connection by creating tables (this will test the connection)
        print("Testing connection by creating tables...")
        SQLModel.metadata.create_all(engine)
        print("[SUCCESS] Connection successful! Tables created if they didn't exist.")

        # Test creating a simple record
        print("Testing basic operations...")
        from sqlmodel import Session

        with Session(engine) as session:
            # Count existing users
            statement = select(User)
            existing_users = session.exec(statement).all()
            print(f"Found {len(existing_users)} existing users")

            # If no users exist, create a test user (just for demonstration)
            if len(existing_users) == 0:
                print("No users found, creating a test user...")
                from passlib.context import CryptContext
                import uuid

                pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

                test_user = User(
                    email="test@example.com",
                    password_hash=pwd_context.hash("testpassword"),
                    id=uuid.uuid4()
                )
                session.add(test_user)
                session.commit()
                session.refresh(test_user)
                print(f"Created test user with ID: {test_user.id}")

        print("[SUCCESS] All database operations successful!")
        return True

    except Exception as e:
        print(f"[ERROR] Error connecting to database: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("Testing PostgreSQL connection with new configuration...")
    success = test_connection()

    if success:
        print("\n[SUCCESS] PostgreSQL connection test PASSED!")
        print("Migration to Neon Serverless PostgreSQL is ready!")
    else:
        print("\n[FAILURE] PostgreSQL connection test FAILED!")
        sys.exit(1)