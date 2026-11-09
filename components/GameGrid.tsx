"use client";

import { useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import GameCard from "./GameCard";
import { CATEGORIES, games } from "@/lib/games";

export default function GameGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [parent] = useAutoAnimate({ duration: 200 });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return games.filter(
      (g) => (category === "All" || g.category === category) && g.name.toLowerCase().includes(q),
    );
  }, [query, category]);

  return (
    <section id="games" className="mx-auto max-w-6xl scroll-mt-16 px-4">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search games…"
        aria-label="Search games"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-purple-400 focus:shadow-[0_0_20px_-4px_#a855f7]"
      />

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categories">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={
              "shrink-0 rounded-full border px-4 py-1.5 text-sm transition duration-150 " +
              (category === c
                ? "border-transparent bg-gradient-to-r from-purple-500 to-cyan-400 font-semibold text-black"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div ref={parent} className="mt-6 grid select-none grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {filtered.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-gray-400">No games match “{query}”. Try another name or category.</p>
      )}
    </section>
  );
}
