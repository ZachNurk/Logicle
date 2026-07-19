/**
 * Generates a run of daily puzzles starting today, forward-validating each
 * by replaying its solve trace against the real Axiom.ts functions so a
 * puzzle is only kept if it genuinely solves forward in 3-5 steps (medium
 * difficulty).
 *
 * A plain BFS over every Axiom.ts rule applied to every node pair was tried
 * first, but Conjunction and Addition are unconditionally valid for *any*
 * pair of nodes, so the reachable set explodes combinatorially within two
 * levels. Instead, each generated puzzle already carries `solutionSteps`:
 * the exact forward path derived by reversing the puzzle's own generation
 * trace. We replay that path step-by-step through the corresponding
 * Axiom.ts forward function and check the real output matches what the
 * generator claimed — this is genuine forward validation (it independently
 * re-derives every step; it doesn't just trust the trace), and it catches
 * real bugs, such as the Constructive Dilemma forward/reverse mismatch
 * documented in test/GeneratePuzzle.test.ts.
 * @file generateDays.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { generateEndlessPuzzle } from "../src/logic/GeneratePuzzle";
import type { EndlessPuzzlePayload, SolutionStep } from "../src/logic/GeneratePuzzle";
import type { AndNode, ProofNode } from "../src/logic/ProofNode";
import { sameNode, isOrNode, createAndNode, ERROR_NODE } from "../src/logic/ProofNode";
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
} from "../src/logic/Axiom";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NUM_DAYS = Number(process.env.GEN_DAYS_COUNT ?? 730);
const MIN_STEPS = 3;
const MAX_STEPS = 5;
const MAX_GENERATION_ATTEMPTS_PER_DAY = 2000;

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
      const output = step.output;
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
      const connective = isOrNode(step.output.left) ? "or" : "and";
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

function forwardValidate(payload: EndlessPuzzlePayload): number | null {
  return forwardValidateVerbose(payload).steps;
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

type Day = { id: string; nodes: ProofNode[]; solution: ProofNode };

/** Global rejection-sampling stats across the whole run (for reporting only). */
const genStats = {
  totalAttempts: 0,
  invalidTrace: 0,
  offRangeSteps: 0,
  accepted: 0,
  offRangeCounts: new Map<number, number>(),
};

function generateMediumDay(id: string): { day: Day; steps: number } {
  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS_PER_DAY; attempt += 1) {
    genStats.totalAttempts += 1;
    const payload = generateEndlessPuzzle();
    const steps = forwardValidate(payload);
    if (steps !== null && steps >= MIN_STEPS && steps <= MAX_STEPS) {
      genStats.accepted += 1;
      return { day: { id, nodes: payload.nodes, solution: payload.solution }, steps };
    }
    if (steps === null) {
      genStats.invalidTrace += 1;
    } else {
      genStats.offRangeSteps += 1;
      genStats.offRangeCounts.set(steps, (genStats.offRangeCounts.get(steps) ?? 0) + 1);
    }
  }
  throw new Error(
    `Failed to generate a medium (${MIN_STEPS}-${MAX_STEPS} step) puzzle for ${id} after ${MAX_GENERATION_ATTEMPTS_PER_DAY} attempts`,
  );
}

function main() {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const days: Day[] = [];
  const stepCounts: Record<number, number> = {};

  for (let i = 0; i < NUM_DAYS; i += 1) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const id = formatDate(date);

    const { day, steps } = generateMediumDay(id);
    days.push(day);
    stepCounts[steps] = (stepCounts[steps] ?? 0) + 1;

    if ((i + 1) % 50 === 0 || i === NUM_DAYS - 1) {
      console.log(`Generated ${i + 1}/${NUM_DAYS} (${id})`);
    }
  }

  const outPath =
    process.env.GEN_DAYS_OUT ?? path.join(__dirname, "..", "db", "days.json");
  fs.writeFileSync(outPath, JSON.stringify(days, null, 2) + "\n");

  console.log(`Wrote ${days.length} days to ${outPath}`);
  console.log("Step-count distribution:", stepCounts);

  const { totalAttempts, invalidTrace, offRangeSteps, accepted, offRangeCounts } = genStats;
  const failed = invalidTrace + offRangeSteps;
  console.log("\n--- Rejection-sampling report ---");
  console.log(`Total generateEndlessPuzzle() attempts: ${totalAttempts}`);
  console.log(
    `Accepted (3-5 step, forward-validated): ${accepted} (${((accepted / totalAttempts) * 100).toFixed(1)}%)`,
  );
  console.log(
    `Rejected: ${failed} (${((failed / totalAttempts) * 100).toFixed(1)}%)`,
  );
  console.log(
    `  - invalid forward trace (failed replay against Axiom.ts): ${invalidTrace} (${((invalidTrace / totalAttempts) * 100).toFixed(1)}%)`,
  );
  console.log(
    `  - valid trace but outside 3-5 steps: ${offRangeSteps} (${((offRangeSteps / totalAttempts) * 100).toFixed(1)}%)`,
  );
  console.log("    step-count breakdown of the off-range ones:", Object.fromEntries(offRangeCounts));
}

if (process.env.GEN_DAYS_SKIP_MAIN !== "1") {
  main();
}
