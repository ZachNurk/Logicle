/**
 * Reads puzzle "days" data from a static JSON file (no DB round-trip).
 * @file days.ts
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Day = {
  id: string;
  nodes: unknown;
  solution: unknown;
};

// process.cwd()-relative (not import.meta.url-relative): the Vercel function
// bundles this module's code but not its original file location, so a path
// derived from import.meta.url would point at the wrong directory at runtime.
const DAYS_PATH = join(process.cwd(), "db", "days.json");

const days: Day[] = JSON.parse(readFileSync(DAYS_PATH, "utf-8"));
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
