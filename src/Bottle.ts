import { Colors, BOTTLE_CAPACITY } from "./Constants";
import {
  BottleFullError,
  BottleEmptyError,
  ColorMismatchError,
  PoppedColorNotSameError,
} from "./Errors";

export class Bottle {
  public colors: Colors[];

  constructor(...args: Colors[]) {
    if (args.length > BOTTLE_CAPACITY) {
      throw new BottleFullError();
    }
    this.colors = args;
  }

  top() {
    return this.colors.length > 0
      ? this.colors[this.colors.length - 1]
      : Colors.EMPTY;
  }

  isFull(): boolean {
    return this.colors.length === BOTTLE_CAPACITY;
  }

  isEmpty(): boolean {
    return this.colors.length === 0;
  }

  isSameColor(): boolean {
    return (
      this.colors.length === BOTTLE_CAPACITY &&
      this.colors.every((color) => color === this.colors[0])
    );
  }

  fill(c: Colors, count: number): void {
    while (count > 0) {
      if (!this.isFull()) {
        const topColor = this.top();
        if (topColor !== Colors.EMPTY && topColor !== c) {
          throw new ColorMismatchError();
        }
        this.colors.push(c);
      } else {
        throw new BottleFullError();
      }
      count -= 1;
    }
  }

  pop(count: number): Colors {
    if (this.colors.length === 0) {
      throw new BottleEmptyError();
    }
    const color: Colors = this.colors.pop()!;
    count -= 1;
    while (count > 0) {
      const colorNext = this.colors.pop();
      if (colorNext !== color) {
        throw new PoppedColorNotSameError();
      }
      count -= 1;
    }
    return color;
  }

  getSameColorCount(): number {
    const colorTop = this.top();
    const N = this.colors.length;
    let count = 1;
    while (this.colors[N - count - 1] === colorTop) {
      count += 1;
    }
    return count;
  }

  getAvailableSpace() {
    return BOTTLE_CAPACITY - this.colors.length;
  }

  clone(): Bottle {
    return new Bottle(...this.colors);
  }

  equal(other: Bottle) {
    return (
      this.colors.length === other.colors.length &&
      this.colors.every((color, idx) => color === other.colors[idx])
    );
  }

  getHash(): string {
    return this.colors.join("-");
  }
}
