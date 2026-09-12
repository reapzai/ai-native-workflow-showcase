/**
 * The section registry drives three things at once: the anchor ids on the
 * sections themselves, the progress rail, and the keyboard navigation in
 * presentation mode. Keeping them in one list means they cannot drift apart.
 */

export type SectionId =
  | "hero"
  | "fit"
  | "workflow"
  | "prompt"
  | "projects"
  | "quality"
  | "learning"
  | "outro";

export type SectionMeta = {
  id: SectionId;
  /** Short label for the progress rail. */
  label: string;
  /** Kicker rendered above the section heading. */
  kicker?: string;
};

export const SECTIONS: SectionMeta[] = [
  { id: "hero", label: "Start" },
  { id: "fit", label: "Passung", kicker: "Warum diese Rolle" },
  { id: "workflow", label: "Workflow", kicker: "Wie ich arbeite" },
  { id: "prompt", label: "Kontext", kicker: "Wie ich Claude briefe" },
  { id: "projects", label: "Systeme", kicker: "Echte Systeme, keine Demos" },
  { id: "quality", label: "Qualität", kicker: "Nach der Generierung" },
  { id: "learning", label: "Lernen", kicker: "Wo ich besser werde" },
  { id: "outro", label: "Ende" },
];
