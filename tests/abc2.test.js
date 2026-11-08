import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";

let abc2;

beforeAll(async () => {
  // Supply the globals normally provided by core.js.
  globalThis.CALC_CONTEXT = {
    gcs: null,
    volume: null,
  };

  globalThis.registerCalculator = (definition) => {
    abc2 = definition;
  };

  // Load the calculator only after its dependencies exist.
  await import("../calculators/abc2.js");
});

beforeEach(() => {
  globalThis.CALC_CONTEXT.volume = null;
});

describe("ABC/2 hematoma volume calculator", () => {
  it("calculates a typical hematoma volume", () => {
    const result = abc2.calculate({
      a: 4,
      b: 3,
      slices: 4,
      thickness: 0.5,
    });

    expect(result.score).toBe("12.0");
    expect(result.unit).toBe("mL");
    expect(globalThis.CALC_CONTEXT.volume).toBe(12);
  });

  it("returns a placeholder for incomplete measurements", () => {
    const result = abc2.calculate({
      a: "",
      b: 3,
      slices: 4,
      thickness: 0.5,
    });

    expect(result.score).toBe("—");
    expect(globalThis.CALC_CONTEXT.volume).toBeNull();
  });

  it("calculates a smaller hematoma volume", () => {
    const result = abc2.calculate({
      a: 2, 
      b: 2,
      slices: 3,
      thickness: 0.5,
    });

    expect(result.score).toBe("3.0");
    expect(globalThis.CALC_CONTEXT.volume).toBe(3);
  });

  it("clears the previous value when measurement is incomplete", () => {
    // First calculation: valid measurements
    abc2.calculate({
      a: 4,
      b: 3,
      slices: 4,
      thickness: 0.5,
    });

    expect(globalThis.CALC_CONTEXT.volume).toBe(12);

    //Second Calculation: clinician clears 'a'
    const result = abc2.calculate({
      a: "",
      b: 3,
      slices: 4,
      thickness: 0.5,
    });

    expect(result.score).toBe("—");

    expect(globalThis.CALC_CONTEXT.volume).toBeNull();
  });

  it("Rejects a negative input value", () => {
    const result = abc2.calculate({
      a: -4,
      b: 3,
      slices: 4,
      thickness: 0.5
    });

    expect(result.score).toBe("—");
    expect(globalThis.CALC_CONTEXT.volume).toBeNull(); 
  });
  
  it("rejects two negative measurements", () => {
    const result = abc2.calculate({
      a: -4,
      b: -3,
      slices: 4,
      thickness: 0.5,
    });

    expect(result.score).toBe("—");
    expect(globalThis.CALC_CONTEXT.volume).toBeNull();
  });
});
