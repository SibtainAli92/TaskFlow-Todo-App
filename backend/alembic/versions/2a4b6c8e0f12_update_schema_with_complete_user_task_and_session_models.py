"""Update schema with complete user, task, and session models

Revision ID: 2a4b6c8e0f12
Revises: f38f1a14f254
Create Date: 2026-02-03 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '2a4b6c8e0f12'
down_revision: Union[str, Sequence[str], None] = 'f38f1a14f254'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add missing columns to users table
    op.add_column('users', sa.Column('username', sa.String(length=50), nullable=True))
    op.add_column('users', sa.Column('role', sa.String(length=20), server_default='user', nullable=False))

    # For now, skip populating existing usernames - we'll handle this separately if needed
    # Just add the column with nullable=True initially, then we can add constraints later if needed

    # Create unique constraint for username (will only apply to new entries initially)
    op.create_unique_constraint('uq_users_username', 'users', ['username'])

    # Rename owner_id to user_id in tasks table
    op.alter_column('tasks', 'owner_id', new_column_name='user_id')

    # Add missing columns to tasks table
    op.add_column('tasks', sa.Column('due_date', sa.Date(), nullable=True))
    op.add_column('tasks', sa.Column('priority', sa.String(length=10), server_default='Medium', nullable=False))
    op.add_column('tasks', sa.Column('tags_str', sa.String(length=500), nullable=True))
    op.add_column('tasks', sa.Column('recurrence_pattern', sa.String(length=20), server_default='none', nullable=False))

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
    op.drop_column('tasks', 'recurrence_pattern')
    op.drop_column('tasks', 'tags_str')
    op.drop_column('tasks', 'priority')
    op.drop_column('tasks', 'due_date')

    # Rename user_id back to owner_id
    op.alter_column('tasks', 'user_id', new_column_name='owner_id')

    # Remove username from users table
    op.drop_constraint('uq_users_username', 'users', type_='unique')
    op.drop_column('users', 'role')
    op.drop_column('users', 'username')