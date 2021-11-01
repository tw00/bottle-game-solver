import { writeFileSync } from "fs";
import L309 from "./src/levels/level309";
import { drawState } from "./src/Print";
import { DFS } from "./src/Solver";

drawState(L309, "Init:");

const solution = DFS(L309);

console.log("Found solution:", solution);

writeFileSync("solution.json", JSON.stringify(solution, null, 2));
