/**
 * Generates a run of daily puzzles starting today, forward-validating each
 * via forwardValidatePuzzle.ts (replaying the generator's own solve trace
 * against the real Axiom.ts functions) so a puzzle is only kept if it
 * genuinely solves forward in 3-5 steps (medium difficulty), and writes the
 * result to db/days.json.
 * @file generateDays.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { generateEndlessPuzzle } from "../src/logic/GeneratePuzzle";
import type { ProofNode } from "../src/logic/ProofNode";
import { forwardValidate } from "../src/logic/forwardValidatePuzzle";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NUM_DAYS = Number(process.env.GEN_DAYS_COUNT ?? 730);
const MIN_STEPS = 3;
const MAX_STEPS = 5;
const MAX_GENERATION_ATTEMPTS_PER_DAY = 2000;

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

main();
