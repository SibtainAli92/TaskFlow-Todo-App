"""Initial migration for PostgreSQL

Revision ID: f38f1a14f254
Revises:
Create Date: 2026-01-31 07:07:20.701221

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f38f1a14f254'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Create extension for UUID if not exists (PostgreSQL)
    op.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")

    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Uuid(), server_default=sa.text('uuid_generate_v4()'), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('password_hash', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )

    # Create tasks table
    op.create_table(
        'tasks',
        sa.Column('id', sa.Uuid(), server_default=sa.text('uuid_generate_v4()'), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('description', sa.String(length=1000), nullable=True),
        sa.Column('completed', sa.Boolean(), server_default=sa.text('false'), nullable=False),
        sa.Column('owner_id', sa.Uuid(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ondelete='CASCADE')
    )


def downgrade() -> None:
    """Downgrade schema."""
    # Drop tasks table first (due to foreign key dependency)
    op.drop_table('tasks')

    # Drop users table
    op.drop_table('users')
