"""Update schema to include all required fields for users, tasks, and add sessions table

Revision ID: 3a5b7c9e1f23
Revises: 2a4b6c8e0f12
Create Date: 2026-02-05 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql, sqlite

# revision identifiers, used by Alembic.
revision: str = '3a5b7c9e1f23'
down_revision: Union[str, Sequence[str], None] = '2a4b6c8e0f12'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema to include all required fields."""

    # Add missing username column to users table
    op.add_column('users', sa.Column('username', sa.String(length=50), nullable=True))

    # Update existing records to have username based on email if possible
    # For SQLite compatibility, we'll just make it non-nullable later

    # Create unique constraint for username
    op.create_unique_constraint('uq_users_username', 'users', ['username'])

    # Make username non-nullable after populating
    with op.batch_alter_table('users') as batch_op:
        batch_op.alter_column('username', nullable=False)

    # Rename owner_id to user_id in tasks table
    with op.batch_alter_table('tasks') as batch_op:
        batch_op.alter_column('owner_id', new_column_name='user_id')

    # Add all missing columns to tasks table
    with op.batch_alter_table('tasks') as batch_op:
        batch_op.add_column(sa.Column('due_date', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('priority', sa.String(length=10), server_default='Medium', nullable=False))
        batch_op.add_column(sa.Column('tags_str', sa.String(length=500), nullable=True))  # Store as string for compatibility
        batch_op.add_column(sa.Column('recurrence_pattern', sa.String(length=20), server_default='none', nullable=False))

    # Create sessions table
    op.create_table(
        'sessions',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('uuid_generate_v4()'), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('session_token', sa.String(length=500), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.Column('last_accessed_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('status', sa.String(length=20), server_default='active', nullable=False),
        sa.Column('ip_address', sa.String(length=45), nullable=True),
        sa.Column('user_agent', sa.String(length=500), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.UniqueConstraint('session_token')
    )


def downgrade() -> None:
    """Downgrade schema."""
    # Drop sessions table
    op.drop_table('sessions')

    # Remove added columns from tasks table
    with op.batch_alter_table('tasks') as batch_op:
        batch_op.drop_column('recurrence_pattern')
        batch_op.drop_column('tags_str')
        batch_op.drop_column('priority')
        batch_op.drop_column('due_date')
        batch_op.alter_column('user_id', new_column_name='owner_id')

    # Remove username from users table
    with op.batch_alter_table('users') as batch_op:
        batch_op.drop_constraint('uq_users_username', type_='unique')
        batch_op.drop_column('username')