from sqlmodel import SQLModel, Field, Relationship
from pydantic import EmailStr, field_validator
from typing import Optional, List
from datetime import datetime
import uuid
from enum import Enum


class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"


class UserBase(SQLModel):
    username: Optional[str] = Field(default=None, unique=True, min_length=3, max_length=50)
    email: EmailStr = Field(unique=True, nullable=False)
    role: UserRole = Field(default=UserRole.USER)


class User(UserBase, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: Optional[str] = Field(default=None, unique=True, min_length=3, max_length=50)
    email: str = Field(unique=True, nullable=False)
    password_hash: str = Field(nullable=False)
    role: UserRole = Field(default=UserRole.USER)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to tasks
    tasks: List["Task"] = Relationship(back_populates="owner", cascade_delete=True)
    # Relationship to sessions
    sessions: List["Session"] = Relationship(back_populates="user", cascade_delete=True)


class UserRead(UserBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class UserCreate(UserBase):
    username: str
    email: str
    password: str


class UserUpdate(SQLModel):
    username: Optional[str] = None
    email: Optional[str] = None
    role: Optional[UserRole] = None