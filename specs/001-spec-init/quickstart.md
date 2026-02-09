# Quickstart Guide: hackathon-todo

## Overview
This guide provides a quick start for developers to set up, run, and understand the hackathon-todo application. The application consists of a Next.js frontend with Better Auth and a FastAPI backend with PostgreSQL.

## Prerequisites

### System Requirements
- Node.js 18+ (for frontend development)
- Python 3.11+ (for backend development)
- PostgreSQL 12+ (or Neon account for serverless)
- Git

### Environment Setup
```bash
# Clone the repository
git clone <repository-url>
cd hackathon-todo

# Navigate to project root
cd hackathon-todo
```

## Backend Setup (FastAPI + PostgreSQL)

### 1. Python Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install backend dependencies
cd backend
pip install -r requirements.txt
```

### 2. Database Configuration
```bash
# Set up PostgreSQL database
# Option 1: Local PostgreSQL
createdb hackathon_todo_dev

# Option 2: Neon Serverless (recommended)
# Create a Neon project and get connection string
```

### 3. Environment Variables
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/hackathon_todo_dev
BETTER_AUTH_SECRET=your-super-secret-jwt-key-here
JWT_ALGORITHM=RS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### 4. Initialize Database
```bash
# Run database migrations
python -m alembic upgrade head

# Or create initial tables if using raw SQLModel
python -c "from src.database import engine, create_db_and_tables; create_db_and_tables()"
```

### 5. Run Backend Server
```bash
# Start the backend server
uvicorn src.main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`

## Frontend Setup (Next.js + Better Auth)

### 1. Install Dependencies
```bash
# From project root
cd frontend

# Install dependencies
npm install
```

### 2. Frontend Environment Variables
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
```

### 3. Run Frontend Server
```bash
# Start the development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## Architecture Overview

### Backend Architecture
```
backend/
├── src/
│   ├── models/          # SQLModel definitions (User, Task)
│   ├── schemas/         # Pydantic schemas for request/response validation
│   ├── services/        # Business logic
│   ├── auth/            # JWT verification and authentication
│   ├── api/             # API route definitions
│   └── database.py      # Database connection and session management
├── tests/               # Pytest tests
└── requirements.txt     # Python dependencies
```

### Frontend Architecture
```
frontend/
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── api/         # Client-side API routes
│   │   ├── auth/        # Authentication pages (login, register)
│   │   ├── dashboard/   # Protected dashboard with tasks
│   │   └── globals.css  # Global styles
│   ├── components/      # Reusable React components
│   ├── lib/             # Utilities and service functions
│   │   ├── auth/        # Better Auth integration
│   │   └── api/         # API client with JWT handling
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── package.json         # Node.js dependencies
```

## Key Features Walkthrough

### 1. Authentication Flow
1. User visits `/login` or `/register` page
2. Better Auth handles credentials and creates JWT session
3. JWT token is stored securely in browser
4. All API requests include `Authorization: Bearer <token>` header
5. Backend verifies JWT and extracts user identity

### 2. Task Management API
- **Create Task**: `POST /api/tasks` with title and description
- **List Tasks**: `GET /api/tasks` returns user's tasks only
- **Get Task**: `GET /api/tasks/{task_id}` with ownership validation
- **Update Task**: `PATCH /api/tasks/{task_id}` with ownership validation
- **Delete Task**: `DELETE /api/tasks/{task_id}` with ownership validation
- **Toggle Completion**: `POST /api/tasks/{task_id}/toggle`

### 3. User Isolation
- Every API request validates JWT and extracts user ID
- Database queries are automatically filtered by `owner_id`
- Cross-user access attempts return 403 Forbidden

## API Endpoints

### Authentication (handled by Better Auth)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Task Management
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create new task for authenticated user
- `GET /api/tasks/{id}` - Get specific task (must be owner)
- `PUT/PATCH /api/tasks/{id}` - Update task (must be owner)
- `DELETE /api/tasks/{id}` - Delete task (must be owner)
- `POST /api/tasks/{id}/toggle` - Toggle completion status

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
BETTER_AUTH_SECRET=super-secret-jwt-key
JWT_ALGORITHM=RS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
```

## Running Tests

### Backend Tests
```bash
# From backend directory
pytest tests/ -v
```

### Frontend Tests
```bash
# From frontend directory
npm test
```

## Development Commands

### Backend
```bash
# Run with auto-reload
uvicorn src.main:app --reload

# Run tests
pytest

# Format code
black src/

# Check types
mypy src/
```

### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Ensure database exists and is accessible

#### 2. Authentication Issues
- Verify BETTER_AUTH_SECRET matches between frontend and backend
- Check that JWT verification algorithm is consistent
- Ensure proper CORS configuration

#### 3. Frontend-Backend Communication
- Verify NEXT_PUBLIC_API_BASE_URL points to running backend
- Check that backend allows requests from frontend origin
- Confirm JWT token is properly attached to requests

### Debugging Tips
- Enable detailed logging in backend settings
- Use browser developer tools to inspect network requests
- Check backend logs for authentication/authorization errors

## Next Steps

1. **Local Development**: Modify components and APIs as needed
2. **Testing**: Add unit and integration tests for new features
3. **Deployment**: Prepare for deployment to production environment
4. **Monitoring**: Set up logging and error tracking for production