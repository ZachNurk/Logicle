import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { modusPonens } from "../src/logic/Axiom";
import { createNode, sameNode } from "../src/logic/ProofNode";
import { createImplicationNode } from "../src/logic/ProofNode";

import type { ProofNode } from "../src/logic/ProofNode";
import type { ImplicationNode } from "../src/logic/ProofNode";

it("Modus Ponens: P and (P -> Q) yields Q", () => {
  const P: ProofNode = createNode( "P", true, undefined);
  const Q: ProofNode = createNode( "Q", true, undefined);
  const PImpliesQ: ImplicationNode = createImplicationNode("P -> Q",true,P,Q,);

  expect(sameNode(modusPonens(P, PImpliesQ), Q)).toBe(true);
});

it("Modus Ponens: (P -> Q) and ((P -> Q) -> L) yields L", () => {
  const P: ProofNode = createNode("P", true, undefined);
  const Q: ProofNode = createNode("Q", true, undefined);
  const L: ProofNode = createNode("L", true, undefined);

  // (P -> Q)
  const PImpliesQ: ImplicationNode = createImplicationNode("P -> Q",true,P,Q,);
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
});
