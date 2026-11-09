import { describe, it, expect } from "vitest";
import { calculateABC2Volume } from "../abc2_math.js";

describe("ABC/2 pure calculation function", () => {
  it("calculates volume for valid measurements", () => {
    const result = calculateABC2Volume(4, 3, 4, 0.5);

    expect(result).toBe(12);
  });
  it("rejects negative measurements", () => {
    const result = calculateABC2Volume(-4, -3, 4, 0.5);

    expect(result).toBeNull();
  });

  it("rejects fractional slice counts", () => {
    const result = calculateABC2Volume(4, 3, 2.5, 0.5);

    expect(result).toBeNull();
  });

  it("rejects non-finite measurements", () => {
    const result = calculateABC2Volume(4, 3, 4, Infinity);

    expect(result).toBeNull();
  });

  it("rejects numeric strings", () => {
    const result = calculateABC2Volume("4", 3, 4, 0.5);

    expect(result).toBeNull();
  });
});
