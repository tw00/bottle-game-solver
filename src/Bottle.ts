import { Colors, BOTTLE_CAPACITY } from "./Constants";
import { BottleFullError, BottleEmptyError } from "./Errors";

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

  fill(c: Colors): void {
    if (!this.isFull()) {
      this.colors.push(c);
    } else {
      throw new BottleFullError();
    }
  }

  pop(): Colors {
    if (this.colors.length === 0) {
      throw new BottleEmptyError();
    }
    return this.colors.pop() || Colors.EMPTY;
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
}
