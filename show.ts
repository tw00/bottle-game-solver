import { readFileSync } from "fs";
import { drawState } from "./src/Print";
import { StateWithMeta } from "./src/Solver";

const STRICT_MODE = process.env.STRICT_MODE === "true";

const solution: StateWithMeta[] = JSON.parse(
  readFileSync(STRICT_MODE ? "solution-strict.json" : "solution.json", "utf-8")
);

solution.forEach(({ state, move }, idx) => {
  drawState(state, `Step ${idx + 1}: #${move[0] + 1} -> #${move[1] + 1}\n`);
  console.log(" 1  2  3  4  5  6  7  8  9  10 11 12 13 14");
  console.log();
});
