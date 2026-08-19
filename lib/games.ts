// Edit this list any time the schedule changes.
// "field" is a placeholder — update with the real field/park name for each game.
export type Game = {
  id: string; // stable id used as the Redis key — don't change once parents start signing up
  number: number;
  date: string; // display string
  field: string;
};

export const SEASON_LABEL = "Fall 2026 — 1st Grade";

export const games: Game[] = [
  { id: "g1", number: 1, date: "Sat, Sep 12, 2026", field: "Field TBD" },
  { id: "g2", number: 2, date: "Sat, Sep 19, 2026", field: "Field TBD" },
  { id: "g3", number: 3, date: "Sat, Sep 26, 2026", field: "Field TBD" },
  { id: "g4", number: 4, date: "Sat, Oct 3, 2026", field: "Field TBD" },
  { id: "g5", number: 5, date: "Sat, Oct 10, 2026", field: "Field TBD" },
  { id: "g6", number: 6, date: "Sat, Oct 17, 2026", field: "Field TBD" },
  { id: "g7", number: 7, date: "Sat, Oct 24, 2026", field: "Field TBD" },
  { id: "g8", number: 8, date: "Sat, Oct 31, 2026", field: "Field TBD" },
];
