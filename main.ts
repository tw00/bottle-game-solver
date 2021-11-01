import chalk from "chalk";
import { writeFileSync } from "fs";

import L309 from "./levels/level309";
import { drawState, makeProgressTracker } from "./src/Print";
import { DFS } from "./src/Solver";

drawState(L309, "Init:");

const showProgress = makeProgressTracker();

const solution = DFS(L309, showProgress);

console.log(chalk.green("Found solution!"));

writeFileSync("solution.json", JSON.stringify(solution, null, 2));
