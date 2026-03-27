INSERT INTO days (id, nodes, solution)
VALUES ('3-20-21', '<NODES_JSON_HERE>'::jsonb, '<SOLUTION_JSON_HERE>'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;
