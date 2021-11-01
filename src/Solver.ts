import { InvalidPourError } from "./Errors";
import { drawState } from "./Print";
import { State } from "./State";

export interface StateWithMeta {
  state: State;
  move: [number, number];
  score: number;
}

export function generateMoves(s: State): StateWithMeta[] {
  const nextStates: StateWithMeta[] = [];
  const n = s.bottles.length;

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      if (i === j) {
        continue;
      }
      try {
        const newState = s.pour(i, j);
        nextStates.push({ state: newState, move: [i, j], score: -1 });
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

function addScore({ state, move }: StateWithMeta): StateWithMeta {
  return { state, move, score: state.getScore() };
}

export function prioritize(input: StateWithMeta[]): StateWithMeta[] {
  return input.map(addScore).sort((a, b) => b.score - a.score);
}

const hashMap = new Map<string, boolean>();

type TrackerFunc = (s: State, m: typeof hashMap) => void;

export function DFS(
  initState: State,
  tracker?: TrackerFunc,
  trail: StateWithMeta[] = []
): StateWithMeta[] | null {
  if (trail.length === 0) {
    trail = [{ state: initState, move: [0, 0], score: -1 }];
  }

  const nextStates = prioritize(generateMoves(initState));

  for (const result of nextStates) {
    const { state } = result;
    tracker && tracker(state, hashMap);

    if (state.isSolved()) {
      // throw new Solved([...trail, state]);
      return [result];
    }

    const hash = state.getHash();
    if (hashMap.has(hash)) {
      return null;
    }
    hashMap.set(hash, true);

    /*
    const hasPreviousVisit = trail.some((previousState) =>
      previousState.state.equal(state)
    );

    if (hasPreviousVisit) {
      return null;
    }
    */

    const solution = DFS(state, tracker, [...trail, result]);
    if (solution) {
      return [result, ...solution];
    }
  }

  return null;
}
