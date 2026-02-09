# hackathon-todo Constitution
<!--
Sync Impact Report

- Version change: template → 1.0.0
- Modified principles: N/A (initialization from template)
- Added sections: Security & Authentication Mandates; Workflow & Quality Gates
- Removed sections: N/A
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
  - ⚠ .specify/templates/commands/*.md (directory not present)
- Deferred items:
  - None
-->

## Core Principles

### 1. Spec-Driven Process Order (NON-NEGOTIABLE)
Work MUST follow this order and MUST NOT be skipped:

1. /sp.constitution
2. /sp.specify
3. /sp.refine
4. /sp.plan
5. /sp.tasks
6. /code

Implementation MUST NOT begin before approved specs, plan, and tasks exist.

### 2. Agentic Discipline & Boundary Enforcement
Responsibilities MUST be separated by agent roles.

- Agents MUST NOT cross workspace boundaries (frontend vs backend vs database vs security).
- Decisions MUST follow the relevant agent guidance under `.claude/skills/`.
- Cross-layer leakage is forbidden (e.g., frontend concerns in backend code, or vice versa).

### 3. Context7 Grounding (No Speculation)
All architectural and implementation decisions MUST be grounded in official documentation.

- Use Context7 to retrieve relevant docs before making decisions.
- Undocumented or speculative approaches are forbidden.
- If documentation is unavailable/unclear, record it as a clarification need and stop.

### 4. JWT Authentication & Failure Semantics
The system MUST use JWT-based authentication.

- Better Auth runs on the frontend and issues JWT tokens at login.
- Every API request MUST send the token via: `Authorization: Bearer <token>`.
- Missing or invalid token MUST return `401 Unauthorized`.
- Authenticated but unauthorized access MUST return `403 Forbidden`.

### 5. User Isolation & Ownership Enforcement
Each user MUST only access their own tasks.

- API handlers MUST enforce ownership based on the authenticated user identity.
- Database queries MUST be filtered by authenticated user identity.
- Backend MUST NOT trust any `user_id` from URL/body without JWT validation.

### 6. Monorepo Separation & Minimal Change Policy
Repository structure is authoritative and separation is mandatory.

- `/frontend` contains Next.js application code only.
- `/backend` contains FastAPI application code only.
- `/specs` is reserved for Spec-Kit managed specifications.
- Prefer the smallest viable change; avoid unrelated refactors.

## Security & Authentication Mandates

- Backend MUST verify JWT tokens independently.
- A shared secret (`BETTER_AUTH_SECRET`) is required for verification.
- No secrets may be committed to the repository.

## Workflow & Quality Gates

- Assume human reviewers will inspect specs, plans, tasks, and commits.
- Traceability is required: Spec → Docs → Code.
- Major decisions MUST be justifiable via either specs or documentation.
- Hallucinated APIs or undocumented behavior will be penalized.

## Governance

- This constitution overrides default behavior, convenience shortcuts, and implicit assumptions.
- If any instruction conflicts with this constitution, the constitution wins.

### Amendments

- Amendments MUST be explicit, recorded in version history (semantic versioning), and reviewed.
- Changes that redefine principles or remove guarantees require a MAJOR version bump.
- Adding new principles/sections or materially expanding guidance requires a MINOR bump.
- Clarifications/wording fixes require a PATCH bump.

### Compliance Expectations

- Work products (specs/plans/tasks/code) MUST be reviewed for constitution compliance.
- Violations MUST be fixed or explicitly justified and approved.

**Version**: 1.0.0 | **Ratified**: 2026-01-08 | **Last Amended**: 2026-01-08
