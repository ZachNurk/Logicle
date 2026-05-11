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
  createNotNode,
  createImplicationNode,
  isAndNode,
  isOrNode,
  isIffNode,
  createResultNode,
  createOrNode,
  createAndNode,
  checkParentheses,
  createIffNode,
} from "./ProofNode";
import type { ImplicationNode, NotNode, AndNode } from "./ProofNode";

const ALPHABET: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  
type AlphabetSet = Set<string>;
type NodesSet = Set<ProofNode>;
type ReverseRule = (node: ProofNode) => boolean;
let curAlphabet: AlphabetSet = new Set<string>();
let curNodes: NodesSet = new Set<ProofNode>();
const CHARACTER_CAP = 30;
const NEGATION_PROBABILITY = 0.1;
const IF_PROBABILITY = 0.2;
const ATOM_PROBABILITY = 0.35;
const OR_PROBABILITY = 0.15;
const IFF_PROBABILITY = 0.1;
const AND_PROBABILITY = 0.2;
const MAX_STEP_DEPTH = 7;
const MIN_STEP_DEPTH = 3;
const MAX_GIVEN_SIZE = 4;
const ATOM_RULES: ReverseRule[] = [revMP, revMT, revSimp, revAbso];
const IMPLICATION_RULES: ReverseRule[] = [...ATOM_RULES, revHS, revCD];
const OR_RULES: ReverseRule[] = [...ATOM_RULES, revAdd]
const AND_RULES: ReverseRule[] = [...ATOM_RULES, revConj]
const IFF_RULES: ReverseRule[] = [...ATOM_RULES,]

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
 * Main function taht generates endless puzzle
 * 
 */
export function generateEndlessPuzzle(): EndlessPuzzlePayload {
//   throw new Error("Endless puzzle generator not implemented");
    console.log("Generating new puzzle")
    curAlphabet.clear()
    curNodes.clear()
    let payLoad: EndlessPuzzlePayload = {
      id: undefined,
      nodes: Array<ProofNode>(),
      solution: ERROR_NODE,
    };

    payLoad.solution = generateSolutionNode()
    const numSteps = Math.floor(Math.random() * (MAX_STEP_DEPTH - MIN_STEP_DEPTH + 1)) + MIN_STEP_DEPTH;
    let stepCount = 0
    while (stepCount < numSteps) {
      if (curNodes.size === MAX_GIVEN_SIZE) break;

        const curStepSet = new Set(curNodes);
        let numOfNodesWithTooManyChars = 0
        for (const node of curStepSet) {
            if (!(node.text.length > CHARACTER_CAP)) {
              doInvOperation(node)
              stepCount++
              if (curNodes.size === MAX_GIVEN_SIZE) break;
            } else {
              numOfNodesWithTooManyChars++
            }
        }
        if (numOfNodesWithTooManyChars === curStepSet.size) break;
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
              solutionNode = createIffNode(false, left, right, undefined, true);
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
    return createNotNode(false, atom, undefined, true);
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
    curNodes.delete(node)
    const joiner = generateAtom();
    const nodeA: ProofNode = createImplicationNode(false,nodeLeft,joiner,undefined,true)
    const nodeB: ProofNode = createImplicationNode(false,joiner,nodeRight,undefined,true)
    curNodes.add(nodeA)
    curNodes.add(nodeB)
    return true
}

/** Disjunctive Syllogism [(p ∨ q) ∧ ¬p] → q */
export function revDS(node: ProofNode): boolean {
    curNodes.delete(node)
    const joiner = generateAtom();
    const negJoiner = createNotNode(false,joiner,undefined,true)
    const nodeA = createRandomOrNode(joiner,node)
    curNodes.add(negJoiner)
    curNodes.add(nodeA)
    return true
}

/**from P and (P -> Q), infer Q */
export function revMP(node: ProofNode): boolean {
    curNodes.delete(node)
    const joiner = generateAtom();
    const nodeA: ProofNode = joiner
    const nodeB: ProofNode = createImplicationNode(false,joiner, node,undefined,true)
    curNodes.add(nodeA)
    curNodes.add(nodeB)
    return true
}

/** Modus Tollens: [¬q ∧ (p → q)] → ¬p */
export function revMT(node: ProofNode): boolean {
    curNodes.delete(node)
    const joiner = generateAtom();
    const negJoiner = createNotNode(false,joiner, undefined, true)
    const negOriginal = createNotNode(false,node)
    const nodeB = createImplicationNode(false, negOriginal,joiner,undefined,true)
    curNodes.add(negJoiner)
    curNodes.add(nodeB)
    return true
    
}

/** Simplification: (p ∧ q) → p */
export function revSimp(node: ProofNode): boolean {
  // TODO make this randomize what side the additon gets added to
  curNodes.delete(node)
  let nodeA 
  const joiner = generateAtom()
  nodeA = createRandomAndNode(node,joiner)
  curNodes.add(nodeA)
  return true
}

/** Constructive Dilemma (OR): [(p → q) ∧ (r → s)] → [(p ∨ r) → (q ∨ s)] */
function revCDOr(node: ProofNode): boolean {
  if (!isImplicationNode(node) || !isOrNode(node.left) || !isOrNode(node.right)) return false
  curNodes.delete(node)
  const antecedentLeft = node.left.left
  const antecedentRight = node.left.right
  const consequentLeft = node.right.left
  const consequentRight = node.right.right

  const newAndNodeLeft = createImplicationNode(false,antecedentLeft,consequentLeft, undefined, true)
  const newAndNodeRight = createImplicationNode(false,antecedentRight,consequentRight, undefined, true)

  const newAndNode = createRandomAndNode(newAndNodeLeft,newAndNodeRight)
  curNodes.add(newAndNode)
  return true
  
}

/** Constructive Dilemma (AND): [(p → q) ∧ (r → s)] → [(p ∧ r) → (q ∧ s)] */
function revCDAnd(node: ProofNode): boolean {
  if (!isImplicationNode(node) || !isAndNode(node.left) || !isAndNode(node.right)) return false
  curNodes.delete(node)
  const antecedentLeft = node.left.left
  const antecedentRight = node.left.right
  const consequentLeft = node.right.left
  const consequentRight = node.right.right

  const newAndNodeLeft = createImplicationNode(false,antecedentLeft,consequentLeft, undefined, true)
  const newAndNodeRight = createImplicationNode(false,antecedentRight,consequentRight, undefined, true)

  const newAndNode = createRandomAndNode(newAndNodeLeft,newAndNodeRight)
  curNodes.add(newAndNode)
  return true
  
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

  curNodes.delete(node)
  if (!isNotNode(node.left) && !isNotNode(node.right)) {
    const sideToKeep = Math.random() < 0.5 ? node.left : node.right
    curNodes.add(sideToKeep)
  } else if (isNotNode(node.left)) {
    curNodes.add(node.left)
  } else {
    curNodes.add(node.right)
  }

  
  return true
}

/** Conjunction: p → (p ∧ q) */
export function revConj(node: ProofNode): boolean {
  if (!isAndNode(node)) return false
  curNodes.delete(node)
 
  curNodes.add(node.left)
  curNodes.add(node.right)
  return true
}

/**
 * Absorption:
 * - P ∨ (P ∧ Q) ≡ P
 * (and symmetric variants where the repeated P is on the right side).
 */
export function revAbso(node: ProofNode): boolean {
  curNodes.delete(node)
  const absorbedNode = generateAtom()
  const absorbedAnd = createRandomAndNode(node,absorbedNode)
  const revAbsoResult = createRandomOrNode(absorbedAnd,node)
  curNodes.add(revAbsoResult)
  return true
}