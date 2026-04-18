INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-06', '[{"id": "4e8aa948-1f7a-4716-9752-c03f7b8831e0", "text": "p ∧ q", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "And", "left": {"id": "a850baa6-71b0-4999-aa5a-d0c88fbda677", "text": "p", "selected": false, "isStarter": true, "parentIds": [], "context": false}, "right": {"id": "bcdfc868-77be-47f5-ae09-516539654598", "text": "q", "selected": false, "isStarter": true, "parentIds": [], "context": false}}, {"id": "3c8f018a-ea8e-4ad4-8585-989210d6d0ed", "text": "p → r", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "f66dd47b-9bc0-47c3-975e-7796d66189a9", "text": "p", "selected": false, "isStarter": true, "parentIds": [], "context": false}, "right": {"id": "e6ecb9cb-2240-4792-aa83-f4a353a35f50", "text": "r", "selected": false, "isStarter": true, "parentIds": [], "context": false}}]'::jsonb, '{"id": "9730adcf-eb2d-4dc6-a745-ad81b30efac9", "text": "r", "selected": false, "isStarter": true, "parentIds": [], "context": false}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;
