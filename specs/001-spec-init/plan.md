# Implementation Plan: hackathon-todo

**Branch**: `001-spec-init` | **Date**: 2026-01-09 | **Spec**: [link to spec.md]
**Input**: Feature specification from `/specs/001-spec-init/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan implements a full-stack todo application with multi-user task management. The system enforces strict user isolation where users can only access their own tasks. It uses JWT-based authentication with Better Auth on the frontend and FastAPI backend with PostgreSQL database. The application follows RESTful API principles with proper authentication and authorization semantics (401/403).

## Planning Assumptions

- Better Auth will be used for frontend authentication and JWT issuance
- FastAPI with SQLModel will be used for the backend API
- PostgreSQL database with Neon serverless will be used for persistence
- JWT tokens will be verified using a shared secret (BETTER_AUTH_SECRET)
- User isolation will be enforced at both API and database layers
- All API endpoints will require valid JWT authentication
- Frontend will be built with Next.js App Router

## High-Level Milestones

M1. Authentication Contract Finalization
M2. Database Schema & Ownership Enforcement
M3. Backend API Foundation (FastAPI)
M4. JWT Verification Middleware
M5. Task CRUD API Implementation
M6. Frontend Auth Integration (Better Auth)
M7. Frontend Task UI & API Client
M8. End-to-End Authenticated Flow Validation
M9. Security & User Isolation Verification

## Dependency Order

1. Authentication Contract → Database Schema
2. Database Schema → Backend API Foundation
3. Backend API Foundation → JWT Verification Middleware
4. JWT Verification Middleware → Task CRUD API Implementation
5. Backend APIs → Frontend Auth Integration
6. Frontend Auth Integration → Frontend Task UI & API Client
7. Frontend Task UI → End-to-End Flow Validation
8. All Implementation → Security Verification

## Detailed Task Groups

### M1. Authentication Contract Finalization
- Define JWT token structure and claims (refs: authentication.md)
- Specify shared secret strategy between Better Auth and FastAPI (refs: authentication.md)
- Document JWT verification flow and failure semantics (refs: authentication.md)
- Plan Better Auth configuration for JWT issuance (refs: authentication.md)

### M2. Database Schema & Ownership Enforcement
- Design SQLModel User and Task models (refs: schema.md)
- Implement foreign key relationships with ownership constraints (refs: schema.md)
- Define indexing strategy for performance (refs: schema.md)
- Plan cascade deletion for user-task relationship (refs: schema.md)

### M3. Backend API Foundation (FastAPI)
- Set up FastAPI application structure (refs: rest-endpoints.md)
- Configure database connection with Neon PostgreSQL (refs: schema.md)
- Plan SQLModel integration for ORM operations (refs: schema.md)
- Design API response structure and error handling (refs: rest-endpoints.md)

### M4. JWT Verification Middleware
- Implement JWT verification middleware for FastAPI (refs: authentication.md)
- Create shared secret configuration for JWT validation (refs: authentication.md)
- Design 401/403 response handling for authentication failures (refs: authentication.md)
- Plan authenticated user context extraction (refs: authentication.md)

### M5. Task CRUD API Implementation
- Implement POST /api/tasks endpoint (refs: rest-endpoints.md, task-crud.md)
- Implement GET /api/tasks endpoint (refs: rest-endpoints.md, task-crud.md)
- Implement GET /api/tasks/{task_id} endpoint (refs: rest-endpoints.md, task-crud.md)
- Implement PATCH /api/tasks/{task_id} endpoint (refs: rest-endpoints.md, task-crud.md)
- Implement DELETE /api/tasks/{task_id} endpoint (refs: rest-endpoints.md, task-crud.md)
- Implement POST /api/tasks/{task_id}/toggle endpoint (refs: rest-endpoints.md, task-crud.md)
- Ensure all endpoints enforce user ownership (refs: task-crud.md, schema.md)

### M6. Frontend Auth Integration (Better Auth)
- Integrate Better Auth into Next.js frontend (refs: authentication.md)
- Implement protected routes for authenticated users (refs: authentication.md)
- Plan JWT token attachment to API requests (refs: authentication.md)
- Design logout flow and session management (refs: authentication.md)

### M7. Frontend Task UI & API Client
- Create task list component (refs: task-crud.md, ui/components.md)
- Implement task creation form (refs: task-crud.md, ui/components.md)
- Design task detail/edit view (refs: task-crud.md, ui/components.md)
- Build API client abstraction with JWT attachment (refs: rest-endpoints.md)
- Implement task completion toggle UI (refs: task-crud.md)

### M8. End-to-End Authenticated Flow Validation
- Test complete user journey: signup → create task → list tasks → update → delete
- Validate JWT token flow from Better Auth to FastAPI verification
- Verify proper error handling for authentication failures
- Confirm user isolation enforcement end-to-end

### M9. Security & User Isolation Verification
- Test cross-user access prevention (refs: task-crud.md, schema.md)
- Validate authentication failure scenarios (refs: authentication.md)
- Verify proper HTTP status codes for all error conditions (refs: rest-endpoints.md)
- Confirm database-level user isolation constraints (refs: schema.md)

## Risk & Mitigation Notes

### Risk 1: JWT Misuse or Over-trust of user_id
- **Why it exists**: Backend might trust user_id from URL/body without JWT validation
- **Mitigation**: Plan strict middleware that always extracts user identity from JWT, never from request parameters

### Risk 2: Frontend/Backend Auth Mismatch
- **Why it exists**: Different JWT signing/verification strategies between Better Auth and FastAPI
- **Mitigation**: Define clear JWT contract and shared secret strategy upfront in M1

### Risk 3: Cross-User Data Leakage
- **Why it exists**: Database queries might not be properly scoped to authenticated user
- **Mitigation**: Plan database queries to always filter by authenticated user ID from JWT

### Risk 4: Spec Ambiguity
- **Why it exists**: Some requirements may not be fully specified in the current specs
- **Mitigation**: Plan clarification tasks where requirements are unclear

## Readiness Criteria for Implementation

- [x] All nine milestones are defined with clear task groups
- [x] Dependencies between milestones are properly ordered
- [x] Authentication contract is finalized before API work begins
- [x] Database schema is designed before CRUD endpoints
- [x] JWT verification is implemented before task operations
- [x] Frontend work begins only after backend API is ready
- [x] All security and user isolation requirements are addressed
- [x] Error handling and HTTP status codes are properly planned
- [x] The plan can be executed step-by-step by Claude Code

## Technical Context

**Language/Version**: Python 3.11, TypeScript/JavaScript, Next.js 14+
**Primary Dependencies**: FastAPI, SQLModel, Better Auth, Next.js App Router, PostgreSQL
**Storage**: PostgreSQL with Neon serverless
**Testing**: pytest for backend, Jest/React Testing Library for frontend
**Target Platform**: Web application (frontend) and Linux server (backend)
**Project Type**: Web application (frontend/ backend separation)
**Performance Goals**: <200ms p95 response time for API requests
**Constraints**: User isolation enforcement, JWT authentication on all endpoints, <100MB memory usage
**Scale/Scope**: 10k users, 1M tasks, 50 screens

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Process order enforced (`/sp.constitution` → `/sp.specify` → `/sp.refine` → `/sp.plan` → `/sp.tasks` → `/code`)
- [x] Context7 grounding: all key architectural decisions cite official docs
- [x] Auth mandates captured: JWT via `Authorization: Bearer <token>`; 401/403 semantics
- [x] User isolation: endpoints and queries scoped to authenticated user; never trust client `user_id`
- [x] Monorepo boundaries respected (frontend/ backend separation)

## Project Structure

### Documentation (this feature)

```text
specs/001-spec-init/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
```

**Structure Decision**: Web application structure with clear separation between frontend and backend components, respecting monorepo boundaries as mandated by constitution.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [N/A] | [No violations identified] | [All constitution checks passed] |
