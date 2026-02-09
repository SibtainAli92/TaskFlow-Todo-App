"""
Add missing role column to users table
"""
from sqlalchemy import create_engine, text
from src.config import settings

def add_role_column():
    engine = create_engine(settings.database_url)

    with engine.connect() as conn:
        # Check if role column exists
        result = conn.execute(text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='role'
        """))

        if result.fetchone() is None:
            print("Adding role column to users table...")
            conn.execute(text("""
                ALTER TABLE users
                ADD COLUMN role VARCHAR(10) DEFAULT 'user' NOT NULL
            """))
            conn.commit()
            print("✓ Role column added successfully!")
        else:
            print("Role column already exists.")

if __name__ == "__main__":
    add_role_column()
