import L309 from "./level309";
import { drawState } from "./Print";
import { DFS } from "./Solver";

console.log(L309);
drawState(L309, "Init");

const solution = DFS(L309);
console.log("solution", solution);
