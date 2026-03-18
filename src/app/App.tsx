/**
 * File handles the state of our app
 * Mostly UI Stuff
 * @file App.tsx
 */

import { useProofSession } from "../hooks/proof/useProofSession";
import type { CSSProperties } from "react";
import { useUserSession } from "../hooks/user/useUserSession";
import PuzzleScreen from "./PuzzleScreen";
import LoginScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";

/**
 * Main App
 * Program is split into two primary panels: ProofNodePanel (left) and AxiomPanel (right).
 */
export default function App() {
  const {
    authStatus,
    authView,
    email,
    password,
    isSigningIn,
    loginError,
    isCreatingAccount,
    createAccountError,
    currentUser,
    setEmail,
    setPassword,
    handleLoginSubmit,
    handleCreateAccountSubmit,
    showCreateAccount,
    showLogin,
    logout,
  } = useUserSession();

  const {
    nodes,
    solutionNode,
    isLoading,
    loadError,
    toggleSelectedProofNode,
    axioms,
    toggleSelectedAxiom,
    applyAxiom,
    victory,
    selectedSide,
    setSide,
  } = useProofSession(currentUser?.id ?? null);

  type Screen =
    | "loading"
    | "error"
    | "victory"
    | "puzzle"
    | "loginScreen"
    | "createAccountScreen";
  const getScreen = (): Screen => {
    if (isLoading) return "loading";
    if (loadError) return "error";
    if (victory) return "victory";
    if (authStatus === "loggedIn") return "puzzle";
    if (authStatus === "loggedOut" && authView === "createAccount") return "createAccountScreen";
    if (authStatus === "loggedOut") return "loginScreen";
    return "error";
  };
  const screen = getScreen();

  switch (screen) {
    case "loading":
      return <div style={styles.statusScreen}>Loading puzzle...</div>;
    case "error":
      return <div style={styles.statusScreen}>Failed to load puzzle: {loadError}</div>;
    case "victory":
      return <div style={styles.winScreen}>You won!</div>;
    case "puzzle":
      return (
        <PuzzleScreen
          nodes={nodes}
          solutionNode={solutionNode}
          toggleSelectedProofNode={toggleSelectedProofNode}
          axioms={axioms}
          toggleSelectedAxiom={toggleSelectedAxiom}
          applyAxiom={applyAxiom}
          selectedSide={selectedSide}
          setSide={setSide}
          logOut={logout}
        />
      );
    case "loginScreen":
      return (
        <LoginScreen
          email={email}
          password={password}
          loginError={loginError}
          isSigningIn={isSigningIn}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleLoginSubmit}
          onCreateAccountClick={showCreateAccount}
        />
      );
    case "createAccountScreen":
      return (
        <CreateAccountScreen
          email={email}
          password={password}
          createAccountError={createAccountError}
          isCreatingAccount={isCreatingAccount}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleCreateAccountSubmit}
          onBackToLogin={showLogin}
        />
      );
    default:
      return <div style={styles.statusScreen}>Something went wrong.</div>;
  }
}

const styles: Record<string, CSSProperties> = {
  winScreen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: 700,
  },
  statusScreen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: 600,
  },
};
