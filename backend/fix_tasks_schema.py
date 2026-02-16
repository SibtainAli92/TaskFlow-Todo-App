"""
Migration script to add missing columns to tasks table
"""
from sqlalchemy import create_engine, text
from src.config import settings

def fix_tasks_schema():
    engine = create_engine(settings.database_url)

    with engine.connect() as conn:
        # Check if columns exist and add them if missing
        print("Checking tasks table schema...")

        # Add user_id column (rename from owner_id if needed)
        try:
            result = conn.execute(text("""
                SELECT column_name FROM information_schema.columns
                WHERE table_name='tasks' AND column_name='user_id'
            """))
            if not result.fetchone():
                print("Adding user_id column...")
                # Check if owner_id exists
                result = conn.execute(text("""
                    SELECT column_name FROM information_schema.columns
                    WHERE table_name='tasks' AND column_name='owner_id'
                """))
                if result.fetchone():
                    # Rename owner_id to user_id
                    conn.execute(text("ALTER TABLE tasks RENAME COLUMN owner_id TO user_id"))
                    print("✓ Renamed owner_id to user_id")
                else:
                    # Add user_id column
                    conn.execute(text("""
                        ALTER TABLE tasks ADD COLUMN user_id UUID REFERENCES users(id)
                    """))
                    print("✓ Added user_id column")
        except Exception as e:
            print(f"user_id: {e}")

        # Add due_date column
        try:
            result = conn.execute(text("""
                SELECT column_name FROM information_schema.columns
                WHERE table_name='tasks' AND column_name='due_date'
            """))
            if not result.fetchone():
                print("Adding due_date column...")
                conn.execute(text("ALTER TABLE tasks ADD COLUMN due_date DATE"))
                print("✓ Added due_date column")
        except Exception as e:
            print(f"due_date: {e}")

        # Add priority column
        try:
            result = conn.execute(text("""
                SELECT column_name FROM information_schema.columns
                WHERE table_name='tasks' AND column_name='priority'
            """))
            if not result.fetchone():
                print("Adding priority column...")
                conn.execute(text("""
                    ALTER TABLE tasks ADD COLUMN priority VARCHAR(10) DEFAULT 'Medium'
                """))
                print("✓ Added priority column")
        except Exception as e:
            print(f"priority: {e}")

        # Add tags_str column
        try:
            result = conn.execute(text("""
                SELECT column_name FROM information_schema.columns
                WHERE table_name='tasks' AND column_name='tags_str'
            """))
            if not result.fetchone():
                print("Adding tags_str column...")
                conn.execute(text("ALTER TABLE tasks ADD COLUMN tags_str VARCHAR(500)"))
                print("✓ Added tags_str column")
        except Exception as e:
            print(f"tags_str: {e}")

        # Add recurrence_pattern column
        try:
            result = conn.execute(text("""
                SELECT column_name FROM information_schema.columns
                WHERE table_name='tasks' AND column_name='recurrence_pattern'
            """))
            if not result.fetchone():
                print("Adding recurrence_pattern column...")
                conn.execute(text("""
                    ALTER TABLE tasks ADD COLUMN recurrence_pattern VARCHAR(20) DEFAULT 'none'
                """))
                print("✓ Added recurrence_pattern column")
        except Exception as e:
            print(f"recurrence_pattern: {e}")

        conn.commit()
        print("\n✅ Tasks table schema updated successfully!")

        # Verify final schema
        print("\nFinal tasks table columns:")
        result = conn.execute(text("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name='tasks'
            ORDER BY ordinal_position
        """))
        for row in result:
            print(f"  - {row[0]}: {row[1]} (nullable: {row[2]})")

if __name__ == "__main__":
    fix_tasks_schema()
