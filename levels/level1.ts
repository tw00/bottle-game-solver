import { Colors } from "../Constants";
import { State } from "../State";

const s = new State(6);

s.set(0, [Colors.RED, Colors.BLUE, Colors.LIGHTGREEN]);
s.set(1, [Colors.BLUE, Colors.LIGHTGREEN, Colors.BROWN]);
s.set(2, [Colors.BROWN, Colors.LIGHTGREEN, Colors.BROWN]);
s.set(3, [Colors.DARKGREEN, Colors.DARKGREEN, Colors.BLUE]);
s.set(4, [Colors.RED, Colors.RED, Colors.DARKGREEN]);

export default s;
