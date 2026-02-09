from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from fastapi import FastAPI

# Initialize the limiter
limiter = Limiter(key_func=get_remote_address)

def setup_rate_limiter(app: FastAPI):
    """Setup rate limiting for the application"""
    app.state.limiter = limiter
    app.add_exception_handler(429, _rate_limit_exceeded_handler)