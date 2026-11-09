import type { Game, GameCategory } from "@/types/game";

export const CATEGORIES: ("All" | GameCategory)[] = ["All", "Puzzle", "Arcade", "Casual", "Merge"];

export const games: Game[] = [
  { id: "1", name: "Arrow Puzzle", slug: "arrow-puzzle", emoji: "🏹", description: "Clear every arrow before you run out of lives.", category: "Puzzle", status: "live", accentColor: "#a855f7" },
  { id: "2", name: "Screw Puzzle", slug: "screw-puzzle", emoji: "🔩", description: "Unscrew the bolts in the right order.", category: "Puzzle", status: "soon", accentColor: "#22d3ee" },
  { id: "3", name: "Merge Fruit", slug: "merge-fruit", emoji: "🍉", description: "Drop and merge fruits to grow the biggest one.", category: "Merge", status: "soon", accentColor: "#f472b6" },
  { id: "4", name: "Clutter Sort", slug: "clutter-sort", emoji: "🧺", description: "Tidy the mess into the right boxes.", category: "Casual", status: "soon", accentColor: "#fbbf24" },
  { id: "5", name: "Water Sort", slug: "water-sort", emoji: "🧪", description: "Pour colours until every tube is one shade.", category: "Puzzle", status: "soon", accentColor: "#38bdf8" },
  { id: "6", name: "Stack Tiles", slug: "stack-tiles", emoji: "🧱", description: "Stack tiles perfectly and build sky high.", category: "Arcade", status: "soon", accentColor: "#fb7185" },
  { id: "7", name: "Bubble Shooter", slug: "bubble-shooter", emoji: "🫧", description: "Aim, shoot and pop matching bubbles.", category: "Arcade", status: "soon", accentColor: "#34d399" },
  { id: "8", name: "Knitting Zen", slug: "knitting-zen", emoji: "🧶", description: "Relax and untangle colourful yarn.", category: "Casual", status: "soon", accentColor: "#c084fc" },
  { id: "9", name: "Tap Jump", slug: "tap-jump", emoji: "🦘", description: "Tap to jump over gaps. How far can you go?", category: "Arcade", status: "soon", accentColor: "#facc15" },
  { id: "10", name: "Color Match", slug: "color-match", emoji: "🎨", description: "Match the colour before the timer runs out.", category: "Casual", status: "soon", accentColor: "#f97316" },
  { id: "11", name: "Hex Merge", slug: "hex-merge", emoji: "⬢", description: "Merge hex tiles into bigger numbers.", category: "Merge", status: "soon", accentColor: "#2dd4bf" },
  { id: "12", name: "Number Blast", slug: "number-blast", emoji: "💥", description: "Blast number groups and chain big combos.", category: "Casual", status: "soon", accentColor: "#e879f9" },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);
