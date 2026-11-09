export type GameCategory = "Puzzle" | "Arcade" | "Casual" | "Merge";
export type GameStatus = "live" | "soon";

export interface Game {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  description: string;
  category: GameCategory;
  status: GameStatus;
  accentColor: string;
}
