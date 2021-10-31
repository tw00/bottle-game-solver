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

// class StateTree {
//   state: State;
//   children: State[];
// }

export function DFS(
  initState: State,
  trail?: State[],
  depth = 0
): StateAndMove[] | null {
  const nextStates = generateMoves(initState);
  console.log("depth", depth);

  if (!trail) {
    trail = [initState];
  }

  for (const { state, move } of nextStates) {
    if (state.isSolved()) {
      // @ts-ignore
      return [{ state, move, isSolved: true }];
    }
    const previousVisit: boolean = trail.some((s) => s.equal(state));
    console.log("previousVisit", previousVisit);
    if (previousVisit) {
      console.log("Found loop");
      return null;
    }
    const result = DFS(state, [...trail, state], depth + 1);
    if (result) {
      return [{ state, move }, ...result];
    }
  }

  return null;
}
