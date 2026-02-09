---
id: 6
title: Create backend api skill
stage: general
date: 2026-01-08
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Sibtain Ali <hellofozi@gmail.com>
command: claude
labels: ["skills","claude-config","backend","security"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/backend-api/SKILL.md
  - history/prompts/general/6-create-backend-api-skill.general.prompt.md
tests:
  - (none)
---

## Prompt

# Backend API Agent – Skills

## Core Skills
- FastAPI REST API development
- SQLModel ORM integration
- Neon Serverless PostgreSQL usage
- Proper HTTP error handling (401, 403, 404)

## Security Skills
- JWT verification and decoding
- Authorization header parsing
- User ownership enforcement

## Context7 Skills
- Retrieve from Context7:
  - FastAPI dependency injection patterns
  - Security middleware examples
  - SQLModel session management
- Implement only documented FastAPI patterns

## Output Discipline
- Never trusts user_id without JWT validation
- Stateless, secure backend behavior

## Response snapshot

- Created `.claude/skills/backend-api/`.
- Created `.claude/skills/backend-api/SKILL.md` with YAML frontmatter (`name`, `description`) and the provided content.

## Outcome

- ✅ Impact: Added a new `backend-api` skill definition under `.claude/skills/`.
- 🧪 Tests: None.
- 📁 Files: Added the new skill file and recorded this prompt as a PHR.
- 🔁 Next prompts: If you want, I can align the `description:` field with your exact trigger phrases.
- 🧠 Reflection: Keep triggers concise in frontmatter; keep rules and guardrails in the body.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
