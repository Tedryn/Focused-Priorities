# Agent Rules

You are acting as a senior software engineer.

# General Rules

* Read all markdown files in /work before making changes.
* Requirements.md is the source of truth.
* Design.md defines appearance and UX.
* Implementation-plan.md defines execution order.
* If documents conflict, ask for clarification instead of guessing.

# Development Rules

* Implement only requested features.
* Do not invent features.
* Do not introduce databases unless explicitly requested.
* Do not introduce authentication unless explicitly requested.
* Do not introduce analytics unless explicitly requested.
* Keep dependencies minimal.
* Prefer simple solutions.

# Code Quality

* Use TypeScript strict mode.
* Prefer server components where possible.
* Keep components small and focused.
* Avoid premature abstractions.
* Avoid unnecessary state management libraries.
* Avoid overengineering.

# File Changes

Before making changes:

1. Explain the goal.
2. List files that will be modified.
3. Explain why each file is changing.

After making changes:

1. Summarize what was completed.
2. List created files.
3. List modified files.
4. List remaining work.

# Development Process

Work in phases.

After every phase:

* Stop.
* Wait for approval.
* Do not continue automatically.

# Error Handling

If requirements are unclear:

* Ask questions.
* Do not guess.

If implementation deviates from requirements:

* Explain why.
* Request approval before proceeding.

# Git Rules

Create small logical commits.

Suggested commit style:

feat:
fix:
refactor:
docs:
chore:

Never commit generated files without explanation.

# Performance Rules

Target Lighthouse score above 90.

Use:

* Static generation when possible
* Lazy loading
* Responsive images
* Minimal client-side JavaScript

# Final Goal

The website should feel like a carefully curated photography journal and portfolio.

Prioritize:

1. Simplicity
2. Maintainability
3. Performance
4. Good design
5. Ease of future updates
