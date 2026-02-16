from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import JSON
from pydantic import field_validator
from typing import Optional, List
from datetime import datetime, date
import uuid
from enum import Enum
from .user import User
import html
from sqlalchemy.sql import func


class PriorityEnum(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class RecurrencePatternEnum(str, Enum):
    NONE = "none"
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    YEARLY = "yearly"


class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    due_date: Optional[date] = Field(default=None)
    priority: PriorityEnum = Field(default=PriorityEnum.MEDIUM)
    tags_str: Optional[str] = Field(default=None, max_length=500)  # Store tags as comma-separated string
    recurrence_pattern: Optional[RecurrencePatternEnum] = Field(default=RecurrencePatternEnum.NONE)
    completed: bool = Field(default=False)

    @field_validator('title')
    @classmethod
    def validate_title(cls, v):
        if not v or v.strip() == "":
            raise ValueError('Title cannot be empty')
        # Sanitize HTML tags from title
        sanitized = html.escape(v)
        return sanitized

    @field_validator('description')
    @classmethod
    def validate_description(cls, v):
        if v is not None:
            # Sanitize HTML tags from description
            sanitized = html.escape(v)
            return sanitized
        return v


class Task(TaskBase, table=True):
    __tablename__ = "tasks"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    due_date: Optional[date] = Field(default=None)
    priority: PriorityEnum = Field(default=PriorityEnum.MEDIUM)
    tags_str: Optional[str] = Field(default=None, max_length=500)  # Store tags as comma-separated string
    recurrence_pattern: Optional[RecurrencePatternEnum] = Field(default=RecurrencePatternEnum.NONE)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to owner
    owner: User = Relationship(back_populates="tasks")

    @property
    def tags(self) -> List[str]:
        """Get tags as a list of strings."""
        if self.tags_str:
            return [tag.strip() for tag in self.tags_str.split(",")]
        return []

    @tags.setter
    def tags(self, value: List[str]) -> None:
        """Set tags from a list of strings."""
        if value:
            self.tags_str = ",".join(value)
        else:
            self.tags_str = None


class TaskRead(TaskBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    @property
    def tags(self) -> List[str]:
        """Get tags as a list of strings."""
        if self.tags_str:
            return [tag.strip() for tag in self.tags_str.split(",")]
        return []


class TaskCreate(TaskBase):
    title: str
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: Optional[PriorityEnum] = None
    tags: Optional[List[str]] = []  # Accept tags as a list and convert to string internally
    recurrence_pattern: Optional[RecurrencePatternEnum] = None


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: Optional[PriorityEnum] = None
    tags: Optional[List[str]] = None  # Accept tags as a list and convert to string internally
    recurrence_pattern: Optional[RecurrencePatternEnum] = None
    completed: Optional[bool] = None