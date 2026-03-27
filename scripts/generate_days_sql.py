#!/usr/bin/env python3
# Boilerplate generator for `days` upsert SQL.
# Fill in `build_nodes_json()` / `build_solution_json()` with your real JSON when ready.

import json
from pathlib import Path
from enum import Enum
from typing import Any, Iterable


class NodeType(str, Enum):
    NONE = "none"
    ATOM = "atom"
    AND = "and"
    OR = "or"
    NOT = "not"
    IFF = "iff"
    IMPLICATION = "implication"


# ASCII in postfix: & AND, | OR, - NOT, < IFF, > implication
LOGIC_OPERATOR_SYMBOLS = frozenset({"&", "|", "-", "<", ">"})

_node_id_counter = 0


def _reset_node_id_counter() -> None:
    global _node_id_counter
    _node_id_counter = 0


def _next_node_id() -> str:
    global _node_id_counter
    _node_id_counter += 1
    return f"n{_node_id_counter}"


# Leetcode 150-style postfix over a char list; pops from the end.
def parse_postfix(expr: str) -> str:
    _reset_node_id_counter()
    tokens = [ch for ch in expr if not ch.isspace()]
    if not tokens:
        return ""

    stack: list[dict[str, Any]] = []
    for c in tokens:
        match c:
            case "&":
                right = stack.pop()
                left = stack.pop()
                nid = _next_node_id()
                combined = {
                    "id": nid,
                    "text": f'({left["text"]} ∧ {right["text"]})',
                    "selected": False,
                    "isStarter": True,
                    "parentIds": [],
                    "context": False,
                    "relationship": "And",
                    "left": left,
                    "right": right,
                }
                stack.append(combined)
            case "-" | "|" | "<" | ">":
                raise NotImplementedError(f"Operator {c} is not implemented yet.")
            case _:
                atom_id = c.lower()
                nid = _next_node_id()
                atom_node = {
                    "id": nid,
                    "text": c,
                    "selected": False,
                    "isStarter": True,
                    "parentIds": [],
                    "context": True,
                }
                stack.append(atom_node)
    return json.dumps(stack[-1], ensure_ascii=False) if stack else ""


def build_nodes_json(day_id: str) -> str:
    node = ""
    if not node:
        return "<NODES_JSON_HERE>"
    return parse_postfix(node)


def build_solution_json(day_id: str) -> str:
    return "<SOLUTION_JSON_HERE>"


def make_insert(day_id: str) -> str:
    nodes_json = build_nodes_json(day_id)
    solution_json = build_solution_json(day_id)
    return f"""INSERT INTO days (id, nodes, solution)
VALUES ('{day_id}', '{nodes_json}'::jsonb, '{solution_json}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;"""


def write_sql_file(output_path: Path, statements: Iterable[str]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    content = "\n\n".join(statements).strip() + "\n"
    output_path.write_text(content, encoding="utf-8")


def prompt_day() -> str | None:
    day_id = input("Date (e.g. 3-20-21): ").strip()
    if not day_id:
        return None
    return day_id


def prompt_node() -> str | None:
    node = input("Node: ").strip()
    if not node:
        return None
    return node


def main() -> None:
    day = prompt_day()
    if day is None:
        print("No rows entered. Nothing written.")
        return
    for _ in range(4):
        node = prompt_node()
        if node is not None:
            print(parse_postfix(node))

    sql_statements = [make_insert(day)]
    output_file = Path("db/init/generated_days.sql")
    write_sql_file(output_file, sql_statements)
    print(f"Wrote 1 statement to {output_file}")


if __name__ == "__main__":
    main()
