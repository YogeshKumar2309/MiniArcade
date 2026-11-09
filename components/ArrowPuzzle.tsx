"use client";

import { useEffect, useRef, useState } from "react";
import { countArrows, getLevel, isRemovable, removeArrow, type Dir, type Grid } from "@/lib/arrowPuzzleEngine";

type Status = "playing" | "won" | "lost";

const MAX_LIVES = 3;
const POINTS = 10;
const GLYPH: Record<Dir, string> = { up: "↑", down: "↓", left: "←", right: "→" };
const TONE: Record<Dir, string> = {
  up: "from-fuchsia-500 to-purple-700 shadow-fuchsia-500/30",
  down: "from-cyan-400 to-blue-600 shadow-cyan-400/30",
  left: "from-emerald-400 to-teal-600 shadow-emerald-400/30",
  right: "from-pink-500 to-rose-600 shadow-pink-500/30",
};
const CELL = "flex aspect-square min-h-0 items-center justify-center rounded-xl bg-gradient-to-br text-3xl font-black text-white shadow-lg sm:text-4xl ";

export default function ArrowPuzzle() {
  const [level, setLevel] = useState(1);
  const [initial, setInitial] = useState<Grid>(() => getLevel(1));
  const [grid, setGrid] = useState<Grid>(initial);
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<Status>("playing");
  const [flying, setFlying] = useState<Record<string, Dir>>({});
  const [shaking, setShaking] = useState<string | null>(null);
  const [round, setRound] = useState(0); // bumps to replay the level-in animation
  const startScore = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const load = (lvl: number, g: Grid, baseScore: number) => {
    setLevel(lvl);
    setInitial(g);
    setGrid(g);
    setLives(MAX_LIVES);
    setScore(baseScore);
    startScore.current = baseScore;
    setFlying({});
    setShaking(null);
    setStatus("playing");
    setRound((r) => r + 1);
  };

  const tap = (r: number, c: number) => {
    const cell = grid[r][c];
    if (status !== "playing" || lives <= 0 || !cell) return;
    const key = `${r}-${c}`;

    if (isRemovable(grid, r, c)) {
      const next = removeArrow(grid, r, c);
      setGrid(next);
      setScore((s) => s + POINTS);
      setFlying((f) => ({ ...f, [key]: cell.dir }));
      later(() => setFlying((f) => { const n = { ...f }; delete n[key]; return n; }), 320);
      if (countArrows(next) === 0) later(() => setStatus("won"), 380);
    } else {
      const left = lives - 1;
      setLives(left);
      setShaking(key);
      later(() => setShaking((s) => (s === key ? null : s)), 360);
      if (left <= 0) later(() => setStatus("lost"), 450);
    }
  };

  const nextLevel = () => load(level + 1, getLevel(level + 1), score);
  const retry = () => load(level, initial, startScore.current);

  const n = grid.length;
  const remaining = countArrows(grid);

  return (
    <div className="mx-auto w-full max-w-[520px] px-3 pb-6 pt-2">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
        <span className="font-semibold text-purple-300">Level {level}</span>
        <span aria-label={`${lives} lives left`} className="text-lg tracking-wider">
          {Array.from({ length: MAX_LIVES }, (_, i) => (i < lives ? "❤️" : "🖤")).join("")}
        </span>
        <span className="font-semibold text-cyan-300">Score {score}</span>
      </div>
      <p className="mt-2 text-center text-xs text-gray-400">
        Tap an arrow with a clear path to the edge. {remaining} left.
      </p>

      <div key={round} className="anim-level-in mt-4 grid select-none gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const key = `${r}-${c}`;
            if (cell) {
              return (
                <button
                  key={key}
                  onClick={() => tap(r, c)}
                  aria-label={`Arrow ${cell.dir}`}
                  className={CELL + TONE[cell.dir] + " transition-transform duration-150 active:scale-90 " + (shaking === key ? "anim-shake" : "")}
                >
                  {GLYPH[cell.dir]}
                </button>
              );
            }
            const ghost = flying[key];
            return (
              <div key={key} className="relative aspect-square rounded-xl bg-white/[0.03]">
                {ghost && (
                  <div className={"pointer-events-none absolute inset-0 z-30 " + CELL + TONE[ghost] + " fly-" + ghost}>
                    {GLYPH[ghost]}
                  </div>
                )}
              </div>
            );
          }),
        )}
      </div>

      {status !== "playing" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="anim-pop-in w-full max-w-xs rounded-2xl border border-white/10 bg-[#12121a] p-6 text-center shadow-[0_0_40px_-8px_#a855f7]">
            <div className="text-5xl">{status === "won" ? "🎉" : "💔"}</div>
            <h2 className="mt-3 text-2xl font-extrabold text-white">{status === "won" ? "Level cleared!" : "Out of lives"}</h2>
            <p className="mt-1 text-sm text-gray-400">Score: {score}</p>
            <button
              onClick={status === "won" ? nextLevel : retry}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 py-3 font-bold text-black transition active:scale-95"
            >
              {status === "won" ? "Next Level" : "Retry"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
