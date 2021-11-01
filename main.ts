import chalk from "chalk";
import { writeFileSync } from "fs";

import L309 from "./levels/level309";
import { drawState, makeProgressTracker } from "./src/Print";
import { createSolver } from "./src/Solver";
import { ScoreMethod } from "./src/State";

const FIND_BETTER_SOLUTIONS = true;
const STRICT_MODE = process.env.STRICT_MODE === "true";
const SCORE_METHOD = STRICT_MODE
  ? ScoreMethod.RANDOM
  : ScoreMethod.HEURISTIC_PREFER_EMPTY;

drawState(L309, "Init:");
const showProgress = makeProgressTracker();
const showProgressNoop = () => {};

let bestSolution = STRICT_MODE ? 39 : 41;
do {
  const solver = createSolver({
    method: SCORE_METHOD,
    tracker: FIND_BETTER_SOLUTIONS ? showProgressNoop : showProgress,
  });

  const solution = solver(L309);

  if (solution) {
    console.log(chalk.green(`Found solution with ${solution.length} steps!`));

    if (solution.length < bestSolution) {
      writeFileSync(
        STRICT_MODE ? "solution-strict.json" : "solution.json",
        JSON.stringify(solution, null, 2)
      );
      bestSolution = solution.length;
    }
  } else {
    console.log(chalk.red("no solution found"));
  }
} while (FIND_BETTER_SOLUTIONS);
