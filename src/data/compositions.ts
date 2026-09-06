import type { MelodyNote, Note } from "../music";

export interface Composition {
  id: string;
  title: string;
  koechel: string;
  year: number;
  /** Default tempo in beats per minute. */
  bpm: number;
  melody: MelodyNote[];
}

const q = (note: Note): MelodyNote => ({ note, beats: 1 });
const h = (note: Note): MelodyNote => ({ note, beats: 2 });

/**
 * A tiny hand-transcribed catalogue of famous Mozart openings. The melodies are
 * short, recognisable excerpts — enough to demo the in-browser synthesiser.
 */
export const COMPOSITIONS: Composition[] = [
  {
    id: "twinkle",
    title: "Twelve Variations on \"Ah vous dirai-je, Maman\"",
    koechel: "K. 265",
    year: 1785,
    bpm: 132,
    melody: [
      q("C4"),
      q("C4"),
      q("G4"),
      q("G4"),
      q("A4"),
      q("A4"),
      h("G4"),
      q("F4"),
      q("F4"),
      q("E4"),
      q("E4"),
      q("D4"),
      q("D4"),
      h("C4"),
    ],
  },
  {
    id: "eine-kleine",
    title: "Eine kleine Nachtmusik — Allegro",
    koechel: "K. 525",
    year: 1787,
    bpm: 140,
    melody: [
      q("G4"),
      q("D4"),
      q("G4"),
      q("D4"),
      q("G4"),
      q("D4"),
      q("G4"),
      q("B4"),
      q("A4"),
      q("D4"),
      q("F#4"),
      q("D4"),
      q("A4"),
      q("D4"),
      h("F#4"),
    ],
  },
  {
    id: "turkish",
    title: "Rondo alla Turca",
    koechel: "K. 331",
    year: 1783,
    bpm: 128,
    melody: [
      q("B4"),
      q("A4"),
      q("G#4"),
      q("A4"),
      q("C5"),
      q("B4"),
      q("A4"),
      q("B4"),
      q("D5"),
      q("C5"),
      q("B4"),
      q("C5"),
      h("E5"),
    ],
  },
];
