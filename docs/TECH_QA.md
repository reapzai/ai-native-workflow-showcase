# Technische Rückfragen — und ehrliche Antworten

Fragen, die diese Seite auslösen kann. Die Antworten sind bewusst **einfach**
gehalten: so, dass du sie wirklich verstehst und im Gespräch mit eigenen Worten
wiedergeben kannst.

**Grundregel:** Wenn du etwas nicht weißt, sag „Das weiß ich nicht genau, ich
schaue es nach." Das ist im Gespräch stärker als eine Antwort, die beim
Nachhaken zusammenfällt.

---

## Die wichtigste Frage

### „Was hat Claude gemacht und was haben Sie gemacht?"

**Claude hat gemacht:** so gut wie den gesamten Code. Die React-Komponenten,
die Animationen, das CSS, die TypeScript-Typen.

**Du hast gemacht:**
- entschieden, dass es überhaupt eine Präsentationsseite wird und keine
  klassische Bewerbungsseite
- die Struktur vorgegeben: welche Abschnitte, in welcher Reihenfolge, mit
  welcher Botschaft
- die Regel gesetzt, dass keine Behauptung auf der Seite steht, die sich nicht
  im Repository nachprüfen lässt
- das Ergebnis geprüft: angeschaut, Typecheck, Lint, Build, Konsole
- Fehler zurückgemeldet, die aufgefallen sind

**Guter Satz dafür:**
> „Den Code hat Claude geschrieben. Die Entscheidungen, was drinsteht und was
> nicht, und die Prüfung, ob es stimmt — das war meine Arbeit. Und genau das
> ist auch die Arbeit, um die es in Ihrer Stelle geht."

---

## Fragen zum Stack

### „Warum Next.js?"

Next.js ist ein Framework auf React. React allein gibt dir nur die Bausteine
für die Oberfläche — Next.js bringt drumherum alles mit, was man sonst selbst
zusammensuchen müsste: Routing, Build, Optimierung von Bildern und Schriften.

Für diese Seite waren zwei Dinge entscheidend:

1. **Die Seite wird beim Bauen fertig erzeugt** (statisch). Es läuft kein
   Server, der etwas berechnen muss — es liegt fertiges HTML da. Das ist so
   schnell und ausfallsicher, wie es geht. Für eine Live-Präsentation genau
   das, was man will.
2. **Ich kenne es.** btc-clan.xyz läuft auf Next.js. Ich wollte für ein
   Bewerbungsgespräch nicht das Werkzeug wechseln.

**Wenn nachgehakt wird „warum nicht Vite/Astro?":**
> „Hätte auch funktioniert, Astro wäre für eine reine Inhaltsseite sogar noch
> etwas schlanker. Ich habe Next.js genommen, weil ich es täglich benutze und
> mir bei einer Live-Präsentation keine Überraschungen leisten wollte."

### „Warum TypeScript?"

TypeScript ist JavaScript mit Typangaben. Du schreibst dazu, *welche Art* von
Daten irgendwo erwartet wird — ein Text, eine Zahl, eine Liste.

Der Nutzen: Fehler werden schon beim Schreiben angezeigt, nicht erst wenn die
Seite beim Nutzer kaputtgeht.

**Und der Punkt, der für KI-Code wirklich zählt:**
> „TypeScript fängt genau die Fehlerart, die generierter Code gern macht — ein
> Feld heißt anders als gedacht, irgendwo fehlt ein Wert. Der Computer merkt
> das sofort. Ich müsste es mühsam suchen."

**Beispiel, wenn jemand es genau wissen will:**
In `content.ts` steht `type Project = { name: string; commits: string; ... }`.
Wenn ich irgendwo ein Feld vergesse, lässt sich das Projekt gar nicht bauen.

### „Warum Motion und nicht GSAP?"

**Motion** (früher Framer Motion) ist eine Animations-Bibliothek, die für React
gemacht ist. **GSAP** ist eine sehr mächtige Animations-Bibliothek, die
unabhängig von React funktioniert.

Drei Gründe für Motion:

