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

/** Pixels up from parent bottom where the stroke starts */
const ARROW_OFFSET = 5;
/** Arrowhead triangle: tip at line end, base this far back (matches ~8×6 marker) */
const ARROW_HEAD_LEN = 8;
const ARROW_HEAD_HALF = 5;

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
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

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
      {/* Dashed lines under nodes (z-index 0) */}
      <svg style={styles.arrowLinesOverlay} aria-hidden>
        {arrows.map((a, i) => (
          <line
            key={i}
            x1={a.x1}
            y1={a.y1}
            x2={a.x2}
            y2={a.y2}
            stroke="#000"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            opacity={0.75}
          />
        ))}
      </svg>

      {/* Nodes between lines and arrowheads */}
      <div style={styles.nodesColumn}>
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
                  ...(hoveredNodeId === node.id && !node.selected ? styles.nodeButtonHover : {}),
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {node.text}
              </button>
            ))}
          </div>
        ))}

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

      {/* Arrowheads on top (z-index 2) so they paint above buttons */}
      <svg style={styles.arrowHeadsOverlay} aria-hidden>
        {arrows.map((a, i) => {
          const dx = a.x2 - a.x1;
          const dy = a.y2 - a.y1;
          const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
          const pts = `0,0 -${ARROW_HEAD_LEN},-${ARROW_HEAD_HALF} -${ARROW_HEAD_LEN},${ARROW_HEAD_HALF}`;
          return (
            <g
              key={i}
              transform={`translate(${a.x2} ${a.y2}) rotate(${angleDeg})`}
            >
              <polygon points={pts} fill="#000" opacity={0.75} />
            </g>
          );
        })}
      </svg>
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
    overflowY: "auto",
  },
  arrowLinesOverlay: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
    overflow: "visible",
  },
  arrowHeadsOverlay: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: 2,
    pointerEvents: "none",
    overflow: "visible",
  },
  nodesColumn: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flex: 1,
    minHeight: 0,
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
    padding: "12px 18px",
    fontSize: "15px",
    width: "fit-content",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "48px",
    cursor: "pointer",
    border: `2px solid ${Colors.black}`,
    borderRadius: "100px",
    fontWeight: "bold",
    transition:
      "transform 0.2s, background-color 0.2s, box-shadow 0.2s, color 0.2s",
  },
  nodeButtonHover: {
    backgroundColor: Colors.lightPink,
    transform: "translate(-2px, -2px)",
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
  starterButton: {
    backgroundColor: Colors.darkPink,
  },
  derivedButton: {
    backgroundColor: Colors.mediumPink,
  },
  selectedButton: {
    backgroundColor: Colors.white,
    transform: "translate(-2px, -2px)",
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
  solutionButton: {
    cursor: "default",
    backgroundColor: Colors.darkPink,
    color: "black",
  },
  solutionReached: {
    backgroundColor: "#22c55e",
    color: "white",
  },
};
