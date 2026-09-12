# ai-native-workflow-showcase

> A scroll-driven presentation about how I build software with Claude Code —
> and about what happens to the code after it is generated.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-13-FF5C1A?style=flat-square)

---

## Why this exists

I build and run software with AI coding tools — Claude Code, day to day. The
tools write most of the code; my work is deciding what gets built, giving the
model enough context to build it, and checking that the result holds.

Saying that in an interview is easy. Showing it is better. So instead of a CV
page, this is a four-minute walkthrough of the actual workflow, built with that
workflow, with every claim traceable to a repository that is running in
production.

The systems it refers to are real and in daily use by roughly 250 people:

| Repository | What it is |
|---|---|
| [btc-website](https://github.com/reapzai/btc-website) | Next.js 16 site and member dashboard · live at [btc-clan.xyz](https://btc-clan.xyz) |
| [btc-system](https://github.com/reapzai/btc-system) | Python Discord bot, PostgreSQL, the business logic |
| [btc-verleih-mod](https://github.com/reapzai/btc-verleih-mod) | Java/Fabric Minecraft mod with signed auto-updates |
| [btc-clanbot](https://github.com/reapzai/btc-clanbot) | Headless Minecraft client driven from Discord |

---

## The honest part

The presentation states plainly that Claude Code writes most of my code, and
that my own strength is direction and verification rather than writing complex
React or Python from memory. There is a section on what I am still learning,
and it is not buried at the bottom in small type.

That is a deliberate constraint rather than modesty: a presentation that
overstates what its author can do falls apart at the first follow-up question.

The same rule applies to the repository itself — see
[`CLAUDE.md`](./CLAUDE.md), section *"Never fabricate portfolio claims"*.

---

## Stack

```
Next.js 16      App Router, static output, Server Components by default
React 19
TypeScript 5    strict
Tailwind CSS 4  tokens defined once in globals.css via @theme
Motion 13       useScroll, sticky scroll-linked transforms
lucide-react    a handful of icons
```

No state library, no CMS, no analytics, no backend. Four dependencies in total.

---

## Architecture

### Everything factual lives in one file

`src/lib/content.ts` holds every number, date, stack entry and claim on the
page, typed. Components receive data; they never contain facts.

Two reasons. Claims can be audited in one place rather than hunted across
twenty components — and the numbers were **counted in the repositories during
development, not fetched at runtime**. The presentation therefore has no
dependency on the GitHub API, on rate limits, or on the conference-room wifi.
It renders offline.

### One registry drives navigation

`src/lib/sections.ts` is the single source of section ids. It feeds the anchors
on the sections, the progress rail, and the keyboard navigation, so those three
cannot drift apart.

### Progressive enhancement, not graceful degradation

The workflow section renders as a plain readable list on the server and on the
first client render. The sticky, scroll-driven sequence is layered on *after*
hydration, and only when the visitor has not asked for reduced motion.

That ordering is deliberate: a reduced-motion visitor never sees the animated
version even for a frame, the content is readable without JavaScript, and
server and client cannot disagree at hydration time.

```
src/
  app/
    layout.tsx        fonts, metadata, no-JS fallback
    page.tsx          section composition
    globals.css       design tokens (@theme) + utilities
  components/
    hero/  fit/  workflow/  prompt-anatomy/
    projects/  quality-gates/  learning/  outro/
    chrome/           fixed top bar + section rail
    ui/               Section · Reveal · Statement · ExternalLink
  lib/
    content.ts                every factual claim
    sections.ts               section registry
    motion.ts                 easings, durations, variants
    presentation.tsx          presentation-mode context
    use-motion-preference.ts  hydration-safe reduced-motion hook
docs/
  TECH_QA.md        likely technical questions, answered plainly
```

---

## Animation approach

Premium scrollytelling without scroll hijacking. The wheel, trackpad,
scrollbar and keyboard all keep their native behaviour — sticky containers and
scroll-linked transforms only.

- **Workflow** — a tall section with a sticky viewport; scroll progress selects
  one of six steps and the pipeline assembles itself alongside.
- **Prompt anatomy** — inverted: the artefact stays put and the explanation
  scrolls past it, highlighting the part under discussion.
- **Quality gates** — a single line drawn down through the chain as the section
  scrolls; each gate lights as the line reaches it.

Nothing runs longer than 700 ms. An animation that outlasts the sentence
describing it is in the way — and this page is meant to be talked over.

### Presentation mode

A toggle (or `P`) that hides the non-essential chrome and shows the current
section. While it is on, `↑`/`↓` jump between sections; `R` returns to the top;
`Esc` exits. Native scrolling is never taken away — the shortcuts only add a
way to land on a section start.

---

## Accessibility

- `prefers-reduced-motion` is respected structurally, not just by shortening
  durations: the workflow section becomes a static list.
- Semantic HTML throughout — one `<h1>`, `aria-labelledby` per section, ordered
  content in `<ol>`, figures in `<dl>`.
- Icon-only buttons carry `sr-only` labels; decoration carries `aria-hidden`.
- A global visible focus ring, and a skip link.
- The page stays readable with JavaScript disabled.

---

## Running it

```bash
npm install
npm run present   # production build, then serve on http://localhost:3000
```

`npm run dev` works too, but the presentation is given from the production
build. It is deliberately **not deployed**: the walkthrough runs from
localhost, so it cannot be affected by DNS, a certificate, a cold start or the
wifi in the room. The repository is the link that gets shared afterwards.

It is a static Next.js app with no server runtime, no environment variables and
no secrets, so it can be put on any static host later without changes.

### Verification

```bash
npm run verify    # tsc --noEmit && eslint && next build
```

All three pass. There is no automated test suite here, and that is a decision
rather than an omission: a page of fixed content with no business logic has
little for a unit test to assert that the typechecker and the build do not
already cover. (Where there *is* logic, I do test it — the site this page
points to runs 107 vitest tests in CI before every deploy.)

---

## How this page was built

With Claude Code, following the workflow the page describes.

1. **Inspect first.** Before any code, the four referenced repositories were
   read and their numbers counted — commits, pages, API routes, tests, lines.
   Those counts are what `content.ts` contains.
2. **Rules in the repo.** `CLAUDE.md` carries the constraints that hold across
   sessions: the no-fabrication rule, the animation budget, the accessibility
   requirements, the verification commands.
3. **Build in reviewable steps**, then verify — typecheck, lint, build, and
   then actually looking at the result at 1920×1080, at phone width, and with
   reduced motion enabled.
4. **Verification found real bugs.** Two worth naming, because they are the
   point of the exercise:
   - A CSS utility was used in three components but missing from the
     stylesheet, so the accent colour silently rendered as plain white. Nothing
     errored; it just looked slightly wrong.
   - Components branched their markup on the reduced-motion preference, which
     the server cannot know. That broke hydration — **only for the visitors who
     had asked for less motion**. It was invisible on screen and loud in the
     console. The fix is `useSyncExternalStore`, in
     `src/lib/use-motion-preference.ts`.

   Neither would have been caught by generating more confidently. Both were
   caught by looking.

That is the argument this page is making, applied to itself: generating the
code is the fast part, and it is not the part that decides whether something
ships.

---

## Licence

MIT for the code. The content — the copy, the claims and the CV material — is
personal and not licensed for reuse.
