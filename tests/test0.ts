import { Bottle } from "../src/Bottle";
import { Colors } from "../src/Constants";

const b = new Bottle(Colors.RED, Colors.LIGHTGREEN);
console.log("Bottle 1:", b);

const x1 = b.getAvailableSpace();
console.log("getAvailableSpace", x1);

b.fill(Colors.LIGHTGREEN, 2);
console.log("Bottle 2:", b);

const x2 = b.getAvailableSpace();
const y2 = b.getSameColorCount();
console.log("getAvailableSpace", x2);
console.log("getSameColorCount", y2);

const c = b.pop(3);
console.log("Bottle 3:", b, c);
