import { describe, it, expect, vi } from "vitest";

import {
  modusPonens,
  modusTollens,
  hypotheticalSyllogism,
  disjunctiveSyllogism,
  simplification,
  addition,
  constructiveDilemmaOr,
  constructiveDilemmaAnd,
  absorption,
  associativity,
  distributivity,
  indempotent,
  contrapositive,
  deMorgan,
  conditionalIdentityImplication,
  conditionalIdentityIff,
  implication,
} from "../src/logic/Axiom";
import {
  createNode,
  createImplicationNode,
  createAndNode,
  sameNode,
  ERROR_NODE,
  createOrNode,
  createIffNode,
  negateNode,
  isAndNode,
  isImplicationNode,
} from "../src/logic/ProofNode";
import type { ProofNode, AndNode } from "../src/logic/ProofNode";
import type { ReverseRule } from "../src/logic/GeneratePuzzle";
import {
  revHS,
  revDS,
  revMP,
  revMT,
  revSimp,
  revCD,
  revAdd,
  revConj,
  revAbso,
  revAndAssociativity,
  revOrAssociativity,
  revDistributivity,
  revIndempotent,
  revDeMorgan,
  revContrapositive,
  revConditionalIdentityImplication,
  revConditionalIdentityOr,
  revConditionalIdentityIff,
  revImplication,
  getReverseRulesForNode,
} from "../src/logic/GeneratePuzzle";

function premises(left: ProofNode, right: ProofNode) {
  return createAndNode(false, left, right);
}

const A: ProofNode = createNode("A", true, undefined);
const B: ProofNode = createNode("B", true, undefined);
const C: ProofNode = createNode("C", true, undefined);
const D: ProofNode = createNode("D", true, undefined);

/** Standard CD (OR): [(p→q)∧(r→s)] → [(p∨r)→(q∨s)] — matches revCDOr / axiom UI text. */
function constructiveDilemmaOrStandard(prem: AndNode, selected: ProofNode[] = []) {
  if (!prem.left || !prem.right) return ERROR_NODE;
  const a = prem.left;
  const b = prem.right;
  if (!isImplicationNode(a) || !isImplicationNode(b)) return ERROR_NODE;
  const ant = createOrNode(false, a.left, b.left, undefined);
  const cons = createOrNode(false, a.right, b.right, undefined);
  return createImplicationNode(false, ant, cons, selected);
}

/** Standard CD (AND): [(p→q)∧(r→s)] → [(p∧r)→(q∧s)] — matches revCDAnd. */
function constructiveDilemmaAndStandard(prem: AndNode, selected: ProofNode[] = []) {
  if (!prem.left || !prem.right) return ERROR_NODE;
  const a = prem.left;
  const b = prem.right;
  if (!isImplicationNode(a) || !isImplicationNode(b)) return ERROR_NODE;
  const ant = createAndNode(false, a.left, b.left, undefined);
  const cons = createAndNode(false, a.right, b.right, undefined);
  return createImplicationNode(false, ant, cons, selected);
}

function runReverse(rule: ReverseRule, node: ProofNode): ProofNode[] {
  return rule(node);
}

