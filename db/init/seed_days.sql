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
VALUES ('2026-03-21','[{"id":"n1","text":"¬(A ∨ B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"n1_inner","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"a","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"b","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"C → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"c","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"b2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬C ∨ D) → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"n3_left","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"nc","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"c2","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"d","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"e","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb,'{"id":"n4","text":"E","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
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

INSERT INTO days (id, nodes, solution)
VALUES ('2026-03-25', '[{"id": "028b1b93-f10b-40c0-a5f7-b1ba7d81bb57", "text": "¬(A ∨ B)", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Not", "contains": {"id": "0e32587d-b2b4-48ea-9e84-61b0b41319da", "text": "A ∨ B", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Or", "left": {"id": "37118296-47ad-4655-a330-0adf650531a0", "text": "A", "selected": false, "isStarter": true, "parentIds": [], "context": false}, "right": {"id": "8235afc9-8fc3-42bd-9b62-9ff0b69bb6f8", "text": "B", "selected": false, "isStarter": true, "parentIds": [], "context": false}}}, {"id": "b665add2-f80c-4152-b72f-a33f1aeffe33", "text": "C → B", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "6c9e1ffe-207d-45ae-9b7f-2eb47a461890", "text": "C", "selected": false, "isStarter": true, "parentIds": [], "context": false}, "right": {"id": "dcf4d075-58bd-492d-a510-c3d763448d23", "text": "B", "selected": false, "isStarter": true, "parentIds": [], "context": false}}, {"id": "3961e006-136f-452f-aaac-b0d5f720deba", "text": "(¬C ∨ D) → E", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "3b86062c-19fb-4338-af65-5b9bbf6cbd21", "text": "¬C ∨ D", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Or", "left": {"id": "2bd4e440-a66a-431e-84fd-080082c37593", "text": "¬C", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Not", "contains": {"id": "58e60a88-1c69-4856-b615-85bbfefb450a", "text": "C", "selected": false, "isStarter": true, "parentIds": [], "context": false}}, "right": {"id": "6e83112e-0e63-4264-b585-eb0c82d6b097", "text": "D", "selected": false, "isStarter": true, "parentIds": [], "context": false}}, "right": {"id": "626f1f0a-5803-4a16-8c48-754c8d471e98", "text": "E", "selected": false, "isStarter": true, "parentIds": [], "context": false}}, {"id": "242b29aa-3637-4528-832e-2e958c1fced1", "text": "(A → D) ∨ ¬E", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Or", "left": {"id": "12751c2b-90a7-4651-ad92-5146de404cb8", "text": "A → D", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "08550623-1cc8-4000-8424-89135b858c6f", "text": "A", "selected": false, "isStarter": true, "parentIds": [], "context": false}, "right": {"id": "1f52a0b2-c3b6-44b2-ac9e-1cf2f67e741b", "text": "D", "selected": false, "isStarter": true, "parentIds": [], "context": false}}, "right": {"id": "e0c6b4bd-5872-429f-b9c1-86690eefe1b3", "text": "¬E", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "Not", "contains": {"id": "51866d2c-68bd-4429-95ef-14d5aebcd382", "text": "E", "selected": false, "isStarter": true, "parentIds": [], "context": false}}}]'::jsonb, '{"id": "635bddd6-9b8a-43e2-ba3c-dc48131b134c", "text": "E", "selected": false, "isStarter": true, "parentIds": [], "context": false}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-03-26','[{"id":"n1","text":"¬(A ∨ B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"n1_inner","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"a","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"b","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"C → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"c","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"b2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬C ∨ D) → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"n3_left","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"nc","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"c2","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"d","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"e","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb,'{"id":"n4","text":"E","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-03-27','[{"id":"n1","text":"(P ∨ Q) ∧ (Q → R)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"n1_left","text":"P ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"p","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"q","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"n1_right","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"q2","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"r","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"p2","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"r2","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"s","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb,'{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-03-28','[{"id":"n1","text":"P ↔ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"p","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"q","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"q2","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"r","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"r2","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb,'{"id":"n4","text":"¬P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"p2","text":"P","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-03-29','[{"id":"n1","text":"(A → B) ∧ (C → D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"n1_left","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"a","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"b","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"n1_right","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"c","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"d","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"nb","text":"¬B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"b2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"c2","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":false}]'::jsonb,'{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-03-30','[{"id":"n1","text":"¬(A ∨ B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"n1_inner","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"a","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"b","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"C → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"c","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"b2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"d","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"c2","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb,'{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-03-31','[{"id":"n1","text":"(M → N) ∧ (O → P)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"n1_left","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"m","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"n","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"n1_right","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"o","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"p","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"nn","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"n2_inner","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"o2","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":false}]'::jsonb,'{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-04-01','[{"id":"n1","text":"¬(M ∨ N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"n1_inner","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"m","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"n","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"P → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"p","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"n2_inner","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Q ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"q","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"p2","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb,'{"id":"n4","text":"Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-04-02','[{"id":"n1","text":"X ↔ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"x","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"y","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Y ↔ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"y2","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"z","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":false}]'::jsonb,'{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-04-03','[{"id":"n1","text":"(A ∨ B) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"n1_left","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"a","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"b","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"n1_right","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"b2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"c","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"a2","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"c2","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"d","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb,'{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-04-04','[{"id":"n1","text":"¬(L ∨ M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"n1_inner","text":"L ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"l","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"m","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"N → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"n","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"m2","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"o","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"p","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"n2","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"o2","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb,'{"id":"n5","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution) 
VALUES ('2026-04-05','[{"id":"n1","text":"(H → I) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"n1_left","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"h","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"i","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"n1_right","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"j","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"k","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"ni","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"i2","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"j2","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":false}]'::jsonb,'{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false}'::jsonb) 
ON CONFLICT (id) DO UPDATE 
SET 
  nodes = EXCLUDED.nodes, 
  solution = EXCLUDED.solution;


INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-06', '[{"id": "4e8aa948-1f7a-4716-9752-c03f7b8831e0", "text": "p ∧ q", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "And", "left": {"id": "a850baa6-71b0-4999-aa5a-d0c88fbda677", "text": "p", "selected": false, "isStarter": true, "parentIds": [], "context": false}, "right": {"id": "bcdfc868-77be-47f5-ae09-516539654598", "text": "q", "selected": false, "isStarter": true, "parentIds": [], "context": false}}, {"id": "3c8f018a-ea8e-4ad4-8585-989210d6d0ed", "text": "p → r", "selected": false, "isStarter": true, "parentIds": [], "context": false, "relationship": "If", "left": {"id": "f66dd47b-9bc0-47c3-975e-7796d66189a9", "text": "p", "selected": false, "isStarter": true, "parentIds": [], "context": false}, "right": {"id": "e6ecb9cb-2240-4792-aa83-f4a353a35f50", "text": "r", "selected": false, "isStarter": true, "parentIds": [], "context": false}}]'::jsonb, '{"id": "9730adcf-eb2d-4dc6-a745-ad81b30efac9", "text": "r", "selected": false, "isStarter": true, "parentIds": [], "context": false}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-07', '[{"id":"n1","text":"(A ∨ B) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-08', '[{"id":"n1","text":"D ↔ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"D","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-09', '[{"id":"n1","text":"¬(G ∨ H)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"I → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬I ∨ J) → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-10', '[{"id":"n1","text":"(J → K) ∧ (L → M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"M","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-11', '[{"id":"n1","text":"¬(M ∨ N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"O → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-12', '[{"id":"n1","text":"P ↔ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Q ↔ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-13', '[{"id":"n1","text":"(S ∨ T) ∧ (T → U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-14', '[{"id":"n1","text":"¬(V ∨ W)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"X → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"X ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-15', '[{"id":"n1","text":"(Y → Z) ∧ (A → B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Z ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-16', '[{"id":"n1","text":"(B → C) ∧ (D → E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"E","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-17', '[{"id":"n1","text":"¬(E ∨ F)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"G → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-18', '[{"id":"n1","text":"(H → I) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-19', '[{"id":"n1","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"K","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-20', '[{"id":"n1","text":"N ↔ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"N","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-21', '[{"id":"n1","text":"(Q ∨ R) ∧ (S → T)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-22', '[{"id":"n1","text":"¬(T ∨ U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"T ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"V → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬V ∨ W) → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-23', '[{"id":"n1","text":"W ↔ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬X ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-24', '[{"id":"n1","text":"(Z → A) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"C","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-25', '[{"id":"n1","text":"¬(C ∨ D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"E → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-26', '[{"id":"n1","text":"F ↔ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"G ↔ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"F","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-27', '[{"id":"n1","text":"(I ∨ J) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-28', '[{"id":"n1","text":"L ↔ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"L","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-29', '[{"id":"n1","text":"¬(O ∨ P)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Q → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬Q ∨ R) → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-04-30', '[{"id":"n1","text":"(R → S) ∧ (T → U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"U","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-01', '[{"id":"n1","text":"¬(U ∨ V)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"W → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-02', '[{"id":"n1","text":"X ↔ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Y ↔ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-03', '[{"id":"n1","text":"(A ∨ B) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-04', '[{"id":"n1","text":"¬(D ∨ E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"F → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"F ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-05', '[{"id":"n1","text":"(G → H) ∧ (I → J)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬H ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-06', '[{"id":"n1","text":"(J → K) ∧ (L → M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"M","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-07', '[{"id":"n1","text":"¬(M ∨ N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"O → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-08', '[{"id":"n1","text":"(P → Q) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-09', '[{"id":"n1","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"S","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-10', '[{"id":"n1","text":"V ↔ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"V","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-11', '[{"id":"n1","text":"(Y ∨ Z) ∧ (A → B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-12', '[{"id":"n1","text":"¬(B ∨ C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"D → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬D ∨ E) → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-13', '[{"id":"n1","text":"E ↔ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬F ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-14', '[{"id":"n1","text":"(H → I) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-15', '[{"id":"n1","text":"¬(K ∨ L)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"M → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-16', '[{"id":"n1","text":"N ↔ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"O ↔ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"N","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-17', '[{"id":"n1","text":"(Q ∨ R) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-18', '[{"id":"n1","text":"T ↔ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"T","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-19', '[{"id":"n1","text":"¬(W ∨ X)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Y → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬Y ∨ Z) → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-20', '[{"id":"n1","text":"(Z → A) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"C","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-21', '[{"id":"n1","text":"¬(C ∨ D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"E → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-22', '[{"id":"n1","text":"F ↔ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"G ↔ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-23', '[{"id":"n1","text":"(I ∨ J) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-24', '[{"id":"n1","text":"¬(L ∨ M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"L ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"N → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-25', '[{"id":"n1","text":"(O → P) ∧ (Q → R)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬P ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-26', '[{"id":"n1","text":"(R → S) ∧ (T → U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"U","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-27', '[{"id":"n1","text":"¬(U ∨ V)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"W → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-28', '[{"id":"n1","text":"(X → Y) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-29', '[{"id":"n1","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"A","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-30', '[{"id":"n1","text":"D ↔ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"D","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-05-31', '[{"id":"n1","text":"(G ∨ H) ∧ (I → J)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-01', '[{"id":"n1","text":"¬(J ∨ K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"J ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"L → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬L ∨ M) → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬L ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-02', '[{"id":"n1","text":"M ↔ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-03', '[{"id":"n1","text":"(P → Q) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-04', '[{"id":"n1","text":"¬(S ∨ T)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"U → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-05', '[{"id":"n1","text":"V ↔ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"W ↔ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"V","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-06', '[{"id":"n1","text":"(Y ∨ Z) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-07', '[{"id":"n1","text":"B ↔ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"B","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-08', '[{"id":"n1","text":"¬(E ∨ F)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"G → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬G ∨ H) → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-09', '[{"id":"n1","text":"(H → I) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-10', '[{"id":"n1","text":"¬(K ∨ L)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"M → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-11', '[{"id":"n1","text":"N ↔ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"O ↔ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-12', '[{"id":"n1","text":"(Q ∨ R) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-13', '[{"id":"n1","text":"¬(T ∨ U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"T ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"V → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-14', '[{"id":"n1","text":"(W → X) ∧ (Y → Z)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬X ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-15', '[{"id":"n1","text":"(Z → A) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"C","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-16', '[{"id":"n1","text":"¬(C ∨ D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"E → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-17', '[{"id":"n1","text":"(F → G) ∧ (H → I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-18', '[{"id":"n1","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"I","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-19', '[{"id":"n1","text":"L ↔ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"L","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-20', '[{"id":"n1","text":"(O ∨ P) ∧ (Q → R)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-21', '[{"id":"n1","text":"¬(R ∨ S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"R ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"T → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬T ∨ U) → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬T ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-22', '[{"id":"n1","text":"U ↔ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-23', '[{"id":"n1","text":"(X → Y) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-24', '[{"id":"n1","text":"¬(A ∨ B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"C → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-25', '[{"id":"n1","text":"D ↔ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"E ↔ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"D","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-26', '[{"id":"n1","text":"(G ∨ H) ∧ (H → I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-27', '[{"id":"n1","text":"J ↔ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"J","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-28', '[{"id":"n1","text":"¬(M ∨ N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"O → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬O ∨ P) → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-29', '[{"id":"n1","text":"(P → Q) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-06-30', '[{"id":"n1","text":"¬(S ∨ T)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"U → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-01', '[{"id":"n1","text":"V ↔ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"W ↔ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-02', '[{"id":"n1","text":"(Y ∨ Z) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-03', '[{"id":"n1","text":"¬(B ∨ C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"D → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-04', '[{"id":"n1","text":"(E → F) ∧ (G → H)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬F ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-05', '[{"id":"n1","text":"(H → I) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-06', '[{"id":"n1","text":"¬(K ∨ L)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"M → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-07', '[{"id":"n1","text":"(N → O) ∧ (P → Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-08', '[{"id":"n1","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"Q","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-09', '[{"id":"n1","text":"T ↔ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"T","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-10', '[{"id":"n1","text":"(W ∨ X) ∧ (Y → Z)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-11', '[{"id":"n1","text":"¬(Z ∨ A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Z ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"B → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬B ∨ C) → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-12', '[{"id":"n1","text":"C ↔ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-13', '[{"id":"n1","text":"(F → G) ∧ (H → I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-14', '[{"id":"n1","text":"¬(I ∨ J)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"K → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-15', '[{"id":"n1","text":"L ↔ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"M ↔ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"L","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-16', '[{"id":"n1","text":"(O ∨ P) ∧ (P → Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-17', '[{"id":"n1","text":"R ↔ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"R","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-18', '[{"id":"n1","text":"¬(U ∨ V)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"W → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬W ∨ X) → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Y","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-19', '[{"id":"n1","text":"(X → Y) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-20', '[{"id":"n1","text":"¬(A ∨ B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"C → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-21', '[{"id":"n1","text":"D ↔ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"E ↔ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-22', '[{"id":"n1","text":"(G ∨ H) ∧ (H → I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-23', '[{"id":"n1","text":"¬(J ∨ K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"J ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"L → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"L ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-24', '[{"id":"n1","text":"(M → N) ∧ (O → P)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-25', '[{"id":"n1","text":"(P → Q) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-26', '[{"id":"n1","text":"¬(S ∨ T)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"U → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-27', '[{"id":"n1","text":"(V → W) ∧ (X → Y)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Y","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-28', '[{"id":"n1","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬Y","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"Y","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-29', '[{"id":"n1","text":"B ↔ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"B","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-30', '[{"id":"n1","text":"(E ∨ F) ∧ (G → H)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-07-31', '[{"id":"n1","text":"¬(H ∨ I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"H ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"J → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬J ∨ K) → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬J ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-01', '[{"id":"n1","text":"K ↔ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬L ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-02', '[{"id":"n1","text":"(N → O) ∧ (P → Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-03', '[{"id":"n1","text":"¬(Q ∨ R)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"S → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-04', '[{"id":"n1","text":"T ↔ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"U ↔ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"T","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-05', '[{"id":"n1","text":"(W ∨ X) ∧ (X → Y)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-06', '[{"id":"n1","text":"Z ↔ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Z","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-07', '[{"id":"n1","text":"¬(C ∨ D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"E → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬E ∨ F) → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"G","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-08', '[{"id":"n1","text":"(F → G) ∧ (H → I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-09', '[{"id":"n1","text":"¬(I ∨ J)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"K → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-10', '[{"id":"n1","text":"L ↔ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"M ↔ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-11', '[{"id":"n1","text":"(O ∨ P) ∧ (P → Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-12', '[{"id":"n1","text":"¬(R ∨ S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"R ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"T → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"T ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-13', '[{"id":"n1","text":"(U → V) ∧ (W → X)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-14', '[{"id":"n1","text":"(X → Y) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-15', '[{"id":"n1","text":"¬(A ∨ B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"C → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-16', '[{"id":"n1","text":"(D → E) ∧ (F → G)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"G","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-17', '[{"id":"n1","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬G","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"G","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-18', '[{"id":"n1","text":"J ↔ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"J","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-19', '[{"id":"n1","text":"(M ∨ N) ∧ (O → P)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-20', '[{"id":"n1","text":"¬(P ∨ Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"P ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"R → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬R ∨ S) → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬R ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-21', '[{"id":"n1","text":"S ↔ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬T ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-22', '[{"id":"n1","text":"(V → W) ∧ (X → Y)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Y","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-23', '[{"id":"n1","text":"¬(Y ∨ Z)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"A → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-24', '[{"id":"n1","text":"B ↔ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"C ↔ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"B","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-25', '[{"id":"n1","text":"(E ∨ F) ∧ (F → G)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-26', '[{"id":"n1","text":"H ↔ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"H","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-27', '[{"id":"n1","text":"¬(K ∨ L)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"M → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬M ∨ N) → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"O","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-28', '[{"id":"n1","text":"(N → O) ∧ (P → Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-29', '[{"id":"n1","text":"¬(Q ∨ R)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"S → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-30', '[{"id":"n1","text":"T ↔ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"U ↔ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-08-31', '[{"id":"n1","text":"(W ∨ X) ∧ (X → Y)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-01', '[{"id":"n1","text":"¬(Z ∨ A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Z ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"B → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-02', '[{"id":"n1","text":"(C → D) ∧ (E → F)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-03', '[{"id":"n1","text":"(F → G) ∧ (H → I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-04', '[{"id":"n1","text":"¬(I ∨ J)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"K → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-05', '[{"id":"n1","text":"(L → M) ∧ (N → O)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"O","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-06', '[{"id":"n1","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬O","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"O","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-07', '[{"id":"n1","text":"R ↔ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"R","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-08', '[{"id":"n1","text":"(U ∨ V) ∧ (W → X)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-09', '[{"id":"n1","text":"¬(X ∨ Y)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"X ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Z → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬Z ∨ A) → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬Z ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-10', '[{"id":"n1","text":"A ↔ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-11', '[{"id":"n1","text":"(D → E) ∧ (F → G)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"G","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-12', '[{"id":"n1","text":"¬(G ∨ H)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"I → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-13', '[{"id":"n1","text":"J ↔ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"K ↔ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"J","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-14', '[{"id":"n1","text":"(M ∨ N) ∧ (N → O)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-15', '[{"id":"n1","text":"P ↔ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"P","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-16', '[{"id":"n1","text":"¬(S ∨ T)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"U → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬U ∨ V) → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"W","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-17', '[{"id":"n1","text":"(V → W) ∧ (X → Y)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Y","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-18', '[{"id":"n1","text":"¬(Y ∨ Z)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"A → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-19', '[{"id":"n1","text":"B ↔ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"C ↔ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-20', '[{"id":"n1","text":"(E ∨ F) ∧ (F → G)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-21', '[{"id":"n1","text":"¬(H ∨ I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"H ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"J → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"J ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-22', '[{"id":"n1","text":"(K → L) ∧ (M → N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬L ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-23', '[{"id":"n1","text":"(N → O) ∧ (P → Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-24', '[{"id":"n1","text":"¬(Q ∨ R)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"S → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-25', '[{"id":"n1","text":"(T → U) ∧ (V → W)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"W","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-26', '[{"id":"n1","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬W","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"W","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-27', '[{"id":"n1","text":"Z ↔ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"Z","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-28', '[{"id":"n1","text":"(C ∨ D) ∧ (E → F)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-29', '[{"id":"n1","text":"¬(F ∨ G)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"F ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"H → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬H ∨ I) → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬H ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-09-30', '[{"id":"n1","text":"I ↔ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬J ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-01', '[{"id":"n1","text":"(L → M) ∧ (N → O)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"O","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-02', '[{"id":"n1","text":"¬(O ∨ P)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Q → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-03', '[{"id":"n1","text":"R ↔ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"S ↔ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"R","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-04', '[{"id":"n1","text":"(U ∨ V) ∧ (V → W)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-05', '[{"id":"n1","text":"X ↔ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"X","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-06', '[{"id":"n1","text":"¬(A ∨ B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"C → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬C ∨ D) → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"E","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-07', '[{"id":"n1","text":"(D → E) ∧ (F → G)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"G","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-08', '[{"id":"n1","text":"¬(G ∨ H)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"I → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-09', '[{"id":"n1","text":"J ↔ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"K ↔ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-10', '[{"id":"n1","text":"(M ∨ N) ∧ (N → O)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-11', '[{"id":"n1","text":"¬(P ∨ Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"P ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"R → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"R ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-12', '[{"id":"n1","text":"(S → T) ∧ (U → V)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬T ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-13', '[{"id":"n1","text":"(V → W) ∧ (X → Y)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Y","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-14', '[{"id":"n1","text":"¬(Y ∨ Z)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"A → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-15', '[{"id":"n1","text":"(B → C) ∧ (D → E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"E","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-16', '[{"id":"n1","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬E","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"E","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-17', '[{"id":"n1","text":"H ↔ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"H","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-18', '[{"id":"n1","text":"(K ∨ L) ∧ (M → N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-19', '[{"id":"n1","text":"¬(N ∨ O)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"P → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬P ∨ Q) → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬P ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-20', '[{"id":"n1","text":"Q ↔ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬R ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-21', '[{"id":"n1","text":"(T → U) ∧ (V → W)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"W","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-22', '[{"id":"n1","text":"¬(W ∨ X)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Y → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-23', '[{"id":"n1","text":"Z ↔ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"A ↔ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Z","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-24', '[{"id":"n1","text":"(C ∨ D) ∧ (D → E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-25', '[{"id":"n1","text":"F ↔ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"F","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-26', '[{"id":"n1","text":"¬(I ∨ J)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"K → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬K ∨ L) → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"M","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-27', '[{"id":"n1","text":"(L → M) ∧ (N → O)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"O","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-28', '[{"id":"n1","text":"¬(O ∨ P)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Q → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-29', '[{"id":"n1","text":"R ↔ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"S ↔ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-30', '[{"id":"n1","text":"(U ∨ V) ∧ (V → W)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-10-31', '[{"id":"n1","text":"¬(X ∨ Y)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"X ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Z → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"Z ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-01', '[{"id":"n1","text":"(A → B) ∧ (C → D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-02', '[{"id":"n1","text":"(D → E) ∧ (F → G)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"G","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-03', '[{"id":"n1","text":"¬(G ∨ H)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"I → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-04', '[{"id":"n1","text":"(J → K) ∧ (L → M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"M","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-05', '[{"id":"n1","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬M","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"M","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-06', '[{"id":"n1","text":"P ↔ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"P","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-07', '[{"id":"n1","text":"(S ∨ T) ∧ (U → V)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-08', '[{"id":"n1","text":"¬(V ∨ W)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"X → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬X ∨ Y) → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬X ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-09', '[{"id":"n1","text":"Y ↔ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬Z ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-10', '[{"id":"n1","text":"(B → C) ∧ (D → E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"E","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-11', '[{"id":"n1","text":"¬(E ∨ F)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"G → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-12', '[{"id":"n1","text":"H ↔ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"I ↔ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"H","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-13', '[{"id":"n1","text":"(K ∨ L) ∧ (L → M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-14', '[{"id":"n1","text":"N ↔ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"N","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-15', '[{"id":"n1","text":"¬(Q ∨ R)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"S → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬S ∨ T) → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"U","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-16', '[{"id":"n1","text":"(T → U) ∧ (V → W)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"W","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-17', '[{"id":"n1","text":"¬(W ∨ X)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Y → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-18', '[{"id":"n1","text":"Z ↔ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"A ↔ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-19', '[{"id":"n1","text":"(C ∨ D) ∧ (D → E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-20', '[{"id":"n1","text":"¬(F ∨ G)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"F ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"H → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"H ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-21', '[{"id":"n1","text":"(I → J) ∧ (K → L)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬J ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-22', '[{"id":"n1","text":"(L → M) ∧ (N → O)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"O","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-23', '[{"id":"n1","text":"¬(O ∨ P)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Q → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-24', '[{"id":"n1","text":"(R → S) ∧ (T → U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"U","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-25', '[{"id":"n1","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬U","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"U","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-26', '[{"id":"n1","text":"X ↔ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"X","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-27', '[{"id":"n1","text":"(A ∨ B) ∧ (C → D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-28', '[{"id":"n1","text":"¬(D ∨ E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"F → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬F ∨ G) → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬F ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-29', '[{"id":"n1","text":"G ↔ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬H ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-11-30', '[{"id":"n1","text":"(J → K) ∧ (L → M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"M","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-01', '[{"id":"n1","text":"¬(M ∨ N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"O → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-02', '[{"id":"n1","text":"P ↔ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Q ↔ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"P","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-03', '[{"id":"n1","text":"(S ∨ T) ∧ (T → U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-04', '[{"id":"n1","text":"V ↔ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"V","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-05', '[{"id":"n1","text":"¬(Y ∨ Z)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"A → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬A ∨ B) → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"C","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-06', '[{"id":"n1","text":"(B → C) ∧ (D → E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"E","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-07', '[{"id":"n1","text":"¬(E ∨ F)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"G → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-08', '[{"id":"n1","text":"H ↔ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"I ↔ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-09', '[{"id":"n1","text":"(K ∨ L) ∧ (L → M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-10', '[{"id":"n1","text":"¬(N ∨ O)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"P → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"P ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-11', '[{"id":"n1","text":"(Q → R) ∧ (S → T)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬R ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-12', '[{"id":"n1","text":"(T → U) ∧ (V → W)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"W","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-13', '[{"id":"n1","text":"¬(W ∨ X)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Y → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-14', '[{"id":"n1","text":"(Z → A) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"C","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-15', '[{"id":"n1","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬C","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"C","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-16', '[{"id":"n1","text":"F ↔ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"F","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-17', '[{"id":"n1","text":"(I ∨ J) ∧ (K → L)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-18', '[{"id":"n1","text":"¬(L ∨ M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"L ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"N → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬N ∨ O) → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-19', '[{"id":"n1","text":"O ↔ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬P ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-20', '[{"id":"n1","text":"(R → S) ∧ (T → U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"U","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-21', '[{"id":"n1","text":"¬(U ∨ V)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"W → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-22', '[{"id":"n1","text":"X ↔ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Y ↔ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"X","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-23', '[{"id":"n1","text":"(A ∨ B) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-24', '[{"id":"n1","text":"D ↔ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"D","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-25', '[{"id":"n1","text":"¬(G ∨ H)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"I → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬I ∨ J) → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-26', '[{"id":"n1","text":"(J → K) ∧ (L → M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"M","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-27', '[{"id":"n1","text":"¬(M ∨ N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"O → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-28', '[{"id":"n1","text":"P ↔ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Q ↔ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-29', '[{"id":"n1","text":"(S ∨ T) ∧ (T → U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-30', '[{"id":"n1","text":"¬(V ∨ W)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"X → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"X ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2026-12-31', '[{"id":"n1","text":"(Y → Z) ∧ (A → B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Z ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-01', '[{"id":"n1","text":"(B → C) ∧ (D → E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"D → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"E","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-02', '[{"id":"n1","text":"¬(E ∨ F)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"G → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-03', '[{"id":"n1","text":"(H → I) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-04', '[{"id":"n1","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"K","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-05', '[{"id":"n1","text":"N ↔ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"N","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-06', '[{"id":"n1","text":"(Q ∨ R) ∧ (S → T)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-07', '[{"id":"n1","text":"¬(T ∨ U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"T ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"V → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬V ∨ W) → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-08', '[{"id":"n1","text":"W ↔ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬X ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-09', '[{"id":"n1","text":"(Z → A) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"C","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-10', '[{"id":"n1","text":"¬(C ∨ D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"E → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-11', '[{"id":"n1","text":"F ↔ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"G ↔ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"F","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-12', '[{"id":"n1","text":"(I ∨ J) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-13', '[{"id":"n1","text":"L ↔ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"L","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-14', '[{"id":"n1","text":"¬(O ∨ P)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Q → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬Q ∨ R) → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-15', '[{"id":"n1","text":"(R → S) ∧ (T → U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"U","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-16', '[{"id":"n1","text":"¬(U ∨ V)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"W → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-17', '[{"id":"n1","text":"X ↔ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"Y ↔ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-18', '[{"id":"n1","text":"(A ∨ B) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-19', '[{"id":"n1","text":"¬(D ∨ E)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"F → E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"F ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-20', '[{"id":"n1","text":"(G → H) ∧ (I → J)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬H ∨ I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-21', '[{"id":"n1","text":"(J → K) ∧ (L → M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"L → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"M","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-22', '[{"id":"n1","text":"¬(M ∨ N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"O → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-23', '[{"id":"n1","text":"(P → Q) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-24', '[{"id":"n1","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"S","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-25', '[{"id":"n1","text":"V ↔ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"V","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-26', '[{"id":"n1","text":"(Y ∨ Z) ∧ (A → B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-27', '[{"id":"n1","text":"¬(B ∨ C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"D → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬D ∨ E) → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-28', '[{"id":"n1","text":"E ↔ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬F ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-29', '[{"id":"n1","text":"(H → I) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-30', '[{"id":"n1","text":"¬(K ∨ L)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"M → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-01-31', '[{"id":"n1","text":"N ↔ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"O ↔ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"N","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-01', '[{"id":"n1","text":"(Q ∨ R) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-02', '[{"id":"n1","text":"T ↔ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"T","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-03', '[{"id":"n1","text":"¬(W ∨ X)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"Y → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬Y ∨ Z) → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-04', '[{"id":"n1","text":"(Z → A) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"C","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-05', '[{"id":"n1","text":"¬(C ∨ D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"E → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-06', '[{"id":"n1","text":"F ↔ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"G ↔ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-07', '[{"id":"n1","text":"(I ∨ J) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-08', '[{"id":"n1","text":"¬(L ∨ M)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"L ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"N → M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-09', '[{"id":"n1","text":"(O → P) ∧ (Q → R)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬P ∨ Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-10', '[{"id":"n1","text":"(R → S) ∧ (T → U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"T → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"U","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-11', '[{"id":"n1","text":"¬(U ∨ V)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"W → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-12', '[{"id":"n1","text":"(X → Y) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-13', '[{"id":"n1","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"A","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-14', '[{"id":"n1","text":"D ↔ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"D","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-15', '[{"id":"n1","text":"(G ∨ H) ∧ (I → J)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-16', '[{"id":"n1","text":"¬(J ∨ K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"J ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"L → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬L ∨ M) → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬L ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-17', '[{"id":"n1","text":"M ↔ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬N ∨ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"O → P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-18', '[{"id":"n1","text":"(P → Q) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-19', '[{"id":"n1","text":"¬(S ∨ T)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"U → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-20', '[{"id":"n1","text":"V ↔ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"W ↔ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"V","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-21', '[{"id":"n1","text":"(Y ∨ Z) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-22', '[{"id":"n1","text":"B ↔ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"C → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"B","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-23', '[{"id":"n1","text":"¬(E ∨ F)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"E ∨ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"G → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬G ∨ H) → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-24', '[{"id":"n1","text":"(H → I) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-25', '[{"id":"n1","text":"¬(K ∨ L)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"M → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-26', '[{"id":"n1","text":"N ↔ O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"O ↔ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"P","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-27', '[{"id":"n1","text":"(Q ∨ R) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-02-28', '[{"id":"n1","text":"¬(T ∨ U)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"T ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"V → U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-01', '[{"id":"n1","text":"(W → X) ∧ (Y → Z)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬X ∨ Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-02', '[{"id":"n1","text":"(Z → A) ∧ (B → C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"B → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"C","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-03', '[{"id":"n1","text":"¬(C ∨ D)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"C ∨ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"E → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-04', '[{"id":"n1","text":"(F → G) ∧ (H → I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-05', '[{"id":"n1","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"I","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-06', '[{"id":"n1","text":"L ↔ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"M → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"L","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-07', '[{"id":"n1","text":"(O ∨ P) ∧ (Q → R)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-08', '[{"id":"n1","text":"¬(R ∨ S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"R ∨ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"T → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬T ∨ U) → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬T ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-09', '[{"id":"n1","text":"U ↔ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬V ∨ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"W → X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-10', '[{"id":"n1","text":"(X → Y) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-11', '[{"id":"n1","text":"¬(A ∨ B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"C → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-12', '[{"id":"n1","text":"D ↔ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"E ↔ F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"D","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-13', '[{"id":"n1","text":"(G ∨ H) ∧ (H → I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"I → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-14', '[{"id":"n1","text":"J ↔ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"K → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬J","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"J","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-15', '[{"id":"n1","text":"¬(M ∨ N)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"M ∨ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"O → N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬O ∨ P) → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-16', '[{"id":"n1","text":"(P → Q) ∧ (R → S)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Q ∨ R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"S","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-17', '[{"id":"n1","text":"¬(S ∨ T)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"U → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V ∨ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"V","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-18', '[{"id":"n1","text":"V ↔ W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"W ↔ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"X","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-19', '[{"id":"n1","text":"(Y ∨ Z) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"A → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"B","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-20', '[{"id":"n1","text":"¬(B ∨ C)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"D → C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id12","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id13","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-21', '[{"id":"n1","text":"(E → F) ∧ (G → H)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"G → H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬F ∨ G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"H","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-22', '[{"id":"n1","text":"(H → I) ∧ (J → K)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"J → K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"K","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-23', '[{"id":"n1","text":"¬(K ∨ L)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"K ∨ L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"M → L","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N ∨ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"N","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-24', '[{"id":"n1","text":"(N → O) ∧ (P → Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"N → O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-25', '[{"id":"n1","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id2","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"R → S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬S ∨ T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id8","text":"¬S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id10","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id12","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬Q","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id14","text":"Q","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-26', '[{"id":"n1","text":"T ↔ U","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"U → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"V → W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id8","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id9","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n4","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"¬T","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":false,"relationship":"Not","contains":{"id":"id13","text":"T","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-27', '[{"id":"n1","text":"(W ∨ X) ∧ (Y → Z)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Y → Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Z","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-28', '[{"id":"n1","text":"¬(Z ∨ A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"Z ∨ A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"B → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬B ∨ C) → D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬B ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-29', '[{"id":"n1","text":"C ↔ D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"¬D ∨ E","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id5","text":"¬D","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id6","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id7","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},{"id":"n4","text":"E → F","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id10","text":"E","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id11","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n5","text":"F","selected":false,"isStarter":false,"parentIds":["n1","n2","n3","n4"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-30', '[{"id":"n1","text":"(F → G) ∧ (H → I)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"F → G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"H → I","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬G ∨ H","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬G","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"G","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"H","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"F","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"I","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-03-31', '[{"id":"n1","text":"¬(I ∨ J)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"I ∨ J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"I","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"K → J","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"J","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"L ∨ K","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"K","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-04-01', '[{"id":"n1","text":"L ↔ M","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"L","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"M ↔ N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id5","text":"M","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬N","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"N","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬L","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"L","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-04-02', '[{"id":"n1","text":"(O ∨ P) ∧ (P → Q)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"O ∨ P","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"P → Q","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"P","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬O","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id9","text":"O","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"Q → R","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id11","text":"Q","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id12","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-04-03', '[{"id":"n1","text":"R ↔ S","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Iff","left":{"id":"id2","text":"R","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id3","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n2","text":"S → T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id5","text":"S","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id6","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"¬T","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id8","text":"T","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"¬R","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":false,"relationship":"Not","contains":{"id":"id10","text":"R","selected":false,"isStarter":false,"parentIds":[],"context":true}}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-04-04', '[{"id":"n1","text":"¬(U ∨ V)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"U ∨ V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"U","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"W → V","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"V","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"(¬W ∨ X) → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id9","text":"¬W ∨ X","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id10","text":"¬W","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id11","text":"W","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id12","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id13","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"Y","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-04-05', '[{"id":"n1","text":"(X → Y) ∧ (Z → A)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"And","left":{"id":"id2","text":"X → Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id5","text":"Z → A","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"¬Y ∨ Z","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"¬Y","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id10","text":"Y","selected":false,"isStarter":true,"parentIds":[],"context":true}},"right":{"id":"id11","text":"Z","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"X","selected":false,"isStarter":true,"parentIds":[],"context":true}]'::jsonb, '{"id":"n4","text":"A","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;

INSERT INTO days (id, nodes, solution)
VALUES ('2027-04-06', '[{"id":"n1","text":"¬(A ∨ B)","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Not","contains":{"id":"id2","text":"A ∨ B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id3","text":"A","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id4","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}}},{"id":"n2","text":"C → B","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"If","left":{"id":"id6","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id7","text":"B","selected":false,"isStarter":true,"parentIds":[],"context":true}},{"id":"n3","text":"D ∨ C","selected":false,"isStarter":true,"parentIds":[],"context":false,"relationship":"Or","left":{"id":"id9","text":"D","selected":false,"isStarter":true,"parentIds":[],"context":true},"right":{"id":"id10","text":"C","selected":false,"isStarter":true,"parentIds":[],"context":true}}]'::jsonb, '{"id":"n4","text":"D","selected":false,"isStarter":false,"parentIds":["n1","n2","n3"],"context":true}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;
