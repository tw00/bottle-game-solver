import { default as s0 } from "../src/levels/level309";
import { drawState } from "../src/Print";

try {
  drawState(s0, "before");

  const s1 = s0.pour(0, 13);

  drawState(s1, "step 1");

  const s2 = s1.pour(4, 12);

  drawState(s2, "step 2");

  const s3 = s2.pour(4, 13);

  drawState(s3, "step 3");

  // const s4 = s3.pour(5, 12);

  console.log("s3 === s3", s3.equal(s3));
  console.log("s3 !== s2", s3.equal(s2));
  console.log("s2 !== s3", s2.equal(s3));
} catch (error) {
  console.log(error);
}
