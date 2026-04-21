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
import { revHS } from "../src/logic/ReverseAxiom";

const A: ProofNode = createNode("A", true, undefined);
const B: ProofNode = createNode("B", true, undefined);
const C: ProofNode = createNode("C", true, undefined);
const D: ProofNode = createNode("D", true, undefined);
const E: ProofNode = createNode("E", true, undefined);
const F: ProofNode = createNode("F", true, undefined);

describe("ReverseAxiom", () => {
  it("revHS accepts iff input (non-error path)", () => {
    const iff = createIffNode(false, A, B, undefined, true); // A-->B

    const result = revHS(iff);
    expect(result).not.toEqual(ERROR_NODE);
  });

  

  
 
});
