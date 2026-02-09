import uuid
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.exc import NoResultFound
from typing import Optional
from .utils import verify_token
from .schemas import TokenData
from ..database import get_session
from ..models import User
from sqlmodel import Session, select


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
) -> User:
    """Get the current authenticated user from the JWT token"""
    token = credentials.credentials
    token_data = verify_token(token)

    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        # Convert the user_id string to UUID for comparison
        user_id_uuid = uuid.UUID(token_data.user_id)
        statement = select(User).where(User.id == user_id_uuid)
        user = session.exec(statement).one()
        return user
    except ValueError:
        # Invalid UUID format
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID format",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except NoResultFound:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> uuid.UUID:
    """Get the current user ID from the JWT token without database lookup"""
    token = credentials.credentials
    token_data = verify_token(token)

    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Convert the user_id string to UUID for database queries
    try:
        return uuid.UUID(token_data.user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID format",
            headers={"WWW-Authenticate": "Bearer"},
        )