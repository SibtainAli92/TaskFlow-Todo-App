from sqlalchemy import inspect
from src.database import get_engine

def inspect_database():
    engine = get_engine()
    inspector = inspect(engine)

    print("Database Tables:")
    for table_name in inspector.get_table_names():
        print(f"\nTable: {table_name}")
        print("Columns:")
        for column in inspector.get_columns(table_name):
            print(f"  - {column['name']}: {column['type']} (nullable: {column['nullable']})")

        print("Foreign Keys:")
        for fk in inspector.get_foreign_keys(table_name):
            print(f"  - {fk['constrained_columns']} -> {fk['referred_table']}.{fk['referred_columns']}")

        print("Indexes:")
        for index in inspector.get_indexes(table_name):
            print(f"  - {index['name']}: {index['column_names']}")

if __name__ == "__main__":
    inspect_database()