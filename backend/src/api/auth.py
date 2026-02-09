from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlmodel import Session, select
from ..database import get_session
from ..models import User
from ..auth.utils import get_password_hash, authenticate_user
from ..auth.schemas import UserRegister, UserLogin, UserResponse, Token
from ..auth.utils import create_access_token
from datetime import timedelta
from slowapi import Limiter
from slowapi.util import get_remote_address
from ..utils.validation import validate_password_strength

# Initialize rate limiter for this router
limiter = Limiter(key_func=get_remote_address)

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse)
@limiter.limit("5/minute")  # Limit registration attempts
def register_user(request: Request, user_data: UserRegister, session: Session = Depends(get_session)):
    """
    Register a new user
    """
    # Validate password strength
    is_valid, error_msg = validate_password_strength(user_data.password)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_msg
        )

    # Check if user already exists
    existing_user = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        email=user_data.email,
        password_hash=hashed_password
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@router.post("/login", response_model=Token)
@limiter.limit("10/minute")  # Limit login attempts
def login_user(request: Request, user_data: UserLogin, session: Session = Depends(get_session)):
    """
    Authenticate user and return access token
    """
    # Find user by email
    statement = select(User).where(User.email == user_data.email)
    db_user = session.exec(statement).first()

    if not db_user or not authenticate_user(user_data.password, db_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token_expires = timedelta(minutes=30)  # Shorter for login
    access_token = create_access_token(
        data={"sub": str(db_user.id)}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}