1. **Es passt zu React.** Eine Komponente wird animiert, indem man sie
   `motion.div` statt `div` nennt. Bei GSAP müsste man an React vorbei direkt
   auf die HTML-Elemente zugreifen — das geht, ist aber mehr Verdrahtung.
2. **`useScroll` gibt es fertig.** Genau das brauche ich hier.
3. **Reduzierte Bewegung ist eingebaut.** Motion kann die Systemeinstellung
   „weniger Animationen" direkt auslesen.

**Ehrlicher Zusatz, wenn jemand GSAP-Fan ist:**
> „GSAP kann mehr, gerade bei komplexen Zeitabläufen. Für das, was diese Seite
> macht — Scroll-Position auslesen und ein paar Werte daraus ableiten —
> brauchte ich das nicht."

### „Warum Tailwind?"

Bei Tailwind schreibt man das Aussehen direkt ans Element: `class="mt-4 text-lg"`
statt einer separaten CSS-Datei mit selbst erfundenen Klassennamen.

Vorteil hier: Man sieht in einer Datei, wie etwas aussieht *und* was es tut.
Und es entsteht kein totes CSS, das niemand mehr zu löschen traut.

Die Farben und Schriftgrößen sind trotzdem zentral definiert — in
`globals.css` unter `@theme`. So ist die Gold-Farbe an einer Stelle festgelegt
und nicht 40-mal im Code verstreut.

---

## Fragen zur Technik dahinter

### „Wie funktioniert `useScroll`?"

`useScroll` sagt dir laufend, **wie weit** gescrollt wurde — als Zahl zwischen
**0 und 1**.

Für den Workflow-Abschnitt heißt das:

- 0 = der Abschnitt fängt gerade oben an
- 0,5 = du bist in der Mitte
- 1 = der Abschnitt ist durch

Aus dieser einen Zahl rechne ich aus, welcher der sechs Schritte gerade dran
ist: `Math.floor(zahl * 6)` — bei 0,5 also Schritt 3.

**Wenn jemand nachhakt, warum das nicht ruckelt:**
> „Der Wert wird nicht bei jedem Scroll-Ereignis durch React geschickt, das
> wäre zu teuer. Motion aktualisiert ihn außerhalb von React und sagt mir nur
> Bescheid, wenn sich die *Schrittnummer* ändert — also sechsmal statt tausende
> Male."

### „Was ist SSR, und was ist Client-Rendering?"

Zwei Orte, an denen die Seite gebaut werden kann.

**Server-Rendering (SSR):** Das HTML wird auf dem Server (bei mir: schon beim
Bauen) fertig erzeugt. Der Browser bekommt sofort eine fertige Seite. Gut für
Geschwindigkeit und dafür, dass Google es lesen kann.

**Client-Rendering:** Der Browser bekommt eine fast leere Seite und baut sie
selbst mit JavaScript zusammen. Nötig für alles, was auf den Nutzer reagiert —
Klicks, Scrollen, Tastatur.

**Auf dieser Seite:** Alle Texte kommen fertig vom Server. Nur die Teile, die
Scrollen oder Tasten brauchen, laufen zusätzlich im Browser.

### „Was ist Hydration?"

Der Moment, in dem der Browser das fertige HTML vom Server übernimmt und
JavaScript „daran anschließt", damit die Seite auf Klicks reagieren kann.

**Wichtig:** Server und Browser müssen dabei dasselbe HTML erzeugen.
Unterscheiden sie sich, wirft React alles weg und baut es neu — es flackert.

**Und das ist hier tatsächlich passiert.** Ich hatte Code, der aussah wie:
„wenn der Nutzer weniger Animationen will, zeige eine andere Version."
Der Server weiß aber nicht, was der Nutzer eingestellt hat — der kennt keine
Bildschirm-Einstellungen. Also hat er die eine Version geschickt und der
Browser die andere gebaut. Ergebnis: Fehler in der Konsole.

**Die Lösung:** Server und Browser bauen erst einmal *dieselbe* Version, und
die Anpassung passiert einen Sekundenbruchteil später. Dafür gibt es in React
eine passende Funktion (`useSyncExternalStore`).

