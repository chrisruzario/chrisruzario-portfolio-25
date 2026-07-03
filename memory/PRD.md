# PRD — Chris Ruzario Portfolio

## Original Problem Statement
Professional black-and-white portfolio for a Business Analytics student (Computer Engineering background). Minimal, modern, editorial, monochrome, strong typography, responsive. Sections: Hero, About, Skills, Projects (3), Experience timeline, Contact (email/LinkedIn/GitHub), Footer. Working contact form.

## User Choices
- Display name: Chris Ruzario
- Email: chris25cr7@gmail.com | LinkedIn: linkedin.com/in/chrisruzario | GitHub: github.com/chrisruzario
- Font: Helvetica-style (Helvetica Neue + JetBrains Mono for accents)
- Contact form: saves messages to DB; email delivery (Resend) NOT enabled yet
- Stack: React + FastAPI + MongoDB

## Architecture
- Frontend: React, Tailwind, section components in `src/components/portfolio/`, all editable content in `src/data.js`.
- Backend: FastAPI `/api/contact` (POST save + optional Resend email, GET list). Mongo `contact_messages`.

## Implemented (2026-07-03)
- Hero, About, Skills (10 cards), Projects (3 cards w/ tools + GitHub/Demo), Experience timeline, Contact form + links, Footer.
- Smooth scroll, scroll-reveal animation, responsive mobile menu, black-and-white Swiss design.
- Contact form persists to MongoDB. Tested 100% backend + frontend (iteration_1).

## Backlog
- P1: Enable real email delivery (add Resend API key to backend/.env RESEND_API_KEY).
- P2: Add real project GitHub/live-demo links (currently "#").
- P2: Resume/CV download button; project detail pages; SEO/OpenGraph meta.
- P2: Admin view for submitted contact messages.

## Next Tasks
- Await user's real project links + Resend key.
