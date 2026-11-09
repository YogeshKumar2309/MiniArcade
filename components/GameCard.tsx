import Link from "next/link";
import type { CSSProperties } from "react";
import type { Game } from "@/types/game";

export default function GameCard({ game }: { game: Game }) {
  const live = game.status === "live";
  const style = { "--accent": game.accentColor } as CSSProperties;

  const body = (
    <>
      <div className="flex items-start justify-between">
        <span className="text-4xl" aria-hidden>{game.emoji}</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-gray-300">
          {game.category}
        </span>
      </div>
      <h3 className="mt-3 text-base font-bold text-white sm:text-lg">{game.name}</h3>
      <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-xs text-gray-400 sm:text-sm">{game.description}</p>
      <div
        className={
          "mt-4 rounded-xl py-2 text-center text-sm font-semibold " +
          (live
            ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-black"
            : "border border-white/10 bg-white/5 text-gray-400")
        }
      >
        {live ? "Play" : "Coming Soon"}
      </div>
    </>
  );

  const base = "block rounded-2xl border border-white/10 bg-white/[0.04] p-4 ";

  return live ? (
    <Link
      href={`/games/${game.slug}`}
      style={style}
      className={base + "transition duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_0_28px_-6px_var(--accent)] active:scale-[0.98]"}
    >
      {body}
    </Link>
  ) : (
    <div aria-disabled="true" className={base + "cursor-not-allowed opacity-60"}>
      {body}
    </div>
  );
}
