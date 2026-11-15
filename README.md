# PYDP

**Pakistan Youth Diplomacy & Policy Pathways**

A learning and policy-development platform that helps students discover opportunities, build research and writing skills, develop policy briefs, and track feedback and progress.

The platform connects the student journey across seven stages:

**Discover → Learn → Develop → Submit → Review → Revise → Portfolio**

## Overview

PYDP brings opportunity discovery, guided learning, policy drafting, and progress tracking into one responsive workspace. The current release is an interactive frontend with browser-based persistence and clearly identified demonstration content.

### Core features

- **Opportunity discovery** - Browse sample scholarships, internships, dialogues, conferences, and policy research opportunities with category filters and search.
- **Guided learning** - Work through five lessons with explanations, worked examples, exercises, and completion tracking.
- **Policy brief workspace** - Develop a brief through six steps covering the issue, evidence, options, recommendations, outcomes, and review readiness.
- **Submission workflow** - Enter student details, review a draft, complete confirmations, and receive a simulated submission acknowledgement.
- **Mentor and discussion records** - Record guidance requests and capture insights from discussions.
- **Portfolio and feedback** - Review learning progress, submission status, suggested actions, saved exercises, and revision history. Explore four feedback categories without changing the saved submission.

## Technology stack

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16 with App Router |
| UI | React 19 and TypeScript |
| Styling | Tailwind CSS 4 and shared CSS design tokens |
| Icons | Lucide React |
| Custom selects | Radix UI Select |
| Typography | Carter One for headings and branding; system sans-serif for body text |
| State and persistence | React context, `useSyncExternalStore`, and browser `localStorage` |
| Package management | pnpm with a committed lockfile |
| Code quality | ESLint, TypeScript checks, and Node.js tests |

## Getting started

### Prerequisites

- Node.js **20.9 or newer**, as specified in `package.json`.
- pnpm installed and available in your terminal.

### Local development

From the project directory:

```sh
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

The current frontend does not require environment variables, API credentials, or a database connection.

### Production build

```sh
pnpm build
pnpm start
```

`pnpm start` serves an existing production build. Run the build command again after changing application code.

### Available commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server with Turbopack |
| `pnpm build` | Create the production build with Turbopack |
| `pnpm start` | Serve the production build |
| `pnpm dev:webpack` | Start development with Webpack |
| `pnpm build:webpack` | Create a production build with Webpack |
| `pnpm typecheck` | Generate Next.js route types and check TypeScript |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run persistence and state-recovery tests |

### Windows build troubleshooting

If Turbopack reports a CSS-worker startup failure, use the included Webpack commands:

```sh
pnpm dev:webpack
```

For a production build:

```sh
pnpm build:webpack
pnpm start
```

## Application routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Entry pathways, learning progress, and the latest submission |
| `/opportunities` | Opportunity Map | Search, filter, and inspect sample opportunities |
| `/learning` | Learning Hub | Lessons, exercises, and learning progress |
| `/lab` | Policy Lab | Policy brief drafting and readiness checks |
| `/submit` | Submission | Student details, confirmations, and simulated handover |
| `/mentors` | Mentor Connect | Guidance requests and discussion contributions |
| `/portfolio` | My Portfolio | Feedback, next steps, learning records, and revisions |

## Interface and accessibility

The interface uses a navy, teal, and ivory palette, square-corner components, consistent spacing, and clear separation between sections.

- **Theme support:** Light and dark themes follow the system preference on the first visit. Subsequent choices are remembered, and the navbar toggle uses an icon-color hover treatment.
- **Navigation:** Active links use bold text and an underline. Page changes start at the top; hash links retain their anchor targets.
- **Mobile navigation:** A full-screen drawer opens from the right, locks background scrolling, manages keyboard focus, and supports Escape to close.
- **Responsive layouts:** Learning and mentor panels share equal heights when displayed side by side. Portfolio review controls occupy a separate section below the main panels.
- **Accessible controls:** Forms have associated labels, visible focus indicators, keyboard-accessible selects, and status announcements. Review categories include text labels alongside color.
- **Reading and motion:** A skip link, custom scrollbars, readable journey steps, and reduced-motion support are included.

Carter One loads through a Google Fonts CSS import. A serif fallback is available when the font cannot be downloaded.

## Data and persistence

Application data is stored locally in the current browser and origin.

| Storage key | Contents |
| --- | --- |
| `pydp_demo` | Draft answers, lesson exercises, completion records, student details, submission information, revisions, guidance requests, and discussion notes |
| `pydp_theme` | Selected light or dark theme |

Exercise text is saved while typing. **Save answer to My Draft** and **Mark lesson complete** copy an exercise into its corresponding Policy Lab section. Saving the exercise again updates that section. Policy Lab edits and readiness checks save automatically.

The state store supports cross-tab updates and recovery from malformed stored data. If browser storage is unavailable, changes remain in memory for the current session and the interface displays a notification.

Data is not synchronized between devices or different origins. Clearing browser site data removes saved progress. Use sample student details when demonstrating the platform.

## Current scope

The current implementation supports the complete frontend journey with demonstration data:

- Opportunity listings and learning resource collections are illustrative; official application destinations are not connected.
- Submissions create a local reference and display sample Yellow feedback. They are not transmitted to an external review panel.
- Green, Yellow, Blue, and Red feedback previews are illustrative assessments and do not overwrite the saved submission.
- Mentor guidance requests are recorded locally and are not sent to a mentor.
- Authentication, server-side storage, live opportunity feeds, and external review integrations are not implemented.

Internal feedback represents learning guidance, not external acceptance, funding approval, or a guaranteed referral.

## Project structure

```text
src/
├── app/
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Shared application layout and metadata
│   ├── globals.css               # Design tokens, themes, and responsive styles
│   ├── opportunities/page.tsx
│   ├── learning/page.tsx
│   ├── lab/page.tsx
│   ├── submit/page.tsx
│   ├── mentors/page.tsx
│   └── portfolio/page.tsx
├── components/
│   ├── providers.tsx             # Application state and notifications
│   ├── route-scroll-reset.tsx    # Scroll position on route changes
│   ├── site-shell.tsx            # Navigation, mobile drawer, and footer
│   └── ui.tsx                    # Shared form and presentation components
└── lib/
    ├── content.ts                # Lessons, opportunities, fields, and feedback
    └── store.ts                  # Persistence and stored-state normalization
scripts/
└── store.test.cjs                # State and persistence tests
public/                          # Static assets
```

The `@/*` import alias maps to `src/*`. Tailwind configuration is defined in CSS, with its PostCSS integration in `postcss.config.mjs`.

## Development checks

Before submitting a change, run:

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

The persistence tests cover malformed storage, saved-data compatibility, subscriber notifications, storage failures, and cross-tab updates. Use `pnpm build:webpack` if the Turbopack worker issue described above affects your environment.

For interface changes, also verify desktop and mobile layouts, both themes, keyboard navigation, route scroll position, and the affected student workflow.
