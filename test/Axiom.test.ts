import { describe, it, expect, beforeEach, afterEach } from "vitest";

import {
  modusPonens,
  modusTollens,
  hypotheticalSyllogism,
  disjunctiveSyllogism,
  simplification,
  addition,
  conjunction,
  constructiveDilemmaOr,
  constructiveDilemmaAnd,
  doubleNegation,
  commutativity,
  associativity,
  distributivity,
  indempotent,
  contrapositive,
  deMorgan,
  conditionalIdentityImplication,
  conditionalIdentityIff,
  implicationCommonConsequent,
  implicationCommonAntecedent,
} from "../src/logic/Axiom";
import {
  createNode,
  createNotNode,
  createImplicationNode,
  createAndNode,
  sameNode,
  ERROR_NODE,
  createOrNode,
  createIffNode,
} from "../src/logic/ProofNode";
import type { ProofNode, NotNode, OrNode, AndNode } from "../src/logic/ProofNode";
import type { ImplicationNode } from "../src/logic/ProofNode";

/** Build premises And node for axiom calls. */
function premises(left: ProofNode, right: ProofNode) {
  return createAndNode(false, left, right);
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
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P, Q);
      expect(sameNode(modusPonens(premises(P, PImpliesQ), [P, PImpliesQ]), Q)).toBe(true);
    });
  
    it("Modus Ponens: (P -> Q) and P yields Q", () => {
      const P: ProofNode = createNode("P", true, undefined);
      const Q: ProofNode = createNode("Q", true, undefined);
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P, Q);
  
      expect(sameNode(modusPonens(premises(PImpliesQ, P), [P, PImpliesQ]), Q)).toBe(true);
    });
  
    it("Modus Ponens: (P -> Q) and ((P -> Q) -> L) yields L", () => {
      const P: ProofNode = createNode("P", true, undefined);
      const Q: ProofNode = createNode("Q", true, undefined);
      const L: ProofNode = createNode("L", true, undefined);
  
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P, Q);
      const PImpliesQImpliesL: ImplicationNode = createImplicationNode(true, PImpliesQ, L);
  
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
      const PImpliesW: ImplicationNode = createImplicationNode(true, P, W);
  
      expect(sameNode(modusPonens(premises(Q, PImpliesW), [Q, PImpliesW]), ERROR_NODE)).toBe(
        true,
      );
    });
  
    it("Modus Ponens: P and (Q -> R) yields ERROR", () => {
      const P: ProofNode = createNode("P", true, undefined);
      const Q: ProofNode = createNode("Q", true, undefined);
      const R: ProofNode = createNode("R", true, undefined);
  
      const QImpliesR: ImplicationNode = createImplicationNode(true, Q, R);
  
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
  
      const QImpliesR: ImplicationNode = createImplicationNode(true, Q, R);
      const PImplies_QImpliesR: ImplicationNode = createImplicationNode(true, P, QImpliesR);
  
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
  
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P1, Q);
  
      expect(sameNode(modusPonens(premises(P2, PImpliesQ), [P2, PImpliesQ]), ERROR_NODE)).toBe(
        true,
      );
    });
  });
  
  describe("Modus Tollens", () => {
    it("Modus Tollens: [(p → q) ∧ ¬q] → ¬p", () => {
      const P: ProofNode = createNode("P", true, undefined);
      const Q: ProofNode = createNode("Q", true, undefined);
  
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P, Q);
      const NQ: NotNode = createNotNode(true, Q, undefined);

      const EXPECTED: NotNode = createNotNode(true, P, undefined);
  
      let ACTUAL: ProofNode = modusTollens(premises(PImpliesQ, NQ), [PImpliesQ, NQ]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
  
      ACTUAL = modusTollens(premises(NQ, PImpliesQ), [NQ, PImpliesQ]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    });
  
    it("Modus Tollens: [(p → (c → b)) ∧ ¬(c → b)] → ¬p", () => {
      const P: ProofNode = createNode("P", true, undefined);
      const C: ProofNode = createNode("C", true, undefined);
      const B: ProofNode = createNode("B", true, undefined);
  
      const CImpliesB: ImplicationNode = createImplicationNode(true, C, B);
      const PImplies_CImpliesB: ImplicationNode = createImplicationNode(true, P, CImpliesB);

      const Not_CImpliesB: NotNode = createNotNode(true, CImpliesB, undefined);
      const EXPECTED: NotNode = createNotNode(true, P, undefined);
  
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
  
      const NQ: NotNode = createNotNode(true, Q, undefined);
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P, Q);

      const EXPECTED: NotNode = createNotNode(true, P, undefined);
  
      expect(sameNode(modusTollens(premises(NQ, PImpliesQ), [NQ, PImpliesQ]), EXPECTED)).toBe(
        true,
      );
    });
  
    it("Modus Tollens: ¬P and (P → Q) yields ERROR", () => {
      const P: ProofNode = createNode("P", true, undefined);
      const Q: ProofNode = createNode("Q", true, undefined);
  
      const NP: NotNode = createNotNode(true, P, undefined);
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P, Q);
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

        true,
        Q,
        R,
      );
      const Not_QImpliesR: NotNode = createNotNode(

        true,
        QImpliesR,
        undefined,
      );
  
      const PImpliesQ: ImplicationNode = createImplicationNode(
 
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
  
      const AImpliesB: ImplicationNode = createImplicationNode(true, A, B);
      const PImplies_AImpliesB: ImplicationNode = createImplicationNode(true, P, AImpliesB);

      const Not_AImpliesB: NotNode = createNotNode(true, AImpliesB, undefined);
      const EXPECTED: NotNode = createNotNode(true, P, undefined);
  
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
  
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P, Q);
      const QImpliesR: ImplicationNode = createImplicationNode(true, Q, R);

      const EXPECTED: ImplicationNode = createImplicationNode(false, P, R);
  
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
  
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P, Q);
      const RImpliesS: ImplicationNode = createImplicationNode(true, R, S);
      const QImplies_RImpliesS: ImplicationNode = createImplicationNode(true, Q, RImpliesS);
  
      const EXPECTED: ImplicationNode = createImplicationNode(false, P, RImpliesS);
  
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
  
      const PImpliesQ: ImplicationNode = createImplicationNode(true, P, Q);
      const RImpliesS: ImplicationNode = createImplicationNode(true, R, S);
  
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
      const NP: NotNode = createNotNode(true, P, undefined);
      const POQ: OrNode = createOrNode(true, P, Q, undefined);
  
      const EXPECTED = Q;
      let ACTUAL = disjunctiveSyllogism(premises(POQ, NP), [POQ, NP]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
      ACTUAL = disjunctiveSyllogism(premises(NP, POQ), [NP, POQ]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    });
  
    it("[(q ∨ p) ∧ ¬p] → q", () => {
      const P: ProofNode = createNode("P", true, undefined);
      const Q: ProofNode = createNode("Q", true, undefined);
      const NP: NotNode = createNotNode(true, P, undefined);
      const QOP: OrNode = createOrNode(true, Q, P, undefined);
  
      const EXPECTED = Q;
      let ACTUAL = disjunctiveSyllogism(premises(QOP, NP), [QOP, NP]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
      ACTUAL = disjunctiveSyllogism(premises(NP, QOP), [NP, QOP]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    });
  
    it("[(C ∨ (A ∧ B)) ∧ ¬( A ^ B )] → C", () => {
      const ANB: AndNode = createAndNode(true, A, B, undefined)
      const NANB: NotNode = createNotNode(true, ANB, undefined)
      const COANBD: OrNode = createOrNode(true, C, ANB, undefined)
  
  
      const EXPECTED = C;
      let ACTUAL = disjunctiveSyllogism(premises(COANBD, NANB), [COANBD, NANB]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
      ACTUAL = disjunctiveSyllogism(premises(NANB, COANBD), [NANB, COANBD]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    });
  
    it("[(C ∨ (A ∧ B)) ∧ ¬C] → (A ∧ B)", () => {
      const ANB: AndNode = createAndNode(true, A, B, undefined)
      const NC: NotNode = createNotNode(true, C, undefined)
      const COANBD: OrNode = createOrNode(true, C, ANB, undefined)
  
  
      const EXPECTED = ANB;
      let ACTUAL = disjunctiveSyllogism(premises(COANBD, NC), [COANBD, NC]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
      ACTUAL = disjunctiveSyllogism(premises(NC, COANBD), [NC, COANBD]);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    });
  });
  
  describe("Simplification", () => {
    const aConj = createAndNode(false,A,B,undefined)
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
      const aConjConjC = createAndNode(false,aConj,C,undefined)
      const EXPECTED = C
      const ACTUAL = simplification(aConjConjC, "right");
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
  })
  describe("Simplification", () => {
    it("A → A ∨ B", () => {
      const EXPECTED = createOrNode(false, A, B, undefined)
      const ACTUAL = addition(A, B);
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
    it("A ∧ B → (A ∧ B) ∨ C", () => {
      const aConj = createAndNode(false,A,B,undefined)
      const EXPECTED = createOrNode(false, aConj, C, undefined)
      const ACTUAL = addition(aConj, C)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
    it("(A ∧ B) ∧ (C ∧ D) → ((A ∧ B) ∧ (C ∧ D)) ∨ E", () => {
      const aConj = createAndNode(false,A,B,undefined)
      const cConj = createAndNode(false,C,D,undefined)
      const bigConj = createAndNode(false,A,B,undefined)
  
  
      const EXPECTED = createOrNode(false, bigConj, E, undefined)
  
      const ACTUAL = addition(bigConj, E)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true);
    })
  })
  
  describe("Conjunction", () => {
    
    it("(A ∧ B) ∧ (C ∧ D)", () => {
      const aConj = createAndNode(false, A, B, undefined)
      const cConj = createAndNode(false, C, D, undefined)
      const EXPECTED = createAndNode(false, aConj, cConj, undefined)

      const ACTUAL = conjunction(aConj, cConj)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })
  
  describe("Constructive Dilemma And", () => {
    
    it("[(A → B) ∧ (C → D)] → (A ∧ B) → (C ∧ D)", () => {
      const aImpB = createImplicationNode(false,A,B,undefined)
      const CImpD = createImplicationNode(false,C,D,undefined)
      const EXPECTED = "(A ∧ B) → (C ∧ D)"
  
      const ACTUAL = constructiveDilemmaAnd(premises(aImpB, CImpD), [aImpB, CImpD])
      console.log(ACTUAL.text)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  })
  
  describe("Constructive Dilemma or", () => {
    
    it("[(A → B) ∧ (C → D)] → (A ∨ B) → (C ∨ D)", () => {
      const aImpB = createImplicationNode(false,A,B,undefined)
      const CImpD = createImplicationNode(false,C,D,undefined)
      const EXPECTED = "(A ∨ B) → (C ∨ D)"
  
      const ACTUAL = constructiveDilemmaOr(premises(aImpB, CImpD), [aImpB, CImpD])
      console.log(ACTUAL.text)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  })
  
  describe("Double negation", () => {
    it("¬¬A yields A", () => {
      const notA = createNotNode(false, A)
      const notNotA = createNotNode(false, notA)
      const EXPECTED = "A"
  
      const ACTUAL = doubleNegation(notNotA)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  
    it("¬¬(A ∧ B) yields (A ∧ B)", () => {
      const aAndB = createAndNode(false, A, B)
      const notAAndB = createNotNode(false, aAndB)
      const notNotAAndB = createNotNode(false, notAAndB)
      const EXPECTED = "(A ∧ B)"
  
      const ACTUAL = doubleNegation(notNotAAndB)
      if (ACTUAL.text !== EXPECTED) {
        console.log("doubleNegation result:", { id: ACTUAL.id, text: ACTUAL.text, isError: ACTUAL === ERROR_NODE });
      }
      expect(ACTUAL.text).toBe(EXPECTED)
    })
  })
  
  describe("OR commutativity", () => {
    it("(A ∨ B) yields (B ∨ A)", () => {
      const aOrB = createOrNode(false, A, B)
      const EXPECTED = "B ∨ A"
  
      const ACTUAL = commutativity(aOrB)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  
    it("((A ∧ B) ∨ C) yields (C ∨ (A ∧ B))", () => {
      const aAndB = createAndNode(false, A, B)
      const aAndBOrC = createOrNode(false, aAndB, C)
      const EXPECTED = "C ∨ (A ∧ B)"
  
      const ACTUAL = commutativity(aAndBOrC)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  })
  
  describe("AND commutativity", () => {
    it("(A ∧ B) yields (B ∧ A)", () => {
      const aAndB = createAndNode(false, A, B)
      const EXPECTED = "B ∧ A"
  
      const ACTUAL = commutativity(aAndB)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  
    it("((A ∨ B) ∧ C) yields (C ∧ (A ∨ B))", () => {
      const aOrB = createOrNode(false, A, B)
      const aOrBAndC = createAndNode(false, aOrB, C)
      const EXPECTED = "C ∧ (A ∨ B)"
  
      const ACTUAL = commutativity(aOrBAndC)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  })
  
  describe("OR associativity", () => {
    it("((A ∨ B) ∨ C) yields (A ∨ (B ∨ C))", () => {
      const aOrB = createOrNode(false, A, B)
      const aOrBOrC = createOrNode(false, aOrB, C)
      const EXPECTED = "A ∨ (B ∨ C)"
  
      const ACTUAL = associativity(aOrBOrC)
      console.log(ACTUAL.text)
      console.log(EXPECTED)
      expect(ACTUAL.text === EXPECTED).toBe(true)
    })
  
    it("(A ∨ (B ∨ C)) yields ((A ∨ B) ∨ C)", () => {
      const bOrC = createOrNode(false, B, C)
      const aOr_bOrC = createOrNode(false, A, bOrC)
  
      const expectedLeft = createOrNode(false, A, B)
      const EXPECTED = createOrNode(false, expectedLeft, C)
  
      const ACTUAL = associativity(aOr_bOrC)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })
  
  describe("AND associativity", () => {
    it("((A ∧ B) ∧ C) yields (A ∧ (B ∧ C))", () => {
      const aAndB = createAndNode(false, A, B)
      const original = createAndNode(false, aAndB, C)
  
      const expectedInner = createAndNode(false, B, C)
      const EXPECTED = createAndNode(false, A, expectedInner)
  
      const ACTUAL = associativity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  
    it("(A ∧ (B ∧ C)) yields ((A ∧ B) ∧ C)", () => {
      const bAndC = createAndNode(false, B, C)
      const original = createAndNode(false, A, bAndC)
  
      const expectedInner = createAndNode(false, A, B)
      const EXPECTED = createAndNode(false, expectedInner, C)
  
      const ACTUAL = associativity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })
  
  describe("Distributivity (∨ over ∧)", () => {
    it("A ∨ (B ∧ C) yields (A ∨ B) ∧ (A ∨ C)", () => {
      const bAndC = createAndNode(false, B, C)
      const original = createOrNode(false, A, bAndC)
  
      const expectedLeft = createOrNode(false, A, B)
      const expectedRight = createOrNode(false, A, C)
      const EXPECTED = createAndNode(false, expectedLeft, expectedRight)
  
      const ACTUAL = distributivity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  
    it("(B ∧ C) ∨ A yields (A ∨ B) ∧ (A ∨ C)", () => {
      const bAndC = createAndNode(false, B, C)
      const original = createOrNode(false, bAndC, A)
  
      const expectedLeft = createOrNode(false, A, B)
      const expectedRight = createOrNode(false, A, C)
      const EXPECTED = createAndNode(false, expectedLeft, expectedRight)
  
      const ACTUAL = distributivity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })
  
  describe("Distributivity (∧ over ∨)", () => {
    it("A ∧ (B ∨ C) yields (A ∧ B) ∨ (A ∧ C)", () => {
      const bOrC = createOrNode(false, B, C)
      const original = createAndNode(false, A, bOrC)

      const expectedLeft = createAndNode(false, A, B)
      const expectedRight = createAndNode(false, A, C)
      const EXPECTED = createOrNode(false, expectedLeft, expectedRight)
  
      const ACTUAL = distributivity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  
    it("(B ∨ C) ∧ A yields (A ∧ B) ∨ (A ∧ C)", () => {
      const bOrC = createOrNode(false, B, C)
      const original = createAndNode(false, bOrC, A)

      const expectedLeft = createAndNode(false, A, B)
      const expectedRight = createAndNode(false, A, C)
      const EXPECTED = createOrNode(false, expectedLeft, expectedRight)
  
      const ACTUAL = distributivity(original)
      expect(sameNode(ACTUAL, EXPECTED)).toBe(true)
    })
  })

  describe("Indempent", () => {
    describe("Indempent Or", () => {
      it("A ∨ A yields A", () => {
        const aOra = createOrNode(false, A, A, undefined)
        const EXPECTED = A.text
        const ACTUAL = indempotent(aOra).text
        expect(EXPECTED === ACTUAL).toBe(true)
      })
  
      it("(A ∧ B) ∨ (A ∧ B) yields (A ∧ B)", () => {
        const aAndB = createAndNode(false, A, B, undefined)
        const aAndBOrAAndB = createOrNode(false, aAndB, aAndB, undefined)
        const EXPECTED = aAndB.text
        const ACTUAL = indempotent(aAndBOrAAndB).text
        expect(EXPECTED === ACTUAL).toBe(true)
      })
  
      it("Trying a non and/or node returns error", () => {
        expect(indempotent(A).text === "error")
      })
    })
  
    describe("Indempent And", () => {
      it("A ∧ A yields A", () => {
        const aAnda = createAndNode(false, A, A, undefined)
        const EXPECTED = A.text
        const ACTUAL = indempotent(aAnda).text
        expect(EXPECTED === ACTUAL).toBe(true)
      })
  
      it("(A ∧ B) ∧ (A ∧ B) yields (A ∧ B)", () => {
        const aAndB = createAndNode(false, A, B, undefined)
        const aAndBOrAAndB = createAndNode(false, aAndB, aAndB, undefined)
        const EXPECTED = aAndB.text
        const ACTUAL = indempotent(aAndBOrAAndB).text
        expect(EXPECTED === ACTUAL).toBe(true)
      })
  
      it("Trying a non or node returns error", () => {
        expect(indempotent(A).text === "error")
      })
    })
  })

  describe("Contrapositive", () => {
    it("(A → B) ≡ (¬B → ¬A)", () => {

      const aImpB = createImplicationNode(false,A,B,[A,B])
      const ACTUAL = contrapositive(aImpB).text
      const EXPECTED = "¬B → ¬A"
      expect(EXPECTED === ACTUAL).toBe(true)
    })
  })

  describe("De Morgan", () => {
    it("¬(A ∨ B) ≡ (¬A ∧ ¬B)", () => {
      const aOrB = createOrNode(false, A, B)
      const notAOrB = createNotNode(false, aOrB)
      const ACTUAL = deMorgan(notAOrB).text
      const EXPECTED = "¬A ∧ ¬B"
      expect(ACTUAL).toBe(EXPECTED)
    })
    it("handles double-negated terms (AND case): ¬(¬A ∧ ¬B) ≡ A ∨ B", () => {
      const notA = createNotNode(false, A)
      const notB = createNotNode(false, B)
      const notAAndNotB = createAndNode(false, notA, notB)
      const input = createNotNode(false, notAAndNotB)

      const actual = deMorgan(input)
      const expected = "A ∨ B"

      expect(actual.text).toBe(expected)
    })
    it("¬(A ∧ B) ≡ (¬A ∨ ¬B)", () => {
      const aAndB = createAndNode(false, A, B)
      const notAAndB = createNotNode(false, aAndB)
      const ACTUAL = deMorgan(notAAndB).text
      const EXPECTED = "¬A ∨ ¬B"
      expect(ACTUAL).toBe(EXPECTED)
    })
    it("nested De Morgan: ¬((A ∧ B) ∨ (C ∧ D)) → (¬(A ∧ B) ∧ ¬(C ∧ D)), then ¬(A ∧ B) → (¬A ∨ ¬B)", () => {
      const aAndB = createAndNode(false, A, B)
      const cAndD = createAndNode(false, C, D)
      const aAndBOrCAndD = createOrNode(false, aAndB, cAndD)
      const notOuter = createNotNode(false, aAndBOrCAndD)

      const afterFirst = deMorgan(notOuter) as AndNode
      expect(afterFirst.text).toBe("¬(A ∧ B) ∧ ¬(C ∧ D)")

      const notAAndB = afterFirst.left
      expect(notAAndB).toBeDefined()
      const afterSecond = deMorgan(notAAndB!)
      expect(afterSecond.text).toBe("¬A ∨ ¬B")
    })
  })

  describe("Conditional Identity (→)", () => {
    it("(A → B) ≡ (¬A ∨ B)", () => {
      const aImpB = createImplicationNode(false, A, B)
      const ACTUAL = conditionalIdentityImplication(aImpB).text
      expect(ACTUAL).toBe("¬A ∨ B")
    })
  })

  describe("Conditional Identity (↔)", () => {
    it("A ↔ B ≡ (A → B) ∧ (B → A)", () => {
      const aIffB = createIffNode(false, A, B)
      const ACTUAL = conditionalIdentityIff(aIffB).text
      expect(ACTUAL).toBe("(A → B) ∧ (B → A)")
    })
  })

  it("Contrapositive of a compound implication: ((A ∧ B) → (C ∨ D)) becomes (¬(C ∨ D) → ¬(A ∧ B)) and does not mutate original", () => {
    // Build antecedent (A ∧ B)
    const aAndB = createAndNode(false, A, B, [A, B])

    // Build consequent (C ∨ D)
    const cOrD = createOrNode(false, C, D, [C, D])

    // Build implication ((A ∧ B) → (C ∨ D))
    const imp = createImplicationNode(false, aAndB, cOrD, [aAndB, cOrD])
  
    const originalTextBefore = imp.text
  
    const result = contrapositive(imp)
  
    const EXPECTED = "¬(C ∨ D) → ¬(A ∧ B)"
    expect(result.text).toBe(EXPECTED)
  
    // Ensure original node wasn't mutated
    expect(imp.text).toBe(originalTextBefore)
  
  
  })

  it("¬P → ¬Q is congruent to Q → P (contrapositive)", () => {
    const notP = createNotNode(false, A)
    const notQ = createNotNode(false, B)
    const notPImplNotQ = createImplicationNode(false, notP, notQ, [notP, notQ])

    const result = contrapositive(notPImplNotQ)
    const expected = "B → A"

    expect(result.text).toBe(expected)
  })


  describe("Conditional Identity:", () => {
    it("Conditional Identity: A → B ≡ ¬A ∨ B", () => {
      const aImpB = createImplicationNode(false, A, B, [A, B])
      const EXPECTED = "¬A ∨ B"
      const RESULT = conditionalIdentityImplication(aImpB).text
  
      expect(RESULT).toBe(EXPECTED)
    })

    it("Conditional Identity: (A ∧ B) → (C ∨ D) ≡ ¬(A ∧ B) ∨ (C ∨ D)", () => {
      const aAndB = createAndNode(false, A, B, [A, B])
      const cOrD = createOrNode(false, C, D, [C, D])
      const nestedImplication = createImplicationNode(false, aAndB, cOrD, [aAndB, cOrD])
      const EXPECTED = "¬(A ∧ B) ∨ (C ∨ D)"
      const RESULT = conditionalIdentityImplication(nestedImplication).text
  
      expect(RESULT).toBe(EXPECTED)
    })
    
    it("Conditional Identity: A ↔ B ≡ (A → B) ∧ (B → A)", () => {
      const aIffB = createIffNode(false, A, B, [A, B])
      const EXPECTED = "(A → B) ∧ (B → A)"
      const RESULT = conditionalIdentityIff(aIffB).text
  
      expect(RESULT).toBe(EXPECTED)
    })

    it("Conditional Identity: ¬A → B ≡ A ∨ B", () => {
      const notA = createNotNode(false, A, [A])
      const notAImpB = createImplicationNode(false, notA, B, [notA, B])
      const EXPECTED = "A ∨ B"
      const RESULT = conditionalIdentityImplication(notAImpB).text

      expect(RESULT).toBe(EXPECTED)
    })


    it("Conditional Identity: (A ∧ B) ↔ (C ∨ D) ≡ ((A ∧ B) → (C ∨ D)) ∧ ((C ∨ D) → (A ∧ B))", () => {
      const aAndB = createAndNode(false, A, B, [A, B])
      const cOrD = createOrNode(false, C, D, [C, D])
      const nestedIff = createIffNode(false, aAndB, cOrD, [aAndB, cOrD])
      const EXPECTED = "((A ∧ B) → (C ∨ D)) ∧ ((C ∨ D) → (A ∧ B))"
      const RESULT = conditionalIdentityIff(nestedIff).text
  
      expect(RESULT).toBe(EXPECTED)
    })
  })

  describe("Implication (Common Consequent)", () => {
    it("[(A → C) ∧ (B → C)] → ((A ∨ B) → C)", () => {
      const aImpC = createImplicationNode(false, A, C)
      const bImpC = createImplicationNode(false, B, C)

      const ACTUAL = implicationCommonConsequent(premises(aImpC, bImpC), [aImpC, bImpC]).text
      const EXPECTED = "(A ∨ B) → C"
      expect(ACTUAL).toBe(EXPECTED)
    })

    it("nested antecedents: [((A ∧ B) → E) ∧ ((C ∨ D) → E)] → (((A ∧ B) ∨ (C ∨ D)) → E)", () => {
      const aAndB = createAndNode(false, A, B)
      const cOrD = createOrNode(false, C, D)
      const aAndBImpE = createImplicationNode(false, aAndB, E)
      const cOrDImpE = createImplicationNode(false, cOrD, E)

      const ACTUAL = implicationCommonConsequent(
        premises(aAndBImpE, cOrDImpE),
        [aAndBImpE, cOrDImpE],
      ).text
      const EXPECTED = "((A ∧ B) ∨ (C ∨ D)) → E"
      expect(ACTUAL).toBe(EXPECTED)
    })

    it("returns ERROR when consequents differ", () => {
      const aImpC = createImplicationNode(false, A, C)
      const bImpD = createImplicationNode(false, B, D)
      const ACTUAL = implicationCommonConsequent(premises(aImpC, bImpD), [aImpC, bImpD])
      expect(sameNode(ACTUAL, ERROR_NODE)).toBe(true)
    })
  })

  describe("Implication (Common Antecedent)", () => {
    it("[(A → B) ∧ (A → C)] → (A → (B ∧ C))", () => {
      const aImpB = createImplicationNode(false, A, B)
      const aImpC = createImplicationNode(false, A, C)

      const ACTUAL = implicationCommonAntecedent(premises(aImpB, aImpC), [aImpB, aImpC]).text
      const EXPECTED = "A → (B ∧ C)"
      expect(ACTUAL).toBe(EXPECTED)
    })

    it("nested consequents: [(A → (B ∨ C)) ∧ (A → (D ∧ E))] → (A → ((B ∨ C) ∧ (D ∧ E)))", () => {
      const bOrC = createOrNode(false, B, C)
      const dAndE = createAndNode(false, D, E)
      const aImpBOrC = createImplicationNode(false, A, bOrC)
      const aImpDAndE = createImplicationNode(false, A, dAndE)

      const ACTUAL = implicationCommonAntecedent(
        premises(aImpBOrC, aImpDAndE),
        [aImpBOrC, aImpDAndE],
      ).text
      const EXPECTED = "A → ((B ∨ C) ∧ (D ∧ E))"
      expect(ACTUAL).toBe(EXPECTED)
    })

    it("returns ERROR when antecedents differ", () => {
      const aImpB = createImplicationNode(false, A, B)
      const cImpD = createImplicationNode(false, C, D)
      const ACTUAL = implicationCommonAntecedent(premises(aImpB, cImpD), [aImpB, cImpD])
      expect(sameNode(ACTUAL, ERROR_NODE)).toBe(true)
    })
  })
  


  
});
