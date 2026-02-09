from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False


class TaskCreate(TaskBase):
    title: str


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class TaskResponse(TaskBase):
    id: UUID
    owner_id: UUID
    created_at: datetime
    updated_at: datetime


class TaskListResponse(BaseModel):
    tasks: List[TaskResponse]


class UserBase(BaseModel):
    email: str


class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime


class ErrorResponse(BaseModel):
    error: dict


# Import specific items from auth schema
from .auth import Token, TokenData, UserLogin, UserRegister

__all__ = [
    "TaskBase",
    "TaskCreate",
    "TaskUpdate",
    "TaskResponse",
    "TaskListResponse",
    "UserBase",
    "UserResponse",
    "ErrorResponse",
    "Token",
    "TokenData",
    "UserLogin",
    "UserRegister"
]