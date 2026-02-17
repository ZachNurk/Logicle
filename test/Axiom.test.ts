import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { modusPonens, modusTollens } from "../src/logic/Axiom";
import { createNode, createNotNode, sameNode, ERROR_NODE } from "../src/logic/ProofNode";
import { createImplicationNode } from "../src/logic/ProofNode";

import type { ProofNode, NotNode } from "../src/logic/ProofNode";
import type { ImplicationNode } from "../src/logic/ProofNode";

describe("Modus Ponens", () => {
  it("Modus Ponens: P and (P -> Q) yields Q", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P -> Q",
      true,
      P,
      Q,
    );

    expect(sameNode(modusPonens(P, PImpliesQ), Q)).toBe(true);
  });

  it("Modus Ponens: (P -> Q) and P   yields Q", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P -> Q",
      true,
      P,
      Q,
    );

    expect(sameNode(modusPonens(PImpliesQ, P), Q)).toBe(true);
  });

  it("Modus Ponens: (P -> Q) and ((P -> Q) -> L) yields L", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const L: ProofNode = createNode("L", true, undefined);

    // (P -> Q)
    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P -> Q",
      true,
      P,
      Q,
    );
    // ((P -> Q) -> L)
    const PImpliesQImpliesL: ImplicationNode = createImplicationNode(
      "(P -> Q) -> L",
      true,
      PImpliesQ,
      L,
    );
    // Imp Node: (P -> Q) and ImpNode: ((P -> Q) -> L))
    const result = modusPonens(PImpliesQ, PImpliesQImpliesL);
    expect(sameNode(modusPonens(PImpliesQ, PImpliesQImpliesL), L)).toBe(true);
    // reverse check
    expect(sameNode(modusPonens(PImpliesQImpliesL,PImpliesQ), L)).toBe(true);
  });

  it("Modus Ponens: Q and (P -> W) yields ERROR", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const W: ProofNode = createNode("W", true, undefined);
    const PImpliesW: ImplicationNode = createImplicationNode(
      "P -> W",
      true,
      P,
      W,
    );

    expect(sameNode(modusPonens(Q, PImpliesW), ERROR_NODE)).toBe(true);
  });

  
});

describe("Modus Tollens", () => {
  it("Modus Tollens: [(p → q) ∧ ¬q] → ¬p", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P → Q",
      true,
      P,
      Q,
    );
    const NQ: NotNode = createNotNode("¬Q", true, Q, undefined)
    const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined)
    let ACTUAL: ProofNode = modusTollens(PImpliesQ, NQ)
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    // Check reverse
    ACTUAL = modusTollens(NQ, PImpliesQ)
     expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  });

  it("Modus Tollens: [(p → (c → b)) ∧ ¬(c → b)] → ¬p", () => {
  const P: ProofNode = createNode("P", true, undefined);
  const C: ProofNode = createNode("C", true, undefined);
  const B: ProofNode = createNode("B", true, undefined);

  // (C → B)
  const CImpliesB: ImplicationNode = createImplicationNode("C → B", true, C, B);

  // P → (C → B)
  const PImplies_CImpliesB: ImplicationNode = createImplicationNode(
    "P → (C → B)",
    true,
    P,
    CImpliesB,
  );

  // ¬(C → B)
  const Not_CImpliesB: NotNode = createNotNode("¬(C → B)", true, CImpliesB, undefined);

  const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined);

  let ACTUAL: ProofNode = modusTollens(PImplies_CImpliesB, Not_CImpliesB);
  expect(sameNode(ACTUAL, EXPECTED)).toBe(true);

  // Check reverse
  ACTUAL = modusTollens(Not_CImpliesB, PImplies_CImpliesB);
  expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
});
  
});
