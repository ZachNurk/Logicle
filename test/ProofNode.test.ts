import { describe, it, expect } from "vitest";

import {
  createAndNode,
  createIffNode,
  createImplicationNode,
  createNode,
  createNotNode,
  nodeFromDb,
  createOrNode,
  sameNode,
} from "../src/logic/ProofNode";
import type { ProofNode } from "../src/logic/ProofNode";

describe("sameNode", () => {
  it("returns true for matching nodes", () => {
    const P: ProofNode = createNode("P", true, undefined);
    expect(sameNode(P, P)).toBe(true);
  });

  it("returns false for different nodes", () => {
    const P: ProofNode = createNode("P", true, undefined);
    const Q: ProofNode = createNode("Q", true, undefined);
    expect(sameNode(P, Q)).toBe(false);
  });
});

describe("proof node constructors", () => {
  it("createNode builds atomic nodes with default values", () => {
    const node = createNode("P", true);

    expect(node).toMatchObject({
      text: "P",
      selected: true,
      isStarter: false,
      context: false,
      parents: [],
    });
    expect(node.id).toEqual(expect.any(String));
  });

  it("createNode preserves passed parents and starter flag", () => {
    const parent = createNode("Parent", false);
    const node = createNode("Child", false, [parent], true);

    expect(node).toMatchObject({
      text: "Child",
      selected: false,
      isStarter: true,
      context: false,
      parents: [parent],
    });
  });

  it("createNotNode builds negation nodes", () => {
    const contains = createNode("P", false);
    const parent = createNode("Premise", false);
    const notNode = createNotNode(true, contains, [parent], true);

    expect(notNode).toMatchObject({
      text: "¬P",
      selected: true,
      isStarter: true,
      context: false,
      relationship: "Not",
      contains,
      parents: [parent],
    });
    expect(notNode.id).toEqual(expect.any(String));
  });

  it("createNotNode wraps binary formulas in parentheses", () => {
    const left = createNode("P", false);
    const right = createNode("Q", false);
    const andNode = createAndNode(false, left, right);
    const notNode = createNotNode(false, andNode);

    expect(notNode.text).toBe("¬(P ∧ Q)");
    expect(notNode.parents).toEqual([]);
    expect(notNode.isStarter).toBe(false);
  });

  it("createImplicationNode builds implication nodes", () => {
    const left = createNode("P", false);
    const right = createNode("Q", false);
    const parent = createNode("Given", false);
    const implication = createImplicationNode(true, left, right, [parent], true);

    expect(implication).toMatchObject({
      text: "P → Q",
      selected: true,
      isStarter: true,
      context: false,
      relationship: "If",
      left,
      right,
      parents: [parent],
    });
    expect(implication.id).toEqual(expect.any(String));
  });

  it("createAndNode builds conjunction nodes", () => {
    const left = createNode("P", false);
    const right = createNode("Q", false);
    const andNode = createAndNode(true, left, right);

    expect(andNode).toMatchObject({
      text: "P ∧ Q",
      selected: true,
      isStarter: false,
      context: false,
      relationship: "And",
      left,
      right,
      parents: [],
    });
    expect(andNode.id).toEqual(expect.any(String));
  });

  it("createOrNode builds disjunction nodes", () => {
    const left = createNode("P", false);
    const right = createNode("Q", false);
    const orNode = createOrNode(true, left, right);

    expect(orNode).toMatchObject({
      text: "P ∨ Q",
      selected: true,
      isStarter: false,
      context: false,
      relationship: "Or",
      left,
      right,
      parents: [],
    });
    expect(orNode.id).toEqual(expect.any(String));
  });

  it("createIffNode builds biconditional nodes", () => {
    const left = createNode("P", false);
    const right = createNode("Q", false);
    const iffNode = createIffNode(true, left, right);

    expect(iffNode).toMatchObject({
      text: "P ↔ Q",
      selected: true,
      isStarter: false,
      context: false,
      relationship: "Iff",
      left,
      right,
      parents: [],
    });
    expect(iffNode.id).toEqual(expect.any(String));
  });

  it("binary constructors parenthesize binary subexpressions", () => {
    const p = createNode("P", false);
    const q = createNode("Q", false);
    const r = createNode("R", false);
    const andNode = createAndNode(false, p, q);

    expect(createImplicationNode(false, andNode, r).text).toBe("(P ∧ Q) → R");
    expect(createAndNode(false, andNode, r).text).toBe("(P ∧ Q) ∧ R");
    expect(createOrNode(false, andNode, r).text).toBe("(P ∧ Q) ∨ R");
    expect(createIffNode(false, andNode, r).text).toBe("(P ∧ Q) ↔ R");
  });
});

describe("nodeFromDb", () => {
  it("creates a base node with converted defaults", () => {
    const node = nodeFromDb({ id: 123, text: 7 });

    expect(node).toEqual({
      id: "123",
      text: "7",
      selected: false,
      isStarter: true,
      context: false,
      parents: undefined,
      relationship: undefined,
    });
  });

  it("respects db isStarter over function argument", () => {
    const node = nodeFromDb(
      {
        id: "n1",
        text: "P",
        selected: true,
        isStarter: false,
        context: true,
      },
      true,
    );

    expect(node.isStarter).toBe(false);
    expect(node.selected).toBe(true);
    expect(node.context).toBe(true);
  });

  it("builds a Not node recursively when contains has an id", () => {
    const notNode = nodeFromDb(
      {
        id: "n2",
        text: "¬P",
        relationship: "Not",
        contains: {
          id: "p1",
          text: "P",
          selected: 1,
        },
      },
      false,
    );

    expect(notNode).toMatchObject({
      id: "n2",
      text: "¬P",
      relationship: "Not",
      isStarter: false,
      contains: {
        id: "p1",
        text: "P",
        selected: true,
        isStarter: false,
      },
    });
  });

  it("builds binary nodes recursively and falls back to base when left/right are invalid", () => {
    const binary = nodeFromDb(
      {
        id: "n3",
        text: "P ∧ Q",
        relationship: "And",
        left: { id: "p1", text: "P" },
        right: { id: "q1", text: "Q" },
      },
      false,
    ) as ProofNode & { left: ProofNode; right: ProofNode };

    expect(binary).toMatchObject({
      id: "n3",
      relationship: "And",
      isStarter: false,
      left: { id: "p1", text: "P", isStarter: false },
      right: { id: "q1", text: "Q", isStarter: false },
    });

    const fallback = nodeFromDb({
      id: "n4",
      text: "P ∨ Q",
      relationship: "Or",
      left: { text: "P but missing id" },
      right: { id: "q2", text: "Q" },
    });

    expect(fallback).toEqual({
      id: "n4",
      text: "P ∨ Q",
      selected: false,
      isStarter: true,
      context: false,
      parents: undefined,
      relationship: "Or",
    });
    expect((fallback as any).left).toBeUndefined();
    expect((fallback as any).right).toBeUndefined();
  });
});
