from fastapi import APIRouter, Request, Response, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from ..database import get_session
from ..models import User
from ..auth.utils import get_password_hash, authenticate_user, create_access_token
from datetime import timedelta
from typing import Dict, Any, Optional
import uuid
from pydantic import BaseModel

# Create a simple APIRouter without prefix since we'll define full paths
router = APIRouter()

# In-memory storage for CSRF tokens (in production, use Redis or database)
csrf_tokens: Dict[str, str] = {}

class CredentialsRequest(BaseModel):
    email: str
    password: str
    callbackURL: Optional[str] = None

class SignUpRequest(BaseModel):
    email: str
    password: str
    name: Optional[str] = None

class SignInResponse(BaseModel):
    user: Dict[str, Any]
    session: Dict[str, Any]

class CSRFResponse(BaseModel):
    csrf_token: str

@router.get("/api/auth/csrf")
def get_csrf_token_get(request: Request):
    """
    Better Auth CSRF endpoint
    """
    csrf_token = str(uuid.uuid4())
    # Store in memory (in production, use Redis)
    csrf_tokens[csrf_token] = "valid"

    response = {
        "csrf_token": csrf_token
    }
    return response

@router.post("/api/auth/csrf")
def get_csrf_token_post(request: Request):
    """
    Better Auth CSRF endpoint (POST method)
    """
    csrf_token = str(uuid.uuid4())
    # Store in memory (in production, use Redis)
    csrf_tokens[csrf_token] = "valid"

    response = {
        "csrf_token": csrf_token
    }
    return response

@router.post("/api/auth/sign-in/email")
def sign_in_email(
    request: Request,
    credentials: CredentialsRequest,
    session: Session = Depends(get_session)
):
    """
    Better Auth sign-in endpoint
    """
    # Authenticate user with our custom auth system
    db_user = session.exec(select(User).where(User.email == credentials.email)).first()

    if not db_user or not authenticate_user(credentials.password, db_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Create access token using our custom system
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(db_user.id)}, expires_delta=access_token_expires
    )

    # Format response to match Better Auth format
    user_data = {
        "id": str(db_user.id),
        "email": db_user.email,
        "name": db_user.email.split("@")[0],  # Use email prefix as name
        "emailVerified": True,
        "createdAt": db_user.created_at.isoformat() if hasattr(db_user, 'created_at') else "",
        "updatedAt": db_user.updated_at.isoformat() if hasattr(db_user, 'updated_at') else ""
    }

    session_data = {
        "id": str(uuid.uuid4()),
        "expiresAt": (db_user.created_at + access_token_expires if hasattr(db_user, 'created_at') else
                     __import__('datetime').datetime.now() + access_token_expires).isoformat(),
        "accessToken": access_token,
        "refreshToken": ""  # Our system doesn't use refresh tokens
    }

    response_data = {
        "user": user_data,
        "session": session_data,
        "redirect": credentials.callbackURL
    }

    return response_data

@router.post("/api/auth/sign-up/email")
def sign_up_email(
    request: Request,
    signup_data: SignUpRequest,
    session: Session = Depends(get_session)
):
    """
    Better Auth sign-up endpoint
    """
    # Check if user already exists
    existing_user = session.exec(select(User).where(User.email == signup_data.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user with our custom auth system
    hashed_password = get_password_hash(signup_data.password)
    db_user = User(
        email=signup_data.email,
        password_hash=hashed_password
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(db_user.id)}, expires_delta=access_token_expires
    )

    # Format response to match Better Auth format
    user_data = {
        "id": str(db_user.id),
        "email": db_user.email,
        "name": signup_data.name or db_user.email.split("@")[0],
        "emailVerified": True,
        "createdAt": db_user.created_at.isoformat() if hasattr(db_user, 'created_at') else "",
        "updatedAt": db_user.updated_at.isoformat() if hasattr(db_user, 'updated_at') else ""
    }

    session_data = {
        "id": str(uuid.uuid4()),
        "expiresAt": (db_user.created_at + access_token_expires if hasattr(db_user, 'created_at') else
                     __import__('datetime').datetime.now() + access_token_expires).isoformat(),
        "accessToken": access_token,
        "refreshToken": ""  # Our system doesn't use refresh tokens
    }

    response_data = {
        "user": user_data,
        "session": session_data,
        "redirect": getattr(signup_data, 'callbackURL', None)
    }

    return response_data

@router.post("/api/auth/sign-out")
def sign_out(request: Request):
    """
    Better Auth sign-out endpoint
    """
    # In our system, sign-out is typically handled on the frontend by clearing tokens
    # For now, just return success
    return {"success": True}

# Additional endpoints that Better Auth might expect
@router.get("/api/auth/session")
def get_session_endpoint(request: Request):
    """
    Better Auth session endpoint - for checking if user is logged in
    """
    # This would normally check the Authorization header for JWT
    auth_header = request.headers.get("authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return {"session": None, "user": None}

    # In a real implementation, we'd verify the JWT and return user/session data
    # For now, returning empty to indicate no session
    return {"session": None, "user": None}