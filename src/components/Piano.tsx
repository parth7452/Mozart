import { NOTE_NAMES, type Note, type NoteName } from "../music";

const WHITE_KEYS: NoteName[] = ["C", "D", "E", "F", "G", "A", "B"];

const BLACK_AFTER: Partial<Record<NoteName, NoteName>> = {
  C: "C#",
  D: "D#",
  F: "F#",
  G: "G#",
  A: "A#",
};

interface PianoProps {
  octaves?: number;
  startOctave?: number;
  activeNote?: Note | null;
  onPlay: (note: Note) => void;
}

/** A simple clickable piano keyboard spanning one or more octaves. */
export function Piano({
  octaves = 2,
  startOctave = 4,
  activeNote = null,
  onPlay,
}: PianoProps) {
  const octaveIndexes = Array.from({ length: octaves }, (_, i) => startOctave + i);

  return (
    <div className="piano" role="group" aria-label="Piano keyboard">
      {octaveIndexes.map((octave) =>
        WHITE_KEYS.map((white) => {
          const whiteNote = `${white}${octave}` as Note;
          const blackName = BLACK_AFTER[white];
          const blackNote = blackName
            ? (`${blackName}${octave}` as Note)
            : null;
          return (
            <div className="key-slot" key={whiteNote}>
              <button
                type="button"
                className={`key white${activeNote === whiteNote ? " active" : ""}`}
                onClick={() => onPlay(whiteNote)}
                aria-label={`Play ${whiteNote}`}
              >
                <span className="key-label">{whiteNote}</span>
              </button>
              {blackNote && NOTE_NAMES.includes(blackName as NoteName) && (
                <button
                  type="button"
                  className={`key black${activeNote === blackNote ? " active" : ""}`}
                  onClick={() => onPlay(blackNote)}
                  aria-label={`Play ${blackNote}`}
                />
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}
