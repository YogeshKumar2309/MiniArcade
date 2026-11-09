import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arrow Puzzle — MiniArcade",
  description: "Tap arrows with a clear path to fly them off the board. Clear every arrow to win.",
};

const ArrowPuzzle = dynamic(() => import("@/components/ArrowPuzzle"), {
  loading: () => <p className="py-20 text-center text-gray-400">Loading game…</p>,
});

export default function ArrowPuzzlePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-4">
      <Link href="/" className="inline-block text-sm text-gray-400 transition hover:text-white">
        ← Back to Home
      </Link>
      <h1 className="mt-2 text-center text-2xl font-extrabold text-white">🏹 Arrow Puzzle</h1>
      <ArrowPuzzle />
    </div>
  );
}
