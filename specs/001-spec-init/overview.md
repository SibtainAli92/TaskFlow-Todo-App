# Project Overview: hackathon-todo

## Purpose
Define the scope and boundaries for a full-stack todo application supporting multi-user task management with secure, user-isolated data access.

## Scope
- Multi-user task management (create, read, update, delete, list)
- User authentication with JWT-based sessions
- User-isolated task data (no cross-user access)
- Web-based frontend with protected routes
- RESTful API backend
- Relational data persistence

## Constraints
- User isolation MUST be enforced at both API and data layers
- All API endpoints MUST require valid JWT authentication
- Token absence or invalidity MUST result in 401 Unauthorized
- Authenticated but unauthorized access MUST result in 403 Forbidden
- JWT tokens MUST be sent via `Authorization: Bearer <token>` header
- No global or shared task access between users
- Backend MUST NOT trust `user_id` from URL/body without JWT validation

## Out-of-Scope
- Phase I console application (already completed separately)
- Phase III chatbot features (reserved for future expansion)
- Social features (sharing, collaboration, comments)
- Real-time updates or notifications
- File attachments or media support
- Advanced task features (due dates, recurrence, tags)

## Quality Expectations
- All specifications MUST be unambiguous and internally consistent
- User isolation MUST be enforceable via database constraints and API handlers
- Frontend MUST attach JWT to every API request
- Backend MUST verify JWT on every request
- No undocumented assumptions or behaviors
