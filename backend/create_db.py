from src.database import create_db_and_tables

print("Creating database tables...")
try:
    create_db_and_tables()
    print("Database tables created successfully!")
except Exception as e:
    print(f"Error creating database tables: {e}")
    import traceback
    traceback.print_exc()