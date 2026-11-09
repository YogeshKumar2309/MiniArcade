import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
          MiniArcade
        </Link>
        <span className="text-xs text-gray-400">Tiny games. Big fun.</span>
      </div>
    </header>
  );
}
