import { readFileSync } from "fs";
import { drawState } from "./src/Print";
import { StateWithMeta } from "./src/Solver";

const solution = JSON.parse(
  readFileSync("solution.json", "utf-8")
) as StateWithMeta[];

solution.forEach(({ state, move }, idx) => {
  drawState(state, `Step ${idx + 1}: #${move[0] + 1} -> #${move[1] + 1}`);
});
