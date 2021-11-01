import { InvalidPourError } from "./Errors";
import { drawState } from "./Print";
import { State } from "./State";

interface StateAndMove {
  state: State;
  move: [number, number];
}

export function generateMoves(s: State): StateAndMove[] {
  const nextStates: StateAndMove[] = [];
  const n = s.bottles.length;

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
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

function makeProgressTracker() {
  let counter = 0;

  return function showProgress(state: State) {
    counter += 1;
    if (Math.random() > 0.999) {
      console.log(`Tried ${counter} states`);
      drawState(state);
    }
  };
}

function prioritize(input: StateAndMove[]): StateAndMove[] {
  // TODO: Find empty and score higher
  return input;
}

const showProgress = makeProgressTracker();

export function DFS(
  initState: State,
  trail?: StateAndMove[],
  depth = 0
): StateAndMove[] | null {
  const nextStates = prioritize(generateMoves(initState));

  if (!trail) {
    trail = [{ state: initState, move: [0, 0] }];
  }

  for (const result of nextStates) {
    const { state } = result;
    showProgress(state);

    if (state.isSolved()) {
      // throw new Solved([...trail, state]);
      return [result];
    }
    // drawState(state, `Depth ${depth}, move: ${move[0]} -> ${move[1]}`);
    // console.log(`Depth ${depth}, move: ${move[0]} -> ${move[1]}`);

    const hasPreviousVisit = trail.some((previousState) =>
      previousState.state.equal(state)
    );

    if (hasPreviousVisit) {
      return null;
    }

    const solution = DFS(state, [...trail, result], depth + 1);
    if (solution) {
      return [result, ...solution];
    }
  }

  return null;
}
