import L309 from "./src/levels/level309";
import { drawState } from "./src/Print";
import { DFS } from "./src/Solver";

// console.log(L309);
drawState(L309, "Init:");

const solution = DFS(L309);
console.log("solution", solution);
