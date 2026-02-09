---
id: 9
title: Create db schema skill
stage: general
date: 2026-01-08
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Sibtain Ali <hellofozi@gmail.com>
command: claude
labels: ["skills","claude-config","database","postgres","sqlmodel"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/db-schema/SKILL.md
  - history/prompts/general/9-create-db-schema-skill.general.prompt.md
tests:
  - (none)
---

## Prompt

# Database Schema Agent – Skills

## Core Skills
- PostgreSQL relational schema design
- User-task ownership modeling
- Indexing and constraint definition

## ORM Skills
- SQLModel schema mapping
- Relationship and foreign key enforcement

## Context7 Skills
- Retrieve SQLModel relationship documentation
- Validate schema design using PostgreSQL best practices

## Output Discipline
- Schema enforces user isolation at data level

## Response snapshot

- Created `.claude/skills/db-schema/`.
- Created `.claude/skills/db-schema/SKILL.md` with YAML frontmatter (`name`, `description`) and the provided content.

## Outcome

- ✅ Impact: Added a new `db-schema` skill definition under `.claude/skills/`.
- 🧪 Tests: None.
- 📁 Files: Added the new skill file and recorded this prompt as a PHR.
- 🔁 Next prompts: If you want, I can tune the `description:` field to include trigger phrases like “SQLModel relationships” or “Postgres user isolation”.
- 🧠 Reflection: Keep enforcement rules explicit so future backend work remains secure-by-default.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
