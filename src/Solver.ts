import { InvalidPourError } from "./Errors";
import { ScoreMethod, State } from "./State";

export interface StateWithMeta {
  state: State;
  move: [number, number];
  score: number;
}

export enum PruningMethod {
  GLOBAL_HASH_MAP = "global-hash-map",
  TRAIL_CHECK = "trail-check",
}

export type TrackerFunc = (
  s: State,
  t: StateWithMeta[],
  m: Map<string, boolean>
) => void;

export interface SolverOptions {
  method?: ScoreMethod;
  pruning?: PruningMethod;
  tracker?: TrackerFunc;
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

export function prioritize(
  input: StateWithMeta[],
  method: ScoreMethod
): StateWithMeta[] {
  function addScore({ state, move }: StateWithMeta): StateWithMeta {
    return {
      state,
      move,
      score: state.getScore(method),
    };
  }

  return input.map(addScore).sort((a, b) => b.score - a.score);
}

export function createSolver({
  method = ScoreMethod.HEURISTIC_PREFER_EMPTY,
  pruning = PruningMethod.GLOBAL_HASH_MAP,
  tracker = () => {},
}: SolverOptions) {
  const hashMap = new Map<string, boolean>();

  return function DFS(
    initState: State,
    trail: StateWithMeta[] = []
  ): StateWithMeta[] | null {
    if (trail.length === 0) {
      trail = [{ state: initState, move: [0, 0], score: -1 }];
    }

    const nextStates = prioritize(generateMoves(initState), method);

    for (const result of nextStates) {
      const { state } = result;
      tracker && tracker(state, trail, hashMap);

      if (state.isSolved()) {
        // throw new Solved([...trail, state]);
        return [result];
      }

      if (pruning === PruningMethod.GLOBAL_HASH_MAP) {
        const hash = state.getHash();
        if (hashMap.has(hash)) {
          return null;
        }
        hashMap.set(hash, true);
      }

      if (pruning === PruningMethod.TRAIL_CHECK) {
        const hasPreviousVisit = trail.some((previousState) =>
          previousState.state.equal(state)
        );

        if (hasPreviousVisit) {
          return null;
        }
      }

      const solution = DFS(state, [...trail, result]);
      if (solution) {
        return [result, ...solution];
      }
    }

    return null;
  };
}
