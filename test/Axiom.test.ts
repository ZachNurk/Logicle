import { describe, it, expect, beforeEach, afterEach } from "vitest";

import {
  modusPonens,
  modusTollens,
  hypotheticalSyllogism,
} from "../src/logic/Axiom";
import {
  createNode,
  createNotNode,
  createImplicationNode,
  createAndNode,
  sameNode,
  ERROR_NODE,
} from "../src/logic/ProofNode";
import type { ProofNode, NotNode } from "../src/logic/ProofNode";
import type { ImplicationNode } from "../src/logic/ProofNode";

/** Build premises And node for axiom calls. */
function premises(left: ProofNode, right: ProofNode) {
  return createAndNode(`${left.text} ∧ ${right.text}`, false, left, right);
}

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

    expect(sameNode(modusPonens(premises(P, PImpliesQ)), Q)).toBe(true);
  });

  it("Modus Ponens: (P -> Q) and P yields Q", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P -> Q",
      true,
      P,
      Q,
    );

    expect(sameNode(modusPonens(premises(PImpliesQ, P)), Q)).toBe(true);
  });

  it("Modus Ponens: (P -> Q) and ((P -> Q) -> L) yields L", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const L: ProofNode = createNode("L", true, undefined);

    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P -> Q",
      true,
      P,
      Q,
    );
    const PImpliesQImpliesL: ImplicationNode = createImplicationNode(
      "(P -> Q) -> L",
      true,
      PImpliesQ,
      L,
    );

    expect(
      sameNode(modusPonens(premises(PImpliesQ, PImpliesQImpliesL)), L),
    ).toBe(true);
    expect(
      sameNode(modusPonens(premises(PImpliesQImpliesL, PImpliesQ)), L),
    ).toBe(true);
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

    expect(sameNode(modusPonens(premises(Q, PImpliesW)), ERROR_NODE)).toBe(
      true,
    );
  });

  it("Modus Ponens: P and (Q -> R) yields ERROR", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const R: ProofNode = createNode("R", true, undefined);

    const QImpliesR: ImplicationNode = createImplicationNode(
      "Q -> R",
      true,
      Q,
      R,
    );

    expect(sameNode(modusPonens(premises(P, QImpliesR)), ERROR_NODE)).toBe(
      true,
    );
    expect(sameNode(modusPonens(premises(QImpliesR, P)), ERROR_NODE)).toBe(
      true,
    );
  });

  it("Modus Ponens: P and (P -> (Q -> R)) yields (Q -> R)", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const R: ProofNode = createNode("R", true, undefined);

    const QImpliesR: ImplicationNode = createImplicationNode(
      "Q -> R",
      true,
      Q,
      R,
    );
    const PImplies_QImpliesR: ImplicationNode = createImplicationNode(
      "P -> (Q -> R)",
      true,
      P,
      QImpliesR,
    );

    const ACTUAL: ProofNode = modusPonens(premises(P, PImplies_QImpliesR));
    expect(sameNode(ACTUAL, QImpliesR)).toBe(true);

    const ACTUAL_REVERSE: ProofNode = modusPonens(
      premises(PImplies_QImpliesR, P),
    );
    expect(sameNode(ACTUAL_REVERSE, QImpliesR)).toBe(true);
  });

  it("Modus Ponens: (P -> Q) and P yields Q even if texts differ (should ERROR if you require text match)", () => {
    const P1: ProofNode = createNode("P", true, undefined);
    const P2: ProofNode = createNode("P ", true, undefined); // different text
    const Q: ProofNode = createNode("Q", true, undefined);

    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P -> Q",
      true,
      P1,
      Q,
    );

    expect(sameNode(modusPonens(premises(P2, PImpliesQ)), ERROR_NODE)).toBe(
      true,
    );
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
    const NQ: NotNode = createNotNode("¬Q", true, Q, undefined);

    const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined);

    let ACTUAL: ProofNode = modusTollens(premises(PImpliesQ, NQ));
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);

    ACTUAL = modusTollens(premises(NQ, PImpliesQ));
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  });

  it("Modus Tollens: [(p → (c → b)) ∧ ¬(c → b)] → ¬p", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const C: ProofNode = createNode("C", true, undefined);
    const B: ProofNode = createNode("B", true, undefined);

    const CImpliesB: ImplicationNode = createImplicationNode(
      "C → B",
      true,
      C,
      B,
    );
    const PImplies_CImpliesB: ImplicationNode = createImplicationNode(
      "P → (C → B)",
      true,
      P,
      CImpliesB,
    );

    const Not_CImpliesB: NotNode = createNotNode(
      "¬(C → B)",
      true,
      CImpliesB,
      undefined,
    );
    const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined);

    let ACTUAL: ProofNode = modusTollens(
      premises(PImplies_CImpliesB, Not_CImpliesB),
    );
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);

    ACTUAL = modusTollens(premises(Not_CImpliesB, PImplies_CImpliesB));
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  });

  it("Modus Tollens: ¬Q and (P → Q) yields ¬P (reverse-first input)", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);

    const NQ: NotNode = createNotNode("¬Q", true, Q, undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P → Q",
      true,
      P,
      Q,
    );

    const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined);

    expect(sameNode(modusTollens(premises(NQ, PImpliesQ)), EXPECTED)).toBe(
      true,
    );
  });

  it("Modus Tollens: ¬P and (P → Q) yields ERROR", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);

    const NP: NotNode = createNotNode("¬P", true, P, undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P → Q",
      true,
      P,
      Q,
    );

    expect(sameNode(modusTollens(premises(PImpliesQ, NP)), ERROR_NODE)).toBe(
      true,
    );
    expect(sameNode(modusTollens(premises(NP, PImpliesQ)), ERROR_NODE)).toBe(
      true,
    );
  });

  it("Modus Tollens: ¬(Q → R) and (P → Q) yields ERROR (negated consequent mismatch)", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const R: ProofNode = createNode("R", true, undefined);

    const QImpliesR: ImplicationNode = createImplicationNode(
      "Q → R",
      true,
      Q,
      R,
    );
    const Not_QImpliesR: NotNode = createNotNode(
      "¬(Q → R)",
      true,
      QImpliesR,
      undefined,
    );

    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P → Q",
      true,
      P,
      Q,
    );

    expect(
      sameNode(modusTollens(premises(PImpliesQ, Not_QImpliesR)), ERROR_NODE),
    ).toBe(true);
    expect(
      sameNode(modusTollens(premises(Not_QImpliesR, PImpliesQ)), ERROR_NODE),
    ).toBe(true);
  });

  it("Modus Tollens: (P → Q) and ¬Q yields ¬P even if Q is a compound node", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const A: ProofNode = createNode("A", true, undefined);
    const B: ProofNode = createNode("B", true, undefined);

    const AImpliesB: ImplicationNode = createImplicationNode(
      "A → B",
      true,
      A,
      B,
    );
    const PImplies_AImpliesB: ImplicationNode = createImplicationNode(
      "P → (A → B)",
      true,
      P,
      AImpliesB,
    );

    const Not_AImpliesB: NotNode = createNotNode(
      "¬(A → B)",
      true,
      AImpliesB,
      undefined,
    );
    const EXPECTED: NotNode = createNotNode("¬P", true, P, undefined);

    expect(
      sameNode(
        modusTollens(premises(PImplies_AImpliesB, Not_AImpliesB)),
        EXPECTED,
      ),
    ).toBe(true);
    expect(
      sameNode(
        modusTollens(premises(Not_AImpliesB, PImplies_AImpliesB)),
        EXPECTED,
      ),
    ).toBe(true);
  });
});

