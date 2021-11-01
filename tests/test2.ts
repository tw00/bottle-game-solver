import { default as s0 } from "../levels/level309";
import { drawState } from "../src/Print";
import { generateMoves, prioritize } from "../src/Solver";
import { ScoreMethod } from "../src/State";

try {
  const list = prioritize(
    generateMoves(s0),
    ScoreMethod.HEURISTIC_PREFER_EMPTY
  );
  drawState(s0, "init");
  console.log(`Found #${list.length} next states`);

  list.forEach(({ state, move, score }) => {
    drawState(state, `move: ${move[0]} -> ${move[1]}, score: ${score}`);
  });
} catch (error) {
  console.log(error);
}
