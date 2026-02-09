# Frontend Workspace Rules (hackathon-todo)

## Scope
- Frontend-only work under `frontend/`.
- Target stack: Next.js 16+ App Router + Better Auth (JWT enabled).

## Hard Boundaries
- Do NOT implement application features until specs exist and are approved.
- Do NOT add backend code here.
- Do NOT store secrets in the repo. Use environment variables later.

## Authentication Contract (planning only)
- Frontend will obtain JWT via Better Auth.
- All API calls must include the JWT in the `Authorization: Bearer <token>` header.

## Defaults
- Prefer minimal changes.
- Avoid deprecated Next.js patterns; follow documented App Router conventions.
