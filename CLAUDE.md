@AGENTS.md

# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## What this is

A single-page, scroll-driven presentation about an AI-assisted development
workflow. It is shown live during a job interview via screen share, and the
walkthrough is meant to take three to five minutes.

That context decides almost every trade-off in here:

- **Reliability beats cleverness.** It has to work on the first try, on an
  unfamiliar network, on someone else's screen.
- **Nothing is fetched at runtime.** No GitHub API, no analytics, no remote
  fonts, no remote images. The page renders offline.
- **Short animations.** Nothing exceeds 700 ms. An animation that outlasts the
  sentence describing it is in the way.
- **German copy, English technical terms.** `Typecheck`, `Deploy`, `Commit`
  and `Prompt` stay English, because that is how they are said out loud.

---

## Never fabricate portfolio claims

**This is the most important rule in the repository.**

Every factual statement on the page — a number, a date, a stack entry, a
feature, a practice — must be verifiable in the repositories it refers to:

- `reapzai/btc-website`
- `reapzai/btc-system`
- `reapzai/btc-verleih-mod`
- `reapzai/btc-clanbot`

Concretely:

- **All claims live in `src/lib/content.ts`** and nowhere else. No fact may be
  written inline in a component.
- **Counts are counted**, not estimated. If a number changes, re-count it in
  the repository and update the verification date at the top of `content.ts`.
- **Do not invent** features, file paths, incidents or dates. The example
  prompt in `PROMPT_PARTS` describes a real change; if it has to change,
  replace it with another real one.
- **Do not inflate the author's abilities.** The page says plainly that Claude
  Code writes most of the code and that the author's own strength is direction
  and verification. Do not soften that, and do not add senior-engineer
  language the author could not stand behind in a live conversation.
- If a claim cannot be verified, **remove it**. An empty space is better than
  a sentence that collapses at the first follow-up question.

---

## Design principles

- Near-black ground (`--color-ink-900`), warm off-white type, **one** accent
  (`--color-amber-accent`). No second accent colour.
- Warm neutrals, never blue-greys — cool greys go muddy in a screen share.
- Three type families with fixed jobs: **Schibsted Grotesk** for everything
  structural, **Instrument Serif** for editorial statement lines *only*
  (three on the whole page — keep it rationed), **JetBrains Mono** for step
  numbers, labels, prompt and command text.
- Glass and blur appear in the fixed chrome and the two code cards. Nowhere
  else — used everywhere it means nothing.
- Hairlines rather than boxes. Generous vertical space. No shadow as
  decoration.
- No gamer or cyberpunk cues, no neon, no "AI brain" iconography, no rockets.

---

## Component conventions

```
src/
  app/          layout, page, globals.css
  components/
    <section>/  one directory per page section
    chrome/     fixed UI (top bar, progress rail)
    ui/         shared primitives (Section, Reveal, Statement, ExternalLink)
  lib/
    content.ts               every factual claim, typed
    sections.ts              section registry — anchors, rail, keyboard nav
    motion.ts                shared easings, durations, variants
    presentation.tsx         presentation-mode context
    use-motion-preference.ts hydration-safe reduced-motion hook
```

- **Server Components by default.** Add `"use client"` only where a hook
  genuinely needs the browser, and say why in the file's comment.
- Sections are composed with `<Section>` so gutters, max width and header
  rhythm stay identical across the page.
- Entrance animation goes through `<Reveal>`. Do not hand-roll a second one.
- The section registry is the single source of anchors. Adding a section means
  adding it to `SECTIONS`; ids are not hard-coded anywhere else.

---

## Animation rules

1. **No scroll hijacking.** Wheel, trackpad, scrollbar and keyboard keep their
   native behaviour. Sticky containers plus scroll-linked transforms only.
   Presentation mode is the one exception, and it *adds* arrow-key jumps
   without taking anything away.
2. **Every animation serves the narrative.** If it cannot be justified in one
   sentence, remove it.
3. **`once: true` on every `whileInView`.** Scrolling back during a live talk
   must not replay an animation mid-sentence.
4. **Budget:** `DURATION.fast` 240 ms, `.base` 450 ms, `.slow` 700 ms.
5. **Parallax stays under ~25 px** across an entire section.

---

## Accessibility requirements

- **Reduced motion is a different experience, not a broken one.** The workflow
  section becomes a plain readable list and transitions collapse to zero.
- **Never branch markup on the reduced-motion value during the first render.**
  It breaks hydration, and it breaks it only for the people who asked for less
  motion. Use `useMotionPreference`, which reports "no preference" until after
  hydration. This bug shipped here once — do not reintroduce it.
- Semantic HTML: one `<h1>`, sections labelled via `aria-labelledby`, ordered
  content in `<ol>`, figures in `<dl>`.
- Decorative elements carry `aria-hidden`; icon-only buttons carry an
  `sr-only` label.
- Visible focus ring on everything interactive — defined once, globally.
- The page stays readable with JavaScript disabled; see the `<noscript>` block
  in `layout.tsx` and the `reveal` class it targets.
- Body copy uses `--color-bone-300` or lighter. `--color-bone-600` and darker
  are for non-essential labels only.

---

## Verification

All three must pass before anything is committed:

```bash
npx tsc --noEmit     # types
npm run lint         # eslint
npm run build        # production build
```

Beyond the commands, verify by looking:

- **1920×1080** — the presentation resolution, and the one that matters most.
- **~400 px wide** — must not scroll horizontally.
- **With `prefers-reduced-motion: reduce`** — the workflow section must be the
  static list.
- **Console free of errors and hydration warnings.** A hydration mismatch has
  already shipped in this repository once; treat it as a real failure.

---

## Delivery

**This page is not deployed, and that is the decision.** The walkthrough is
given from `npm run present` on localhost, so it cannot be broken by DNS, a
certificate, a cold start or the network in the room. The public repository is
what gets shared afterwards.

- No environment variables, no secrets, no server runtime. A change that would
  introduce any of the three is almost certainly the wrong change — it would
  also end the ability to run this from a laptop with the wifi off.
- The app stays a static single route, so it can move to any static host later
  without modification. Keep it that way.
- Before any presentation: `npm run verify`, then `npm run present`, then
  scroll the whole page once at 1920×1080.

---

## Commits

- Imperative and English: `feat:`, `fix:`, `docs:`, `chore:`.
- One topic per commit; the body explains *why*, not *what*.
- No secrets, no personal data, no private interview details in the repository.
