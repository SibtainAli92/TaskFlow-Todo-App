from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from ..database import get_session
from ..models import Task, User, TaskCreate, TaskUpdate
from ..auth.middleware import get_current_user, get_current_user_id
from datetime import datetime
import uuid
from ..utils.validation import validate_title, validate_description


router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@router.get("/", response_model=List[Task])
def get_tasks(
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for the authenticated user
    """
    # Query tasks belonging to the current user
    statement = select(Task).where(Task.owner_id == current_user_id)
    tasks = session.exec(statement).all()
    return tasks


@router.post("/", response_model=Task)
def create_task(
    task_data: TaskCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user
    """
    # Validate title and description
    is_valid, error_msg = validate_title(task_data.title)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_msg
        )

    if task_data.description:
        is_valid, error_msg = validate_description(task_data.description)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg
            )

    # Create task with the current user as owner
    db_task = Task(
        title=task_data.title,
        description=task_data.description,
        completed=False,  # New tasks are not completed by default
        owner_id=current_user.id
    )
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.get("/{task_id}", response_model=Task)
def get_task(
    task_id: uuid.UUID,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID, must be owned by authenticated user
    """
    statement = select(Task).where(Task.id == task_id, Task.owner_id == current_user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.put("/{task_id}", response_model=Task)
def update_task(
    task_id: uuid.UUID,
    task_data: TaskUpdate,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Update a task by ID, must be owned by authenticated user
    """
    statement = select(Task).where(Task.id == task_id, Task.owner_id == current_user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Validate and update task fields if provided
    if task_data.title is not None:
        is_valid, error_msg = validate_title(task_data.title)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg
            )
        task.title = task_data.title

    if task_data.description is not None:
        is_valid, error_msg = validate_description(task_data.description)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg
            )
        task.description = task_data.description

    if task_data.completed is not None:
        task.completed = task_data.completed

    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.patch("/{task_id}/toggle", response_model=Task)
def toggle_task_completion(
    task_id: uuid.UUID,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a task, must be owned by authenticated user
    """
    statement = select(Task).where(Task.id == task_id, Task.owner_id == current_user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Toggle the completion status
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.delete("/{task_id}")
def delete_task(
    task_id: uuid.UUID,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Delete a task by ID, must be owned by authenticated user
    """
    statement = select(Task).where(Task.id == task_id, Task.owner_id == current_user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    session.delete(task)
    session.commit()
    return {"message": "Task deleted successfully"}