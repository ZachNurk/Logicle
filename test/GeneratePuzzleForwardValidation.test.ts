import { describe, it, expect } from "vitest";

import { generateEndlessPuzzle } from "../src/logic/GeneratePuzzle";
import { forwardValidateVerbose } from "../scripts/generateDays";

/**
 * Samples the generator and independently re-derives every claimed forward
 * step through the real Axiom.ts functions, guarding against generator/axiom
 * drift (e.g. the revAdd ordering bug fixed alongside this test) rather than
 * asserting on solve-trace text.
 */
describe("generateEndlessPuzzle forward validation", () => {
  it("keeps the invalid-trace rate low across a large sample", () => {
    const N = 2000;
    const byAxiom = new Map<string, number>();
    let invalid = 0;

    for (let i = 0; i < N; i += 1) {
      const payload = generateEndlessPuzzle();
      const { steps, failure } = forwardValidateVerbose(payload);
      if (steps === null && failure) {
        invalid += 1;
        const key = failure.axiomId || "(none)";
        byAxiom.set(key, (byAxiom.get(key) ?? 0) + 1);
      }
    }

    const invalidRate = invalid / N;
    if (invalidRate > 0.1) {
      throw new Error(
        `Invalid-trace rate ${(invalidRate * 100).toFixed(1)}% exceeds 10% threshold. ` +
          `By axiom: ${JSON.stringify(Object.fromEntries(byAxiom))}`,
      );
    }
    expect(byAxiom.get("Add") ?? 0).toBe(0);
  }, 20000);
});
