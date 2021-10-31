import { InvalidPourError } from "./Errors";
import { State } from "./State";

interface StateAndMove {
  state: State;
  move: [number, number];
}

function generateMoves(s: State): StateAndMove[] {
  const nextStates: StateAndMove[] = [];
  const n = s.bottles.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        continue;
      }
      try {
        const newState = s.pour(i, j);
        nextStates.push({ state: newState, move: [i, j] });
      } catch (error) {
        if (error instanceof InvalidPourError) {
          continue;
        } else {
          throw error;
        }
      }
    }
  }
  return nextStates;
}

export function DFS(
  initState: State,
  trail?: StateAndMove[],
  depth = 0
): StateAndMove[] | null {
  const nextStates = generateMoves(initState);
  console.log("depth", depth);

  if (!trail) {
    trail = [{ state: initState, move: [0, 0] }];
  }

  for (const { state, move } of nextStates) {
    if (state.isSolved()) {
      // @ts-ignore
      return [{ state, move, isSolved: true }];
    }

    const hasPreviousVisit: boolean = trail.some((x) => x.state.equal(state));
    if (hasPreviousVisit) {
      return null;
    }

    const solution = DFS(state, [...trail, { state, move }], depth + 1);
    if (solution) {
      return [{ state, move }, ...solution];
    }
  }

  return null;
}
