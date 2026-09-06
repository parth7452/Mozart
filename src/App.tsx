import { useMemo, useRef, useState } from "react";
import { Piano } from "./components/Piano";
import { COMPOSITIONS } from "./data/compositions";
import { melodyDurationSeconds, type Note } from "./music";
import { Synth } from "./synth";
import "./App.css";

export default function App() {
  const synthRef = useRef<Synth | null>(null);
  const getSynth = () => (synthRef.current ??= new Synth());

  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayNote = (note: Note) => {
    setActiveNote(note);
    void getSynth().playNote(note);
    window.setTimeout(() => setActiveNote((n) => (n === note ? null : n)), 300);
  };

  const handlePlayComposition = async (id: string) => {
    const piece = COMPOSITIONS.find((c) => c.id === id);
    if (!piece || playingId) return;
    setPlayingId(id);
    try {
      await getSynth().playMelody(piece.melody, piece.bpm, (index) => {
        setActiveNote(piece.melody[index]?.note ?? null);
      });
    } finally {
      setPlayingId(null);
      setActiveNote(null);
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>
          <span className="note-glyph">&#9835;</span> Mozart
        </h1>
        <p className="tagline">
          Play famous melodies in your browser with a tiny Web Audio synth.
        </p>
      </header>

      <section className="panel">
        <h2>Compositions</h2>
        <ul className="composition-list">
          {COMPOSITIONS.map((piece) => (
            <CompositionRow
              key={piece.id}
              title={piece.title}
              koechel={piece.koechel}
              year={piece.year}
              seconds={melodyDurationSeconds(piece.melody, piece.bpm)}
              isPlaying={playingId === piece.id}
              disabled={playingId !== null && playingId !== piece.id}
              onPlay={() => handlePlayComposition(piece.id)}
            />
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Keyboard</h2>
        <p className="hint">Click the keys to play — highlighted keys follow the melody.</p>
        <Piano activeNote={activeNote} onPlay={handlePlayNote} />
      </section>

      <footer className="footer">
        <span>Built with React + Vite · Web Audio API</span>
      </footer>
    </div>
  );
}

interface CompositionRowProps {
  title: string;
  koechel: string;
  year: number;
  seconds: number;
  isPlaying: boolean;
  disabled: boolean;
  onPlay: () => void;
}

function CompositionRow({
  title,
  koechel,
  year,
  seconds,
  isPlaying,
  disabled,
  onPlay,
}: CompositionRowProps) {
  const duration = useMemo(() => `${seconds.toFixed(1)}s`, [seconds]);
  return (
    <li className={`composition${isPlaying ? " playing" : ""}`}>
      <div className="composition-meta">
        <span className="composition-title">{title}</span>
        <span className="composition-sub">
          {koechel} · {year} · {duration}
        </span>
      </div>
      <button
        type="button"
        className="play-btn"
        onClick={onPlay}
        disabled={disabled}
        aria-label={`Play ${title}`}
      >
        {isPlaying ? "Playing…" : "▶ Play"}
      </button>
    </li>
  );
}
