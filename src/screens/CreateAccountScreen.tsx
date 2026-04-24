import type { CSSProperties, FormEvent } from "react";
import AuthSubmitButton from "../components/AuthSubmitButton";
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
}: CreateAccountScreenProps) {
  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={onSubmit}>
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
        <input
          id="create-password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          style={styles.input}
          placeholder="Choose a password"
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
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: Colors.background,
    padding: "24px",
  },
  card: {
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
