import { Colors as C } from "./Constants";
import { State } from "./State";

const s = new State(14);

s.set(0, [C.GREY, C.BLUE, C.BLUE, C.LIGHTBLUE]);
s.set(1, [C.LIGHTYELLOW, C.YELLOWGREEN, C.BLUE, C.LIGHTGREEN]);
s.set(2, [C.DARKGREEN, C.DARKGREEN, C.DARKGREEN, C.BROWN]);
s.set(3, [C.LIGHTBLUE, C.VIOLET, C.BROWN, C.GREY]);
s.set(4, [C.YELLOWGREEN, C.LIGHTYELLOW, C.LIGHTBLUE, C.RED]);
s.set(5, [C.LIGHTBLUE, C.PINK, C.VIOLET, C.GREY]);
s.set(6, [C.LIGHTBLUE, C.DARKGREEN, C.ORANGE, C.PINK]);
s.set(7, [C.RED, C.VIOLET, C.ORANGE, C.LIGHTGREEN]);
s.set(8, [C.LIGHTYELLOW, C.GREY, C.LIGHTGREEN, C.PINK]);
s.set(9, [C.ORANGE, C.YELLOWGREEN, C.BLUE, C.YELLOWGREEN]);
s.set(10, [C.RED, C.LIGHTYELLOW, C.BROWN, C.BROWN]);
s.set(11, [C.VIOLET, C.RED, C.ORANGE, C.PINK]);
s.set(12, []);
s.set(13, []);

export default s;
