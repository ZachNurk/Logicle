import type { CSSProperties, FormEvent } from "react";
import AuthSubmitButton from "../components/AuthSubmitButton";
import PasswordInput from "../components/PasswordInput";
import { Colors } from "../constants/theme";

type CreateAccountScreenProps = {
  email: string;
  password: string;
  createAccountError: string | null;
  isCreatingAccount: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBackToLogin: () => void;
  onCancel?: () => void;
};

export default function CreateAccountScreen({
  email,
  password,
  createAccountError,
  isCreatingAccount,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onBackToLogin,
  onCancel,
}: CreateAccountScreenProps) {
  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={onSubmit}>
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
        <h1 style={styles.title}>Create account</h1>
        <p style={styles.subtitle}>Set up a new Logicle account.</p>

        <label style={styles.inputLabel} htmlFor="create-email">
          Email
        </label>
        <input
          id="create-email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          style={styles.input}
          placeholder="you@example.com"
          required
        />

        <label style={styles.inputLabel} htmlFor="create-password">
          Password
        </label>
        <PasswordInput
          id="create-password"
          value={password}
          onChange={onPasswordChange}
          style={styles.input}
          placeholder="Choose a password"
          autoComplete="new-password"
          required
        />

        {createAccountError ? <div style={styles.errorText}>{createAccountError}</div> : null}

        <AuthSubmitButton
          isSubmitting={isCreatingAccount}
          idleText="Create Account"
          submittingText="Creating..."
        />
        <button type="button" style={styles.secondaryButton} onClick={onBackToLogin}>
          Back to Sign In
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    height: "100vh",
    overflowY: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: Colors.background,
    padding: "24px",
    boxSizing: "border-box",
  },
  card: {
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
  title: {
    margin: 0,
    fontSize: "38px",
    fontWeight: 700,
  },
  subtitle: {
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
  errorText: {
    color: "#b00020",
    fontSize: "15px",
    fontWeight: 600,
  },
  secondaryButton: {
    marginTop: "6px",
    height: "50px",
    border: "1px solid #bbb",
    borderRadius: "8px",
    background: Colors.surface1,
    color: "#111",
    fontSize: "17px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
