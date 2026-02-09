---
id: 4
title: Create spec-architect skill
stage: general
date: 2026-01-08
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Sibtain Ali <hellofozi@gmail.com>
command: claude
labels: ["skills","claude-config"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/spec-architect/SKILL.md
  - history/prompts/general/4-create-spec-architect-skill.general.prompt.md
tests:
  - (none)
---

## Prompt

# Spec Architect Agent – Skills

## Core Skills
- Spec-Kit Plus compliant specification writing
- Requirement decomposition into features, APIs, DB, and UI
- Cross-file spec traceability and consistency
- Phase-based spec evolution (Phase II focus)

## Context7 Skills
- Query Context7 MCP server for:
  - FastAPI official documentation
  - SQLModel ORM rules
  - Next.js App Router conventions
- Convert documentation into enforceable specs
- Eliminate undocumented assumptions

## Output Discipline
- Produces review-ready markdown specs only
- Ensures every spec decision is doc-backed

## Response snapshot

- Created `.claude/skills/spec-architect/`.
- Created `.claude/skills/spec-architect/SKILL.md` with YAML frontmatter (`name`, `description`) and the provided content.

## Outcome

- ✅ Impact: Added a new `spec-architect` skill definition under `.claude/skills/`.
- 🧪 Tests: None.
- 📁 Files: Added the new skill file and recorded this prompt as a PHR.
- 🔁 Next prompts: If you want, I can align the wording of the `description:` field to your exact trigger phrases.
- 🧠 Reflection: Keep skill frontmatter concise; put operational detail in the body.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
