import { useCallback, useState } from "react";
import type { ProofNode } from "../../logic/ProofNode";
import { sameNode, createAndNode, ERROR_NODE, createNode } from "../../logic/ProofNode";
import { useProofNodes } from "./useProofNodes";
import { useAxioms } from "./useAxioms";

/**
 * Composes proof nodes + axioms state. Use this when you need to both read and
 * update both states (e.g. apply an axiom and add the result to givens).
 */
export function useProofSession() {
  const {
    nodes,
    solutionNode,
    setSolutionNode,
    toggleSelectedProofNode,
    addGivenNode,
  } = useProofNodes();
  const { axioms, setAxioms, toggleSelectedAxiom } = useAxioms();
  const [ victory, setVictory ] = useState(false)

  const applySelectedAxiom = useCallback(() => {
    const selectedAxiom = axioms.find((a) => a.selected);
    if (!selectedAxiom?.apply) return;

    const selectedNodes = nodes.filter((n) => n.selected);

    let side = "left" //TODO replace this with functionality to specify side!!!
    let addition = createNode("DUMMY",false,undefined,false) //TODO replace this with functionality to specify node!!!
    let connective: "or" | "and" = "or"; // for testing; panel can set later

    let result: ProofNode | undefined;

    const applyFn = selectedAxiom.apply;

    let prem: ProofNode | undefined = undefined

    if (selectedNodes.length > 2) {
      return;
    } else if (selectedNodes.length == 2) {
      // good, we have two nodes
      const [left, right] = selectedNodes;
      prem = createAndNode(`${left.text} ∧ ${right.text}`, false, left, right);
      
    } else if (selectedNodes.length == 1) {
     
      prem = selectedNodes[0]
    }

    if (!prem) {
      throw new Error("Prem error!")
    }
    
    switch (selectedAxiom.applyType) {
      case "1":
        result = (applyFn as (premises: ProofNode, selected: ProofNode[]) => ProofNode)(prem, selectedNodes);
        break;
      case "2":
        result = (applyFn as (premises: ProofNode, side: string) => ProofNode)(prem, side);
        break;
      case "3":
        result = (applyFn as (original: ProofNode, addition: ProofNode) => ProofNode)(prem, addition);
        break;
      case "4":
        result = (applyFn as (original: ProofNode) => ProofNode)(prem);
        break;
      case "5":
        result = (applyFn as (premises: ProofNode, selected: ProofNode[], connective: "or" | "and") => ProofNode)(
          prem,
          selectedNodes,
          connective
        );
        break;
      default:
        result = undefined;
    }

    
    if (!result) {
      throw new Error("Invalid result!!!")
    }



    if (sameNode(result, ERROR_NODE)) {
      alert("Invalid operation")
    }

    if (sameNode(result, solutionNode)) {
      alert("You won!")
      setVictory(true)
      //TODO make it connect to the solution node at the bottom? or maybe some other UI?
      //TODO also make a nice you won screen?
    }

    // Don't add if we already have an equivalent node (sameNode handles And/Or commutativity).
    if (nodes.some((n) => sameNode(n, result))) {
      // deselect axiom
      setAxioms((prev) =>
        prev.map((a) => (a.id === selectedAxiom.id ? { ...a, selected: false } : a)),
      );
      alert("Duplicate node!")
      return;
    }

    addGivenNode(result);
    setAxioms((prev) =>
      prev.map((a) => (a.id === selectedAxiom.id ? { ...a, selected: false } : a)),
    );
  }, [axioms, nodes, addGivenNode, setAxioms]);

  return {
    nodes,
    solutionNode,
    setSolutionNode,
    toggleSelectedProofNode,
    addGivenNode,
    axioms,
    toggleSelectedAxiom,
    setAxioms,
    applySelectedAxiom,
    victory,
  };
}
