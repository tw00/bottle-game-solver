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

export function DFS(initState: State): State[] | null {
  const nextStates = generateMoves(initState);
  for (const { state } of nextStates) {
    if (state.isSolved()) {
      return [state];
    }
    const result = DFS(state);
    // TODO: Check
    // const previousVisit = trail.some(s => s.equal(state));
    if (result) {
      return [state, ...result];
    }
  }
  return null;
}
