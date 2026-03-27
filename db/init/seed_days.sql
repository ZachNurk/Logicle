INSERT INTO days (id, nodes, solution)
VALUES (
  '2026-03-19',
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
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES (
  '2026-03-20',
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
    "parentIds": ["n1", "n2"]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('30-21-2', '[{"id": "7bb8c482-302c-49d3-a127-4d1061c3ab91", "text": "¬(A ∧ B)", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Not", "contains": {"id": "c4cac052-a442-46cb-afd8-4f538c1ced74", "text": "(A ∧ B)", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "And", "left": {"id": "491cfd6a-9272-4129-aad6-d27083fe939a", "text": "A", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "bc24598c-252f-4202-b44c-dc012f02524e", "text": "B", "selected": false, "isStarter": true, "parentIds": [], "context": true}}}, {"id": "6fc3bdff-c41b-4c23-a1b2-0d199880939b", "text": "(B → A)", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "f5fca70f-c4d9-4bf1-be28-ada0c04f1ab7", "text": "B", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "3ca8b83d-753b-46b7-9fec-783722be07dc", "text": "A", "selected": false, "isStarter": true, "parentIds": [], "context": true}}]'::jsonb, '{"id": "eb4e274c-47f3-4dc3-9d55-64dad855fe90", "text": "B", "selected": false, "isStarter": true, "parentIds": [], "context": true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;



