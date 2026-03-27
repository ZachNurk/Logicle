#!/usr/bin/env python3
# Boilerplate generator for `days` upsert SQL.
# Fill in `build_nodes_json()` / `build_solution_json()` with your real JSON when ready.

from pathlib import Path
from enum import Enum
from typing import Iterable


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


def _node_json_block(
    *,
    node_id: str,
    text: str,
    relationship: str,
    extra_lines: str,
) -> str:
    return (
        "{\n"
        f'  "id": "{node_id}",\n'
        f'  "text": "{text}",\n'
        '  "selected": false,\n'
        '  "isStarter": true,\n'
        '  "parentIds": [],\n'
        '  "context": false,\n'
        f'  "relationship": "{relationship}",\n'
        f"{extra_lines}"
        "}"
    )


# Leetcode 150-style postfix over a char list; pops from the end.
def parse_postfix(expr: str) -> str:
    _reset_node_id_counter()
    tokens = [ch for ch in expr if not ch.isspace()]
    if not tokens:
        return ""

    def dfs() -> str:
        if not tokens:
            raise ValueError("invalid postfix: missing operand")
        token = tokens.pop()

        if token not in LOGIC_OPERATOR_SYMBOLS:
            return token

        if token == "-":
            operand = dfs()
            return f"¬{operand}"

        right = dfs()
        left = dfs()

        if token == "&":
            nid = _next_node_id()
            return _node_json_block(
                node_id=nid,
                text=f"({left} ∧ {right})",
                relationship="And",
                extra_lines=(
                    f'  "left": "{left}",\n'
                    f'  "right": "{right}"\n'
                ),
            )
        if token == "|":
            return f"({left}∨{right})"
        if token == "<":
            return f"({left}↔{right})"
        if token == ">":
            return f"({left}→{right})"

        combined = f"({left}{token}{right})"
        return combined

    return dfs()


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
