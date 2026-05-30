/**
 * Left side panel of our program. Handles displaying our proof nodes.
 * Nodes are grouped into derivation layers: starters on layer 0, each
 * derived node on max(parent layers) + 1. Each layer gets its own row,
 * so the panel expands downward as new nodes are added.
 * @file ProofNodePanel.tsx
 */

import {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { ProofNode } from "../logic/ProofNode";
import type { CSSProperties } from "react";
import { Colors, StarterNodePalette } from "../constants/theme";

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

/**
 * Buckets nodes into rows by layer and orders each row by the average column
 * index of its parents — so children of leftmost parents sit on the left.
 * Layer 0 (starters) keeps its incoming order and anchors everything below.
 */
function buildOrderedLayers(
  nodes: ProofNode[],
  layerOf: Map<string, number>,
  maxLayer: number,
): ProofNode[][] {
  const layers: ProofNode[][] = Array.from({ length: maxLayer + 1 }, () => []);
  for (const n of nodes) {
    const l = layerOf.get(n.id) ?? 0;
    layers[l].push(n);
  }

  const columnOf = new Map<string, number>();
  layers[0]?.forEach((n, i) => columnOf.set(n.id, i));

  for (let l = 1; l < layers.length; l += 1) {
    const entries = layers[l].map((node, originalIdx) => {
      const parentCols = (node.parents ?? [])
        .map((p) => columnOf.get(p.id))
        .filter((c): c is number => c !== undefined);
      const key = parentCols.length
        ? parentCols.reduce((sum, c) => sum + c, 0) / parentCols.length
        : originalIdx;
      return { node, key, originalIdx };
    });
    entries.sort((a, b) => a.key - b.key || a.originalIdx - b.originalIdx);
    layers[l] = entries.map((e) => e.node);
    layers[l].forEach((n, i) => columnOf.set(n.id, i));
  }

  return layers;
}

/** Left/right starter palette indices; equal indices = solid color. */
type NodeGradient = { leftIdx: number; rightIdx: number };

type NodeColorMaps = {
  byId: Map<string, ProofNode>;
  nodeGradient: (node: ProofNode) => NodeGradient;
};

function paletteColorAtLayer(paletteIdx: number, layer: number): string {
  const palette = StarterNodePalette[paletteIdx];
  if (layer <= 0) return palette.base;
  if (layer === 1) return palette.depth1;
  return palette.depth2;
}

function gradientColorsAtLayer(
  gradient: NodeGradient,
  layer: number,
): { left: string; right: string; leftText: string; rightText: string } {
  const { leftIdx, rightIdx } = gradient;
  return {
    left: paletteColorAtLayer(leftIdx, layer),
    right: paletteColorAtLayer(rightIdx, layer),
    leftText: StarterNodePalette[leftIdx].text,
    rightText: StarterNodePalette[rightIdx].text,
  };
}

function isDualGradient(gradient: NodeGradient): boolean {
  return gradient.leftIdx !== gradient.rightIdx;
}

const gradientFillBase: Pick<
  CSSProperties,
  | "backgroundRepeat"
  | "backgroundSize"
  | "backgroundOrigin"
  | "backgroundClip"
> = {
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  backgroundOrigin: "border-box",
  backgroundClip: "border-box",
};

/** Single horizontal band: parent colors on the sides, blend between. */
function simpleDualGradientStyle(
  left: string,
  right: string,
): Pick<CSSProperties, "backgroundColor" | "backgroundImage"> {
  return {
    backgroundColor: right,
    backgroundImage: `linear-gradient(to right, ${left} 0%, ${left} 30%, ${right} 70%, ${right} 100%)`,
  };
}

/** Stack two parent gradients so they merge toward the center. */
function overlayGradientStyle(
  g0: NodeGradient,
  g1: NodeGradient,
  layer: number,
): Pick<
  CSSProperties,
  "backgroundColor" | "backgroundImage" | "backgroundBlendMode"
> {
  const c0 = gradientColorsAtLayer(g0, layer);
  const c1 = gradientColorsAtLayer(g1, layer);
  return {
    backgroundColor: c1.right,
    backgroundImage: [
      `linear-gradient(to right, ${c0.left} 0%, ${c0.right} 100%)`,
      `linear-gradient(to right, ${c1.left} 0%, ${c1.right} 100%)`,
    ].join(", "),
    backgroundBlendMode: "overlay",
  };
}

function buildNodeColorMaps(
  visibleNodes: ProofNode[],
  layer0: ProofNode[],
): NodeColorMaps {
  const starterIndexById = new Map<string, number>();
  layer0.forEach((s, i) => {
    starterIndexById.set(s.id, Math.min(i, StarterNodePalette.length - 1));
  });

  const byId = new Map(visibleNodes.map((n) => [n.id, n]));
  const gradientCache = new Map<string, NodeGradient>();
  const fallbackIdx = 0;

  function resolveNodeGradient(node: ProofNode): NodeGradient {
    const cached = gradientCache.get(node.id);
    if (cached) return cached;

    let gradient: NodeGradient;
    if (node.isStarter) {
      const idx = starterIndexById.get(node.id) ?? fallbackIdx;
      gradient = { leftIdx: idx, rightIdx: idx };
    } else {
      const parents = node.parents ?? [];
      if (parents.length >= 2) {
        const p0 = byId.get(parents[0].id) ?? parents[0];
        const p1 = byId.get(parents[1].id) ?? parents[1];
        const g0 = resolveNodeGradient(p0);
        const g1 = resolveNodeGradient(p1);
        gradient = { leftIdx: g0.leftIdx, rightIdx: g1.rightIdx };
      } else if (parents.length === 1) {
        const p = byId.get(parents[0].id) ?? parents[0];
        gradient = resolveNodeGradient(p);
      } else {
        gradient = { leftIdx: fallbackIdx, rightIdx: fallbackIdx };
      }
    }

    gradientCache.set(node.id, gradient);
    return gradient;
  }

  for (const n of visibleNodes) {
    resolveNodeGradient(n);
  }

  return {
    byId,
    nodeGradient: resolveNodeGradient,
  };
}

function getNodeBackgroundStyle(
  node: ProofNode,
  layer: number,
  maps: NodeColorMaps,
): Pick<
  CSSProperties,
  | "backgroundColor"
  | "backgroundImage"
  | "backgroundRepeat"
  | "backgroundSize"
  | "backgroundOrigin"
  | "backgroundClip"
  | "backgroundBlendMode"
> {
  const gradient = maps.nodeGradient(node);
  const parents = node.parents ?? [];

  if (parents.length >= 2) {
    const p0 = maps.byId.get(parents[0].id) ?? parents[0];
    const p1 = maps.byId.get(parents[1].id) ?? parents[1];
    const g0 = maps.nodeGradient(p0);
    const g1 = maps.nodeGradient(p1);

    if (isDualGradient(g0) || isDualGradient(g1)) {
      return { ...gradientFillBase, ...overlayGradientStyle(g0, g1, layer) };
    }
  }

  const { left, right } = gradientColorsAtLayer(gradient, layer);
  if (!isDualGradient(gradient)) {
    return {
      backgroundColor: left,
      backgroundImage: "none",
    };
  }

  return {
    ...gradientFillBase,
    ...simpleDualGradientStyle(left, right),
  };
}

function getNodeTextStyle(
  node: ProofNode,
  layer: number,
  maps: NodeColorMaps,
): Pick<CSSProperties, "color" | "textShadow"> {
  const { leftText, rightText } = gradientColorsAtLayer(
    maps.nodeGradient(node),
    layer,
  );
  if (leftText === rightText) {
    return { color: leftText };
  }
  return {
    color: Colors.white,
    textShadow: `0 0 3px ${Colors.black}, 0 1px 2px ${Colors.black}`,
  };
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

  const maxLayer = visibleNodes.reduce(
    (max, n) => Math.max(max, layerOf.get(n.id) ?? 0),
    0,
  );
  const layers = buildOrderedLayers(visibleNodes, layerOf, maxLayer);

  const starterOrderKey = layers[0]?.map((n) => n.id).join(",") ?? "";
  const colorMaps = useMemo(
    () => buildNodeColorMaps(visibleNodes, layers[0] ?? []),
    [visibleNodes, starterOrderKey],
  );

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
            {layerNodes.map((node) => {
              const layer = layerOf.get(node.id) ?? 0;
              const backgroundStyle = getNodeBackgroundStyle(
                node,
                layer,
                colorMaps,
              );
              const textStyle = getNodeTextStyle(node, layer, colorMaps);

              return (
              <button
                key={node.id}
                ref={setRef(node.id)}
                onClick={() => toggleSelected(node.id)}
                style={{
                  ...styles.nodeButton,
                  ...backgroundStyle,
                  ...textStyle,
                  ...(node.selected ? styles.selectedButton : {}),
                  ...(hoveredNodeId === node.id && !node.selected
                    ? styles.nodeButtonHover
                    : {}),
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {node.text}
              </button>
            );
            })}
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
    appearance: "none",
    transition: "transform 0.2s, box-shadow 0.2s, color 0.2s, filter 0.2s",
  },
  nodeButtonHover: {
    filter: "brightness(1.12)",
    transform: "translate(-2px, -2px)",
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
  selectedButton: {
    backgroundColor: Colors.white,
    backgroundImage: "none",
    backgroundBlendMode: "normal",
    color: Colors.black,
    textShadow: "none",
    transform: "translate(-2px, -2px)",
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
  solutionButton: {
    cursor: "default",
    backgroundColor: Colors.darkPink,
    color: Colors.black,
  },
  solutionReached: {
    backgroundColor: "#22c55e",
    color: "white",
  },
};
