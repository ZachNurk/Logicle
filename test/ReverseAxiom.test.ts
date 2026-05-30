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
import { generateEndlessPuzzle, generateSolutionNode } from "../src/logic/GeneratePuzzle";
import { revHS } from "../src/logic/ReverseAxiom";

const A: ProofNode = createNode("A", true, undefined);
const B: ProofNode = createNode("B", true, undefined);
const C: ProofNode = createNode("C", true, undefined);
const D: ProofNode = createNode("D", true, undefined);
const E: ProofNode = createNode("E", true, undefined);
const F: ProofNode = createNode("F", true, undefined);

describe("ReverseAxiom", () => {
  it("revHS accepts implication input", () => {
    const implication = createImplicationNode(false, A, B, undefined, true);
    const ctx = {
      replaceNode: () => true,
      generateAtom: () => createNode("G", true),
      createRandomAndNode: (l: ProofNode, r: ProofNode) =>
        createAndNode(false, l, r),
      createRandomOrNode: (l: ProofNode, r: ProofNode) =>
        createOrNode(false, l, r),
    };

    expect(revHS(ctx, implication)).toBe(true);
  });
  it("logs 10 generated solution nodes", () => {
    for (let i = 0; i < 10; i += 1) {
      // Intentional debug output while tuning generator distribution.
      // eslint-disable-next-line no-console
      console.log(generateSolutionNode().text);
    }
    expect(true).toBe(true);
  });
  it("Test", () => {
    const nodes = generateEndlessPuzzle().nodes ?? [];
    for (const node of nodes) {
      // eslint-disable-next-line no-console
      console.log(node.text);
    }
    expect(true).toBe(true);
  })
});




