from logging.config import fileConfig
import sys
import os

# Add the src directory to the path so we can import our modules
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

# Import models here for the metadata
def get_metadata():
    # Import only when needed to avoid circular imports during initialization
    from sqlmodel import SQLModel
    from src.models.user import User
    from src.models.task import Task
    return SQLModel.metadata

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
target_metadata = get_metadata()

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def get_app_database_url():
    """Get the database URL from the application config."""
    import os
    from pydantic_settings import BaseSettings

    # Temporarily read directly from the .env file to ensure correct value
    env_db_url = os.getenv("DATABASE_URL")
    if env_db_url:
        return env_db_url

    # Fallback to the application settings
    from src.config import settings
    return settings.database_url


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = get_app_database_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    try:
        from src.database import get_engine

        connectable = get_engine()

        with connectable.connect() as connection:
            context.configure(
                connection=connection, target_metadata=target_metadata
            )

            with context.begin_transaction():
                context.run_migrations()
    except ModuleNotFoundError as e:
        if 'psycopg2' in str(e):
            # If psycopg2 is not available, we can't connect to PostgreSQL
            # Fall back to offline mode with the URL
            print(f"Warning: {e}. Running in offline mode.")
            url = get_app_database_url()
            context.configure(
                url=url,
                target_metadata=target_metadata,
                dialect_opts={"paramstyle": "named"},
            )

            with context.begin_transaction():
                context.run_migrations()
        else:
            raise


if context.is_offline_mode():
    run_migrations_offline()
else:
    # Check if we're running in autogenerate mode by examining the command arguments
    import sys

    # Determine the mode based on command being run
    is_revision_command = any('revision' in arg for arg in sys.argv)
    is_autogenerate = any('--autogenerate' in arg for arg in sys.argv)

    if is_revision_command and is_autogenerate:
        # For autogenerate, we configure context but don't necessarily need an active connection
        # This allows autogenerate to work even if the target database isn't available
        url = get_app_database_url()

        # Configure for autogenerate with the target database URL
        context.configure(
            url=url,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
            render_as_batch=True,
            dialect_opts={"paramstyle": "named"},
        )

        with context.begin_transaction():
            context.run_migrations()
    else:
        run_migrations_online()