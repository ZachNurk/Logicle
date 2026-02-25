import { describe, it, expect, beforeEach, afterEach } from "vitest";

import {
  modusPonens,
  modusTollens,
  hypotheticalSyllogism,
  disjunctiveSyllogism,
  simplification,
  addition,
  conjunction,
  constructiveDilemmaAnd,
  constructiveDilemmaOr,
  doubleNegation,
  orCommutativity,
  andCommutativity,
  orAssociativity,
  andAssociativity,
  orOverAndDistributivity,
  andOverOrDistributivity,
} from "../src/logic/Axiom";
import {
  createNode,
  createNotNode,
  createImplicationNode,
  createAndNode,
  sameNode,
  ERROR_NODE,
  createOrNode
} from "../src/logic/ProofNode";
import type { ProofNode, NotNode, OrNode, AndNode } from "../src/logic/ProofNode";
import type { ImplicationNode } from "../src/logic/ProofNode";

/** Build premises And node for axiom calls. */
function premises(left: ProofNode, right: ProofNode) {
  return createAndNode(`${left.text} ∧ ${right.text}`, false, left, right);
}

const A: ProofNode = createNode("A", true, undefined);
const B: ProofNode = createNode("B", true, undefined);
const C: ProofNode = createNode("C", true, undefined);
const D: ProofNode = createNode("D", true, undefined);
const E: ProofNode = createNode("E", true, undefined);
const F: ProofNode = createNode("F", true, undefined);

