export type EndlessPuzzlePayload = {
  id?: string;
  nodes: ProofNode[];
  solution: ProofNode;
};

import type { ProofNode } from "./ProofNode";
import {
  sameNode,
  areNegationsOfEachOther,
  isImplicationNode,
  ERROR_NODE,
  isNotNode,
  negateNode,
  createImplicationNode,
  isAndNode,
  isOrNode,
  isIffNode,
  createResultNode,
  createOrNode,
  createAndNode,
  checkParentheses,
  createIffNode,
  isAtomNode,
} from "./ProofNode";
import type { BinaryNode } from "./ProofNode";
import { conditionalIdentityImplication } from "./Axiom";

const ALPHABET: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  
type AlphabetSet = Set<string>;
type NodesSet = Set<ProofNode>;
type ReverseRule = (node: ProofNode) => boolean;
let curAlphabet: AlphabetSet = new Set<string>();
/** All current premise nodes (final puzzle givens). */
let curNodes: NodesSet = new Set<ProofNode>();
/** Nodes to expand on this step; cleared each step, then filled with children. */
let frontier: NodesSet = new Set<ProofNode>();
const CHARACTER_CAP = 30;

/** Replaces a node with new premises; returns false (no mutation) if any result exceeds the cap. */
function replaceNode(node: ProofNode, ...added: ProofNode[]): boolean {
  const allWithinCap = added.every((n) => n.text.length <= CHARACTER_CAP);
  if (!allWithinCap) return false;
  curNodes.delete(node);
  for (const n of added) {
    curNodes.add(n);
    frontier.add(n);
  }
  return true;
}
const NEGATION_PROBABILITY = 0.1;
const IF_PROBABILITY = 0.2;
const ATOM_PROBABILITY = 0.35;
const OR_PROBABILITY = 0.15;
const IFF_PROBABILITY = 0.1;
const AND_PROBABILITY = 0.2;
const MAX_STEP_DEPTH = 7;
const MIN_STEP_DEPTH = 4;
const MAX_GIVEN_SIZE = 4;
const ATOM_RULES: ReverseRule[] = [revMP, revMT, revSimp, revAbso, revIndempotent];
const IMPLICATION_RULES: ReverseRule[] = [
  ...ATOM_RULES,
  revHS,
  revCD,
  revImplication,
  revConditionalIdentityImplication,
  revContrapositive,
  revDS
];
const AND_RULES: ReverseRule[] = [
  ...ATOM_RULES,
  revConj,
  revAndAssociativity,
  revDistributivity,
  revDeMorgan,
  revImplication,
]
const OR_RULES: ReverseRule[] = [
  ...ATOM_RULES,
  revAdd,
  revOrAssociativity,
  revDistributivity,
  revDeMorgan,
  revConditionalIdentityOr,
]
const IFF_RULES: ReverseRule[] = [...ATOM_RULES, revConditionalIdentityIff]

/** Function selects a relationship from our list using the probabilities */
function chooseRelationship() {
  const roll = Math.random();
  let cursor = 0;
  //TODO temporary remove this

  cursor += IF_PROBABILITY;
  if (roll < cursor) return "If";
  cursor += ATOM_PROBABILITY;
  if (roll < cursor) return "Atom";
  cursor += OR_PROBABILITY;
  if (roll < cursor) return "Or";
  cursor += IFF_PROBABILITY;
  if (roll < cursor) return "Iff";
  cursor += AND_PROBABILITY;
  if (roll < cursor) return "And";
  return "And";
}
/**
 * Randomizes left and right placement in an and node for better randomization
 * @param left is the left node
 * @param right is the right node
 * @returns random and node
 */
function createRandomAndNode(left: ProofNode, right: ProofNode): ProofNode {
  const randomSide = Math.random() < 0.5

  if (randomSide) {
    return createAndNode(false, left, right, undefined, true)
  } else {
    return createAndNode(false, right, left, undefined, true)
  }
}
/**
 * Randomizes left and right placement in an or node for better randomization
 * @param left is the left node
 * @param right is the right node
 * @returns random or node
 */
function createRandomOrNode(left: ProofNode, right: ProofNode): ProofNode {
  const randomSide = Math.random() < 0.5

  if (randomSide) {
    return createOrNode(false, left, right, undefined, true)
  } else {
    return createOrNode(false, right, left, undefined, true)
  }
}
/**
 * Randomizes left and right placement in an iff node for better randomization
 */
function createRandomIffNode(left: ProofNode, right: ProofNode): ProofNode {
  const randomSide = Math.random() < 0.5

  if (randomSide) {
    return createIffNode(false, left, right, undefined, true)
  } else {
    return createIffNode(false, right, left, undefined, true)
  }
}