**Das ist eine gute Geschichte fürs Gespräch:**
> „Den Fehler hätte ich ohne die Browser-Konsole nicht gefunden — er war nicht
> sichtbar. Genau deshalb schaue ich bei generiertem Code immer in die Konsole."

### „Warum ist diese Komponente client-seitig?"

`"use client"` steht oben in einer Datei, wenn sie etwas braucht, das es nur im
Browser gibt.

| Komponente | Warum client-seitig |
|---|---|
| `WorkflowSection` | muss die Scroll-Position kennen |
| `TopBar` | reagiert auf Klicks und Tastendrücke |
| `PipelineLoop` | animiert dauerhaft |
| `Reveal` | muss wissen, wann ein Element sichtbar wird |
| `Hero`, `ProjectsSection`, `LearningSection` | **sind es nicht** — reiner Text |

**Merksatz:** Alles, was nur Text darstellt, bleibt auf dem Server. Das ist
weniger JavaScript, das der Browser laden muss.

### „Was ist eine API?"

Eine vereinbarte Schnittstelle, über die zwei Programme miteinander reden.

**Beispiel aus meinem eigenen System:** Die Website muss wissen, welche
Auktionen gerade laufen. Diese Daten liegen aber beim Discord-Bot. Also fragt
die Website über eine feste Adresse nach — sie bekommt eine Antwort in einem
vereinbarten Format zurück und muss nicht wissen, wie der Bot innen aufgebaut
ist.

**Wichtig für diese Seite:** Sie benutzt **keine** API. Alle Zahlen stehen fest
in einer Datei. Das ist Absicht — eine Präsentation darf nicht davon abhängen,
ob GitHub im richtigen Moment erreichbar ist.

### „Was bedeutet Deployment?"

Den Code von deinem Rechner dorthin bringen, wo ihn andere Leute erreichen.

**Bei dieser Seite:** `git push` → Vercel merkt das → baut die Seite → stellt
sie online. Dauert etwa eine Minute.

**Bei btc-clan.xyz:** `git push` → GitHub Actions startet → Typecheck → Tests →
Build → per SSH auf den Server → Prozess neu starten. Und wenn ein Test rot
ist, bricht die Kette ab und es geht nichts raus.

---

## Fragen zu Qualität und Vorgehen

### „Wie haben Sie die Seite getestet?"

Ehrlich und vollständig:

1. **`npx tsc --noEmit`** — prüft alle Typen. Kein Fehler.
2. **`npm run lint`** — prüft auf typische Fehler und Stilverstöße. Sauber.
   *(Der Linter hat mir dabei eine echte Sache gezeigt: eine Stelle, an der ich
   React-State falsch gesetzt habe.)*
3. **`npm run build`** — der Produktions-Build muss durchlaufen.
4. **Im Browser angeschaut**, jeden Abschnitt einzeln, bei 1920×1080 — der
   Auflösung, in der die Präsentation läuft.
5. **Schmal getestet**, ob nichts seitlich rausläuft.
6. **Mit „weniger Animationen" getestet** — dabei habe ich den Hydration-Fehler
   gefunden.
7. **Browser-Konsole geprüft** — keine Fehler, keine Warnungen.

**Was ich nicht habe:** automatische Tests. Bei btc-clan.xyz gibt es 107,
hier nicht.
**Warum:** Eine Seite mit festem Text und ohne Logik hat wenig, was ein Test
sinnvoll prüfen könnte. Typecheck und Build decken hier das Meiste ab. *Das ist
eine Entscheidung, keine Schlamperei.*

### „Wie würden Sie die Performance verbessern?"

Ehrlicher Einstieg:
> „Die Seite ist klein und statisch, das Problem ist hier nicht groß. Aber es
> gäbe konkrete Punkte."

1. **Schriften:** Drei Familien werden geladen. Zwei würden reichen — die
   Serifenschrift wird nur für drei Zeilen gebraucht.
2. **Icons:** Ich nutze wenige Icons aus einer größeren Bibliothek. Man könnte
   sie als SVG direkt einbauen.
