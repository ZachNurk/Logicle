/**
 * Left side panel of our program. Handles displaying our proof nodes.
 * Nodes are grouped into derivation layers: starters on layer 0, each
 * derived node on max(parent layers) + 1. Each layer gets its own row,
 * so the panel expands downward as new nodes are added.
 * @file ProofNodePanel.tsx
 */

import { useRef, useLayoutEffect, useState, useCallback } from "react";
import type { ProofNode } from "../logic/ProofNode";
import type { CSSProperties } from "react";
import { Colors } from "../constants/theme";

type Arrow = { x1: number; y1: number; x2: number; y2: number; rule?: string };

/** Num of pixels up arrows should be placed from calculated bottom */
const ARROW_OFFSET = 5

/** Assigns each node a layer index. Starters = 0, derived = max(parent layers) + 1. */
function computeLayers(nodes: ProofNode[]): Map<string, number> {
  const layerOf = new Map<string, number>();

  for (const n of nodes) {
    if (n.isStarter) layerOf.set(n.id, 0);
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (const n of nodes) {
      if (n.isStarter) continue;
      const parentMax = (n.parents ?? []).reduce(
        (max, p) => Math.max(max, layerOf.get(p.id) ?? 0),
        0,
      );
      const layer = parentMax + 1;
      if (layerOf.get(n.id) !== layer) {
        layerOf.set(n.id, layer);
        changed = true;
      }
    }
  }

  return layerOf;
}

export default function ProofNodePanel({
  givenArray,
  solutionNode,
  toggleSelected,
}: {
  givenArray: ProofNode[];
  solutionNode: ProofNode;
  toggleSelected: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [arrows, setArrows] = useState<Arrow[]>([]);

  const setRef = useCallback(
    (id: string) => (el: HTMLButtonElement | null) => {
      if (el) buttonRefs.current.set(id, el);
      else buttonRefs.current.delete(id);
    },
    [],
  );

  /**
   * Computes the coordinates for the arrows
   */
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const next: Arrow[] = [];

    for (const node of givenArray) {
      if (node.isStarter || !node.parents?.length) continue;

      // Remap winning node → solution button so the arrow lands on the conclusion.
      const resolvedId =
        node.text === solutionNode.text ? solutionNode.id : node.id;

      const childEl = buttonRefs.current.get(resolvedId);
      if (!childEl) continue;

      const childRect = childEl.getBoundingClientRect();
      const childX = childRect.left + childRect.width / 2 - containerRect.left;
      const childY = childRect.top - containerRect.top;

      for (const parent of node.parents) {
        const parentEl = buttonRefs.current.get(parent.id);
        if (!parentEl) continue;

        const parentRect = parentEl.getBoundingClientRect();
        const parentX = parentRect.left + parentRect.width / 2 - containerRect.left;
        const parentY = parentRect.bottom - containerRect.top - ARROW_OFFSET;

        next.push({ x1: parentX, y1: parentY, x2: childX, y2: childY, rule: node.rule });
      }
    }

    setArrows((prev) =>
      JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
    );
  });

  // If a derived node has the same text as the solution, it's the winning node.
  // Don't render it in the layers — arrows from its parents should point to the
  // solution button at the bottom instead.
  const winningNode = (givenArray ?? []).find(
    (n) => !n.isStarter && n.text === solutionNode.text,
  );

  // Register the winning node's id → solution button so arrow lookup still works.
  // We do this by aliasing: when computing arrows, remap the winning id to solutionNode.id.
  const visibleNodes = (givenArray ?? []).filter(
    (n) => !n.context && n.text !== solutionNode.text,
  );

  const layerOf = computeLayers(visibleNodes);

  // Build an ordered list of layers, each containing its nodes.
  const maxLayer = visibleNodes.reduce(
    (max, n) => Math.max(max, layerOf.get(n.id) ?? 0),
    0,
  );
  const layers: ProofNode[][] = Array.from({ length: maxLayer + 1 }, () => []);
  for (const n of visibleNodes) {
    const l = layerOf.get(n.id) ?? 0;
    layers[l].push(n);
  }

  return (
    <div ref={containerRef} style={styles.container}>
      {/* SVG arrow overlay */}
      <svg style={styles.arrowOverlay} aria-hidden>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#000" />
          </marker>
        </defs>
        {arrows.map((a, i) => {
          return (
            <g key={i}>
              <line
                x1={a.x1}
                y1={a.y1}
                x2={a.x2}
                y2={a.y2}
                stroke="#000"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                markerEnd="url(#arrowhead)"
              />
            </g>
          );
        })}
      </svg>

      {/* One row per derivation layer */}
      {layers.map((layerNodes, layerIdx) => (
        <div key={layerIdx} style={styles.layer}>
          {layerNodes.map((node) => (
            <button
              key={node.id}
              ref={setRef(node.id)}
              onClick={() => toggleSelected(node.id)}
              style={{
                ...styles.nodeButton,
                ...(node.isStarter ? styles.starterButton : styles.derivedButton),
                ...(node.selected ? styles.selectedButton : {}),
              }}
            >
              {node.text}
            </button>
          ))}
        </div>
      ))}

      {/* Solution node pinned at the bottom */}
      <div style={styles.solutionRow}>
        <button
          ref={setRef(solutionNode.id)}
          disabled
          style={{
            ...styles.nodeButton,
            ...styles.solutionButton,
            ...(winningNode ? styles.solutionReached : {}),
          }}
        >
          {solutionNode.text}
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    border: `4px solid ${Colors.black}`,
    borderRadius: "20px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    overflowY: "auto",
  },
  arrowOverlay: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "visible",
  },
  layer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  solutionRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
    paddingTop: "8px",
    borderTop: `1px dashed ${Colors.gray}`,
  },
  nodeButton: {
    padding: "10px 16px",
    fontSize: "14px",
    width: "fit-content",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "44px",
    cursor: "pointer",
    border: `2px solid ${Colors.black}`,
    borderRadius: "100px"
  },
  starterButton: {
    backgroundColor: Colors.darkPink,
  },
  derivedButton: {
    backgroundColor: Colors.mediumPink,
  },
  selectedButton: {
    backgroundColor: Colors.gray,
  },
  solutionButton: {
    cursor: "default",
    backgroundColor: Colors.lightPink,
    color: "black",
  },
  solutionReached: {
    backgroundColor: "#22c55e",
    color: "white",
  },
};