/**
 * Main function taht generates endless puzzle
 * 
 */
export function generateEndlessPuzzle(): EndlessPuzzlePayload {
//   throw new Error("Endless puzzle generator not implemented");
    console.log("Generating new puzzle")
    curAlphabet.clear()
    curNodes.clear()
    frontier.clear()
    let payLoad: EndlessPuzzlePayload = {
      id: undefined,
      nodes: Array<ProofNode>(),
      solution: ERROR_NODE,
    };

    payLoad.solution = generateSolutionNode()
    const numSteps = Math.floor(Math.random() * (MAX_STEP_DEPTH - MIN_STEP_DEPTH + 1)) + MIN_STEP_DEPTH;
    
    for (let i = 0; i < numSteps; i++) {
      if (curNodes.size === MAX_GIVEN_SIZE) break;
      if (frontier.size === 0) break;

      const nodesThisStep = Array.from(frontier);
      frontier.clear();

      for (const node of nodesThisStep) {
        if (node.text.length > CHARACTER_CAP) continue;
        doInvOperation(node);
        if (curNodes.size === MAX_GIVEN_SIZE) break;
      }

      if (frontier.size === 0) break;
    }
        
    
    payLoad.nodes = Array.from(curNodes).map((node) => ({
        ...node,
        selected: false,
        isStarter: true,
        context: false,
        parents: [],
      }));
    // Shuffle
    for (let i = payLoad.nodes.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [payLoad.nodes[i], payLoad.nodes[j]] = [payLoad.nodes[j], payLoad.nodes[i]];
    }
    return payLoad;

}

function doInvOperation(node: ProofNode) {

  function useRandomWorkingRule<T>( rules: ((node: T) => unknown)[],node: T) {
    let rule = rules[Math.floor(Math.random() * rules.length)]
  
    while (!rule(node)) {
      rule = rules[Math.floor(Math.random() * rules.length)]
    }
  
    console.log(rule)
  }
    //TODO if chose op is error, try another op. 
    //TODO see if node is already in the set
    // functions return false if operation is not possible
    if (isImplicationNode(node)) {
      useRandomWorkingRule(IMPLICATION_RULES, node)
    } else if (isOrNode(node)) {
      useRandomWorkingRule(OR_RULES, node)
    } else if (isAndNode(node)) {
      useRandomWorkingRule(AND_RULES, node)
    } else if (isIffNode(node)) {
      useRandomWorkingRule(IFF_RULES, node)
    } else {
      useRandomWorkingRule(ATOM_RULES, node)
    }
}

export function generateSolutionNode(
): ProofNode {
    //  Relationship = "If" | "Not" | "And" | "Or" | "Iff" and also just by itself
    // Node should be a negation ~20% of the time
    const relationship = chooseRelationship();
    let solutionNode: ProofNode = ERROR_NODE;
    switch (relationship) {
        case "If":
            {
              const left = generateAtom();
              const right = generateAtom();
              solutionNode = createImplicationNode(false, left, right, undefined, true);
            }
            break;
        case "Atom":
            solutionNode = generateAtom()
            break;
        case "Or":
            {
              const left = generateAtom();
              const right = generateAtom();
              solutionNode = createOrNode(false, left, right, undefined, true);
            }
            break;
        case "Iff":
            {
              const left = generateAtom();
              const right = generateAtom();
              solutionNode = createRandomIffNode(left, right);
            }
            break;
        case "And":
            {
              const left = generateAtom();
              const right = generateAtom();
              solutionNode = createAndNode(false, left, right, undefined, true);
            }
            break;
    }
    curNodes.add(solutionNode)
    frontier.add(solutionNode)
    return solutionNode;
}
/**
 * Generates a random atom that isnt already in the alphabet set.
 * Adds to the alphabet 
 * @param canNegate determines if the node can be negated
 * @returns G is the new atom
 */
