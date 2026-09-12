/**
 * Single source of truth for every factual claim on this page.
 *
 * Rule (see CLAUDE.md): nothing in here may be invented. Every number was
 * counted in the actual repository during development — not fetched at
 * runtime, so the presentation never depends on the network or the GitHub API.
 *
 * Verified 2026-09-12 against the local working copies of all four repos.
 */

export const PROFILE = {
  name: "Ali",
  handle: "reapz",
  github: "https://github.com/reapzai",
  githubLabel: "github.com/reapzai",
  site: "https://btc-clan.xyz",
  siteLabel: "btc-clan.xyz",
} as const;

/* ------------------------------------------------------------------ hero */

export const HERO_PIPELINE = [
  { label: "Idee", hint: "Problem benennen" },
  { label: "Claude", hint: "Kontext + Regeln" },
  { label: "Build", hint: "kleine Schritte" },
  { label: "Verify", hint: "Typecheck, Tests, Build" },
  { label: "Ship", hint: "Deploy + Logs" },
] as const;

/* ------------------------------------------------------------------- fit */

export type FitCard = {
  id: string;
  title: string;
  role: string;
  body: string;
  proof: string;
  personal?: string;
};

/*
 * Card copy is short on purpose.
 *
 * This page is screen-shared and talked over. Anything longer than about two
 * lines competes with the person speaking: the audience starts reading and
 * stops listening. The screen carries the claim and the evidence; the spoken
 * track (docs/PRESENTATION.md) carries the explanation.
 */
export const FIT_CARDS: FitCard[] = [
  {
    id: "prototyping",
    title: "Schnelles Prototyping",
    role: "neue Features und Produkte schnell prototypen",
    body: "Eine Idee gebaut zum Anfassen sagt mehr als eine Idee beschrieben.",
    proof: "Vier Systeme in rund zehn Monaten — alle vier in Produktion",
  },
  {
    id: "frontend",
    title: "Modernes Frontend",
    role: "frontend-lastige Web-Anwendungen und Oberflächen",
    body:
      "Next.js, React, TypeScript, Tailwind — kein Tutorial, sondern eine Seite, die täglich benutzt wird.",
    proof: "btc-clan.xyz · 54 Seiten · 45 Komponenten · seit März 2026 live",
  },
  {
    id: "ai",
    title: "KI-gestützte Entwicklung",
    role: "Software mit Claude Code, Cursor oder Copilot bauen",
    body:
      "Claude Code schreibt den Code. Meine Arbeit ist die Richtung — und die Prüfung.",
    proof: "CLAUDE.md in jedem Repo — die Regeln stehen im Projekt, nicht im Kopf",
  },
  {
    id: "automation",
    title: "Blick für Automatisierung",
    role: "KI-Workflows, Low-Code, Automatisierung",
    body:
      "Wiederholte Handarbeit fällt mir sofort auf — und lässt mir dann keine Ruhe.",
    proof: "Auto-Changelog · Config-Sync · tägliches DB-Backup · Alerts, die sich selbst schließen",
    personal: "Auch privat: mein Zuhause läuft über Home Assistant.",
  },
  {
    id: "verify",
    title: "Testen, deployen, iterieren",
    role: "KI-generierten Code prüfen, testen und verbessern",
    body:
      "Generiert heißt nicht fertig. Was nicht durch die Checks kommt, geht nicht raus.",
    proof: "Push → tsc --noEmit → Tests → Build → Deploy, in allen vier Repos",
  },
  {
    id: "operate",
    title: "Selbst online bringen",
    role: "eigenständig und iterativ arbeiten",
    body:
      "Domain, Cloudflare, Server per SSH, Deploy-Pipeline, Mailserver — ich bringe eine Sache auch allein live.",
    proof: "btc-clan.xyz: eigene Domain · Cloudflare · VPS per SSH · Actions → PM2",
    personal: "Auch hier ist die KI dabei — als Nachschlagewerk, nicht als Ersatz.",
  },
];

/* -------------------------------------------------------------- workflow */

