INSERT INTO days (id, title, nodes, solution)
VALUES (
  '2026-03-19',
  '2-step proof example (Simp -> MP)',
  '[
    {
      "id": "n1",
      "text": "P ∧ Q",
      "selected": false,
      "isStarter": true,
      "parentIds": [],
      "context": false,
      "relationship": "And",
      "left": {
        "id": "p",
        "text": "P",
        "selected": false,
        "isStarter": true,
        "parentIds": [],
        "context": true
      },
      "right": {
        "id": "q",
        "text": "Q",
        "selected": false,
        "isStarter": true,
        "parentIds": [],
        "context": true
      }
    },
    {
      "id": "n2",
      "text": "P → R",
      "selected": false,
      "isStarter": true,
      "parentIds": [],
      "context": false,
      "relationship": "If",
      "left": {
        "id": "p",
        "text": "P",
        "selected": false,
        "isStarter": true,
        "parentIds": [],
        "context": true
      },
      "right": {
        "id": "r",
        "text": "R",
        "selected": false,
        "isStarter": true,
        "parentIds": [],
        "context": true
      }
    }
  ]'::jsonb,
  '{
    "id": "n4",
    "text": "R",
    "selected": false,
    "isStarter": false,
    "parentIds": ["n2", "n3"]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE
SET
  title = EXCLUDED.title,
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;
