import chalk, { ChalkFunction } from "chalk";
import { BOTTLE_CAPACITY, Colors } from "./Constants";
import { Bottle } from "./Bottle";
import { State } from "./State";

export function name2rgb(name: Colors): ChalkFunction {
  const colorMap: Record<Colors, [number, number, number]> = {
    [Colors.EMPTY]: [255, 255, 255],
    [Colors.RED]: [255, 0, 0],
    [Colors.BLUE]: [0, 0, 255],
    [Colors.LIGHTBLUE]: [100, 100, 255],
    [Colors.GREY]: [100, 100, 100],
    [Colors.BROWN]: [0, 0, 0], // TBD
    [Colors.LIGHTGREEN]: [100, 255, 100],
    [Colors.YELLOWGREEN]: [0, 0, 0], // TBD
    [Colors.DARKGREEN]: [0, 255, 0],
    [Colors.VIOLET]: [255, 0, 255],
    [Colors.LIGHTYELLOW]: [0, 0, 0], // TBD
    [Colors.ORANGE]: [255, 255, 0],
    [Colors.PINK]: [255, 100, 100], // TBD
  };
  return chalk.rgb(...(colorMap[name] ?? [0, 0, 0]));
}

export const BLOCK_SYMBOL = "🀫";

function drawBottle(bottle: Bottle): Colors[] {
  const r = Array.from({ length: BOTTLE_CAPACITY }).fill(
    Colors.EMPTY
  ) as Colors[];
  bottle.colors.forEach((color, idx) => (r[idx] = color));
  return r;
}

export function drawState(state: State, title = "") {
  const N = BOTTLE_CAPACITY + 1;
  const M = (state.bottles.length - 1) * 3 - 2;

  type T = Colors | null;
  const canvas: T[][] = Array.from({ length: N }).map(
    () => Array.from({ length: M }).fill(null) as T[]
  );

  state.bottles.forEach((bottle, idx) => {
    const bottleColors = drawBottle(bottle);
    for (let i = 0; i < bottleColors.length; i++) {
      canvas[i + 1][idx * 3 + 1] = bottleColors[i];
    }
  });

  if (title) {
    console.log(title);
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const name = canvas[i][j];
      process.stdout.write(name ? name2rgb(name)(BLOCK_SYMBOL) : " ");
    }
    process.stdout.write("\n");
  }
}
