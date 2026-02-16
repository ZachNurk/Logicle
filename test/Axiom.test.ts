import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { modusPonens } from "../src/logic/Axiom";
import { createNode, sameNode } from "../src/logic/ProofNode";
import { createImplicationNode } from "../src/logic/ProofNode";

import type { ProofNode } from "../src/logic/ProofNode";
import type { ImplicationNode } from "../src/logic/ProofNode";



it("Modus Ponens: P and (P -> Q) yields Q", () => {
    const P: ProofNode = createNode("P","P",true,undefined);
    const Q: ProofNode = createNode("Q","Q",true,undefined);
    const PImpliesQ: ImplicationNode = createImplicationNode("Q","Q",true,P, Q);

    

    expect(sameNode(modusPonens(P,PImpliesQ),Q)).toBe(true)
});

