import { default as s0 } from "../src/levels/level309";
import { drawState } from "../src/Print";
import { generateMoves } from "../src/Solver";

try {
  const list = generateMoves(s0);
  drawState(s0, "init");
  console.log(`Found #${list.length} next states`);

  list.forEach(({ state, move }) => {
    drawState(state, `move: ${move[0]} -> ${move[1]}`);
  });
} catch (error) {
  console.log(error);
}
