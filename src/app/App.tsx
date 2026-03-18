/**
 * File handles the state of our app
 * Mostly UI Stuff
 * @file App.tsx
 */

import { useProofSession } from "../hooks/useProofSession";
import type { CSSProperties, FormEvent } from "react";
import PuzzleScreen from "./PuzzleScreen";
import LoginScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import { useState } from "react";

/**
 * Main App
 * Program is split into two primary panels: ProofNodePanel (left) and AxiomPanel (right).
 */
export default function App() {
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
  } = useProofSession();

  type AuthStatus = "loading" | "loggedOut" | "loggedIn";
  type AuthView = "login" | "createAccount";
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loggedOut");
  const [authView, setAuthView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [createAccountError, setCreateAccountError] = useState<string | null>(null);

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

  /**
 * Handles login form submission.
 * Prevents default form reload, sends email/password to POST /api/login,
 * updates auth state on success, and surfaces any API/network errors to the UI.
 * @param _e is the form event, which does nothing here
 */
  const handleLoginSubmit = async (_e: FormEvent<HTMLFormElement>) => {
    _e.preventDefault();
    setLoginError(null);
    setIsSigningIn(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // check for error
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Sign in failed");
      }

      setAuthStatus("loggedIn");
      setLoginError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign in failed";
      setLoginError(message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleCreateAccountSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateAccountError(null);
    setIsCreatingAccount(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Create account failed");
      }

      setAuthStatus("loggedIn");
      setAuthView("login");
      setCreateAccountError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Create account failed";
      setCreateAccountError(message);
    } finally {
      setIsCreatingAccount(false);
    }
  };

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
          onCreateAccountClick={() => {
            setLoginError(null);
            setCreateAccountError(null);
            setAuthView("createAccount");
          }}
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
          onBackToLogin={() => {
            setCreateAccountError(null);
            setAuthView("login");
          }}
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