export type WorkflowStep = {
  n: string;
  title: string;
  claim: string;
  body: string;
  detail: string;
};

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    n: "01",
    title: "Define",
    claim: "Aus der Idee wird ein überprüfbares Ziel.",
    body:
      "Bevor irgendetwas geschrieben wird, steht fest, was hinterher existieren soll — in einem Satz, den man am Ende gegen das Ergebnis halten kann.",
    detail: "Ein Satz, an dem sich das Ergebnis messen lässt",
  },
  {
    n: "02",
    title: "Spec",
    claim: "Claude bekommt Kontext, Grenzen und Abnahmekriterien.",
    body:
      "Kein „bau mir das“. Was existiert schon, was darf nicht kaputtgehen, woran erkennen wir, dass es funktioniert. Die Regeln, die immer gelten, stehen in der CLAUDE.md des Repos.",
    detail: "Stabile Regeln → CLAUDE.md · Aufgaben-Kontext → Prompt",
  },
  {
    n: "03",
    title: "Plan",
    claim: "Erst den vorhandenen Code lesen, dann entscheiden.",
    body:
      "Bei allem, was nicht trivial ist, schaue ich mit Claude zuerst in den bestehenden Code und lege fest, was sich ändern soll — bevor eine Zeile angefasst wird.",
    detail: "Was ändert sich, was bleibt, was hängt noch daran?",
  },
  {
    n: "04",
    title: "Build",
    claim: "Umsetzung in kleinen, prüfbaren Schritten.",
    body:
      "Lieber fünf kleine Änderungen, die ich einzeln lesen kann, als eine große, die ich nur noch glauben kann. Jeder Commit sagt, was sich geändert hat und warum.",
    detail: "Kleine Diffs · ein Thema pro Commit",
  },
  {
    n: "05",
    title: "Verify",
    claim: "Typecheck, Lint, Tests, Build — und dann hinschauen.",
    body:
      "Das Ergebnis wird ausgeführt, nicht angenommen. Wenn etwas bricht, lese ich Logs und Fehlermeldungen und gebe sie weiter, statt denselben Prompt noch einmal zu schicken.",
    detail: "Evidenz statt Wiederholung: Logs, Tests, Datenbank",
  },
  {
    n: "06",
    title: "Ship + Observe",
    claim: "Deployen, beobachten, aus echten Fehlern nachziehen.",
    body:
      "Nach dem Deploy ist die Arbeit nicht vorbei. Was Nutzern auffällt, landet als Test im Repo — mit Datum und Anlass, damit der Grund die nächste Änderung überlebt.",
    detail: "Push → CI → Deploy → Logs → nächster Test",
  },
];

export const WORKFLOW_STATEMENT = {
  lead: "Die KI schreibt den Code.",
  emphasis: "Für das Ergebnis stehe ich gerade.",
} as const;

/* -------------------------------------------------------- prompt anatomy */

export type PromptPart = {
  id: string;
  label: string;
  question: string;
  note: string;
  lines: string[];
};

/**
 * Realistic example, derived from an actual change in btc-website on
 * 07.09.2026: ticket visibility in the clan dashboard was decided by an
 * if/elif chain, which only ever matches one branch — so anyone holding two
 * roles silently got the shorter list. The fix made it a sum; the test that
 * pins it exists in btc-system (tests/test_ticket_dashboard_sichtbarkeit.py).
 */
export const PROMPT_PARTS: PromptPart[] = [
  {
    id: "goal",
    label: "GOAL",
    question: "Was soll existieren, wenn wir fertig sind?",
    note: "Ein Satz, überprüfbar. Kein Wunschzettel.",
    lines: [
      "Die Ausbilder-Leitung soll im Clan-Dashboard die",
      "Bewerbungs-Tickets sehen — auch dann, wenn sie",
      "zusätzlich Supporter oder Moderator ist.",
    ],
  },
  {
    id: "context",
    label: "CONTEXT",
    question: "Was existiert schon, und was davon ist wichtig?",
    note: "Dateipfade statt Beschreibungen. Claude soll lesen, nicht raten.",
    lines: [
      "Die Sichtbarkeit entscheidet die Ticket-Logik in",
      "src/lib/, die Rollen-Hierarchie steht in auth.ts.",
      "Die Discord-IDs liegen doppelt: einmal im Web-Repo,",
      "einmal im Bot unter config/config.py.",
    ],
  },
  {
    id: "constraints",
    label: "CONSTRAINTS",
    question: "Was darf dabei nicht kaputtgehen?",
    note: "Die teuren Fehler benennen, bevor sie passieren.",
    lines: [
      "Fail-closed bleibt fail-closed: schlägt die Rollen-",
      "abfrage fehl, lautet die Antwort „kein Zugriff“.",
      "Niemand darf durch die Änderung mehr sehen als",
      "vorher. Entschieden wird serverseitig, nie im Browser.",
    ],
  },
  {
    id: "acceptance",
    label: "ACCEPTANCE",
    question: "Woran erkennen wir, dass es funktioniert?",
    note: "Auch der Fall, der schiefgehen soll, gehört dazu.",
    lines: [
      "Ausbilder-Leitung + Supporter sieht BEIDE Listen.",
      "Ein Mitglied ohne die Rolle sieht weiterhin nichts.",
      "Fällt die Rollenabfrage aus: leere Liste, kein Leak.",
    ],
  },
  {
    id: "verify",
    label: "VERIFY",
    question: "Welche Prüfungen müssen durchlaufen?",
    note: "Die Prüfung gehört zur Aufgabe, nicht zum Nachtrag.",
    lines: [
      "npx tsc --noEmit && npm run lint && npm test",
      "npm run build",
      "Dazu ein Test, der genau diese Rollen-Kombination",
      "festhält — mit dem Datum, das ihn ausgelöst hat.",
    ],
  },
];

