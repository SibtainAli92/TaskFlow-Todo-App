# Backend Workspace Rules (hackathon-todo)

## Scope
- Backend-only work under `backend/`.
- Target stack: FastAPI + SQLModel ORM + Neon Serverless PostgreSQL.

## Hard Boundaries
- Do NOT implement application features until specs exist and are approved.
- Do NOT accept `user_id` from clients as authorization.
- Do NOT store secrets in the repo. Use environment variables later.

## Authentication Contract (planning only)
- Backend must verify JWT from `Authorization: Bearer <token>`.
- Shared signing secret will be provided via `BETTER_AUTH_SECRET`.
- All API endpoints require authentication.
- Return correct status codes: 401 (unauthenticated), 403 (forbidden), 404 (not found).

## Defaults
- Stateless API behavior.
- Prefer minimal, spec-locked diffs.
