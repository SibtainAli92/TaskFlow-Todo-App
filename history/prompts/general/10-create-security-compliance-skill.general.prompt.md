---
id: 10
title: Create security compliance skill
stage: general
date: 2026-01-08
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Sibtain Ali <hellofozi@gmail.com>
command: claude
labels: ["skills","claude-config","security","compliance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/security-compliance/SKILL.md
  - history/prompts/general/10-create-security-compliance-skill.general.prompt.md
tests:
  - (none)
---

## Prompt

# Security & Compliance Agent – Skills

## Core Skills
- API security auditing
- Authentication and authorization validation
- Threat modeling (JWT misuse, data leaks)

## Context7 Skills
- Retrieve:
  - FastAPI security guidelines
  - JWT vulnerability mitigation docs
- Validate token expiry and HTTP status correctness

## Output Discipline
- Ensures 401/403 enforcement
- Confirms zero cross-user data exposure

## Response snapshot

- Created `.claude/skills/security-compliance/`.
- Created `.claude/skills/security-compliance/SKILL.md` with YAML frontmatter (`name`, `description`) and the provided content.

## Outcome

- ✅ Impact: Added a new `security-compliance` skill definition under `.claude/skills/`.
- 🧪 Tests: None.
- 📁 Files: Added the new skill file and recorded this prompt as a PHR.
- 🔁 Next prompts: If you want, I can tune the `description:` field to include trigger phrases like “audit JWT auth” or “check 401 vs 403”.
- 🧠 Reflection: Make review output actionable with file/line references and minimal patches.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
