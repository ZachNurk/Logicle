import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { modusPonens } from "../src/logic/Axiom";
import { createNode, sameNode } from "../src/logic/ProofNode";
import { createImplicationNode } from "../src/logic/ProofNode";

import type { ProofNode } from "../src/logic/ProofNode";
import type { ImplicationNode } from "../src/logic/ProofNode";

it("P == P?", () => {
  const P: ProofNode = createNode( "P", true, undefined);
  expect(sameNode(P,P)).toBe(true);
});
it("P != Q?", () => {
  const P: ProofNode = createNode( "P", true, undefined);
  const Q: ProofNode = createNode( "Q", true, undefined);
  expect(sameNode(P,Q)).toBe(false);
});


