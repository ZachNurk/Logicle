/**
 * Defines SQL queries we can use for operations with days
 * @file days.ts
 */

import { pool } from "./db";

export async function getDays() {
  const result = await pool.query(`
    SELECT id, title, nodes, solution
    FROM days
    ORDER BY id ASC
  `);

  return result.rows;
}

export async function getDayById(id: string) {
  const result = await pool.query(
    `
    SELECT id, title, nodes, solution
    FROM days
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
}
