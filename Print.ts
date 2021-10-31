import chalk, { ChalkFunction } from "chalk";
import { BOTTLE_CAPACITY, Colors } from "./Constants";
import { Bottle } from "./Bottle";
import { State } from "./State";

const BLOCK_SYMBOL = "🀫";
// const SPACE_SYMBOL = ".";
const SPACE_SYMBOL = " ";

function name2rgb(name: Colors): ChalkFunction {
  const colorMap: Record<Colors, [number, number, number]> = {
    [Colors.EMPTY]: [0, 0, 0],
    [Colors.RED]: [254, 83, 72],
    [Colors.BLUE]: [7, 0, 254],
    [Colors.LIGHTBLUE]: [89, 225, 251],
    [Colors.GREY]: [127, 141, 154],
    [Colors.BROWN]: [192, 117, 52],
    [Colors.LIGHTGREEN]: [165, 255, 230],
    [Colors.YELLOWGREEN]: [166, 223, 79],
    [Colors.DARKGREEN]: [48, 168, 99],
    [Colors.VIOLET]: [141, 0, 247],
    [Colors.LIGHTYELLOW]: [251, 255, 202],
    [Colors.ORANGE]: [254, 222, 128],
    [Colors.PINK]: [252, 155, 194],
  };
  return chalk.rgb(...(colorMap[name] ?? [0, 0, 0]));
}

function drawBottle(bottle: Bottle): Colors[] {
  const r = Array.from({ length: BOTTLE_CAPACITY }).fill(
    Colors.EMPTY
  ) as Colors[];
  bottle.colors.forEach((color, idx) => (r[idx] = color));
  return r;
}

export function drawState(state: State, title = "") {
  const N = BOTTLE_CAPACITY;
  const M = state.bottles.length * 3;

  type T = Colors | null;
  const canvas: T[][] = Array.from({ length: N }).map(
    () => Array.from({ length: M }).fill(null) as T[]
  );

  state.bottles.forEach((bottle, idx) => {
    const bottleColors = drawBottle(bottle);
    for (let i = 0; i < bottleColors.length; i++) {
      canvas[N - i - 1][idx * 3 + 1] = bottleColors[i];
    }
  });

  if (title) {
    console.log(title);
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const name = canvas[i][j];
      process.stdout.write(name ? name2rgb(name)(BLOCK_SYMBOL) : SPACE_SYMBOL);
    }
    process.stdout.write("\n");
  }
}
