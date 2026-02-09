---
id: 8
title: Create frontend app skill
stage: general
date: 2026-01-08
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Sibtain Ali <hellofozi@gmail.com>
command: claude
labels: ["skills","claude-config","frontend","nextjs","auth"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/frontend-app/SKILL.md
  - history/prompts/general/8-create-frontend-app-skill.general.prompt.md
tests:
  - (none)
---

## Prompt

# Frontend App Agent – Skills

## Core Skills
- Next.js 16+ App Router architecture
- Auth-aware UI rendering
- API client abstraction
- Responsive frontend design

## Authentication Skills
- Better Auth session handling
- JWT attachment to API requests
- Protected route handling

## Context7 Skills
- Retrieve:
  - App Router data fetching patterns
  - Auth handling in Server vs Client Components
- Avoid deprecated Next.js patterns

## Output Discipline
- Frontend never bypasses auth layer
- JWT is attached to every API call

## Response snapshot

- Created `.claude/skills/frontend-app/`.
- Created `.claude/skills/frontend-app/SKILL.md` with YAML frontmatter (`name`, `description`) and the provided content.

## Outcome

- ✅ Impact: Added a new `frontend-app` skill definition under `.claude/skills/`.
- 🧪 Tests: None.
- 📁 Files: Added the new skill file and recorded this prompt as a PHR.
- 🔁 Next prompts: If you want, I can tune the `description:` field to include exact trigger phrases like “Next.js App Router auth-aware API client”.
- 🧠 Reflection: Keep triggers in frontmatter; keep details in the body.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
