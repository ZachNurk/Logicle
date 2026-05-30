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
import type { ReverseAxiomContext } from "../src/logic/ReverseAxiom";
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
} from "../src/logic/ReverseAxiom";

function premises(left: ProofNode, right: ProofNode) {
  return createAndNode(false, left, right);
}

const A: ProofNode = createNode("A", true, undefined);
const B: ProofNode = createNode("B", true, undefined);
const C: ProofNode = createNode("C", true, undefined);
const D: ProofNode = createNode("D", true, undefined);
const G: ProofNode = createNode("G", true, undefined);

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

type CaptureContext = {
  ctx: ReverseAxiomContext;
  added: () => ProofNode[];
};

function createCaptureContext(
  overrides: Partial<ReverseAxiomContext> = {},
): CaptureContext {
  let addedNodes: ProofNode[] = [];
  const ctx: ReverseAxiomContext = {
    replaceNode: (_node, ...added) => {
      addedNodes = added;
      return true;
    },
    generateAtom: () => G,
    createRandomAndNode: (l, r) => createAndNode(false, l, r),
    createRandomOrNode: (l, r) => createOrNode(false, l, r),
    ...overrides,
  };
  return {
    ctx,
    added: () => addedNodes,
  };
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
      const { ctx, added } = createCaptureContext();
      const q = createImplicationNode(false, A, B, undefined, true);

      expect(revMP(ctx, q)).toBe(true);
      expect(added()).toHaveLength(2);

      const [p, pImplQ] = added();
      const result = modusPonens(premises(p, pImplQ), [p, pImplQ]);
      expect(sameNode(result, q)).toBe(true);
    });

    it("revHS: (P→Q)∧(Q→R) ⊢ P→R", () => {
      const { ctx, added } = createCaptureContext();
      const pImpR = createImplicationNode(false, A, C, undefined, true);

      expect(revHS(ctx, pImpR)).toBe(true);
      expect(added()).toHaveLength(2);

      const [pImpG, gImpR] = added();
      const result = hypotheticalSyllogism(premises(pImpG, gImpR), [pImpG, gImpR]);
      expect(sameNode(result, pImpR)).toBe(true);
    });

    it("revMT: ¬Q∧(P→Q) ⊢ ¬P", () => {
      const { ctx, added } = createCaptureContext();
      const notP = negateNode(false, A, undefined, true);

      expect(revMT(ctx, notP)).toBe(true);
      expect(added()).toHaveLength(2);

      const [notG, pImpG] = added();
      const result = modusTollens(premises(notG, pImpG), [notG, pImpG]);
      expect(sameNode(result, notP)).toBe(true);
    });

    it("revSimp: (P∧Q) ⊢ P", () => {
      const { ctx, added } = createCaptureContext();
      const pAndG = createAndNode(false, A, G, undefined, true);

      expect(revSimp(ctx, A)).toBe(true);
      expect(added()).toHaveLength(1);
      expect(sameNode(added()[0], pAndG)).toBe(true);

      const result = simplification(added()[0] as ReturnType<typeof createAndNode>, "left");
      expect(sameNode(result, A)).toBe(true);
    });

    it("revDS: (P∨Q)∧¬P ⊢ Q", () => {
      const { ctx, added } = createCaptureContext();
      const gOrB = createOrNode(false, G, B, undefined, true);
      const notG = negateNode(false, G, undefined, true);

      expect(revDS(ctx, B)).toBe(true);
      expect(added()).toHaveLength(2);

      const result = disjunctiveSyllogism(premises(added()[0], added()[1]), [
        added()[0],
        added()[1],
      ]);
      expect(sameNode(result, B)).toBe(true);
      expect(sameNode(added()[0], notG)).toBe(true);
      expect(sameNode(added()[1], gOrB)).toBe(true);
    });

    it("revCD (AND variant): standard (P∧R)→(Q∧S) round-trip", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cImpD = createImplicationNode(false, C, D, undefined, true);
      const prem = premises(aImpB, cImpD);
      const cdResult = constructiveDilemmaAndStandard(prem, [aImpB, cImpD]);
      expect(sameNode(cdResult, ERROR_NODE)).toBe(false);

      const { ctx, added } = createCaptureContext({
        createRandomAndNode: (l, r) => createAndNode(false, l, r),
      });
      expect(revCD(ctx, cdResult)).toBe(true);

      const restored = constructiveDilemmaAndStandard(added()[0] as AndNode, [aImpB, cImpD]);
      expect(sameNode(restored, cdResult)).toBe(true);
    });

    it("revCD (OR variant): standard (P∨R)→(Q∨S) round-trip", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cImpD = createImplicationNode(false, C, D, undefined, true);
      const prem = premises(aImpB, cImpD);
      const cdResult = constructiveDilemmaOrStandard(prem, [aImpB, cImpD]);
      expect(sameNode(cdResult, ERROR_NODE)).toBe(false);

      const { ctx, added } = createCaptureContext();
      expect(revCD(ctx, cdResult)).toBe(true);

      const restored = constructiveDilemmaOrStandard(
        added()[0] as AndNode,
        [aImpB, cImpD],
      );
      expect(sameNode(restored, cdResult)).toBe(true);
    });

    it("revAbso: P∨(P∧Q) ⊢ P", () => {
      const { ctx, added } = createCaptureContext({
        createRandomOrNode: (l, r) => createOrNode(false, l, r),
        createRandomAndNode: (l, r) => createAndNode(false, l, r),
      });

      expect(revAbso(ctx, A)).toBe(true);
      expect(added()).toHaveLength(1);
      expect(sameNode(absorption(added()[0]), A)).toBe(true);
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

      const { ctx, added } = createCaptureContext();
      expect(revAndAssociativity(ctx, reassoc)).toBe(true);
      expect(sameNode(added()[0], flat)).toBe(true);
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

      const { ctx, added } = createCaptureContext();
      expect(revOrAssociativity(ctx, reassoc)).toBe(true);
      expect(sameNode(added()[0], flat)).toBe(true);
    });

    it("revDistributivity ↔ distributivity (simple ∧ over ∨)", () => {
      const expanded = distributivity(
        createAndNode(false, A, createOrNode(false, B, C, undefined, true), undefined, true),
      );
      expect(sameNode(expanded, ERROR_NODE)).toBe(false);

      const { ctx, added } = createCaptureContext();
      expect(revDistributivity(ctx, expanded)).toBe(true);
      expect(sameNode(distributivity(added()[0]), expanded)).toBe(true);
    });

    it("revDistributivity ↔ distributivity (simple ∨ over ∧)", () => {
      const expanded = distributivity(
        createOrNode(false, A, createAndNode(false, B, C, undefined, true), undefined, true),
      );
      expect(sameNode(expanded, ERROR_NODE)).toBe(false);

      const { ctx, added } = createCaptureContext();
      expect(revDistributivity(ctx, expanded)).toBe(true);
      expect(sameNode(distributivity(added()[0]), expanded)).toBe(true);
    });

    it("revIndempotent: P∨P ⊢ P", () => {
      const { ctx, added } = createCaptureContext();
      const pOrP = createOrNode(false, A, A, undefined, true);

      expect(revIndempotent(ctx, A)).toBe(true);
      expect(sameNode(added()[0], pOrP)).toBe(true);
      expect(sameNode(indempotent(added()[0]), A)).toBe(true);
    });

    it("revDeMorgan: ¬(¬P∨¬Q) ⊢ P∧Q", () => {
      const pAndQ = createAndNode(false, A, B, undefined, true);
      const { ctx, added } = createCaptureContext();

      expect(revDeMorgan(ctx, pAndQ)).toBe(true);
      expect(sameNode(deMorgan(added()[0]), pAndQ)).toBe(true);
    });

    it("revDeMorgan on OR: ¬(¬P∧¬Q) ⊢ P∨Q", () => {
      const pOrQ = createOrNode(false, A, B, undefined, true);
      const { ctx, added } = createCaptureContext();

      expect(revDeMorgan(ctx, pOrQ)).toBe(true);
      expect(sameNode(deMorgan(added()[0]), pOrQ)).toBe(true);
    });

    it("revContrapositive ↔ contrapositive", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cp = contrapositive(aImpB);
      expect(sameNode(cp, ERROR_NODE)).toBe(false);

      const { ctx, added } = createCaptureContext();
      expect(revContrapositive(ctx, aImpB)).toBe(true);
      expect(sameNode(added()[0], cp)).toBe(true);
      expect(sameNode(contrapositive(added()[0]), aImpB)).toBe(true);
    });

    it("revConditionalIdentityImplication ↔ conditionalIdentityImplication", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const asOr = conditionalIdentityImplication(aImpB);
      expect(sameNode(asOr, ERROR_NODE)).toBe(false);

      const { ctx, added } = createCaptureContext();
      expect(revConditionalIdentityImplication(ctx, aImpB)).toBe(true);
      expect(sameNode(added()[0], asOr)).toBe(true);
      expect(sameNode(conditionalIdentityImplication(added()[0]), aImpB)).toBe(true);
    });

    it("revConditionalIdentityOr: ¬A∨B becomes A→B", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const asOr = conditionalIdentityImplication(aImpB);

      const { ctx, added } = createCaptureContext();
      expect(revConditionalIdentityOr(ctx, asOr)).toBe(true);
      expect(sameNode(added()[0], aImpB)).toBe(true);
    });

    it("revImplication case 1: common consequent", () => {
      const aImpC = createImplicationNode(false, A, C, undefined, true);
      const bImpC = createImplicationNode(false, B, C, undefined, true);
      const merged = implication(premises(aImpC, bImpC), [aImpC, bImpC]);
      expect(sameNode(merged, ERROR_NODE)).toBe(false);

      const { ctx, added } = createCaptureContext();
      expect(revImplication(ctx, merged)).toBe(true);
      expect(
        sameNode(implication(added()[0] as ReturnType<typeof createAndNode>, [aImpC, bImpC]),
          merged,
        ),
      ).toBe(true);
    });

    it("revImplication case 2: common antecedent", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const aImpC = createImplicationNode(false, A, C, undefined, true);
      const merged = implication(premises(aImpB, aImpC), [aImpB, aImpC]);
      expect(sameNode(merged, ERROR_NODE)).toBe(false);

      const { ctx, added } = createCaptureContext();
      expect(revImplication(ctx, merged)).toBe(true);
      expect(
        sameNode(implication(added()[0] as ReturnType<typeof createAndNode>, [aImpB, aImpC]),
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

      const { ctx, added } = createCaptureContext();
      expect(revImplication(ctx, aImpBC)).toBe(true);
      expect(sameNode(implication(added()[0] as AndNode, []), aImpBC)).toBe(true);
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

      const { ctx, added } = createCaptureContext();
      expect(revImplication(ctx, abImpC)).toBe(true);
      expect(sameNode(implication(added()[0] as AndNode, []), abImpC)).toBe(true);
    });
  });

  describe("structural reverse behavior", () => {
    it("revConj splits (P∧Q) into P and Q", () => {
      const pAndQ = createAndNode(false, A, B, undefined, true);
      const { ctx, added } = createCaptureContext();

      expect(revConj(ctx, pAndQ)).toBe(true);
      expect(added()).toHaveLength(2);
      expect(sameNode(added()[0], A)).toBe(true);
      expect(sameNode(added()[1], B)).toBe(true);
    });

    it("revAdd on (P∨Q) keeps one disjunct", () => {
      const pOrQ = createOrNode(false, A, B, undefined, true);
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

      const { ctx, added } = createCaptureContext();
      expect(revAdd(ctx, pOrQ)).toBe(true);
      expect(added()).toHaveLength(1);
      expect(sameNode(added()[0], A)).toBe(true);

      randomSpy.mockRestore();
    });

    it("revAdd rejects (¬P∨¬Q)", () => {
      const { ctx } = createCaptureContext();
      const bothNot = createOrNode(
        false,
        negateNode(false, A, undefined, true),
        negateNode(false, B, undefined, true),
        undefined,
        true,
      );
      expect(revAdd(ctx, bothNot)).toBe(false);
    });

    it("addition then revAdd (keep left) recovers original with second given", () => {
      const expanded = addition(A, B);
      const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);
      const { ctx, added } = createCaptureContext();

      expect(revAdd(ctx, expanded)).toBe(true);
      expect(sameNode(added()[0], A)).toBe(true);
      expect(sameNode(addition(added()[0], B), expanded)).toBe(true);

      randomSpy.mockRestore();
    });
  });

  describe("guards and rejects", () => {
    it("revHS returns false for non-implication", () => {
      const { ctx } = createCaptureContext();
      expect(revHS(ctx, createIffNode(false, A, B, undefined, true))).toBe(false);
    });

    it("revConj returns false for non-AND", () => {
      const { ctx } = createCaptureContext();
      expect(revConj(ctx, A)).toBe(false);
    });

    it("revAbso returns false for AND with nested ∧/∨ child", () => {
      const { ctx } = createCaptureContext();
      const nested = createAndNode(false, createOrNode(false, A, B), C, undefined, true);
      expect(revAbso(ctx, nested)).toBe(false);
    });
  });

  describe("known forward mismatches (document bugs)", () => {
    it("constructiveDilemmaAnd does not invert revCD AND shape", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cImpD = createImplicationNode(false, C, D, undefined, true);
      const prem = premises(aImpB, cImpD);
      const standard = constructiveDilemmaAndStandard(prem, [aImpB, cImpD]);

      const { ctx, added } = createCaptureContext({
        createRandomAndNode: (l, r) => createAndNode(false, l, r),
      });
      expect(revCD(ctx, standard)).toBe(true);

      const viaCurrentForward = constructiveDilemmaAnd(added()[0] as AndNode, [aImpB, cImpD]);
      expect(sameNode(viaCurrentForward, standard)).toBe(false);
    });

    it("constructiveDilemmaOr does not invert revCD OR shape", () => {
      const aImpB = createImplicationNode(false, A, B, undefined, true);
      const cImpD = createImplicationNode(false, C, D, undefined, true);
      const prem = premises(aImpB, cImpD);
      const standard = constructiveDilemmaOrStandard(prem, [aImpB, cImpD]);

      const { ctx, added } = createCaptureContext();
      expect(revCD(ctx, standard)).toBe(true);

      const viaCurrentForward = constructiveDilemmaOr(
        added()[0] as ReturnType<typeof createAndNode>,
        [aImpB, cImpD],
      );
      expect(sameNode(viaCurrentForward, standard)).toBe(false);
    });

    it("revConditionalIdentityIff does not round-trip conditionalIdentityIff", () => {
      const aIffB = createIffNode(false, A, B, undefined, true);
      const forward = conditionalIdentityIff(aIffB);
      expect(sameNode(forward, ERROR_NODE)).toBe(false);

      const { ctx, added } = createCaptureContext();
      expect(revConditionalIdentityIff(ctx, aIffB)).toBe(true);
      expect(added()).toHaveLength(1);
      expect(sameNode(conditionalIdentityIff(aIffB), forward)).toBe(true);
      expect(sameNode(added()[0], forward)).toBe(false);
    });
  });
});
