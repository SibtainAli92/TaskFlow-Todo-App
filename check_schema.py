import os
from sqlmodel import create_engine, text
from dotenv import load_dotenv

load_dotenv()

# Determine database type from environment or check if SQLite file exists
db_url = os.getenv('DATABASE_URL')
if not db_url:
    # Check if SQLite file exists
    if os.path.exists('./backend/hackathon_todo_dev.db'):
        db_url = 'sqlite:///./backend/hackathon_todo_dev.db'
    elif os.path.exists('./hackathon_todo_dev.db'):
        db_url = 'sqlite:///./hackathon_todo_dev.db'
    else:
        db_url = 'sqlite:///./todo_app.db'

print(f'Database URL: {db_url}')

engine = create_engine(db_url)

try:
    with engine.connect() as conn:
        # First, check what tables exist
        if 'sqlite' in db_url:
            tables_result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table';"))
            tables = [row[0] for row in tables_result.fetchall()]
            print(f'Tables in database: {tables}')

            if 'tasks' in tables:
                # For SQLite - get all columns from tasks table
                result = conn.execute(text('PRAGMA table_info(tasks)'))
                columns = result.fetchall()
                print('\nSQLite tasks table columns:')
                column_names = []
                for col in columns:
                    print(f'  {col[1]} ({col[2]}) - nullable: {not col[3]}, default: {col[4]}')
                    column_names.append(col[1])

                # Check specifically for due_date in SQLite
                due_date_check = conn.execute(text("SELECT name FROM pragma_table_info('tasks') WHERE name = 'due_date';"))
            else:
                print('\nNo tasks table found')
                column_names = []
                due_date_check = None
        else:
            # For PostgreSQL - get all tables
            tables_result = conn.execute(text("""
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public'
            """))
            tables = [row[0] for row in tables_result.fetchall()]
            print(f'Tables in database: {tables}')

            if 'tasks' in tables:
                # For PostgreSQL - get all columns from tasks table
                result = conn.execute(text("""
                    SELECT column_name, data_type, is_nullable
                    FROM information_schema.columns
                    WHERE table_name = 'tasks'
                    ORDER BY ordinal_position
                """))
                columns = result.fetchall()
                print('\nPostgreSQL tasks table columns:')
                column_names = []
                for col in columns:
                    print(f'  {col[0]} ({col[1]}) - nullable: {col[2]}')
                    column_names.append(col[0])

                # Check specifically for due_date in PostgreSQL
                due_date_check = conn.execute(text("""
                    SELECT column_name
                    FROM information_schema.columns
                    WHERE table_name = 'tasks' AND column_name = 'due_date'
                """))
            else:
                print('\nNo tasks table found')
                column_names = []
                due_date_check = None

        if column_names:
            print(f'\nAll column names found: {column_names}')

        if due_date_check:
            due_date_exists = due_date_check.fetchone()
            if due_date_exists:
                print('due_date column EXISTS in tasks table')
            else:
                print('due_date column does NOT exist in tasks table')
        else:
            print('Cannot check due_date column as tasks table does not exist')

except Exception as e:
    print(f'Error checking database: {e}')
    print('This might indicate the table does not exist yet.')