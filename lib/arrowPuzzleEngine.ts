// Pure game logic — no React.
export type Dir = "up" | "down" | "left" | "right";
export type Cell = { dir: Dir } | null;
export type Grid = Cell[][];

export const DIRS: Dir[] = ["up", "down", "left", "right"];
const DELTA: Record<Dir, [number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

/** True if nothing sits between (r,c) and the grid edge in direction dir. */
function pathClear(grid: Grid, r: number, c: number, dir: Dir): boolean {
  const [dr, dc] = DELTA[dir];
  const n = grid.length;
  let y = r + dr;
  let x = c + dc;
  while (y >= 0 && y < n && x >= 0 && x < n) {
    if (grid[y][x]) return false;
    y += dr;
    x += dc;
  }
  return true;
}

export function isRemovable(grid: Grid, r: number, c: number): boolean {
  const cell = grid[r]?.[c];
  return cell ? pathClear(grid, r, c, cell.dir) : false;
}

export function removeArrow(grid: Grid, r: number, c: number): Grid {
  return grid.map((row, i) => row.map((cell, j) => (i === r && j === c ? null : cell)));
}

export function countArrows(grid: Grid): number {
  return grid.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
}

/** Removing an arrow never blocks another, so greedy removal decides solvability. */
export function isSolvable(grid: Grid): boolean {
  let g = grid;
  let progress = true;
  while (progress && countArrows(g) > 0) {
    progress = false;
    for (let r = 0; r < g.length; r++) {
      for (let c = 0; c < g.length; c++) {
        if (isRemovable(g, r, c)) {
          g = removeArrow(g, r, c);
          progress = true;
        }
      }
    }
  }
  return countArrows(g) === 0;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Builds a level in reverse: each arrow is placed only with a direction whose
 * path is clear of arrows already placed. Removal order = reverse placement
 * order, so at every step at least one arrow is removable → always solvable.
 */
export function generateLevel(size: number, minArrows = Math.ceil(size * size * 0.6)): Grid {
  let best: Grid = [];
  let bestCount = -1;
  for (let attempt = 0; attempt < 30; attempt++) {
    const grid: Grid = Array.from({ length: size }, () => Array<Cell>(size).fill(null));
    const cells = shuffle(Array.from({ length: size * size }, (_, i) => [Math.floor(i / size), i % size]));
    let count = 0;
    for (const [r, c] of cells) {
      const dir = shuffle(DIRS).find((d) => pathClear(grid, r, c, d));
      if (dir) {
        grid[r][c] = { dir };
        count++;
      }
    }
    if (count > bestCount) {
      best = grid;
      bestCount = count;
    }
    if (count >= minArrows) break;
  }
  return best;
}

const CODE: Record<string, Dir> = { U: "up", D: "down", L: "left", R: "right" };
const parse = (rows: string[]): Grid =>
  rows.map((row) => row.split("").map((ch) => (CODE[ch] ? { dir: CODE[ch] } : null)));

// U/D/L/R = arrow, "." = empty. All verified solvable (see isSolvable).
export const HAND_CRAFTED_LEVELS: string[][] = [
  ["LDLUR", "D..LR", "LD.DL", "L.R.R", "LDLDR"],
  ["LUUUU", "LLUUD", "U..DR", "LLR.D", "DDDDD"],
  ["ULURUU", "LL.RRR", "L..L.R", "LL.LUR", "L.UDRD", "DDDDRR"],
];

/** 5x5 for levels 1-5, 6x6 for 6-8, 7x7 from level 9. */
export const levelSize = (level: number) =>
  level <= HAND_CRAFTED_LEVELS.length
    ? HAND_CRAFTED_LEVELS[level - 1][0].length
    : Math.min(7, 5 + Math.floor((level - 3) / 3));

export function getLevel(level: number): Grid {
  if (level <= HAND_CRAFTED_LEVELS.length) return parse(HAND_CRAFTED_LEVELS[level - 1]);
  return generateLevel(levelSize(level));
}
