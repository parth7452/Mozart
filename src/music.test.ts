import { describe, it, expect } from "vitest";
import {
  noteToMidi,
  noteToFrequency,
  melodyDurationSeconds,
  type MelodyNote,
} from "./music";

describe("noteToMidi", () => {
  it("maps middle C to MIDI 60", () => {
    expect(noteToMidi("C4")).toBe(60);
  });

  it("maps A4 to MIDI 69", () => {
    expect(noteToMidi("A4")).toBe(69);
  });

  it("handles sharps", () => {
    expect(noteToMidi("C#4")).toBe(61);
  });

  it("throws on an invalid note", () => {
    // @ts-expect-error deliberately invalid input for the test
    expect(() => noteToMidi("H9")).toThrow();
  });
});

describe("noteToFrequency", () => {
  it("returns 440 Hz for A4", () => {
    expect(noteToFrequency("A4")).toBeCloseTo(440, 6);
  });

  it("returns ~261.63 Hz for middle C", () => {
    expect(noteToFrequency("C4")).toBeCloseTo(261.6256, 3);
  });

  it("doubles frequency across an octave", () => {
    expect(noteToFrequency("A5")).toBeCloseTo(880, 6);
  });
});

describe("melodyDurationSeconds", () => {
  const melody: MelodyNote[] = [
    { note: "C4", beats: 1 },
    { note: "C4", beats: 1 },
    { note: "G4", beats: 2 },
  ];

  it("sums note durations at a given tempo", () => {
    // 4 beats at 120 bpm => 2 seconds
    expect(melodyDurationSeconds(melody, 120)).toBeCloseTo(2, 6);
  });

  it("throws on a non-positive tempo", () => {
    expect(() => melodyDurationSeconds(melody, 0)).toThrow();
  });
});
