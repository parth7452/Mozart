import { noteToFrequency, type MelodyNote, type Note } from "./music";

/**
 * A very small Web Audio wrapper. It lazily creates a single AudioContext and
 * plays notes with a short envelope so melodies don't click.
 *
 * This module is browser-only (it touches `window.AudioContext`), so it is kept
 * separate from the pure helpers in `music.ts`.
 */
export class Synth {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new Ctor();
    }
    return this.ctx;
  }

  /** Play a single note starting at `when` (seconds, AudioContext time). */
  private scheduleNote(note: Note, when: number, duration: number): void {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = noteToFrequency(note);

    const attack = 0.01;
    const release = 0.08;
    const peak = 0.25;

    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(peak, when + attack);
    gain.gain.setValueAtTime(peak, when + Math.max(attack, duration - release));
    gain.gain.linearRampToValueAtTime(0, when + duration);

    osc.connect(gain).connect(ctx.destination);
    osc.start(when);
    osc.stop(when + duration);
  }

  /** Play a single note immediately (used by the on-screen piano). */
  async playNote(note: Note, duration = 0.4): Promise<void> {
    const ctx = this.getContext();
    await ctx.resume();
    this.scheduleNote(note, ctx.currentTime, duration);
  }

  /**
   * Play a whole melody at `bpm`. Resolves when the melody finishes and calls
   * `onNote` as each note begins so the UI can highlight it.
   */
  async playMelody(
    melody: readonly MelodyNote[],
    bpm: number,
    onNote?: (index: number) => void,
  ): Promise<void> {
    const ctx = this.getContext();
    await ctx.resume();
    const secondsPerBeat = 60 / bpm;

    let offset = ctx.currentTime + 0.1;
    melody.forEach((item, index) => {
      const duration = item.beats * secondsPerBeat;
      this.scheduleNote(item.note, offset, duration * 0.95);
      if (onNote) {
        const delayMs = (offset - ctx.currentTime) * 1000;
        window.setTimeout(() => onNote(index), delayMs);
      }
      offset += duration;
    });

    const totalMs = (offset - ctx.currentTime) * 1000;
    await new Promise((resolve) => window.setTimeout(resolve, totalMs));
  }
}
