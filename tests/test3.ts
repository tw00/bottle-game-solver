import { default as s0 } from "../levels/level309";
import { drawState } from "../src/Print";

try {
  s0.set(1, []);
  s0.set(3, []);
  drawState(s0, "init");
  const score = s0.getScore();
  console.log(`Score: ${score}`);
  console.log(`Hash: ${s0.getHash()}`);
} catch (error) {
  console.log(error);
}
