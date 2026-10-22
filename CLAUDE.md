# Travel Itineraries – notes for Claude

Personal travel site (React 19 + Vite + React Router 8, TypeScript 6), deployed on Vercel (Node 24; `engines` requires >=22.22). See README.md for setup, structure and how to add a trip.

## How it fits together

- Routes ([src/App.tsx](src/App.tsx)): `/` Home, `/maps` Trip Maps, `/:slug` itinerary, anything else redirects to `/`.
  - `/:slug` is a catch-all, so every new page's path is a reserved slug. Add it to the "slugs do not clash with other page routes" test in `src/data/trips.test.ts`.
- **Trips**: `src/data/trips.ts` + itinerary markdown at `public/itineraries/{slug}.md` (fetched at runtime, rendered with `marked` + `DOMPurify`). Home groups trips by `year` and shows a countdown, or the start month when `tentative`.
- **Maps**: `src/data/maps.ts` – `mapGroups` of `{ heading, maps: [{ title, url }] }`, shown on `/maps` in data order.
  - Headings are free text and deliberately **not** linked to `trips.ts`. The same map can appear in several groups (e.g. London as a departure stop).
  - `url: ""` renders a disabled, non-clickable pill (no "coming soon" text, styling alone signals it). Real URLs open in a new tab.
  - The owner uses Google My Maps `/edit?mid=…` links on purpose. Don't convert them to `/viewer`.
- Some itinerary files are gitignored on purpose (`mum.md`, `andalucia-backup.md`).

## Styling

- All CSS is in [src/styles/index.css](src/styles/index.css), plain classes with BEM-ish modifiers (`maps-link--solid`). Light theme only, no dark mode.
- Palette (lavender/purple family):
  - `#f0eef8` page background · `#2a1f6e` headings, back button · `#2f0d68` hover/dark accents · `#7c6fcd` icon accent · `#d8d0ee` borders/dividers
  - `#6a5cc4` map pill (white text, 5.33:1), hover `#4e4199`
  - Any text-on-colour combination must meet WCAG AA (4.5:1). Check the ratio before proposing a colour.
- Shared pieces to reuse:
  - Sub-pages copy the itinerary page's `<nav><Link to="/" className="back-button">← Back to Home</Link></nav>`.
  - `.maps-link` is the pill used on Home (white, outlined) and `/maps` (`--solid` purple, `--soon` disabled).
  - Uppercase small section headings (`.year-heading`, `.maps-group__heading`).
- Layout: `.container` max-width 1200px on every page. Home's trip list is narrower (700px).
- Icons come from `lucide-react` (`Globe2`, `MapIcon`; import `MapIcon`, not `Map`, to avoid shadowing the JS global).
- Mobile styles live in a single `@media (max-width: 768px)` block at the end of the file.

## Tests and checks

- Vitest + Testing Library, one `*.test.tsx` next to each page/data file. Page tests mock the data modules with `vi.mock("../data/trips")` / `vi.mock("../data/maps")` using `trips.mock.ts` / `maps.mock.ts`.
- Husky: pre-commit runs `npm test`, pre-push runs `npm run test:coverage`. Failing tests block commits.
- Before finishing: `npm test`, `npm run type-check`, `npm run lint`.
- `.gitattributes` forces LF line endings (overriding Windows `core.autocrlf`), so `npx prettier --check src` should pass cleanly.

## Working with the owner

- Commits go straight to `main` with short messages. Only commit when asked.
- For visual or design changes, show a mockup (HTML artifact using the site's real styles) and get a choice before writing code.
- Ask clarifying questions before coding when a request leaves options open; offer a recommended default for each.
