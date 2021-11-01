import crypto from "crypto";

import { Colors } from "./Constants";
import { Bottle } from "./Bottle";
import {
  InvalidBottleIndex,
  BottleFullError,
  BottleEmptyError,
  InvalidPourError,
  ColorMismatchError,
} from "./Errors";

export class State {
  public bottles: Bottle[];

  constructor(n: number) {
    this.bottles = Array.from({ length: n }).map(() => new Bottle());
  }

  set(idx: number, colors: Colors[]): void {
    this.bottles[idx] = new Bottle(...colors);
  }

  clone() {
    const s = new State(this.bottles.length);
    this.bottles.forEach((bottle, idx) => {
      s.bottles[idx] = bottle.clone();
    });
    return s;
  }

  pour(idx_a: number, idx_b: number): State {
    const s = this.clone();

    if (idx_a < 0 || idx_a > this.bottles.length) {
      throw new InvalidBottleIndex("idx_a");
    }
    if (idx_b < 0 || idx_b > this.bottles.length) {
      throw new InvalidBottleIndex("idx_b");
    }

    try {
      const target = s.bottles[idx_b];
      const source = s.bottles[idx_a];
      const count = Math.min(
        target.getAvailableSpace(),
        source.getSameColorCount()
      );
      if (count === 0) {
        throw new BottleFullError();
      }
      target.fill(source.pop(count), count);
    } catch (error) {
      if (
        error instanceof BottleFullError ||
        error instanceof BottleEmptyError ||
        error instanceof ColorMismatchError
      ) {
        throw new InvalidPourError(`${idx_a} -> ${idx_b}`);
      } else {
        throw error;
      }
    }

    return s;
  }

  equal(other: State): boolean {
    if (this.bottles.length !== other.bottles.length) {
      return false;
    }

    return this.bottles.every((bottle, idx) =>
      bottle.equal(other.bottles[idx])
    );
  }

  isSolved(): boolean {
    return this.bottles.every(
      (bottle) => bottle.isEmpty() || bottle.isSameColor()
    );
  }

  getScore(): number {
    let score = 0;
    this.bottles.forEach((bottle) => {
      if (bottle.isEmpty()) {
        score += 1;
      }
      if (bottle.isSameColor()) {
        score += 0.5;
      }
    });
    return score;
  }

  getHash(): string {
    const str = this.bottles.map((bottle) => bottle.getHash()).join(":");
    return crypto.createHash("md5").update(str).digest("hex");
  }
}
