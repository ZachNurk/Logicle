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
    const PImpliesQ: ImplicationNode = createImplicationNode("P -> Q", true, P, Q);

    expect(sameNode(modusPonens(P, PImpliesQ), Q)).toBe(true);
  });

  it("Modus Ponens: (P -> Q) and P yields Q", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode("P -> Q", true, P, Q);

    expect(sameNode(modusPonens(PImpliesQ, P), Q)).toBe(true);
  });

  it("Modus Ponens: (P -> Q) and ((P -> Q) -> L) yields L", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const L: ProofNode = createNode("L", true, undefined);

    const PImpliesQ: ImplicationNode = createImplicationNode("P -> Q", true, P, Q);
    const PImpliesQImpliesL: ImplicationNode = createImplicationNode("(P -> Q) -> L", true, PImpliesQ, L);

    expect(sameNode(modusPonens(PImpliesQ, PImpliesQImpliesL), L)).toBe(true);
    expect(sameNode(modusPonens(PImpliesQImpliesL, PImpliesQ), L)).toBe(true);
  });

  it("Modus Ponens: Q and (P -> W) yields ERROR", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const W: ProofNode = createNode("W", true, undefined);
    const PImpliesW: ImplicationNode = createImplicationNode("P -> W", true, P, W);

    expect(sameNode(modusPonens(Q, PImpliesW), ERROR_NODE)).toBe(true);
  });

  it("Modus Ponens: P and (Q -> R) yields ERROR", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const R: ProofNode = createNode("R", true, undefined);

    const QImpliesR: ImplicationNode = createImplicationNode("Q -> R", true, Q, R);

    expect(sameNode(modusPonens(P, QImpliesR), ERROR_NODE)).toBe(true);
    expect(sameNode(modusPonens(QImpliesR, P), ERROR_NODE)).toBe(true);
  });

  it("Modus Ponens: P and (P -> (Q -> R)) yields (Q -> R)", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const R: ProofNode = createNode("R", true, undefined);

    const QImpliesR: ImplicationNode = createImplicationNode("Q -> R", true, Q, R);
    const PImplies_QImpliesR: ImplicationNode = createImplicationNode("P -> (Q -> R)", true, P, QImpliesR);

    const ACTUAL: ProofNode = modusPonens(P, PImplies_QImpliesR);
    expect(sameNode(ACTUAL, QImpliesR)).toBe(true);

    const ACTUAL_REVERSE: ProofNode = modusPonens(PImplies_QImpliesR, P);
    expect(sameNode(ACTUAL_REVERSE, QImpliesR)).toBe(true);
  });

  it("Modus Ponens: (P -> Q) and P yields Q even if texts differ (should ERROR if you require text match)", () => {
    const P1: ProofNode = createNode("P", true, undefined);
    const P2: ProofNode = createNode("P ", true, undefined); // different text
    const Q: ProofNode = createNode("Q", true, undefined);

    const PImpliesQ: ImplicationNode = createImplicationNode("P -> Q", true, P1, Q);

    expect(sameNode(modusPonens(P2, PImpliesQ), ERROR_NODE)).toBe(true);
  });
});

describe("Modus Tollens", () => {
  it("Modus Tollens: [(p → q) ∧ ¬q] → ¬p", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);

    const PImpliesQ: ImplicationNode = createImplicationNode("P → Q", true, P, Q);
    const NQ: NotNode = createNotNode("¬Q", true, Q, undefined);

    const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined);

    let ACTUAL: ProofNode = modusTollens(PImpliesQ, NQ);
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);

    ACTUAL = modusTollens(NQ, PImpliesQ);
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  });

  it("Modus Tollens: [(p → (c → b)) ∧ ¬(c → b)] → ¬p", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const C: ProofNode = createNode("C", true, undefined);
    const B: ProofNode = createNode("B", true, undefined);

    const CImpliesB: ImplicationNode = createImplicationNode("C → B", true, C, B);
    const PImplies_CImpliesB: ImplicationNode = createImplicationNode("P → (C → B)", true, P, CImpliesB);

    const Not_CImpliesB: NotNode = createNotNode("¬(C → B)", true, CImpliesB, undefined);
    const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined);

    let ACTUAL: ProofNode = modusTollens(PImplies_CImpliesB, Not_CImpliesB);
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);

    ACTUAL = modusTollens(Not_CImpliesB, PImplies_CImpliesB);
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  });

  it("Modus Tollens: ¬Q and (P → Q) yields ¬P (reverse-first input)", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);

    const NQ: NotNode = createNotNode("¬Q", true, Q, undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode("P → Q", true, P, Q);

    const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined);

    expect(sameNode(modusTollens(NQ, PImpliesQ), EXPECTED)).toBe(true);
  });

  it("Modus Tollens: ¬P and (P → Q) yields ERROR", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);

    const NP: NotNode = createNotNode("¬P", true, P, undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode("P → Q", true, P, Q);

    expect(sameNode(modusTollens(PImpliesQ, NP), ERROR_NODE)).toBe(true);
    expect(sameNode(modusTollens(NP, PImpliesQ), ERROR_NODE)).toBe(true);
  });

  it("Modus Tollens: ¬(Q → R) and (P → Q) yields ERROR (negated consequent mismatch)", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const R: ProofNode = createNode("R", true, undefined);

    const QImpliesR: ImplicationNode = createImplicationNode("Q → R", true, Q, R);
    const Not_QImpliesR: NotNode = createNotNode("¬(Q → R)", true, QImpliesR, undefined);

    const PImpliesQ: ImplicationNode = createImplicationNode("P → Q", true, P, Q);

    expect(sameNode(modusTollens(PImpliesQ, Not_QImpliesR), ERROR_NODE)).toBe(true);
    expect(sameNode(modusTollens(Not_QImpliesR, PImpliesQ), ERROR_NODE)).toBe(true);
  });

  it("Modus Tollens: (P → Q) and ¬Q yields ¬P even if Q is a compound node", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const A: ProofNode = createNode("A", true, undefined);
    const B: ProofNode = createNode("B", true, undefined);

    const AImpliesB: ImplicationNode = createImplicationNode("A → B", true, A, B);
    const PImplies_AImpliesB: ImplicationNode = createImplicationNode("P → (A → B)", true, P, AImpliesB);

    const Not_AImpliesB: NotNode = createNotNode("¬(A → B)", true, AImpliesB, undefined);
    const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined);

    expect(sameNode(modusTollens(PImplies_AImpliesB, Not_AImpliesB), EXPECTED)).toBe(true);
    expect(sameNode(modusTollens(Not_AImpliesB, PImplies_AImpliesB), EXPECTED)).toBe(true);
  });
});
