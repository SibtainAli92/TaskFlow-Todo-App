"""
Create a test user for login
"""
from sqlalchemy import create_engine, text
from src.config import settings
from src.auth.utils import get_password_hash
import uuid

def create_test_user():
    engine = create_engine(settings.database_url)

    with engine.connect() as conn:
        # Check if test user exists
        result = conn.execute(text("SELECT email FROM users WHERE email = 'test@example.com'"))
        existing = result.fetchone()

        if existing:
            print("Test user already exists. Updating password...")
            # Update password
            password_hash = get_password_hash("test123")
            conn.execute(text("""
                UPDATE users
                SET password_hash = :hash
                WHERE email = 'test@example.com'
            """), {"hash": password_hash})
            conn.commit()
            print("Password updated successfully!")
        else:
            print("Creating new test user...")
            # Create new user
            user_id = str(uuid.uuid4())
            password_hash = get_password_hash("test123")
            conn.execute(text("""
                INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at)
                VALUES (:id, :username, :email, :hash, 'USER', NOW(), NOW())
            """), {
                "id": user_id,
                "username": "testuser",
                "email": "test@example.com",
                "hash": password_hash
            })
            conn.commit()
            print("Test user created successfully!")

        print("\nTest credentials:")
        print("  Email: test@example.com")
        print("  Password: test123")

if __name__ == "__main__":
    create_test_user()
