"""
Fix role values in users table
"""
from sqlalchemy import create_engine, text
from src.config import settings

def fix_role_values():
    engine = create_engine(settings.database_url)

    with engine.connect() as conn:
        # Update all role values to match the enum (uppercase)
        print("Updating role values...")
        result = conn.execute(text("""
            UPDATE users
            SET role = 'USER'
            WHERE role = 'user' OR role IS NULL OR role = ''
        """))
        conn.commit()
        print(f"Updated {result.rowcount} rows")

        # Check current values
        result = conn.execute(text("SELECT email, role FROM users"))
        print("\nCurrent users:")
        for row in result:
            print(f"  {row[0]}: {row[1]}")

if __name__ == "__main__":
    fix_role_values()