describe("ReverseAxiom", () => {
  describe("rule selection", () => {
    it("getReverseRulesForNode returns non-empty lists by shape", () => {
      expect(getReverseRulesForNode(A).length).toBeGreaterThan(0);
      expect(getReverseRulesForNode(createImplicationNode(false, A, B)).length).toBeGreaterThan(0);
      expect(getReverseRulesForNode(createOrNode(false, A, B)).length).toBeGreaterThan(0);
      expect(getReverseRulesForNode(createAndNode(false, A, B)).length).toBeGreaterThan(0);
      expect(getReverseRulesForNode(createIffNode(false, A, B)).length).toBeGreaterThan(0);
    });
  });

  describe("round-trip with forward axioms", () => {
    it("revMP: P and (P→Q) ⊢ Q", () => {
      const q = createImplicationNode(false, A, B, undefined, true);

      const reversed = runReverse(revMP, q);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(2);

      const [p, pImplQ] = reversed;
      const result = modusPonens(premises(p, pImplQ), [p, pImplQ]);
      expect(sameNode(result, q)).toBe(true);
    });

    it("revHS: (P→Q)∧(Q→R) ⊢ P→R", () => {
      const pImpR = createImplicationNode(false, A, C, undefined, true);

      const reversed = runReverse(revHS, pImpR);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(2);

      const [pImpG, gImpR] = reversed;
      const result = hypotheticalSyllogism(premises(pImpG, gImpR), [pImpG, gImpR]);
      expect(sameNode(result, pImpR)).toBe(true);
    });

    it("revMT: ¬Q∧(P→Q) ⊢ ¬P", () => {
      const notP = negateNode(false, A, undefined, true);

      const reversed = runReverse(revMT, notP);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(2);

      const [notG, pImpG] = reversed;
      const result = modusTollens(premises(notG, pImpG), [notG, pImpG]);
      expect(sameNode(result, notP)).toBe(true);
    });

    it("revSimp: (P∧Q) ⊢ P", () => {
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

      const reversed = runReverse(revSimp, A);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(1);

      const result = simplification(reversed[0] as ReturnType<typeof createAndNode>, "left");
      expect(sameNode(result, A)).toBe(true);

      randomSpy.mockRestore();
    });

    it("revDS: (P∨Q)∧¬P ⊢ Q", () => {
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

      const reversed = runReverse(revDS, B);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(2);

      const result = disjunctiveSyllogism(premises(reversed[0], reversed[1]), [
        reversed[0],
        reversed[1],
      ]);
      expect(sameNode(result, B)).toBe(true);

      randomSpy.mockRestore();
    });

    it("revCD (AND variant): standard (P∧R)→(Q∧S) round-trip", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cImpD = createImplicationNode(false, C, D, undefined, true);
      const prem = premises(aImpB, cImpD);
      const cdResult = constructiveDilemmaAndStandard(prem, [aImpB, cImpD]);
      expect(sameNode(cdResult, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revCD, cdResult);
      expect(reversed.length).toBeGreaterThan(0);

      const restored = constructiveDilemmaAndStandard(reversed[0] as AndNode, [aImpB, cImpD]);
      expect(sameNode(restored, cdResult)).toBe(true);
    });

    it("revCD (OR variant): standard (P∨R)→(Q∨S) round-trip", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cImpD = createImplicationNode(false, C, D, undefined, true);
      const prem = premises(aImpB, cImpD);
      const cdResult = constructiveDilemmaOrStandard(prem, [aImpB, cImpD]);
      expect(sameNode(cdResult, ERROR_NODE)).toBe(false);
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);
      const reversed = runReverse(revCD, cdResult);
      expect(reversed.length).toBeGreaterThan(0);

      const restored = constructiveDilemmaOrStandard(
        reversed[0] as AndNode,
        [aImpB, cImpD],
      );
      expect(sameNode(restored, cdResult)).toBe(true);
      randomSpy.mockRestore();
    });

    it("revAbso: P∨(P∧Q) ⊢ P", () => {

      const reversed = runReverse(revAbso, A);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(1);
      expect(sameNode(absorption(reversed[0]), A)).toBe(true);
    });

    it("revAndAssociativity ↔ associativity on AND", () => {
      const flat = createAndNode(
        false,
        createAndNode(false, A, B, undefined, true),
        C,
        undefined,
        true,
      );
      const reassoc = associativity(flat);
      expect(sameNode(reassoc, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revAndAssociativity, reassoc);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(reversed[0], flat)).toBe(true);
    });

    it("revOrAssociativity ↔ associativity on OR", () => {
      const flat = createOrNode(
        false,
        createOrNode(false, A, B, undefined, true),
        C,
        undefined,
        true,
      );
      const reassoc = associativity(flat);
      expect(sameNode(reassoc, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revOrAssociativity, reassoc);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(reversed[0], flat)).toBe(true);
    });

    it("revDistributivity ↔ distributivity (simple ∧ over ∨)", () => {
      const expanded = distributivity(
        createAndNode(false, A, createOrNode(false, B, C, undefined, true), undefined, true),
      );
      expect(sameNode(expanded, ERROR_NODE)).toBe(false);
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);
      const reversed = runReverse(revDistributivity, expanded);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(distributivity(reversed[0]), expanded)).toBe(true);
      randomSpy.mockRestore();
    });

    it("revDistributivity ↔ distributivity (simple ∨ over ∧)", () => {
      const expanded = distributivity(
        createOrNode(false, A, createAndNode(false, B, C, undefined, true), undefined, true),
      );
      expect(sameNode(expanded, ERROR_NODE)).toBe(false);
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);
      const reversed = runReverse(revDistributivity, expanded);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(distributivity(reversed[0]), expanded)).toBe(true);
      randomSpy.mockRestore();
    });

    it("revIndempotent: P∨P ⊢ P", () => {
      const pOrP = createOrNode(false, A, A, undefined, true);

      const reversed = runReverse(revIndempotent, A);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(reversed[0], pOrP)).toBe(true);
      expect(sameNode(indempotent(reversed[0]), A)).toBe(true);
    });

    it("revDeMorgan: ¬(¬P∨¬Q) ⊢ P∧Q", () => {
      const pAndQ = createAndNode(false, A, B, undefined, true);

      const reversed = runReverse(revDeMorgan, pAndQ);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(deMorgan(reversed[0]), pAndQ)).toBe(true);
    });

    it("revDeMorgan on OR: ¬(¬P∧¬Q) ⊢ P∨Q", () => {
      const pOrQ = createOrNode(false, A, B, undefined, true);

      const reversed = runReverse(revDeMorgan, pOrQ);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(deMorgan(reversed[0]), pOrQ)).toBe(true);
    });

    it("revContrapositive ↔ contrapositive", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cp = contrapositive(aImpB);
      expect(sameNode(cp, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revContrapositive, aImpB);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(reversed[0], cp)).toBe(true);
      expect(sameNode(contrapositive(reversed[0]), aImpB)).toBe(true);
    });

    it("revConditionalIdentityImplication ↔ conditionalIdentityImplication", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const asOr = conditionalIdentityImplication(aImpB);
      expect(sameNode(asOr, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revConditionalIdentityImplication, aImpB);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(reversed[0], asOr)).toBe(true);
      expect(sameNode(conditionalIdentityImplication(reversed[0]), aImpB)).toBe(true);
    });

    it("revConditionalIdentityOr: ¬A∨B becomes A→B", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const asOr = conditionalIdentityImplication(aImpB);
      const reversed = runReverse(revConditionalIdentityOr, asOr);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(reversed[0], aImpB)).toBe(true);
    });

    it("revImplication case 1: common consequent", () => {
      const aImpC = createImplicationNode(false, A, C, undefined, true);
      const bImpC = createImplicationNode(false, B, C, undefined, true);
      const merged = implication(premises(aImpC, bImpC), [aImpC, bImpC]);
      expect(sameNode(merged, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revImplication, merged);
      expect(reversed.length).toBeGreaterThan(0);
      expect(
        sameNode(implication(reversed[0] as ReturnType<typeof createAndNode>, [aImpC, bImpC]),
          merged,
        ),
      ).toBe(true);
    });

    it("revImplication case 2: common antecedent", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const aImpC = createImplicationNode(false, A, C, undefined, true);
      const merged = implication(premises(aImpB, aImpC), [aImpB, aImpC]);
      expect(sameNode(merged, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revImplication, merged);
      expect(reversed.length).toBeGreaterThan(0);
      expect(
        sameNode(implication(reversed[0] as ReturnType<typeof createAndNode>, [aImpB, aImpC]),
          merged,
        ),
      ).toBe(true);
    });

    it("revImplication case 3: split consequent", () => {
      const aImpBC = createImplicationNode(
        false,
        A,
        createAndNode(false, B, C, undefined, true),
        undefined,
        true,
      );
      const split = implication(aImpBC, [aImpBC]);
      expect(sameNode(split, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revImplication, aImpBC);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(implication(reversed[0] as AndNode, []), aImpBC)).toBe(true);
    });

    it("revImplication case 4: split antecedent", () => {
      const abImpC = createImplicationNode(
        false,
        createOrNode(false, A, B, undefined, true),
        C,
        undefined,
        true,
      );
      const split = implication(abImpC, [abImpC]);
      expect(sameNode(split, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revImplication, abImpC);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(implication(reversed[0] as AndNode, []), abImpC)).toBe(true);
    });
  });

  describe("structural reverse behavior", () => {
    it("revConj splits (P∧Q) into P and Q", () => {
      const pAndQ = createAndNode(false, A, B, undefined, true);

      const reversed = runReverse(revConj, pAndQ);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(2);
      expect(sameNode(reversed[0], A)).toBe(true);
      expect(sameNode(reversed[1], B)).toBe(true);
    });

    it("revAdd on (P∨Q) keeps one disjunct", () => {
      const pOrQ = createOrNode(false, A, B, undefined, true);
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);
      const reversed = runReverse(revAdd, pOrQ);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(1);
      expect(sameNode(reversed[0], A)).toBe(true);

      randomSpy.mockRestore();
    });

    it("revAdd on (¬P∨¬Q) keeps one not disjunct when both are removable", () => {
      const bothNot = createOrNode(
        false,
        negateNode(false, A, undefined, true),
        negateNode(false, B, undefined, true),
        undefined,
        true,
      );
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

      const reversed = runReverse(revAdd, bothNot);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(1);
      expect(sameNode(reversed[0], negateNode(false, A, undefined, true))).toBe(
        true,
      );

      randomSpy.mockRestore();
    });

    it("revAdd rejects when neither disjunct is an atom or not-node", () => {
      const bothComplex = createOrNode(
        false,
        createAndNode(false, A, B, undefined, true),
        createAndNode(false, C, D, undefined, true),
        undefined,
        true,
      );
      expect(runReverse(revAdd, bothComplex)).toEqual([ERROR_NODE]);
    });

    it("revAdd on P∨(Q∧R) keeps the conjunction", () => {
      const qAndR = createAndNode(false, B, C, undefined, true);
      const pOrQAndR = createOrNode(false, A, qAndR, undefined, true);

      const reversed = runReverse(revAdd, pOrQAndR);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(1);
      expect(sameNode(reversed[0], qAndR)).toBe(true);
    });

    it("revAdd on (P∧Q)∨R removes R and keeps the conjunction", () => {
      const pAndQ = createAndNode(false, A, B, undefined, true);
      const orNode = createOrNode(false, pAndQ, C, undefined, true);

      const reversed = runReverse(revAdd, orNode);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(1);
      expect(sameNode(reversed[0], pAndQ)).toBe(true);
    });

    it("addition then revAdd (keep left) recovers original with second given", () => {
      const expanded = addition(A, B);
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

      const reversed = runReverse(revAdd, expanded);
      expect(reversed.length).toBeGreaterThan(0);
      expect(sameNode(reversed[0], A)).toBe(true);
      expect(sameNode(addition(reversed[0], B), expanded)).toBe(true);

      randomSpy.mockRestore();
    });
  });

  describe("guards and rejects", () => {
    it("revHS returns false for non-implication", () => {
      expect(runReverse(revHS, createIffNode(false, A, B, undefined, true))).toEqual([
        ERROR_NODE,
      ]);
    });

    it("revConj returns false for non-AND", () => {
      expect(runReverse(revConj, A)).toEqual([ERROR_NODE]);
    });

    it("revAbso returns false for AND with nested ∧/∨ child", () => {
      const nested = createAndNode(false, createOrNode(false, A, B), C, undefined, true);
      expect(runReverse(revAbso, nested)).toEqual([ERROR_NODE]);
    });
  });

  describe("known forward mismatches (document bugs)", () => {
    it("constructiveDilemmaAnd does not invert revCD AND shape", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cImpD = createImplicationNode(false, C, D, undefined, true);
      const prem = premises(aImpB, cImpD);
      const standard = constructiveDilemmaAndStandard(prem, [aImpB, cImpD]);
      const reversed = runReverse(revCD, standard);
      expect(reversed.length).toBeGreaterThan(0);

      const viaCurrentForward = constructiveDilemmaAnd(reversed[0] as AndNode, [aImpB, cImpD]);
      expect(sameNode(viaCurrentForward, standard)).toBe(false);
    });

    it("constructiveDilemmaOr does not invert revCD OR shape", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cImpD = createImplicationNode(false, C, D, undefined, true);
      const prem = premises(aImpB, cImpD);
      const standard = constructiveDilemmaOrStandard(prem, [aImpB, cImpD]);
      const reversed = runReverse(revCD, standard);
      expect(reversed.length).toBeGreaterThan(0);

      const viaCurrentForward = constructiveDilemmaOr(
        reversed[0] as ReturnType<typeof createAndNode>,
        [aImpB, cImpD],
      );
      expect(sameNode(viaCurrentForward, standard)).toBe(false);
    });

    it("revConditionalIdentityIff does not round-trip conditionalIdentityIff", () => {
      const aIffB = createIffNode(false, A, B, undefined, true);
      const forward = conditionalIdentityIff(aIffB);
      expect(sameNode(forward, ERROR_NODE)).toBe(false);
      const reversed = runReverse(revConditionalIdentityIff, aIffB);
      expect(reversed.length).toBeGreaterThan(0);
      expect(reversed).toHaveLength(1);
      expect(sameNode(conditionalIdentityIff(aIffB), forward)).toBe(true);
      expect(sameNode(reversed[0], forward)).toBe(false);
    });
  });
});
