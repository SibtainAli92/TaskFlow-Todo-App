from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime, timedelta
import uuid
from enum import Enum
from .user import User


class SessionStatus(str, Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    REVOKED = "revoked"


class SessionBase(SQLModel):
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    session_token: str = Field(unique=True, nullable=False, max_length=500)
    expires_at: datetime = Field(nullable=False)
    status: SessionStatus = Field(default=SessionStatus.ACTIVE)
    ip_address: Optional[str] = Field(default=None, max_length=45)  # Support IPv6 addresses
    user_agent: Optional[str] = Field(default=None, max_length=500)


class Session(SessionBase, table=True):
    __tablename__ = "sessions"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    session_token: str = Field(unique=True, nullable=False, max_length=500)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime = Field(nullable=False)
    last_accessed_at: datetime = Field(default_factory=datetime.utcnow)
    status: SessionStatus = Field(default=SessionStatus.ACTIVE)
    ip_address: Optional[str] = Field(default=None, max_length=45)  # Support IPv6 addresses
    user_agent: Optional[str] = Field(default=None, max_length=500)

    # Relationship to user
    user: User = Relationship(back_populates="sessions")

    @property
    def is_expired(self) -> bool:
        """Check if the session has expired."""
        return datetime.utcnow() > self.expires_at

    @property
    def is_active(self) -> bool:
        """Check if the session is active and not expired."""
        return self.status == SessionStatus.ACTIVE and not self.is_expired


class SessionRead(SessionBase):
    id: uuid.UUID
    created_at: datetime
    last_accessed_at: datetime
    is_active: bool
    is_expired: bool


class SessionCreate(SessionBase):
    user_id: uuid.UUID
    session_token: str
    expires_at: datetime
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None


class SessionUpdate(SQLModel):
    status: Optional[SessionStatus] = None
    last_accessed_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None