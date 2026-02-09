from typing import Any, Optional
import html
import re
import bleach


def sanitize_input(input_str: Optional[str]) -> Optional[str]:
    """
    Sanitize user input by escaping HTML and removing potentially dangerous content.
    """
    if input_str is None:
        return None

    # First escape HTML entities
    escaped = html.escape(input_str)

    # Use bleach to strip potentially dangerous tags and attributes
    # Only allow safe HTML tags if any are needed (currently none for our use case)
    sanitized = bleach.clean(escaped, tags=[], attributes={}, strip=True)

    return sanitized


def validate_email_format(email: str) -> bool:
    """
    Validate email format using regex.
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_password_strength(password: str) -> tuple[bool, str]:
    """
    Validate password strength and return (is_valid, error_message).
    """
    if len(password) < 8:
        return False, 'Password must be at least 8 characters long'

    if not re.search(r'[A-Z]', password):
        return False, 'Password must contain at least one uppercase letter'

    if not re.search(r'[a-z]', password):
        return False, 'Password must contain at least one lowercase letter'

    if not re.search(r'\d', password):
        return False, 'Password must contain at least one digit'

    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, 'Password must contain at least one special character'

    return True, ''


def validate_title(title: str) -> tuple[bool, str]:
    """
    Validate task title.
    """
    if not title or title.strip() == "":
        return False, 'Title cannot be empty'

    if len(title) > 255:
        return False, 'Title cannot exceed 255 characters'

    return True, ''


def validate_description(description: Optional[str]) -> tuple[bool, str]:
    """
    Validate task description.
    """
    if description is None:
        return True, ''

    if len(description) > 1000:
        return False, 'Description cannot exceed 1000 characters'

    return True, ''