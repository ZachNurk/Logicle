/**
 * Independently re-derives a generated puzzle's claimed forward-solve trace
 * through the real Axiom.ts functions, so a puzzle is only trusted if it
 * genuinely solves forward — not just because the generator's reverse-rule
 * bookkeeping says so. Shared by the production day-generation script
 * (scripts/generateDays.ts) and the generator's test suite.
 * @file forwardValidatePuzzle.ts
 */
import type { EndlessPuzzlePayload, SolutionStep } from "./GeneratePuzzle";
import type { AndNode, OrNode, ProofNode } from "./ProofNode";
import { sameNode, isOrNode, createAndNode, ERROR_NODE } from "./ProofNode";
import {
  hypotheticalSyllogism,
  disjunctiveSyllogism,
  modusPonens,
  modusTollens,
  simplification,
  constructiveDilemma,
  addition,
  conjunction,
  absorption,
  commutativity,
  associativity,
  distributivity,
  indempotent,
  deMorgan,
  contrapositive,
  conditionalIdentityImplication,
  conditionalIdentityIff,
  implication,
} from "./Axiom";

/** axiomId -> number of premise nodes (`inputIds`) the reverse trace records for it. */
const TWO_INPUT_AXIOMS = new Set(["HS", "DS", "MP", "MT", "Conj"]);

function isValid(n: ProofNode): boolean {
  return n !== ERROR_NODE && n.text !== ERROR_NODE.text;
}

/** Replays one forward-solve step through the real Axiom.ts function it claims to use. */
function replayStep(step: SolutionStep, pool: Map<string, ProofNode>): ProofNode | null {
  const inputs = step.inputIds.map((id) => pool.get(id));
  if (inputs.some((n) => !n)) return null;
  const [i0, i1] = inputs as ProofNode[];

  if (TWO_INPUT_AXIOMS.has(step.axiomId)) {
    const premises = createAndNode(false, i0, i1);
    switch (step.axiomId) {
      case "HS":
        return hypotheticalSyllogism(premises, [i0, i1]);
      case "DS":
        return disjunctiveSyllogism(premises, [i0, i1]);
      case "MP":
        return modusPonens(premises, [i0, i1]);
      case "MT":
        return modusTollens(premises, [i0, i1]);
      case "Conj":
        return conjunction(premises, [i0, i1]);
    }
  }

  switch (step.axiomId) {
    case "Simp": {
      const and = i0 as AndNode;
      const side = sameNode(and.left, step.output) ? "left" : "right";
      return simplification(and, side);
    }
    case "Add": {
      const output = step.output as OrNode;
      const addend = sameNode(output.left, i0) ? output.right : output.left;
      return addition(i0, addend);
    }
    case "Abs":
      return absorption(i0);
    case "Comm":
      return commutativity(i0);
    case "Asso":
      return associativity(i0);
    case "Dist":
      return distributivity(i0);
    case "Idem":
      return indempotent(i0);
    case "CP":
      return contrapositive(i0);
    case "DM":
      return deMorgan(i0);
    case "C (→)":
      return conditionalIdentityImplication(i0);
    case "CI (↔)":
      return conditionalIdentityIff(i0);
    case "32":
      return implication(i0, []);
    case "CD": {
      const connective = isOrNode((step.output as AndNode).left) ? "or" : "and";
      return constructiveDilemma(i0 as AndNode, [], connective);
    }
    default:
      return null;
  }
}

export type ValidationFailure = { axiomId: string; stepIndex: number; reason: string };
export type ValidationResult = { steps: number | null; failure?: ValidationFailure };

/**
 * Forward-validates a puzzle by replaying its recorded solve trace through
 * the real Axiom.ts functions. Returns the verified step count (diagnostics
 * included) if the trace reproduces the claimed solution, else the step and
 * reason it broke.
 */
export function forwardValidateVerbose(payload: EndlessPuzzlePayload): ValidationResult {
  const pool = new Map<string, ProofNode>(payload.nodes.map((n) => [n.id, n]));

  for (let i = 0; i < payload.solutionSteps.length; i += 1) {
    const step = payload.solutionSteps[i];
    const result = replayStep(step, pool);
    if (!result) {
      return { steps: null, failure: { axiomId: step.axiomId, stepIndex: i, reason: "missing-input" } };
    }
    if (!isValid(result)) {
      return { steps: null, failure: { axiomId: step.axiomId, stepIndex: i, reason: "ERROR_NODE" } };
    }
    if (!sameNode(result, step.output)) {
      return {
        steps: null,
        failure: {
          axiomId: step.axiomId,
          stepIndex: i,
          reason: `mismatch: got "${result.text}" expected "${step.output.text}"`,
        },
      };
    }
    pool.set(step.output.id, result);
  }

  if (payload.solutionSteps.length === 0) {
    const ok = payload.nodes.some((n) => sameNode(n, payload.solution));
    return ok ? { steps: 0 } : { steps: null, failure: { axiomId: "", stepIndex: -1, reason: "no-steps-no-match" } };
  }

  const finalNode = pool.get(payload.solutionSteps.at(-1)!.output.id);
  if (!finalNode || !sameNode(finalNode, payload.solution)) {
    return {
      steps: null,
      failure: {
        axiomId: payload.solutionSteps.at(-1)!.axiomId,
        stepIndex: payload.solutionSteps.length - 1,
        reason: "final-mismatch",
      },
    };
  }

  return { steps: payload.solutionSteps.length };
}

export function forwardValidate(payload: EndlessPuzzlePayload): number | null {
  return forwardValidateVerbose(payload).steps;
}
