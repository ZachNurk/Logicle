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













