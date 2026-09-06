/**
 * Small music-theory helpers used by the Mozart player.
 *
 * These functions are intentionally pure so they can be unit tested without a
 * browser or the Web Audio API.
 */

export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

/** A scientific-pitch note, e.g. "A4" or "C#5". */
export type Note = `${NoteName}${number}`;

const NOTE_REGEX = /^([A-G]#?)(-?\d+)$/;

/**
 * Convert a scientific-pitch note (e.g. "A4") into a MIDI note number.
 * Middle C ("C4") is MIDI 60, and "A4" is MIDI 69.
 */
export function noteToMidi(note: Note): number {
  const match = NOTE_REGEX.exec(note);
  if (!match) {
    throw new Error(`Invalid note: "${note}"`);
  }
  const [, name, octave] = match;
  const index = NOTE_NAMES.indexOf(name as NoteName);
  if (index === -1) {
    throw new Error(`Invalid note name: "${name}"`);
  }
  return index + (Number(octave) + 1) * 12;
}

/**
 * Return the fundamental frequency (Hz) of a note using equal temperament
 * with A4 = 440 Hz as the reference pitch.
 */
export function noteToFrequency(note: Note): number {
  const midi = noteToMidi(note);
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/** A single event in a melody: which note to play and for how long (in beats). */
export interface MelodyNote {
  note: Note;
  beats: number;
}

/** Total duration of a melody in seconds at a given tempo (beats per minute). */
export function melodyDurationSeconds(
  melody: readonly MelodyNote[],
  bpm: number,
): number {
  if (bpm <= 0) {
    throw new Error(`bpm must be positive, received ${bpm}`);
  }
  const secondsPerBeat = 60 / bpm;
  return melody.reduce((total, n) => total + n.beats * secondsPerBeat, 0);
}
