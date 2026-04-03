#!/usr/bin/env python3
# Boilerplate generator for `days` upsert SQL.
# Fill in `build_nodes_json()` or wire prompts when ready.

import argparse
import json
import uuid
from pathlib import Path
from enum import Enum
from typing import Any, Iterable

# App-side proof node kinds (mirrors TS relationship names); reserved for future use.
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

# Repo root (parent of `scripts/`), for stable paths no matter the cwd.
REPO_ROOT = Path(__file__).resolve().parent.parent


# Return a fresh id for each proof node (embedded in JSON for the client).
def _next_node_id() -> str:
    return str(uuid.uuid4())


# Parse a postfix logic expression into one root ProofNode dict.
# Single-character atoms; binary ops & | > < ; unary -. Stack is Leetcode-150 style
# (operands pushed, operators pop and combine). Empty or invalid input yields None.
def parse_postfix(expr: str) -> dict[str, Any] | None:
    tokens = [ch for ch in expr if not ch.isspace()]
    if not tokens:
        return None

    stack: list[dict[str, Any]] = []
    for c in tokens:
        match c:
            case "&":
                right = stack.pop()
                left = stack.pop()
                nid = _next_node_id()
                left_text = str(left["text"])
                right_text = str(right["text"])
                # Atoms have no relationship; only compound nodes need extra parens when nested.
                if left.get("relationship"):
                    left_text = f"({left_text})"
                if right.get("relationship"):
                    right_text = f"({right_text})"

                combined = {
                    "id": nid,
                    "text": f"({left_text} ∧ {right_text})",
                    "selected": False,
                    "isStarter": True,
                    "parentIds": [],
                    "context": False,
                    "relationship": "And",
                    "left": left,
                    "right": right,
                }
                stack.append(combined)
            case "|":
                right = stack.pop()
                left = stack.pop()
                nid = _next_node_id()
                combined = {
                    "id": nid,
                    "text": f'({left["text"]} ∨ {right["text"]})',
                    "selected": False,
                    "isStarter": True,
                    "parentIds": [],
                    "context": False,
                    "relationship": "Or",
                    "left": left,
                    "right": right,
                }
                stack.append(combined)
            case "-":
                operand = stack.pop()
                nid = _next_node_id()
                inner_text = operand["text"]
                display_text = f"¬{inner_text}"
                combined = {
                    "id": nid,
                    "text": display_text,
                    "selected": False,
                    "isStarter": True,
                    "parentIds": [],
                    "context": False,
                    "relationship": "Not",
                    "contains": operand,
                }
                stack.append(combined)
            
            case ">":
                right = stack.pop()
                left = stack.pop()
                nid = _next_node_id()
                combined = {
                    "id": nid,
                    "text": f'({left["text"]} → {right["text"]})',
                    "selected": False,
                    "isStarter": True,
                    "parentIds": [],
                    "context": False,
                    "relationship": "If",
                    "left": left,
                    "right": right,
                }
                stack.append(combined)
            case "<":
                right = stack.pop()
                left = stack.pop()
                nid = _next_node_id()
                combined = {
                    "id": nid,
                    "text": f'({left["text"]} ↔ {right["text"]})',
                    "selected": False,
                    "isStarter": True,
                    "parentIds": [],
                    "context": False,
                    "relationship": "Iff",
                    "left": left,
                    "right": right,
                }
                stack.append(combined)
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
    return stack[-1] if stack else None



# Escape text for use inside a PostgreSQL single-quoted string ('' for ').
def _sql_json_literal(json_text: str) -> str:
    return json_text.replace("'", "''")



# Build one INSERT ... ON CONFLICT upsert for `days`, nodes as a JSON array of roots.
def make_insert(
    day_id: str,
    postfix_exprs: Iterable[str],
    solution_expr: str | None,
) -> str:
    roots: list[dict[str, Any]] = []
    for expr in postfix_exprs:
        root = parse_postfix(expr)
        if root is not None:
            roots.append(root)

            
    soln_root = parse_postfix(solution_expr) if solution_expr else None
    nodes_json = json.dumps(roots, ensure_ascii=False)
    solution_json = (
        json.dumps(soln_root, ensure_ascii=False) if soln_root is not None else "{}"
    )

    nj = _sql_json_literal(nodes_json)
    sj = _sql_json_literal(solution_json)
    return f"""INSERT INTO days (id, nodes, solution)
VALUES ('{day_id}', '{nj}'::jsonb, '{sj}'::jsonb)
ON CONFLICT (id) DO UPDATE
SET
  nodes = EXCLUDED.nodes,
  solution = EXCLUDED.solution;"""


# Write SQL statements to disk, separated by blank lines (replaces file).
def write_sql_file(output_path: Path, statements: Iterable[str]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    content = "\n\n".join(statements).strip() + "\n"
    output_path.write_text(content, encoding="utf-8")


# Append SQL statements to an existing file (e.g. seed_days.sql). Adds a blank line before new content.
def append_sql_file(output_path: Path, statements: Iterable[str]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    chunk = "\n\n".join(statements).strip() + "\n"
    if output_path.exists() and output_path.stat().st_size > 0:
        with output_path.open("a", encoding="utf-8") as f:
            f.write("\n")
            f.write(chunk)
    else:
        output_path.write_text(chunk, encoding="utf-8")


# Read primary key date string from stdin; None if empty.
def prompt_day() -> str | None:
    day_id = input("Date (e.g. 3-20-21): ").strip()
    if not day_id:
        return None
    return day_id


# Read one postfix expression line; None if empty.
def prompt_node() -> str | None:
    node = input("Node: ").strip()
    if not node:
        return None
    return node

def prompt_solution() -> str | None:
    node = input("Solution: ").strip()
    if not node:
        return None
    return node


# Prompt for a day id and up to four postfix lines, then write SQL.
def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate INSERT for days (nodes + solution) as SQL.",
    )
    parser.add_argument(
        "--append",
        action="store_true",
        help="Append to a seed file instead of overwriting generated_days.sql.",
    )
    parser.add_argument(
        "--target",
        type=Path,
        default=None,
        help="SQL file path for --append (default: db/init/seed_days.sql under repo root).",
    )
    args = parser.parse_args()

    day = prompt_day()
    if day is None:
        print("No rows entered. Nothing written.")
        return
    postfix_exprs: list[str] = []
    for _ in range(4):
        node = prompt_node()
        if node is not None:
            postfix_exprs.append(node)
            root = parse_postfix(node)
            print(json.dumps(root, ensure_ascii=False) if root else "")
    soln = prompt_solution()

    sql_statements = [make_insert(day, postfix_exprs, soln)]
    if args.append:
        target = (args.target if args.target is not None else REPO_ROOT / "db/init/seed_days.sql").resolve()
        append_sql_file(target, sql_statements)
        print(f"Appended 1 statement to {target}")
    else:
        output_file = REPO_ROOT / "scripts/db/init/generated_days.sql"
        write_sql_file(output_file, sql_statements)
        print(f"Wrote 1 statement to {output_file}")


if __name__ == "__main__":
    main()
