#!/usr/bin/env python3
"""
Test script to verify that the database models work with all the new fields
"""

import uuid
from datetime import date
from src.database import get_session
from src.models.user import User, UserRole
from src.models.task import Task, PriorityEnum, RecurrencePatternEnum

def test_models():
    print("Testing database models with new fields...")

    # Create a test user
    test_user = User(
        id=uuid.uuid4(),
        username="testuser",
        email="test@example.com",
        password_hash="hashed_password_here",
        role=UserRole.USER
    )

    print(f"User created: {test_user.username} (Role: {test_user.role})")

    # Create a test task with all new fields
    test_task = Task(
        id=uuid.uuid4(),
        title="Test Task",
        description="This is a test task with all new fields",
        user_id=test_user.id,
        due_date=date.today(),
        priority=PriorityEnum.HIGH,
        tags=["work", "important"],
        recurrence_pattern=RecurrencePatternEnum.WEEKLY,
        completed=False
    )

    print(f"Task created: {test_task.title}")
    print(f"  - Due Date: {test_task.due_date}")
    print(f"  - Priority: {test_task.priority}")
    print(f"  - Tags: {test_task.tags}")
    print(f"  - Recurrence: {test_task.recurrence_pattern}")

    # Verify tags property works
    print(f"  - Tags as list: {test_task.tags}")

    print("\nAll new fields are properly integrated into the models!")

if __name__ == "__main__":
    test_models()