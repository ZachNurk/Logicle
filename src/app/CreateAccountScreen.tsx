import type { CSSProperties, FormEvent } from "react";
import AuthSubmitButton from "../components/AuthSubmitButton";

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
          type="email"
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
    background: "#f8f8f8",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fff",
    padding: "20px",
    boxSizing: "border-box",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
  },
  subtitle: {
    marginTop: "4px",
    marginBottom: "10px",
    color: "#555",
    fontSize: "14px",
  },
  inputLabel: {
    fontSize: "13px",
    fontWeight: 600,
  },
  input: {
    height: "40px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "0 10px",
    fontSize: "14px",
  },
  errorText: {
    color: "#b00020",
    fontSize: "13px",
    fontWeight: 600,
  },
  secondaryButton: {
    marginTop: "6px",
    height: "40px",
    border: "1px solid #bbb",
    borderRadius: "8px",
    background: "#fff",
    color: "#111",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
