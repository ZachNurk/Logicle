INSERT INTO days (id, title, nodes, solution)
VALUES (
  '2026-03-20',
  '3-step proof example (DS -> Simp)',
  '[
    {
      "id": "n1",
      "text": "(W ∨ ¬R) ∧ N",
      "selected": false,
      "isStarter": true,
      "parentIds": [],
      "context": false,
      "relationship": "And",
      "left": {
        "id": "or1",
        "text": "W ∨ ¬R",
        "selected": false,
        "isStarter": true,
        "parentIds": [],
        "context": true,
        "relationship": "Or",
        "left": {
          "id": "w",
          "text": "W",
          "selected": false,
          "isStarter": true,
          "parentIds": [],
          "context": true
        },
        "right": {
          "id": "nr",
          "text": "¬R",
          "selected": false,
          "isStarter": true,
          "parentIds": [],
          "context": true,
          "relationship": "Not",
          "contains": {
          "id": "r",
          "text": "R",
          "selected": false,
          "isStarter": true,
          "parentIds": [],
          "context": true
          }
        }
      },
      "right": {
        "id": "n",
        "text": "N",
        "selected": false,
        "isStarter": true,
        "parentIds": [],
        "context": true
      }
    },
    {
      "id": "n2",
      "text": "(G ∨ Z) → ¬W",
      "selected": false,
      "isStarter": true,
      "parentIds": [],
      "context": false,
      "relationship": "If",
      "left": {
        "id": "or2",
        "text": "G ∨ Z",
        "selected": false,
        "isStarter": true,
        "parentIds": [],
        "context": true,
        "relationship": "Or",
        "left": {
          "id": "g",
          "text": "G",
          "selected": false,
          "isStarter": true,
          "parentIds": [],
          "context": true
        },
        "right": {
        "id": "z1",
          "text": "Z",
          "selected": false,
          "isStarter": true,
          "parentIds": [],
          "context": true
        
      }
      },
      "right": {
        "id": "nw",
        "text": "¬W",
        "selected": false,
        "isStarter": true,
        "parentIds": [],
        "context": true,
        "relationship": "Not",
        "contains": {
        "id": "w",
          "text": "W",
          "selected": false,
          "isStarter": true,
          "parentIds": [],
          "context": true
          }
        }
      
    },
    {
      "id": "n3",
      "text": "Z",
      "selected": false,
      "isStarter": true,
      "parentIds": [],
      "context": false
    }
  ]'::jsonb,
  '{
    "id": "n4",
    "text": "¬R",
    "selected": false,
    "isStarter": false,
    "relationship": "Not",
    "parentIds": ["n1", "n5"]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE
SET
  title = EXCLUDED.title,
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;