export const CONTEXT_LAYERS = [
  {
    id: "rules",
    title: "Stabile Regeln",
    target: "CLAUDE.md",
    body: "Commit-Format, wo Secrets liegen dürfen, welche Checks laufen müssen. Steht im Repo, nicht in meinem Kopf — deshalb driftet es nicht von Sitzung zu Sitzung.",
  },
  {
    id: "task",
    title: "Aufgaben-Kontext",
    target: "Prompt",
    body: "Alles, was nur für diese eine Änderung gilt: Ziel, betroffene Dateien, Grenzen, Abnahme.",
  },
  {
    id: "evidence",
    title: "Evidenz",
    target: "Logs · Tests · Datenbank",
    body: "Wenn eine Annahme im Spiel ist, prüfe ich sie zuerst — lesend gegen echte Daten — und das Ergebnis geht mit in den Prompt.",
  },
  {
    id: "review",
    title: "Review",
    target: "Diff + Verifikation",
    body: "Ich lese die Änderung, bevor sie committet wird, und lasse sie laufen, bevor ich sie glaube.",
  },
] as const;

/* -------------------------------------------------------------- projects */

export type Project = {
  id: string;
  name: string;
  repo: string;
  live?: string;
  liveLabel?: string;
  language: string;
  tagline: string;
  body: string;
  stack: string[];
  facts: { label: string; value: string }[];
  highlight: string;
};

export const FEATURED_PROJECT: Project = {
  id: "btc-website",
  name: "btc-website",
  repo: "https://github.com/reapzai/btc-website",
  live: PROFILE.site,
  liveLabel: PROFILE.siteLabel,
  language: "TypeScript",
  tagline: "Website und Mitglieder-Dashboard — seit März 2026 in Produktion.",
  body:
    "Live-Auktionen mit Preisverlauf, Minecraft-Verifizierung über Discord-Login, ein rollenbasierter Clan-Bereich. Fällt die Rollenabfrage aus, lautet die Antwort „kein Zugriff“ — nicht „zeig alles“.",
  stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "PostgreSQL", "NextAuth", "Redis", "vitest"],
  facts: [
    { label: "Commits", value: "800" },
    { label: "Seiten", value: "54" },
    { label: "API-Routen", value: "112" },
    { label: "Komponenten", value: "45" },
    { label: "Tests", value: "107" },
  ],
  highlight: "Läuft unter btc-clan.xyz und wird täglich benutzt.",
};

export const PROJECTS: Project[] = [
  {
    id: "btc-system",
    name: "btc-system",
    repo: "https://github.com/reapzai/btc-system",
    language: "Python",
    tagline: "Der Discord-Bot dahinter — seit Dezember 2025 durchgehend online.",
    body:
      "Tickets, Auktions-Benachrichtigungen, Marktdaten — und ein Verleih-System, abgesichert über 2FA im Spiel und ein Buchungs-Register, das der Client nicht belügen kann.",
    stack: ["Python", "discord.py", "PostgreSQL", "asyncpg", "pytest"],
    facts: [
      { label: "Commits", value: "1.613" },
      { label: "Module", value: "93" },
      { label: "Migrationen", value: "80" },
      { label: "Tests", value: "972" },
    ],
    highlight: "Jede Test-Datei beginnt mit dem Vorfall, der sie ausgelöst hat — mit Datum.",
  },
  {
    id: "btc-verleih-mod",
    name: "btc-verleih-mod",
    repo: "https://github.com/reapzai/btc-verleih-mod",
    language: "Java",
    tagline: "Die Spiel-Seite des Verleihs — Fabric-Mod für Minecraft 1.21.11.",
    body:
      "2FA-Einstieg, Schutz gegen den Verlust geliehener Gegenstände, Dashboard im Spiel. Updates sind Ed25519-signiert — ein veränderter Build kommt nicht herein.",
    stack: ["Java 21", "Fabric", "Mixin", "owo-lib", "Gradle"],
    facts: [
      { label: "Commits", value: "130" },
      { label: "Zeilen", value: "~14.300" },
      { label: "Version", value: "3.3.4" },
    ],
    highlight: "Die Release-Reihenfolge steht im README, weil sie zweimal schiefging.",
  },
  {
    id: "btc-clanbot",
    name: "btc-clanbot",
    repo: "https://github.com/reapzai/btc-clanbot",
    language: "JavaScript",
    tagline: "Ein Minecraft-Client ohne Fenster, gesteuert aus Discord.",
    body:
      "Clan-Chat, Spielerlisten, Zahlungen im Spiel. Jedes Modul läuft gekapselt, alle Aktionen über eine priorisierte Warteschlange.",
    stack: ["Node.js", "mineflayer", "HTTP-Control", "node:test"],
    facts: [
      { label: "Commits", value: "95" },
      { label: "Module", value: "16" },
      { label: "Zeilen", value: "~5.900" },
    ],
    highlight: "Fehler-Isolation und Warteschlange kamen beide aus echten Ausfällen.",
  },
];

