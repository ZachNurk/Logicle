/**
 * Root component — responsible only for routing between screens.
 * All state lives in useAppSession; access it via auth/progress/proof namespaces.
 * @file App.tsx
 */

import type { CSSProperties } from "react";
import { useAppSession } from "../hooks/useAppSession";
import PuzzleScreen from "../screens/PuzzleScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";

export default function App() {
  const { auth, proof } = useAppSession();

  type Screen =
    | "loading"
    | "error"
    | "puzzle"
    | "loginScreen"
    | "createAccountScreen";

  const getScreen = (): Screen => {
    if (proof.isLoading) return "loading";
    if (proof.loadError) return "error";
    if (auth.authStatus === "loggedIn") return "puzzle";
    if (auth.authStatus === "loggedOut" && auth.authView === "createAccount") return "createAccountScreen";
    if (auth.authStatus === "loggedOut") return "loginScreen";
    return "error";
  };

  switch (getScreen()) {
    case "loading":
      return <div style={styles.statusScreen}>Loading puzzle...</div>;
    case "error":
      return <div style={styles.statusScreen}>Failed to load puzzle: {proof.loadError}</div>;
    case "puzzle":
      return (
        <PuzzleScreen
          nodes={proof.nodes}
          solutionNode={proof.solutionNode}
          toggleSelectedProofNode={proof.toggleSelectedProofNode}
          axioms={proof.axioms}
          toggleSelectedAxiom={proof.toggleSelectedAxiom}
          applyAxiom={proof.applyAxiom}
          selectedSide={proof.selectedSide}
          setSide={proof.setSide}
          logOut={auth.logout}
          currentUser={auth.currentUser}
          victory={proof.victory}
          deleteSelectedNode={proof.deleteSelectedNode}
          resetNodes={proof.resetNodes}
          invalidAxiomIds={proof.invalidAxiomIds}
          openHowToPlayAfterSignup={auth.openHowToPlayAfterSignup}
          onHowToPlayAfterSignupConsumed={auth.clearHowToPlayAfterSignup}
        />
      );
    case "loginScreen":
      return (
        <LoginScreen
          email={auth.email}
          password={auth.password}
          loginError={auth.loginError}
          isSigningIn={auth.isSigningIn}
          onEmailChange={auth.setEmail}
          onPasswordChange={auth.setPassword}
          onSubmit={auth.handleLoginSubmit}
          onCreateAccountClick={auth.showCreateAccount}
        />
      );
    case "createAccountScreen":
      return (
        <CreateAccountScreen
          email={auth.email}
          password={auth.password}
          createAccountError={auth.createAccountError}
          isCreatingAccount={auth.isCreatingAccount}
          onEmailChange={auth.setEmail}
          onPasswordChange={auth.setPassword}
          onSubmit={auth.handleCreateAccountSubmit}
          onBackToLogin={auth.showLogin}
        />
      );
    default:
      return <div style={styles.statusScreen}>Something went wrong.</div>;
  }
}

const styles: Record<string, CSSProperties> = {
  statusScreen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: 600,
  },
};
