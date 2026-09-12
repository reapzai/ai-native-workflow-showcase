import type { Metadata, Viewport } from "next";
import {
  Schibsted_Grotesk,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

/*
 * Three families, each with one job:
 *   grotesk — everything structural
 *   serif   — the three editorial statement lines, nothing else
 *   mono    — step numbers, labels, prompt and command text
 *
 * next/font self-hosts these at build time, so the page renders identically
 * without a network connection. That matters here: it is shown live.
 */
const grotesk = Schibsted_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const serifDisplay = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const monoCode = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ali / reapz — KI-gestützte Entwicklung",
  description:
    "Wie ich mit Claude Code aus Anforderungen lauffähige Produkte mache — und wie ich prüfe, dass sie halten. Vier Systeme in Produktion.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Ali / reapz — KI-gestützte Entwicklung",
    description:
      "Von der Idee in Produktion. Workflow, Qualitätssicherung und vier reale Systeme.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${grotesk.variable} ${serifDisplay.variable} ${monoCode.variable} antialiased`}
    >
      <head>
        {/*
         * Entrance animations are server-rendered at opacity 0 and revealed by
         * script. With JavaScript unavailable that would leave a blank page —
         * unacceptable for something shown live — so the fallback puts every
         * revealed element straight into its finished state.
         */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
