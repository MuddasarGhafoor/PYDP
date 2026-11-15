# PYDP

## Development with pnpm

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Use a supported Node.js LTS release (minimum 20.9).
The project uses pnpm and includes `pnpm-lock.yaml`.

```sh
pnpm typecheck
pnpm test
pnpm lint
pnpm build
pnpm start
```

If Turbopack fails to start its CSS worker in your Windows environment, use
`pnpm dev:webpack` or `pnpm build:webpack`. Both use Next.js's supported Webpack
builder. A production build is required before `pnpm start`.

## Pages and interactions

- `/`: home, entry pathways, learning progress and latest submission.
- `/opportunities`: all six sample opportunities, category filters, search and details.
- `/learning`: five lessons, worked examples, exercises and completion tracking.
- `/lab`: six-step policy brief workspace with automatic saving and readiness checks.
- `/submit`: student details, custom contribution selector, confirmations and simulated submission.
- `/mentors`: custom guidance selector, locally recorded requests and discussion notes.
- `/portfolio`: submission tracker, four feedback previews, next actions, revisions and saved exercises.

## Design and accessibility

Carter One is loaded using the requested Google Fonts CSS import for headings
and branding. Body copy and forms use a system sans-serif. Font loading requires
an internet connection; a serif fallback is provided.

The interface uses square corners, a navy/teal/ivory palette, Lucide icons,
custom scrollbars, a keyboard-accessible Radix Select, and a mobile hamburger
menu. Active navigation uses bold text and an underline. Light/dark mode follows
the system on the first visit and remembers subsequent toggle choices.

Form labels, focus indicators, a skip link, status announcements, text labels
for review colors and reduced-motion support are included.

## Local prototype data

The original `pydp_demo` localStorage key is retained for compatibility. Data
belongs to the current browser and origin. There is no account system or server
storage. Theme preference uses `pydp_theme`.

Exercise text is saved while typing. "Save answer to My Draft" and "Mark lesson
complete" copy the answer into the corresponding policy brief section. Saving
again updates that section. Draft edits and readiness checks save automatically.

Submission is simulated and creates a reference with the original illustrative
Yellow feedback. Previewing Green, Yellow, Blue or Red feedback does not alter
the saved submission. Revision notes are retained in the portfolio. Mentor
requests are recorded locally and are not sent to anyone.

All opportunity listings, resources and review outcomes retain their sample
status. Official application destinations and backend integrations are not yet
connected.

## Source layout

- `src/app/`: route pages, global styles and root layout.
- `src/components/`: shared UI, header/footer and state provider.
- `src/lib/content.ts`: lessons, opportunities, form fields and sample feedback.
- `src/lib/store.ts`: browser persistence and legacy state normalization.
- `scripts/store.test.cjs`: persistence, migration and storage-failure checks.

## Verification

TypeScript checks, all five persistence tests and the Webpack production build
passed. Browser checks covered light/dark themes, mobile navigation, keyboard
selection, filtering, exercise-to-draft transfer, submission validation,
simulated submission, feedback previews, revision persistence, mentor requests
and discussion notes. All seven routes were checked for horizontal overflow at
320px, with additional tablet and desktop checks. The temporary preview server
has been stopped.

The default Turbopack build encountered a CSS-worker startup failure on this
Windows machine; the Webpack fallback compiled and prerendered every route.

References: [Radix Select](https://www.radix-ui.com/primitives/docs/components/select),
[Lucide React](https://lucide.dev/guide/react),
[Next.js](https://nextjs.org/docs/app/getting-started/installation), and
[Tailwind CSS](https://tailwindcss.com/docs/installation/using-postcss).
