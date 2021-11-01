import chalk, { ChalkFunction } from "chalk";
import { BOTTLE_CAPACITY, Colors } from "./Constants";
import { Bottle } from "./Bottle";
import { State } from "./State";

// const BLOCK_SYMBOL = "🀫";
const BLOCK_SYMBOL = "█";
// const BLOCK_SYMBOL = "▇";
// const SPACE_SYMBOL = ".";
const SPACE_SYMBOL = " ";

function name2rgb(name: Colors): ChalkFunction {
  const colorMap: Record<Colors, [number, number, number]> = {
    [Colors.EMPTY]: [0, 0, 0],
    [Colors.RED]: [196, 42, 34],
    [Colors.BLUE]: [59, 38, 193],
    [Colors.LIGHTBLUE]: [86, 161, 228],
    [Colors.GREY]: [99, 100, 102],
    [Colors.BROWN]: [125, 75, 8],
    [Colors.LIGHTGREEN]: [97, 215, 125],
    [Colors.YELLOWGREEN]: [120, 152, 14],
    [Colors.DARKGREEN]: [17, 101, 50],
    [Colors.VIOLET]: [114, 39, 147],
    [Colors.LIGHTYELLOW]: [241, 219, 88],
    [Colors.ORANGE]: [232, 141, 65],
    [Colors.PINK]: [234, 94, 123],
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
  const M = state.bottles.length * 3 + 1;

  type T = Colors | null;
  const canvas: T[][] = Array.from({ length: N }).map(
    () => Array.from({ length: M }).fill(null) as T[]
  );

  state.bottles.forEach((bottle, idx) => {
    const bottleColors = drawBottle(bottle);
    for (let i = 0; i < bottleColors.length; i++) {
      canvas[N - i - 1][idx * 3 + 1] = bottleColors[i];
      canvas[N - i - 1][idx * 3 + 2] = bottleColors[i];
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

export function makeProgressTracker() {
  let counter = 0;

  return function showProgress(state: State, hashMap: Map<string, boolean>) {
    counter += 1;
    if (Math.random() > 0.999) {
      console.log(
        `Tried ${counter} states, found ${hashMap.size} unique states`
      );
      drawState(state);

      // drawState(state, `Depth ${trail.length}, move: ${move[0]} -> ${move[1]}`);
      // console.log(`Depth ${trail.length}, move: ${move[0]} -> ${move[1]}`);
    }
  };
}
