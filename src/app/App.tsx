/**
 * Root component — responsible only for routing between screens.
 * All state lives in useAppSession; access it via auth/progress/proof namespaces.
 * @file App.tsx
 */

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useAppSession } from "../hooks/useAppSession";
import PuzzleScreen from "../screens/PuzzleScreen";
import EndlessScreen from "../screens/EndlessScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import { Colors } from "../constants/theme";

export default function App() {
  const [gameMode, setGameMode] = useState<"daily" | "endless">("daily");
  const { auth, progress, proof } = useAppSession(gameMode);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLoggedOutMessage, setShowLoggedOutMessage] = useState(false);

  useEffect(() => {
    if (auth.authStatus === "loggedOut") setGameMode("daily");
  }, [auth.authStatus]);

  type Screen =
    | "loading"
    | "error"
    | "puzzle"
    | "loginScreen"
    | "createAccountScreen"
    | "resetPasswordScreen";

  const getScreen = (): Screen => {
    if (proof.isLoading) return "loading";
    if (proof.loadError) return "error";
    if (auth.authStatus === "loggedIn") return "puzzle";
    if (auth.authStatus === "loggedOut" && auth.authScreenRequested) {
      if (auth.authView === "createAccount") return "createAccountScreen";
      if (auth.authView === "resetPassword") return "resetPasswordScreen";
      return "loginScreen";
    }
    if (auth.authStatus === "loggedOut") return "puzzle";
    return "error";
  };

  const sharedGameProps = {
    nodes: proof.nodes,
    solutionNode: proof.solutionNode,
    toggleSelectedProofNode: proof.toggleSelectedProofNode,
    axioms: proof.axioms,
    toggleSelectedAxiom: proof.toggleSelectedAxiom,
    applyAxiom: proof.applyAxiom,
    selectedSide: proof.selectedSide,
    setSide: proof.setSide,
    onLogoutClick: () => setShowLogoutConfirm(true),
    currentUser: auth.currentUser,
    completedDayIds: progress.completedDayIds,
    deleteSelectedNode: proof.deleteSelectedNode,
    resetNodes: proof.resetNodes,
    invalidAxiomIds: proof.invalidAxiomIds,
  };
  const puzzleScreenProps = { ...sharedGameProps, victory: proof.victory };

  const renderScreen = () => {
    switch (getScreen()) {
      case "loading":
        return <div style={styles.statusScreen}>Loading puzzle...</div>;
      case "error":
        return <div style={styles.statusScreen}>Failed to load puzzle: {proof.loadError}</div>;
      case "puzzle":
        return gameMode === "endless" ? (
          <EndlessScreen
            {...sharedGameProps}
            solutionSteps={proof.endlessSolutionSteps}
            onBackToDaily={() => setGameMode("daily")}
            onSignIn={auth.showLogin}
          />
        ) : (
          <PuzzleScreen
            {...puzzleScreenProps}
            openHowToPlayOnLoad={auth.openHowToPlayOnLoad}
            onHowToPlayOnLoadConsumed={auth.clearHowToPlayOnLoad}
            onOpenEndless={() => setGameMode("endless")}
            onSignIn={auth.showLogin}
          />
        );
      case "loginScreen":
        return (
          <LoginScreen
            email={auth.email}
            password={auth.password}
            loginError={auth.loginError}
            forgotPasswordMessage={auth.forgotPasswordMessage}
            isSigningIn={auth.isSigningIn}
            isSendingForgotPassword={auth.isSendingForgotPassword}
            onEmailChange={auth.setEmail}
            onPasswordChange={auth.setPassword}
            onSubmit={auth.handleLoginSubmit}
            onForgotPasswordClick={auth.handleForgotPassword}
            onCreateAccountClick={auth.showCreateAccount}
            onCancel={auth.dismissAuthScreen}
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
            onCancel={auth.dismissAuthScreen}
          />
        );
      case "resetPasswordScreen":
        return (
          <ResetPasswordScreen
            otp={auth.otp}
            newPassword={auth.newPassword}
            confirmPassword={auth.confirmPassword}
            resetPasswordError={auth.resetPasswordError}
            resetPasswordInfo={auth.resetPasswordInfo}
            isResettingPassword={auth.isResettingPassword}
            onOtpChange={auth.setOtp}
            onNewPasswordChange={auth.setNewPassword}
            onConfirmPasswordChange={auth.setConfirmPassword}
            onSubmit={auth.handleResetPasswordSubmit}
            onBackToLogin={auth.showLogin}
            onCancel={auth.dismissAuthScreen}
          />
        );
      default:
        return <div style={styles.statusScreen}>Something went wrong.</div>;
    }
  };

  return (
    <>
      {renderScreen()}
      {showLogoutConfirm && (
        <div style={styles.overlay}>
          <div style={styles.confirmBox}>
            <h2 style={styles.confirmTitle}>Log out?</h2>
            <p style={styles.confirmLead}>Are you sure you want to log out?</p>
            <div style={styles.confirmActions}>
              <button
                type="button"
                style={styles.confirmCancelButton}
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                style={styles.confirmLogoutButton}
                onClick={() => {
                  setShowLogoutConfirm(false);
                  auth.logout();
                  setShowLoggedOutMessage(true);
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
      {showLoggedOutMessage && (
        <div style={styles.overlay}>
          <div style={styles.confirmBox}>
            <h2 style={styles.confirmTitle}>Successfully logged out</h2>
            <div style={styles.confirmActions}>
              <button
                type="button"
                style={styles.confirmLogoutButton}
                onClick={() => setShowLoggedOutMessage(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
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
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
    padding: "16px",
    boxSizing: "border-box",
  },
  confirmBox: {
    background: Colors.background,
    borderRadius: "16px",
    padding: "32px",
    minWidth: "320px",
    maxWidth: "480px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  confirmTitle: {
    margin: "0 0 12px 0",
    fontSize: "22px",
    fontWeight: 700,
  },
  confirmLead: {
    margin: "0 0 24px 0",
    fontSize: "15px",
    lineHeight: 1.5,
    color: "#333",
  },
  confirmActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  confirmCancelButton: {
    padding: "0.6em 1.4em",
    borderRadius: "4px",
    border: `1px solid ${Colors.black}`,
    background: "#fff",
    color: Colors.black,
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
  confirmLogoutButton: {
    padding: "0.6em 1.4em",
    borderRadius: "4px",
    border: `1px solid ${Colors.black}`,
    background: Colors.black,
    color: Colors.white,
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