3. **Messen statt raten:** Lighthouse laufen lassen und schauen, was wirklich
   bremst — statt auf Verdacht zu optimieren.

**Der Satz, der zeigt, dass du es verstanden hast:**
> „Ich würde erst messen. Optimieren ohne Messung ist Raten."

### „Was würden Sie ohne KI anders machen?"

Die ehrlichste Antwort:

> „Ohne KI hätte ich das in dieser Zeit nicht gebaut. Vermutlich hätte ich eine
> Vorlage genommen und angepasst — und das Ergebnis wäre deutlich schlichter
> geworden.
>
> Was *gleich* geblieben wäre: die Struktur, die Entscheidung, welche Abschnitte
> es gibt, und die Regel, dass nichts draufsteht, was ich nicht belegen kann.
> Das ist der Teil, der von mir kommt.
>
> Was *schwerer* geworden wäre: die Animationen und das Layout. Da bin ich klar
> auf die KI angewiesen."

### „Woher wissen Sie, dass der generierte Code gut ist?"

Vier Stufen — und die erste ist die wichtigste:

1. **Kann ich erklären, was er tut?** Wenn nein, lasse ich es kleiner nochmal
   machen. Ich committe nichts, was ich nicht lesen kann.
2. **Läuft er durch die Prüfungen?** Typecheck, Lint, Tests, Build.
3. **Tut er das Richtige?** Im Browser, mit echten Daten angeschaut.
4. **Hält er in Produktion?** Logs, und Rückmeldungen von Nutzern.

**Was ich nicht behaupte:**
> „Ich kann nicht beurteilen, ob eine Architektur in zwei Jahren noch trägt.
> Das ist genau die Art Urteil, die ich mir gerade erarbeite."

### „Was ist das Risiko an Ihrer Arbeitsweise?"

Diese Frage kommt vielleicht — sie ehrlich zu beantworten, wirkt stark:

> „Das größte Risiko ist, dass ich etwas übernehme, das funktioniert, obwohl
> ich nicht ganz verstehe, warum. Dann kann ich es später nicht reparieren.
>
> Dagegen habe ich zwei Regeln: kleine Schritte, damit ich den Diff noch lesen
> kann. Und alles, was in Produktion schiefging, wird zu einem Test — mit dem
> Datum und dem Grund. Dann überlebt das Wissen auch die nächste Änderung.
>
> Und der zweite Teil ist: Ich arbeite an den Grundlagen, damit dieses Risiko
> kleiner wird."

---

## Kleines Glossar

| Begriff | Einfach erklärt |
|---|---|
| **Repository (Repo)** | Ordner mit dem Code plus vollständiger Änderungshistorie |
| **Commit** | Ein gespeicherter Änderungsstand mit Beschreibung |
| **Diff** | Die Gegenüberstellung von vorher und nachher |
| **Branch** | Ein Seitenstrang, um ohne Risiko zu arbeiten |
| **CI** | Automatik, die bei jedem Push Tests laufen lässt |
| **Linter** | Programm, das Code auf typische Fehler prüft |
| **Typecheck** | Prüfung, ob alle Datentypen zusammenpassen |
| **Build** | Aus dem Quellcode das fertige Auslieferungspaket machen |
| **Deploy** | Das fertige Paket online stellen |
| **Komponente** | Wiederverwendbarer Baustein der Oberfläche |
| **Props** | Die Werte, die man einer Komponente mitgibt |
| **State** | Daten, die sich ändern können und die Anzeige aktualisieren |
| **Hook** | React-Funktion, die mit `use` beginnt (`useState`, `useScroll`) |
| **Hydration** | Wenn JavaScript das fertige HTML im Browser übernimmt |
| **SSR** | Die Seite wird auf dem Server erzeugt |
| **API** | Feste Schnittstelle zwischen zwei Programmen |
| **SSH** | Verschlüsselte Verbindung, um auf einem Server zu arbeiten |
| **Migration** | Ein versionierter Schritt, der die Datenbankstruktur ändert |
| **fail-closed** | Im Zweifel sperren statt freigeben |