export const PROJECTS_NOTE =
  "Vier Systeme, eine Datenbank, eine Deploy-Pipeline. Rund 250 Leute benutzen das täglich — und melden sich sofort, wenn etwas nicht geht.";

/* --------------------------------------------------------- quality gates */

export type Gate = {
  id: string;
  label: string;
  body: string;
  kind: "generate" | "gate" | "ship" | "observe";
};

export const GATES: Gate[] = [
  {
    id: "generate",
    label: "Generieren",
    body: "Claude Code setzt die Änderung um — in kleinen Schritten, die einzeln lesbar bleiben.",
    kind: "generate",
  },
  {
    id: "review",
    label: "Review",
    body: "Ich lese den Diff. Was ich nicht erklären kann, geht nicht weiter.",
    kind: "gate",
  },
  {
    id: "typecheck",
    label: "Typecheck & Lint",
    body: "tsc --noEmit und eslint. TypeScript fängt genau die Fehler, die generierter Code gern macht.",
    kind: "gate",
  },
  {
    id: "tests",
    label: "Tests",
    body: "vitest im Web-Repo, pytest im Bot. Neue Tests halten fest, warum es sie gibt — nicht nur, was der Code tut.",
    kind: "gate",
  },
  {
    id: "build",
    label: "Build",
    body: "next build. Was lokal läuft, muss auch gebaut werden können.",
    kind: "gate",
  },
  {
    id: "deploy",
    label: "Deploy",
    body: "Push auf master, GitHub Actions übernimmt. Ein roter Lauf erreicht den Server nicht.",
    kind: "ship",
  },
  {
    id: "observe",
    label: "Logs & Rückmeldung",
    body: "Was in Produktion auffällt, kommt als Test zurück ins Repo — mit Datum und Anlass.",
    kind: "observe",
  },
];

export const GATES_STATEMENT = {
  lead: "Generiert heißt nicht fertig.",
  sub: "Schnelles Iterieren zählt erst, wenn das Ergebnis die Produktion übersteht.",
} as const;

/* -------------------------------------------------------------- learning */

export type LearningItem = {
  id: string;
  title: string;
  today: string;
  goal: string;
};

export const LEARNING: LearningItem[] = [
  {
    id: "js-ts",
    title: "JavaScript- und TypeScript-Grundlagen",
    today: "Ich lese TypeScript-Fehler und kann sie einordnen.",
    goal: "Typen selbst entwerfen, statt sie mir erklären zu lassen.",
  },
  {
    id: "react",
    title: "React tiefer verstehen",
    today: "Ich erkenne, was eine Komponente tut und warum sie client-seitig läuft.",
    goal: "Rendering, State und Effekte so verstehen, dass ich Probleme vorher sehe.",
  },
  {
    id: "backend",
    title: "Backend-Grundlagen",
    today: "SQL lesen, Queries prüfen, Logs auswerten, per SSH auf dem Server arbeiten.",
    goal: "Datenmodelle und APIs eigenständig entwerfen.",
  },
  {
    id: "architecture",
    title: "Architektur-Urteil",
    today: "Ich merke, wenn eine Struktur nicht mehr trägt.",
    goal: "Früher entscheiden, welcher Aufbau später weniger weh tut.",
  },
  {
    id: "independence",
    title: "Weniger Abhängigkeit bei Routine",
    today: "Bei kleinen Änderungen greife ich noch schnell zur KI.",
    goal: "Kleines selbst schreiben und die KI für das Große behalten.",
  },
];

export const LEARNING_STATEMENT = {
  lead: "Mein Vorteil heute ist Hebelwirkung.",
  emphasis: "Mein Ziel ist Hebelwirkung plus Fundament.",
} as const;

export const BEK_LINE =
  "Am meisten reizt mich, dort zu arbeiten, wo KI nicht nur im Produkt steckt, sondern Teil der Art ist, wie das Produkt entsteht.";

/* ------------------------------------------------------------------- end */

export const OUTRO = {
  lines: ["Schnell bauen.", "Härter prüfen.", "Weiter lernen."],
  note: "Vorbereitet für das Gespräch mit der BEK Service GmbH.",
} as const;
