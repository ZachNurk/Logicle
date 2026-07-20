import type { CSSProperties, FormEvent } from "react";
import AuthSubmitButton from "../components/AuthSubmitButton";
import PasswordInput from "../components/PasswordInput";
import { Colors } from "../constants/theme";

type LoginScreenProps = {
  email: string;
  password: string;
  loginError: string | null;
  forgotPasswordMessage: string | null;
  isSigningIn: boolean;
  isSendingForgotPassword: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onForgotPasswordClick: () => void;
  onCreateAccountClick: () => void;
  onCancel?: () => void;
};

export default function LoginScreen({
  email,
  password,
  loginError,
  forgotPasswordMessage,
  isSigningIn,
  isSendingForgotPassword,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPasswordClick,
  onCreateAccountClick,
  onCancel,
}: LoginScreenProps) {
  return (
    <div style={styles.loginPage}>
      <form style={styles.loginCard} noValidate onSubmit={onSubmit}>
        {onCancel ? (
          <button
            type="button"
            style={styles.closeButton}
            onClick={onCancel}
            aria-label="Back to puzzle"
          >
            ×
          </button>
        ) : null}
        <h1 style={styles.loginTitle}>Logicle</h1>
        <p style={styles.loginSubtitle}>Sign in to start your puzzle.</p>

        <label style={styles.inputLabel} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          style={styles.input}
          placeholder="you@example.com"
          required
        />

        <label style={styles.inputLabel} htmlFor="password">
          Password
        </label>
        <PasswordInput
          id="password"
          value={password}
          onChange={onPasswordChange}
          style={styles.input}
          placeholder="********"
          autoComplete="current-password"
          required
        />

        <button
          type="button"
          style={{
            ...styles.forgotPasswordButton,
            ...(isSendingForgotPassword ? { opacity: 0.65, cursor: "not-allowed" } : {}),
          }}
          onClick={onForgotPasswordClick}
          disabled={isSendingForgotPassword}
        >
          {isSendingForgotPassword ? "Sending…" : "Forgot password?"}
        </button>

        {forgotPasswordMessage ? (
          <div style={styles.forgotPasswordSuccess}>{forgotPasswordMessage}</div>
        ) : null}

        {loginError ? <div style={styles.loginError}>{loginError}</div> : null}

        <AuthSubmitButton
          isSubmitting={isSigningIn}
          idleText="Sign In"
          submittingText="Signing in..."
        />
        <button type="button" style={styles.secondaryButton} onClick={onCreateAccountClick}>
          Create Account
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  loginPage: {
    height: "100vh",
    overflowY: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: Colors.background,
    padding: "24px",
    boxSizing: "border-box",
  },
  loginCard: {
    position: "relative",
    width: "100%",
    maxWidth: "460px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    border: "1px solid #ddd",
    borderRadius: "16px",
    background: Colors.surface1,
    padding: "32px",
    boxSizing: "border-box",
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    color: "#666",
    fontSize: "24px",
    lineHeight: 1,
    cursor: "pointer",
    borderRadius: "50%",
  },
  loginTitle: {
    margin: 0,
    fontSize: "38px",
    fontWeight: 700,
  },
  loginSubtitle: {
    marginTop: "4px",
    marginBottom: "14px",
    color: "#555",
    fontSize: "17px",
  },
  inputLabel: {
    fontSize: "16px",
    fontWeight: 600,
  },
  input: {
    height: "52px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "0 14px",
    fontSize: "17px",
  },
  loginError: {
    color: "#b00020",
    fontSize: "15px",
    fontWeight: 600,
  },
  forgotPasswordButton: {
    alignSelf: "flex-start",
    marginTop: "4px",
    padding: 0,
    border: "none",
    background: "transparent",
    color: "#2563eb",
    fontSize: "15px",
    fontWeight: 500,
    textDecoration: "underline",
    cursor: "pointer",
  },
  forgotPasswordSuccess: {
    color: "#0d7a3e",
    fontSize: "15px",
    fontWeight: 600,
  },
  secondaryButton: {
    marginTop: "6px",
    border: "none",
    background: "transparent",
    color: "#333",
    fontSize: "16px",
    fontWeight: 500,
    textDecoration: "underline",
    cursor: "pointer",
  },
};
