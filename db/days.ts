/**
 * Reads puzzle "days" data from a static JSON file (no DB round-trip).
 * @file days.ts
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

export type Day = {
  id: string;
  nodes: unknown;
  solution: unknown;
};

const DAYS_PATH = join(dirname(fileURLToPath(import.meta.url)), "days.json");

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
