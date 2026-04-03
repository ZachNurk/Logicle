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
VALUES ('2026-03-21', '[{"id": "7bb8c482-302c-49d3-a127-4d1061c3ab91", "text": "¬(A ∧ B)", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Not", "contains": {"id": "c4cac052-a442-46cb-afd8-4f538c1ced74", "text": "(A ∧ B)", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "And", "left": {"id": "491cfd6a-9272-4129-aad6-d27083fe939a", "text": "A", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "bc24598c-252f-4202-b44c-dc012f02524e", "text": "B", "selected": false, "isStarter": true, "parentIds": [], "context": true}}}, {"id": "6fc3bdff-c41b-4c23-a1b2-0d199880939b", "text": "(B → A)", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "f5fca70f-c4d9-4bf1-be28-ada0c04f1ab7", "text": "B", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "3ca8b83d-753b-46b7-9fec-783722be07dc", "text": "A", "selected": false, "isStarter": true, "parentIds": [], "context": true}}]'::jsonb, '{"id": "eb4e274c-47f3-4dc3-9d55-64dad855fe90", "text": "B", "selected": false, "isStarter": true, "parentIds": [], "context": true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-03-22', '[{"id": "f935cba4-772c-4209-8ffb-56496b449b03", "text": "P → Q", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "e02cccc4-6779-4bdf-ba2a-626dac0f1a1d", "text": "P", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "166ef3aa-bcf5-4ea3-9de8-5b49c2313949", "text": "Q", "selected": false, "isStarter": true, "parentIds": [], "context": true}}, {"id": "38bcb2e1-cdc5-4342-8c9d-6ed48e5c03a4", "text": "R → S", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "d65fa6f4-7598-4e49-96c2-a71e867d0857", "text": "R", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "657c46a1-4210-4aa4-8285-a6d3baee5d25", "text": "S", "selected": false, "isStarter": true, "parentIds": [], "context": true}}, {"id": "2f3f08c1-130d-4e8b-9564-c31c8fc0092d", "text": "P ∧ R", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "And", "left": {"id": "2abe9942-67c0-4003-be7a-6161c657fea8", "text": "P", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "9fb2c241-d022-4b6a-90e1-960aa9eca9b0", "text": "R", "selected": false, "isStarter": true, "parentIds": [], "context": true}}]'::jsonb, '{"id": "b971c55c-3791-4f01-9300-faca138812d9", "text": "Q ∧ S", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "And", "left": {"id": "74240f6c-2cc2-4c98-b515-29e006f2cea8", "text": "Q", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "401e9cc0-8517-441e-ae60-0b709630d8a6", "text": "S", "selected": false, "isStarter": true, "parentIds": [], "context": true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-03-23', '[{"id": "51fc9aa9-c54b-4ad5-9a5a-3b4fb56959f9", "text": "P ↔ Q", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Iff", "left": {"id": "a6dd344a-1ab6-4829-ac09-8ba79021cdc0", "text": "P", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "bb6380d8-8a14-406e-99ab-50d091e362aa", "text": "Q", "selected": false, "isStarter": true, "parentIds": [], "context": true}}, {"id": "fc0b2ff4-0c51-4584-894f-e4ce5f2c12bc", "text": "Q → R", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "6ce945b2-8b16-4987-8db0-bb3152be9f80", "text": "Q", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "0e011068-7bcb-460d-a079-3386e55b7422", "text": "R", "selected": false, "isStarter": true, "parentIds": [], "context": true}}, {"id": "9f299e8d-a33f-4248-8f1e-4e2d4470bd72", "text": "¬R", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Not", "contains": {"id": "54e58774-342c-40f0-a927-9458e2077cf9", "text": "R", "selected": false, "isStarter": true, "parentIds": [], "context": true}}]'::jsonb, '{"id": "accf8a97-e910-4cdb-af8d-6d33cdde174a", "text": "¬P", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Not", "contains": {"id": "54914d5f-7b7a-43b9-a7ee-83e5fa99a163", "text": "P", "selected": false, "isStarter": true, "parentIds": [], "context": true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-03-24', '[{"id": "865167de-9cea-4936-9d93-b3e1af141518", "text": "(P → Q) ∧ (R → S)", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "And", "left": {"id": "9b07594f-1b20-403a-893c-e09b24876707", "text": "P → Q", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "a04474d6-fb6e-431b-a22a-e50379cdb419", "text": "P", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "cdcddc40-802a-44e6-b45b-fea7e26e99e3", "text": "Q", "selected": false, "isStarter": true, "parentIds": [], "context": true}}, "right": {"id": "36bb2582-59ea-418e-8aea-1cc36083ec76", "text": "R → S", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "a85405c5-fd6f-47ed-aaa0-efc7891b368c", "text": "R", "selected": false, "isStarter": true, "parentIds": [], "context": true}, "right": {"id": "c11a9919-21e1-40f6-930f-4954ca5ab366", "text": "S", "selected": false, "isStarter": true, "parentIds": [], "context": true}}}, {"id": "dfe11c0f-8624-435c-8a2c-064a890c0356", "text": "¬Q ∨ R", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Or", "left": {"id": "239f512f-1fb0-4f70-8165-674527f86830", "text": "¬Q", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Not", "contains": {"id": "9ab98c4c-b3d5-43ce-9f48-a2ed6926d871", "text": "Q", "selected": false, "isStarter": true, "parentIds": [], "context": true}}, "right": {"id": "6dd6c54c-44d2-4454-8405-7c02dd945e25", "text": "R", "selected": false, "isStarter": true, "parentIds": [], "context": true}}, {"id": "32c8c921-99cb-4f4f-bf55-5b84b14c9417", "text": "P", "selected": false, "isStarter": true, "parentIds": [], "context": false}]'::jsonb, '{"id": "14c6d95d-3397-40df-8c32-144f404adcf5", "text": "S", "selected": false, "isStarter": true, "parentIds": [], "context": true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;











