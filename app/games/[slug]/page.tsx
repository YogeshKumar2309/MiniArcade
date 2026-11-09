import Link from "next/link";
import { notFound } from "next/navigation";
import { games, getGame } from "@/lib/games";

export function generateStaticParams() {
  return games.filter((g) => g.status === "soon").map((g) => ({ slug: g.slug }));
}

export default async function ComingSoonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <div className="text-6xl">{game.emoji}</div>
      <h1 className="mt-4 text-3xl font-extrabold text-white">{game.name}</h1>
      <span className="mt-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan-300">Coming Soon</span>
      <p className="mt-4 text-gray-400">{game.description} We’re still building this one.</p>
      <Link href="/" className="mt-8 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-6 py-3 font-bold text-black transition active:scale-95">
        ← Back to Home
      </Link>
    </div>
  );
}