describe("Hypothetical Syllogism", () => {
  it("Hypothetical Syllogism: (P -> Q) and (Q -> R) yields (P -> R)", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const R: ProofNode = createNode("R", true, undefined);

    const PImpliesQ: ImplicationNode = createImplicationNode(
      "(P → Q)",
      true,
      P,
      Q,
    );
    const QImpliesR: ImplicationNode = createImplicationNode(
      "(Q → R)",
      true,
      Q,
      R,
    );

    const EXPECTED: ImplicationNode = createImplicationNode(
      "P → R",
      false,
      P,
      R,
    );

    const ACTUAL: ProofNode = hypotheticalSyllogism(
      premises(PImpliesQ, QImpliesR),
    );
    console.log(EXPECTED.text);
    console.log(ACTUAL.text);
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);

    const ACTUAL_REVERSE: ProofNode = hypotheticalSyllogism(
      premises(QImpliesR, PImpliesQ),
    );
    
    expect(sameNode(ACTUAL_REVERSE, EXPECTED)).toBe(true);
  });

  it("Hypothetical Syllogism: (P -> Q) and (Q -> (R -> S)) yields P -> (R -> S)", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const R: ProofNode = createNode("R", true, undefined);
    const S: ProofNode = createNode("S", true, undefined);

    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P -> Q",
      true,
      P,
      Q,
    );
    const RImpliesS: ImplicationNode = createImplicationNode(
      "R -> S",
      true,
      R,
      S,
    );
    const QImplies_RImpliesS: ImplicationNode = createImplicationNode(
      "Q -> (R -> S)",
      true,
      Q,
      RImpliesS,
    );

    const EXPECTED: ImplicationNode = createImplicationNode(
      "P → (R -> S)",
      false,
      P,
      RImpliesS,
    );

    const ACTUAL: ProofNode = hypotheticalSyllogism(
      premises(PImpliesQ, QImplies_RImpliesS),
    );
    console.log(EXPECTED.text);
    console.log(ACTUAL.text);
    expect(sameNode(ACTUAL, EXPECTED)).toBe(true);

    const ACTUAL_REVERSE: ProofNode = hypotheticalSyllogism(
      premises(QImplies_RImpliesS, PImpliesQ),
    );
    expect(sameNode(ACTUAL_REVERSE, EXPECTED)).toBe(true);
  });

  it("Hypothetical Syllogism: (P -> Q) and (R -> S) yields ERROR", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    const R: ProofNode = createNode("R", true, undefined);
    const S: ProofNode = createNode("S", true, undefined);

    const PImpliesQ: ImplicationNode = createImplicationNode(
      "P -> Q",
      true,
      P,
      Q,
    );
    const RImpliesS: ImplicationNode = createImplicationNode(
      "R -> S",
      true,
      R,
      S,
    );

    expect(
      sameNode(
        hypotheticalSyllogism(premises(PImpliesQ, RImpliesS)),
        ERROR_NODE,
      ),
    ).toBe(true);
    expect(
      sameNode(
        hypotheticalSyllogism(premises(RImpliesS, PImpliesQ)),
        ERROR_NODE,
      ),
    ).toBe(true);
  });
});
