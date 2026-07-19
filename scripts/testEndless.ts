/**
 * Stress-tests the endless puzzle generator: samples N puzzles from
 * generateEndlessPuzzle() and independently re-derives every claimed
 * forward-solve step through the real Axiom.ts functions
 * (forwardValidatePuzzle.ts), catching generator/axiom drift rather than
 * trusting the generator's own bookkeeping.
 *
 * Usage:
 *   npx tsx scripts/testEndless.ts [count]
 *   npm run test:endless -- [count]
 * @file testEndless.ts
 */
import { generateEndlessPuzzle } from "../src/logic/GeneratePuzzle";
import { forwardValidateVerbose } from "../src/logic/forwardValidatePuzzle";

const SAMPLE_COUNT = Number(process.argv[2] ?? 2000);
const MIN_STEPS = 3;
const MAX_STEPS = 5;

function main() {
  const byAxiom = new Map<string, number>();
  const stepCounts = new Map<number | "invalid", number>();
  let invalid = 0;
  let mediumRange = 0;

  for (let i = 0; i < SAMPLE_COUNT; i += 1) {
    const payload = generateEndlessPuzzle();
    const { steps, failure } = forwardValidateVerbose(payload);

    if (steps === null) {
      invalid += 1;
      stepCounts.set("invalid", (stepCounts.get("invalid") ?? 0) + 1);
      if (failure) {
        const key = failure.axiomId || "(none)";
        byAxiom.set(key, (byAxiom.get(key) ?? 0) + 1);
      }
      continue;
    }

    stepCounts.set(steps, (stepCounts.get(steps) ?? 0) + 1);
    if (steps >= MIN_STEPS && steps <= MAX_STEPS) mediumRange += 1;
  }

  console.log(`\n--- Endless generator report (n=${SAMPLE_COUNT}) ---`);
  console.log(
    `Invalid (unsolvable) traces: ${invalid} (${((invalid / SAMPLE_COUNT) * 100).toFixed(1)}%)`,
  );
  console.log(
    `Medium range (${MIN_STEPS}-${MAX_STEPS} steps): ${mediumRange} (${((mediumRange / SAMPLE_COUNT) * 100).toFixed(1)}%)`,
  );
  console.log("Step-count distribution:", Object.fromEntries(stepCounts));
  if (byAxiom.size > 0) {
    console.log("Invalid-trace failures by axiomId:", Object.fromEntries(byAxiom));
  }

  if (invalid > 0) {
    console.error(`\nFAILED: ${invalid} unsolvable puzzle(s) found.`);
    process.exit(1);
  }
  console.log("\nOK: all sampled puzzles were forward-solvable.");
}

main();