describe("Axioms", () => {
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
      expect(sameNode(modusPonens(premises(P, PImpliesQ), [P, PImpliesQ]), Q)).toBe(true);
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
  
      expect(sameNode(modusPonens(premises(PImpliesQ, P), [P, PImpliesQ]), Q)).toBe(true);
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
        sameNode(modusPonens(premises(PImpliesQ, PImpliesQImpliesL), [PImpliesQ, PImpliesQImpliesL]), L),
      ).toBe(true);
      expect(
        sameNode(modusPonens(premises(PImpliesQImpliesL, PImpliesQ), [PImpliesQImpliesL, PImpliesQ]), L),
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
  
      expect(sameNode(modusPonens(premises(Q, PImpliesW), [Q, PImpliesW]), ERROR_NODE)).toBe(
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
  
      expect(sameNode(modusPonens(premises(P, QImpliesR), [P, QImpliesR]), ERROR_NODE)).toBe(
        true,
      );
      expect(sameNode(modusPonens(premises(QImpliesR, P), [QImpliesR, P]), ERROR_NODE)).toBe(
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
  
      const ACTUAL: ProofNode = modusPonens(premises(P, PImplies_QImpliesR), [P, PImplies_QImpliesR]);
      expect(sameNode(ACTUAL, QImpliesR)).toBe(true);
  
      const ACTUAL_REVERSE: ProofNode = modusPonens(
        premises(PImplies_QImpliesR, P),
        [PImplies_QImpliesR, P],
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
  
      expect(sameNode(modusPonens(premises(P2, PImpliesQ), [P2, PImpliesQ]), ERROR_NODE)).toBe(
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
  
      let ACTUAL: ProofNode = modusTollens(premises(PImpliesQ, NQ), [PImpliesQ, NQ]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  
      ACTUAL = modusTollens(premises(NQ, PImpliesQ), [NQ, PImpliesQ]);
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
        [PImplies_CImpliesB, Not_CImpliesB],
      );
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  
      ACTUAL = modusTollens(premises(Not_CImpliesB, PImplies_CImpliesB), [Not_CImpliesB, PImplies_CImpliesB]);
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
  
      expect(sameNode(modusTollens(premises(NQ, PImpliesQ), [NQ, PImpliesQ]), EXPECTED)).toBe(
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
      expect(sameNode(modusTollens(premises(PImpliesQ, NP), [PImpliesQ, NP]), ERROR_NODE)).toBe(
        true,
      );
      expect(sameNode(modusTollens(premises(NP, PImpliesQ), [NP, PImpliesQ]), ERROR_NODE)).toBe(
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
        sameNode(modusTollens(premises(PImpliesQ, Not_QImpliesR), [PImpliesQ, Not_QImpliesR]), ERROR_NODE),
      ).toBe(true);
      expect(
        sameNode(modusTollens(premises(Not_QImpliesR, PImpliesQ), [Not_QImpliesR, PImpliesQ]), ERROR_NODE),
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
          modusTollens(premises(PImplies_AImpliesB, Not_AImpliesB), [PImplies_AImpliesB, Not_AImpliesB]),
          EXPECTED,
        ),
      ).toBe(true);
      expect(
        sameNode(
          modusTollens(premises(Not_AImpliesB, PImplies_AImpliesB), [Not_AImpliesB, PImplies_AImpliesB]),
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
        [PImpliesQ, QImpliesR],
      );
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  
      const ACTUAL_REVERSE: ProofNode = hypotheticalSyllogism(
        premises(QImpliesR, PImpliesQ),
        [QImpliesR, PImpliesQ],
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
        [PImpliesQ, QImplies_RImpliesS],
      );
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  
      const ACTUAL_REVERSE: ProofNode = hypotheticalSyllogism(
        premises(QImplies_RImpliesS, PImpliesQ),
        [QImplies_RImpliesS, PImpliesQ],
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
          hypotheticalSyllogism(premises(PImpliesQ, RImpliesS), [PImpliesQ, RImpliesS]),
          ERROR_NODE,
        ),
      ).toBe(true);
      expect(
        sameNode(
          hypotheticalSyllogism(premises(RImpliesS, PImpliesQ), [RImpliesS, PImpliesQ]),
          ERROR_NODE,
        ),
      ).toBe(true);
    });
  });
  
  describe("Disjunctive Syllogism", () => {
    it("[(p ∨ q) ∧ ¬p] → q", () => {
      const P: ProofNode = createNode("P", true, undefined);
      const Q: ProofNode = createNode("Q", true, undefined);
      const NP: NotNode = createNotNode("¬P", true, P, undefined);
      const POQ: OrNode = createOrNode("P ∨ Q", true, P, Q, undefined);
  
      const EXPECTED = Q;
      let ACTUAL = disjunctiveSyllogism(premises(POQ, NP), [POQ, NP]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
      ACTUAL = disjunctiveSyllogism(premises(NP, POQ), [NP, POQ]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    });
  
    it("[(q ∨ p) ∧ ¬p] → q", () => {
      const P: ProofNode = createNode("P", true, undefined);
      const Q: ProofNode = createNode("Q", true, undefined);
      const NP: NotNode = createNotNode("¬P", true, P, undefined);
      const QOP: OrNode = createOrNode("Q ∨ P", true, Q, P, undefined);
  
      const EXPECTED = Q;
      let ACTUAL = disjunctiveSyllogism(premises(QOP, NP), [QOP, NP]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
      ACTUAL = disjunctiveSyllogism(premises(NP, QOP), [NP, QOP]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    });
  
    it("[(C ∨ (A ∧ B)) ∧ ¬( A ^ B )] → C", () => {
      const ANB: AndNode = createAndNode("A ∧ B", true, A, B, undefined)
      const NANB: NotNode = createNotNode("¬(A ∧ B)", true, ANB, undefined)
      const COANBD: OrNode = createOrNode("C ∨ (A ∧ B)", true, C, ANB, undefined)
  
  
      const EXPECTED = C;
      let ACTUAL = disjunctiveSyllogism(premises(COANBD, NANB), [COANBD, NANB]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
      ACTUAL = disjunctiveSyllogism(premises(NANB, COANBD), [NANB, COANBD]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    });
  
    it("[(C ∨ (A ∧ B)) ∧ ¬C] → (A ∧ B)", () => {
      const ANB: AndNode = createAndNode("A ∧ B", true, A, B, undefined)
      const NC: NotNode = createNotNode("C", true, C, undefined)
      const COANBD: OrNode = createOrNode("C ∨ (A ∧ B)", true, C, ANB, undefined)
  
  
      const EXPECTED = ANB;
      let ACTUAL = disjunctiveSyllogism(premises(COANBD, NC), [COANBD, NC]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
      ACTUAL = disjunctiveSyllogism(premises(NC, COANBD), [NC, COANBD]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    });
  });
  
  describe("Simplification", () => {
    const aConj = createAndNode("A ∧ B",false,A,B,undefined)
    it("(A ∧ B) → A", () => {
      const EXPECTED = A
      const ACTUAL = simplification(aConj, "left");
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
    it("(A ∧ B) → B", () => {
      const EXPECTED = B
      const ACTUAL = simplification(aConj, "right");
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
    it("(A ∧ B) ∧ C → C", () => {
      const aConjConjC = createAndNode("(A ∧ B) ∧ C",false,aConj,C,undefined)
      const EXPECTED = C
      const ACTUAL = simplification(aConjConjC, "right");
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
  })
  describe("Simplification", () => {
    it("A → A ∨ B", () => {
      const EXPECTED = createOrNode("A ∨ B", false, A, B, undefined)
      const ACTUAL = addition(A, B);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
    it("A ∧ B → (A ∧ B) ∨ C", () => {
      const aConj = createAndNode("A ∧ B",false,A,B,undefined)
      const EXPECTED = createOrNode("(A ∧ B) ∨ C",false, aConj, C, undefined)
      const ACTUAL = addition(aConj, C)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
    it("(A ∧ B) ∧ (C ∧ D) → ((A ∧ B) ∧ (C ∧ D)) ∨ E", () => {
      const aConj = createAndNode("A ∧ B",false,A,B,undefined)
      const cConj = createAndNode("C ∧ D",false,A,B,undefined)
      const bigConj = createAndNode("(A ∧ B) ∧ (C ∧ D)",false,A,B,undefined)
  
  
      const EXPECTED = createOrNode("((A ∧ B) ∧ (C ∧ D)) ∨ E",false, bigConj, E, undefined)
  
      const ACTUAL = addition(bigConj, E)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
  })
  
  describe("Conjunction", () => {
    
    it("(A ∧ B) ∧ (C ∧ D)", () => {
      const aConj = createAndNode("A ∧ B", false, A, B, undefined)
      const cConj = createAndNode("C ∧ D", false, C, D, undefined)
      const EXPECTED = createAndNode("(A ∧ B) ∧ (C ∧ D)", false, aConj, cConj, undefined)

      const ACTUAL = conjunction(aConj, cConj)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })
  
  describe("Constructive Dilemma And", () => {
    
    it("[(A → B) ∧ (C → D)] → (A ∧ B) → (C ∧ D)", () => {
      const aImpB = createImplicationNode("A → B", false,A,B,undefined)
      const CImpD = createImplicationNode("C → D", false,C,D,undefined)
      const EXPECTED = "(A ∧ B) → (C ∧ D)"
  
      const ACTUAL = constructiveDilemmaAnd(premises(aImpB, CImpD), [aImpB, CImpD])
      console.log(ACTUAL.text)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  })
  
  describe("Constructive Dilemma or", () => {
    
    it("[(A → B) ∧ (C → D)] → (A ∨ B) → (C ∨ D)", () => {
      const aImpB = createImplicationNode("A → B", false,A,B,undefined)
      const CImpD = createImplicationNode("C → D", false,C,D,undefined)
      const EXPECTED = "(A ∨ B) → (C ∨ D)"
  
      const ACTUAL = constructiveDilemmaOr(premises(aImpB, CImpD), [aImpB, CImpD])
      console.log(ACTUAL.text)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  })
  
  describe("Double negation", () => {
    it("¬¬A yields A", () => {
      const notA = createNotNode("¬A", false, A)
      const notNotA = createNotNode("¬¬A", false, notA)
      const EXPECTED = "A"
  
      const ACTUAL = doubleNegation(notNotA)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  
    it("¬¬(A ∧ B) yields (A ∧ B)", () => {
      const aAndB = createAndNode("A ∧ B", false, A, B)
      const notAAndB = createNotNode("¬(A ∧ B)", false, aAndB)
      const notNotAAndB = createNotNode("¬¬(A ∧ B)", false, notAAndB)
      const EXPECTED = "(A ∧ B)"
  
      const ACTUAL = doubleNegation(notNotAAndB)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  })
  
  describe("OR commutativity", () => {
    it("(A ∨ B) yields (B ∨ A)", () => {
      const aOrB = createOrNode("A ∨ B", false, A, B)
      const EXPECTED = "B ∨ A"
  
      const ACTUAL = orCommutativity(aOrB)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  
    it("((A ∧ B) ∨ C) yields (C ∨ (A ∧ B))", () => {
      const aAndB = createAndNode("A ∧ B", false, A, B)
      const aAndBOrC = createOrNode("(A ∧ B) ∨ C", false, aAndB, C)
      const EXPECTED = "C ∨ (A ∧ B)"
  
      const ACTUAL = orCommutativity(aAndBOrC)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  })
  
  describe("AND commutativity", () => {
    it("(A ∧ B) yields (B ∧ A)", () => {
      const aAndB = createAndNode("A ∧ B", false, A, B)
      const EXPECTED = "B ∧ A"
  
      const ACTUAL = andCommutativity(aAndB)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  
    it("((A ∨ B) ∧ C) yields (C ∧ (A ∨ B))", () => {
      const aOrB = createOrNode("A ∨ B", false, A, B)
      const aOrBAndC = createAndNode("(A ∨ B) ∧ C", false, aOrB, C)
      const EXPECTED = "C ∧ (A ∨ B)"
  
      const ACTUAL = andCommutativity(aOrBAndC)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  })
  
  describe("OR associativity", () => {
    it("((A ∨ B) ∨ C) yields (A ∨ (B ∨ C))", () => {
      const aOrB = createOrNode("A ∨ B", false, A, B)
      const aOrBOrC = createOrNode("(A ∨ B) ∨ C", false, aOrB, C)
      const EXPECTED = "A ∨ (B ∨ C)"
  
      const ACTUAL = orAssociativity(aOrBOrC)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  
    it("(A ∨ (B ∨ C)) yields ((A ∨ B) ∨ C)", () => {
      const bOrC = createOrNode("B ∨ C", false, B, C)
      const aOr_bOrC = createOrNode("A ∨ (B ∨ C)", false, A, bOrC)
  
      const expectedLeft = createOrNode("A ∨ B", false, A, B)
      const EXPECTED = createOrNode("(A ∨ B) ∨ C", false, expectedLeft, C)
  
      const ACTUAL = orAssociativity(aOr_bOrC)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })
  
  describe("AND associativity", () => {
    it("((A ∧ B) ∧ C) yields (A ∧ (B ∧ C))", () => {
      const aAndB = createAndNode("A ∧ B", false, A, B)
      const original = createAndNode("(A ∧ B) ∧ C", false, aAndB, C)
  
      const expectedInner = createAndNode("B ∧ C", false, B, C)
      const EXPECTED = createAndNode("A ∧ (B ∧ C)", false, A, expectedInner)
  
      const ACTUAL = andAssociativity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  
    it("(A ∧ (B ∧ C)) yields ((A ∧ B) ∧ C)", () => {
      const bAndC = createAndNode("B ∧ C", false, B, C)
      const original = createAndNode("A ∧ (B ∧ C)", false, A, bAndC)
  
      const expectedInner = createAndNode("A ∧ B", false, A, B)
      const EXPECTED = createAndNode("(A ∧ B) ∧ C", false, expectedInner, C)
  
      const ACTUAL = andAssociativity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })
  
  describe("Distributivity (∨ over ∧)", () => {
    it("A ∨ (B ∧ C) yields (A ∨ B) ∧ (A ∨ C)", () => {
      const bAndC = createAndNode("B ∧ C", false, B, C)
      const original = createOrNode("A ∨ (B ∧ C)", false, A, bAndC)
  
      const expectedLeft = createOrNode("A ∨ B", false, A, B)
      const expectedRight = createOrNode("A ∨ C", false, A, C)
      const EXPECTED = createAndNode("(A ∨ B) ∧ (A ∨ C)", false, expectedLeft, expectedRight)
  
      const ACTUAL = orOverAndDistributivity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  
    it("(B ∧ C) ∨ A yields (A ∨ B) ∧ (A ∨ C)", () => {
      const bAndC = createAndNode("B ∧ C", false, B, C)
      const original = createOrNode("(B ∧ C) ∨ A", false, bAndC, A)
  
      const expectedLeft = createOrNode("A ∨ B", false, A, B)
      const expectedRight = createOrNode("A ∨ C", false, A, C)
      const EXPECTED = createAndNode("(A ∨ B) ∧ (A ∨ C)", false, expectedLeft, expectedRight)
  
      const ACTUAL = orOverAndDistributivity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })
  
  describe("Distributivity (∧ over ∨)", () => {
    it("A ∧ (B ∨ C) yields (A ∧ B) ∨ (A ∧ C)", () => {
      const bOrC = createOrNode("B ∨ C", false, B, C)
      const original = createAndNode("A ∧ (B ∨ C)", false, A, bOrC)
  
      const expectedLeft = createAndNode("A ∧ B", false, A, B)
      const expectedRight = createAndNode("A ∧ C", false, A, C)
      const EXPECTED = createOrNode("(A ∧ B) ∨ (A ∧ C)", false, expectedLeft, expectedRight)
  
      const ACTUAL = andOverOrDistributivity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  
    it("(B ∨ C) ∧ A yields (A ∧ B) ∨ (A ∧ C)", () => {
      const bOrC = createOrNode("B ∨ C", false, B, C)
      const original = createAndNode("(B ∨ C) ∧ A", false, bOrC, A)
  
      const expectedLeft = createAndNode("A ∧ B", false, A, B)
      const expectedRight = createAndNode("A ∧ C", false, A, C)
      const EXPECTED = createOrNode("(A ∧ B) ∨ (A ∧ C)", false, expectedLeft, expectedRight)
  
      const ACTUAL = andOverOrDistributivity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })
});
