/**
 * Reads puzzle "days" data from a static JSON file (no DB round-trip).
 * @file days.ts
 */

// Imported (not readFileSync'd): esbuild inlines JSON imports into the
// bundle at build time, so the deployed function has no separate-file
// runtime dependency to resolve.
import daysData from "./days.json";

export type Day = {
  id: string;
  nodes: unknown;
  solution: unknown;
  solutionSteps: unknown;
};

const days: Day[] = daysData as Day[];
const daysById = new Map(days.map((d) => [d.id, d]));

export async function getDays() {
  return days;
}

export async function getRandomDay() {
  if (days.length === 0) return null;
  return days[Math.floor(Math.random() * days.length)];
}

export async function getDayById(id: string) {
  return daysById.get(id) ?? null;
}
