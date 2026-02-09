---
id: 7
title: Create auth bridge skill
stage: general
date: 2026-01-08
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Sibtain Ali <hellofozi@gmail.com>
command: claude
labels: ["skills","claude-config","auth","jwt"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/auth-bridge/SKILL.md
  - history/prompts/general/7-create-auth-bridge-skill.general.prompt.md
tests:
  - (none)
---

## Prompt

# Authentication Bridge Agent – Skills

## Core Skills
- Better Auth configuration
- JWT token contract definition
- Cross-service authentication design

## Context7 Skills
- Retrieve Better Auth JWT plugin documentation
- Validate JWT claims, expiry, and signing algorithms
- Define auth flow strictly from official docs

## Output Discipline
- Defines shared JWT secret strategy
- Produces backend-verifiable token contracts

## Response snapshot

- Created `.claude/skills/auth-bridge/`.
- Created `.claude/skills/auth-bridge/SKILL.md` with YAML frontmatter (`name`, `description`) and the provided content.

## Outcome

- ✅ Impact: Added a new `auth-bridge` skill definition under `.claude/skills/`.
- 🧪 Tests: None.
- 📁 Files: Added the new skill file and recorded this prompt as a PHR.
- 🔁 Next prompts: If you want, I can tune the `description:` field to match exact trigger phrases like “Better Auth JWT plugin” or “FastAPI verify Better Auth token”.
- 🧠 Reflection: Keep the contract constraints in the skill body; keep trigger keywords in frontmatter.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
