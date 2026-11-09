import GameGrid from "@/components/GameGrid";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-14 text-center sm:pt-20">
        <h1 className="anim-fade-up bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-6xl">
          Quick games. Zero downloads.
        </h1>
        <p className="anim-fade-up mt-4 text-base text-gray-400 sm:text-lg" style={{ animationDelay: "80ms" }}>
          Tap a card and play instantly, right in your browser.
        </p>
        <a
          href="#games"
          className="anim-fade-up mt-8 inline-block rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 px-7 py-3 font-bold text-black shadow-[0_0_30px_-6px_#a855f7] transition duration-200 hover:scale-105 active:scale-95"
          style={{ animationDelay: "160ms" }}
        >
          Browse games ↓
        </a>
      </section>
      <GameGrid />
    </>
  );
}
