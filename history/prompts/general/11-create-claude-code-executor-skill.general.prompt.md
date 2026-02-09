---
id: 11
title: Create claude code executor skill
stage: general
date: 2026-01-08
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Sibtain Ali <hellofozi@gmail.com>
command: claude
labels: ["skills","claude-config","sdd"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/claude-code-executor/SKILL.md
  - history/prompts/general/11-create-claude-code-executor-skill.general.prompt.md
tests:
  - (none)
---

## Prompt

# Claude Code Executor Agent – Skills

## Core Skills
- Claude Code tool usage
- Multi-folder monorepo implementation
- Spec-locked coding discipline

## Context7 Skills
- Cross-check implementation with Context7 docs
- Reject undocumented APIs or patterns
- Maintain Spec → Doc → Code traceability

## Output Discipline
- No manual coding
- No assumptions
- Implements only approved specs

## Response snapshot

- Created `.claude/skills/claude-code-executor/`.
- Created `.claude/skills/claude-code-executor/SKILL.md` with YAML frontmatter (`name`, `description`) and the provided content.

## Outcome

- ✅ Impact: Added a new `claude-code-executor` skill definition under `.claude/skills/`.
- 🧪 Tests: None.
- 📁 Files: Added the new skill file and recorded this prompt as a PHR.
- 🔁 Next prompts: If you want, I can tune the `description:` field to include exact trigger phrases like “implement tasks.md” or “spec-locked coding”.
- 🧠 Reflection: Keep the discipline rules explicit to avoid scope creep.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