function generateAtom(canNegate: boolean = true): ProofNode {
  if (curAlphabet.size >= ALPHABET.length) {
    throw new Error("No letters left in alphabet set");
  }

  let letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    while (curAlphabet.has(letter)) {
        letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
  curAlphabet.add(letter);
  const atom = {
    id: crypto.randomUUID(),
    text: letter,
    selected: false,
    isStarter: true,
    parentIds: [],
    context: false,
  } as ProofNode;
  if (canNegate && Math.random() < NEGATION_PROBABILITY) {
    return negateNode(false, atom, undefined, true);
  }
  return atom;
}

//TODO maybe shuffle isndie indivudal nodes whenc reating?
/** [(p → q) ∧ (q → r)] → (p → r) */
export function revHS(
  node: ProofNode,
): boolean {
    if (!isImplicationNode(node)) return false;
    const nodeLeft = node.left
    const nodeRight = node.right
    const joiner = generateAtom();
    const nodeA: ProofNode = createImplicationNode(false,nodeLeft,joiner,undefined,true)
    const nodeB: ProofNode = createImplicationNode(false,joiner,nodeRight,undefined,true)
    return replaceNode(node, nodeA, nodeB)
}

/** Disjunctive Syllogism [(p ∨ q) ∧ ¬p] → q */
export function revDS(node: ProofNode): boolean {
    const joiner = generateAtom();
    const negJoiner = negateNode(false,joiner,undefined,true)
    const nodeA = createRandomOrNode(joiner,node)
    return replaceNode(node, negJoiner, nodeA)
}

/**from P and (P -> Q), infer Q */
export function revMP(node: ProofNode): boolean {
    const joiner = generateAtom();
    const nodeA: ProofNode = joiner
    const nodeB: ProofNode = createImplicationNode(false,joiner, node,undefined,true)
    return replaceNode(node, nodeA, nodeB)
}

/** Modus Tollens: [¬q ∧ (p → q)] → ¬p */
export function revMT(node: ProofNode): boolean {
    const joiner = generateAtom();
    const negJoiner = negateNode(false,joiner, undefined, true)
    const negOriginal = negateNode(false,node)
    const nodeB = createImplicationNode(false, negOriginal,joiner,undefined,true)
    return replaceNode(node, negJoiner, nodeB)
}

/** Simplification: (p ∧ q) → p */
export function revSimp(node: ProofNode): boolean {
  // TODO make this randomize what side the additon gets added to
  const joiner = generateAtom()
  const nodeA = createRandomAndNode(node,joiner)
  return replaceNode(node, nodeA)
}

/** Constructive Dilemma (OR): [(p → q) ∧ (r → s)] → [(p ∨ r) → (q ∨ s)] */
function revCDOr(node: ProofNode): boolean {
  if (!isImplicationNode(node) || !isOrNode(node.left) || !isOrNode(node.right)) return false
  const antecedentLeft = node.left.left
  const antecedentRight = node.left.right
  const consequentLeft = node.right.left
  const consequentRight = node.right.right

  const newAndNodeLeft = createImplicationNode(false,antecedentLeft,consequentLeft, undefined, true)
  const newAndNodeRight = createImplicationNode(false,antecedentRight,consequentRight, undefined, true)

  const newAndNode = createRandomAndNode(newAndNodeLeft,newAndNodeRight)
  return replaceNode(node, newAndNode)
}

/** Constructive Dilemma (AND): [(p → q) ∧ (r → s)] → [(p ∧ r) → (q ∧ s)] */
function revCDAnd(node: ProofNode): boolean {
  if (!isImplicationNode(node) || !isAndNode(node.left) || !isAndNode(node.right)) return false
  const antecedentLeft = node.left.left
  const antecedentRight = node.left.right
  const consequentLeft = node.right.left
  const consequentRight = node.right.right

  const newAndNodeLeft = createImplicationNode(false,antecedentLeft,consequentLeft, undefined, true)
  const newAndNodeRight = createImplicationNode(false,antecedentRight,consequentRight, undefined, true)

  const newAndNode = createRandomAndNode(newAndNodeLeft,newAndNodeRight)
  return replaceNode(node, newAndNode)
}

/** Constructive Dilemma: [(p → q) ∧ (r → s)] → [(p ⋄ r) → (q ⋄ s)] where ⋄ is OR or AND. */
export function revCD(node: ProofNode): boolean {
  if (!revCDOr(node)) {
    return revCDAnd(node)
  } else {
    return true
  }
}
/**
 * Reverse the addition of a new node. If both sides aren't not nodes, we randomly pick
 * a side to remove. If one side is a not node, we remove the non not node by adding the not
 * node back to the curNodes set.
 * @param node is the node to reverse
 * @returns false if the given node isnt an or node, or if both sides of the or node are not nodes.
 * Both sides being a not node is an issue because the addition axiom only adds true nodes.
 * (This is just to make the addition axiom cleaner and easier to use)
 */
export function revAdd(node: ProofNode): boolean {
  if (!isOrNode(node)) return false
  if (isNotNode(node.left) && isNotNode(node.right)) return false

  if (!isNotNode(node.left) && !isNotNode(node.right)) {
    const sideToKeep = Math.random() < 0.5 ? node.left : node.right
    return replaceNode(node, sideToKeep)
  }
  if (isNotNode(node.left)) {
    return replaceNode(node, node.left)
  }
  return replaceNode(node, node.right)
}

/** Conjunction: p → (p ∧ q) */
export function revConj(node: ProofNode): boolean {
  if (!isAndNode(node)) return false
  return replaceNode(node, node.left, node.right)
}

/**
 * Absorption:
 * - P ∨ (P ∧ Q) ≡ P
 * (and symmetric variants where the repeated P is on the right side).
 */
export function revAbso(node: ProofNode): boolean {
  if (
    isAndNode(node) &&
    node.left &&
    node.right &&
    (isAndNode(node.left) ||
      isAndNode(node.right) ||
      isOrNode(node.left) ||
      isOrNode(node.right))
  ) {
    return false;
  }

  const absorbedNode = generateAtom()
  const absorbedAnd = createRandomAndNode(node,absorbedNode)
  const revAbsoResult = createRandomOrNode(absorbedAnd,node)
  return replaceNode(node, revAbsoResult)
}
/**
 * We dont need an explicit call to Commutativity, since its already handled by how randomization works
 */

/**
 * Reverse AND associativity: (A ∧ (B ∧ C)) → ((A ∧ B) ∧ C) and
 * ((A ∧ B) ∧ C) → (A ∧ (B ∧ C)) — inverse of forward re-bracketing in Axiom.ts.
 */
export function revAndAssociativity(node: ProofNode): boolean {
  if (!isAndNode(node) || !node.left || !node.right) return false;

  const { left, right } = node;
  const canReassocFromLeft = isAndNode(left);
  const canReassocFromRight = isAndNode(right);
  if (!canReassocFromLeft && !canReassocFromRight) return false;

  const useLeftBranch =
    canReassocFromLeft && canReassocFromRight
      ? Math.random() < 0.5
      : canReassocFromLeft;

  let result: ProofNode;
  if (useLeftBranch) {
    // ((A ∧ B) ∧ C) → (A ∧ (B ∧ C))
    if (!isAndNode(left)) return false;
    const inner = createAndNode(false, left.right, right, undefined, true);
    result = createAndNode(false, left.left, inner, undefined, true);
  } else {
    // (A ∧ (B ∧ C)) → ((A ∧ B) ∧ C)
    if (!isAndNode(right)) return false;
    const inner = createAndNode(false, left, right.left, undefined, true);
    result = createAndNode(false, inner, right.right, undefined, true);
  }

  return replaceNode(node, result);
}

/**
 * Reverse OR associativity: (A ∨ (B ∨ C)) → ((A ∨ B) ∨ C) and
 * ((A ∨ B) ∨ C) → (A ∨ (B ∨ C)) — inverse of forward re-bracketing in Axiom.ts.
 */
export function revOrAssociativity(node: ProofNode): boolean {
  if (!isOrNode(node) || !node.left || !node.right) return false;

  const { left, right } = node;
  const canReassocFromLeft = isOrNode(left);
  const canReassocFromRight = isOrNode(right);
  if (!canReassocFromLeft && !canReassocFromRight) return false;

  const useLeftBranch =
    canReassocFromLeft && canReassocFromRight
      ? Math.random() < 0.5
      : canReassocFromLeft;

  let result: ProofNode;
  if (useLeftBranch) {
    // ((A ∨ B) ∨ C) → (A ∨ (B ∨ C))
    if (!isOrNode(left)) return false;
    const inner = createOrNode(false, left.right, right, undefined, true);
    result = createOrNode(false, left.left, inner, undefined, true);
  } else {
    // (A ∨ (B ∨ C)) → ((A ∨ B) ∨ C)
    if (!isOrNode(right)) return false;
    const inner = createOrNode(false, left, right.left, undefined, true);
    result = createOrNode(false, inner, right.right, undefined, true);
  }

  return replaceNode(node, result);
}

/**
 * Reverse distributivity (simple cases only):
 * (A ∨ B) ∧ (A ∨ C) → A ∨ (B ∧ C) and (A ∧ B) ∨ (A ∧ C) → A ∧ (B ∨ C).
 */
export function revDistributivity(node: ProofNode): boolean {
  /** Shared operand in two binary children (any side), if exactly one match. */
  function sharedBinaryParts(
    left: BinaryNode,
    right: BinaryNode,
  ): { shared: ProofNode; other1: ProofNode; other2: ProofNode } | null {
    for (const s1 of [left.left, left.right] as const) {
      for (const s2 of [right.left, right.right] as const) {
        if (sameNode(s1, s2)) {
          const other1 = sameNode(left.left, s1) ? left.right : left.left;
          const other2 = sameNode(right.left, s2) ? right.right : right.left;
          return { shared: s1, other1, other2 };
        }
      }
    }
    return null;
  }

  let result: ProofNode | null = null;

  if (isAndNode(node) && isOrNode(node.left) && isOrNode(node.right)) {
    const parts = sharedBinaryParts(node.left, node.right);
    if (parts) {
      const bc = createRandomAndNode(parts.other1, parts.other2);
      result = createRandomOrNode(parts.shared, bc);
    }
  } else if (isOrNode(node) && isAndNode(node.left) && isAndNode(node.right)) {
    const parts = sharedBinaryParts(node.left, node.right);
    if (parts) {
      const bc = createRandomOrNode(parts.other1, parts.other2);
      result = createRandomAndNode(parts.shared, bc);
    }
  }

  if (!result) return false;
  return replaceNode(node, result);
}
/** [P V P] = P */
export function revIndempotent(node: ProofNode): boolean {
  const dup = createOrNode(false, node, node, undefined, true)
  return replaceNode(node, dup)
}

export function revDeMorgan(node: ProofNode): boolean {
  if ((!isAndNode(node) && !isOrNode(node))) {
    return false;
  }

  const newLeft = negateNode(false, node.left, undefined, true);
  const newRight = negateNode(false, node.right, undefined, true);

  let result: ProofNode;
  if (isAndNode(node)) {
    const inner = createOrNode(false, newLeft, newRight, undefined, true);
    result = negateNode(false, inner, undefined, true);
  } else {
    const inner = createAndNode(false, newLeft, newRight, undefined, true);
    result = negateNode(false, inner, undefined, true);
  }

  return replaceNode(node, result);
}

export function revContrapositive(node: ProofNode): boolean {
  if (!isImplicationNode(node)) return false
  const newLeft = negateNode(false, node.right, undefined, true)
  const newRight = negateNode(false, node.left, undefined, true)
  const newNode = createImplicationNode(false, newLeft, newRight, undefined, true)
  return replaceNode(node, newNode)
}

export function revConditionalIdentityImplication(node: ProofNode): boolean {
  if (!isImplicationNode(node)) return false
  const newNode = conditionalIdentityImplication(node)
  if (sameNode(newNode, ERROR_NODE)) return false
  return replaceNode(node, newNode)
}

export function revConditionalIdentityOr(node: ProofNode): boolean {
  if (!isOrNode(node)) return false
  const newNode = conditionalIdentityImplication(node)
  if (sameNode(newNode, ERROR_NODE)) return false
  return replaceNode(node, newNode)
}

export function revConditionalIdentityIff(node: ProofNode): boolean {
  if (!isIffNode(node)) return false
  const newLeft = negateNode(false, node.left, undefined, true)
  const newRight = negateNode(false, node.right, undefined, true)
  const newNode = createImplicationNode(false, newLeft, newRight, undefined, true)
  return replaceNode(node, newNode)
}

export function revImplication(node: ProofNode): boolean {
  if (!isImplicationNode(node) && !isAndNode(node)) return false
  
  let resNode = null
  if (isImplicationNode(node)) {
    // Case 1: (A V B) --> C REVERSE (A--> C) and (B --> C) 
    if (isOrNode(node.left)) {
      const newLeft = createImplicationNode(false,node.left.left, node.right, undefined, true)
      const newRight = createImplicationNode(false,node.left.right, node.right, undefined, true)
      resNode = createAndNode(false,newLeft,newRight,undefined,true)
    }
    // Case 2: A → (B ∧ C) REVERSE (A → B) ∧ (A → C)
    else if (isAndNode(node.right)) {
      const newLeft = createImplicationNode(false,node.left, node.right.left, undefined, true)
      const newRight = createImplicationNode(false,node.left, node.right.right, undefined, true)
      resNode = createAndNode(false,newLeft,newRight,undefined,true)
    }
  } else if (isAndNode(node) && isImplicationNode(node.left) && isImplicationNode(node.right)) {
    // Case 3: (A → B) ∧ (A → C) REVERSE A → (B ∧ C)
    if (sameNode(node.left.left,node.right.left)) {
      const newRight = createAndNode(false,node.left.right,node.right.right,undefined,true)
      resNode = createImplicationNode(false, node.left.left,newRight,undefined,true)
    // Case 4: (A → C) ∧ (B → C) REVERSE (A ∨ B) → C
    } else if (sameNode(node.left.right,node.right.right)) {
      const newLeft = createOrNode(false,node.left.left,node.right.left,undefined,true)
      resNode = createImplicationNode(false, newLeft,node.left.right,undefined,true)
    }
  }
  if (!resNode) return false
  return replaceNode(node, resNode)
} 