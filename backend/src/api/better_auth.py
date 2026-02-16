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
    response: Response,
    credentials: CredentialsRequest,
    session: Session = Depends(get_session)
):
    """
    Better Auth sign-in endpoint
    """
    try:
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

        # Set token in cookie for Better Auth compatibility
        response.set_cookie(
            key="better-auth.session_token",
            value=access_token,
            max_age=1800,  # 30 minutes in seconds
            httponly=True,
            samesite="lax",
            secure=False  # Set to True in production with HTTPS
        )

        # Calculate expiration time
        from datetime import datetime
        expires_at = datetime.utcnow() + access_token_expires

        # Format response to match Better Auth format
        user_data = {
            "id": str(db_user.id),
            "email": db_user.email,
            "name": db_user.username or db_user.email.split("@")[0],
            "emailVerified": True,
            "createdAt": db_user.created_at.isoformat(),
            "updatedAt": db_user.updated_at.isoformat()
        }

        session_data = {
            "id": str(uuid.uuid4()),
            "expiresAt": expires_at.isoformat(),
            "accessToken": access_token,
            "refreshToken": ""  # Our system doesn't use refresh tokens
        }

        response_data = {
            "user": user_data,
            "session": session_data,
            "redirect": credentials.callbackURL
        }

        return response_data
    except HTTPException:
        raise
    except Exception as e:
        print(f"Sign-in error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error during sign-in"
        )

@router.post("/api/auth/sign-up/email")
def sign_up_email(
    request: Request,
    response: Response,
    signup_data: SignUpRequest,
    session: Session = Depends(get_session)
):
    """
    Better Auth sign-up endpoint
    """
    try:
        # Check if user already exists
        existing_user = session.exec(select(User).where(User.email == signup_data.email)).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Create new user with our custom auth system
        hashed_password = get_password_hash(signup_data.password)
        # Auto-generate username from email if not provided
        username = signup_data.name or signup_data.email.split("@")[0]
        db_user = User(
            email=signup_data.email,
            username=username,
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

        # Set token in cookie for Better Auth compatibility
        response.set_cookie(
            key="better-auth.session_token",
            value=access_token,
            max_age=1800,  # 30 minutes in seconds
            httponly=True,
            samesite="lax",
            secure=False  # Set to True in production with HTTPS
        )

        # Calculate expiration time
        from datetime import datetime
        expires_at = datetime.utcnow() + access_token_expires

        # Format response to match Better Auth format
        user_data = {
            "id": str(db_user.id),
            "email": db_user.email,
            "name": signup_data.name or db_user.email.split("@")[0],
            "emailVerified": True,
            "createdAt": db_user.created_at.isoformat(),
            "updatedAt": db_user.updated_at.isoformat()
        }

        session_data = {
            "id": str(uuid.uuid4()),
            "expiresAt": expires_at.isoformat(),
            "accessToken": access_token,
            "refreshToken": ""  # Our system doesn't use refresh tokens
        }

        response_data = {
            "user": user_data,
            "session": session_data,
            "redirect": getattr(signup_data, 'callbackURL', None)
        }

        return response_data
    except HTTPException:
        raise
    except Exception as e:
        print(f"Sign-up error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error during sign-up"
        )

@router.post("/api/auth/sign-out")
def sign_out(request: Request, response: Response):
    """
    Better Auth sign-out endpoint
    """
    # Clear the session cookie by setting it to expire immediately
    response.delete_cookie(
        key="better-auth.session_token",
        path="/",
        domain=None,
        samesite="lax"
    )

    return {"success": True, "message": "Logged out successfully"}

# Alias endpoints for Better Auth compatibility
@router.post("/api/auth/sign-in")
def sign_in_alias(
    request: Request,
    response: Response,
    credentials: CredentialsRequest,
    session: Session = Depends(get_session)
):
    """
    Alias for /api/auth/sign-in/email - Better Auth default endpoint
    """
    return sign_in_email(request, response, credentials, session)

@router.post("/api/auth/sign-up")
def sign_up_alias(
    request: Request,
    response: Response,
    signup_data: SignUpRequest,
    session: Session = Depends(get_session)
):
    """
    Alias for /api/auth/sign-up/email - Better Auth default endpoint
    """
    return sign_up_email(request, response, signup_data, session)

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

@router.get("/api/auth/use-session")
def use_session_endpoint(
    request: Request,
    currentURL: Optional[str] = None,
    session: Session = Depends(get_session)
):
    """
    Better Auth use-session endpoint - called by useAuth() hook
    Returns current session and user data if authenticated
    """
    try:
        from ..auth.utils import verify_token

        # Check for JWT token in Authorization header
        auth_header = request.headers.get("authorization")

        # Also check cookies for better-auth.session_token
        token = None
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
        else:
            # Check cookies
            cookies = request.cookies
            token = cookies.get("better-auth.session_token")

        if not token:
            return {"session": None, "user": None}

        # Verify JWT token
        token_data = verify_token(token)

        if not token_data or not token_data.user_id:
            return {"session": None, "user": None}

        # Get user from database
        db_user = session.exec(select(User).where(User.id == uuid.UUID(token_data.user_id))).first()

        if not db_user:
            return {"session": None, "user": None}

        # Return user and session data in Better Auth format
        user_data = {
            "id": str(db_user.id),
            "email": db_user.email,
            "name": db_user.username or db_user.email.split("@")[0],
            "emailVerified": True,
            "createdAt": db_user.created_at.isoformat(),
            "updatedAt": db_user.updated_at.isoformat()
        }

        session_data = {
            "id": str(uuid.uuid4()),
            "expiresAt": "",  # Would calculate from JWT exp
            "accessToken": token,
            "refreshToken": ""
        }

        return {
            "user": user_data,
            "session": session_data
        }

    except Exception as e:
        print(f"Error verifying token: {e}")
        return {"session": None, "user": None}