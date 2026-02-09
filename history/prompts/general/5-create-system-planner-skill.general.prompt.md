---
id: 5
title: Create system planner skill
stage: general
date: 2026-01-08
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Sibtain Ali <hellofozi@gmail.com>
command: claude
labels: ["skills","claude-config","planning"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/system-planner/SKILL.md
  - history/prompts/general/5-create-system-planner-skill.general.prompt.md
tests:
  - (none)
---

## Prompt

# System Planner Agent – Skills

## Core Skills
- Agentic Dev Stack planning
- Spec-to-task decomposition
- Dependency-aware execution ordering
- Risk-aware milestone definition

## Context7 Skills
- Validate planning decisions using:
  - FastAPI lifecycle docs
  - Authentication flow best practices
- Confirm execution order through official documentation

## Output Discipline
- Produces structured plans compatible with Claude Code
- Prevents implementation before specs

## Response snapshot

- Created `.claude/skills/system-planner/`.
- Created `.claude/skills/system-planner/SKILL.md` with YAML frontmatter (`name`, `description`) and the provided content.

## Outcome

- ✅ Impact: Added a new `system-planner` skill definition under `.claude/skills/`.
- 🧪 Tests: None.
- 📁 Files: Added the new skill file and recorded this prompt as a PHR.
- 🔁 Next prompts: If you want, I can tune the `description:` field to match the exact phrases you expect to trigger this skill.
- 🧠 Reflection: Keep the skill body focused on workflow; keep triggers in frontmatter.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
