import type { CSSProperties, FormEvent } from "react";
import AuthSubmitButton from "../components/AuthSubmitButton";

type LoginScreenProps = {
  email: string;
  password: string;
  loginError: string | null;
  isSigningIn: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCreateAccountClick: () => void;
};

export default function LoginScreen({
  email,
  password,
  loginError,
  isSigningIn,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onCreateAccountClick,
}: LoginScreenProps) {
  return (
    <div style={styles.loginPage}>
      <form style={styles.loginCard} onSubmit={onSubmit}>
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
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          style={styles.input}
          placeholder="********"
          required
        />

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
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8f8f8",
    padding: "24px",
  },
  loginCard: {
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
  loginTitle: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
  },
  loginSubtitle: {
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
  loginError: {
    color: "#b00020",
    fontSize: "13px",
    fontWeight: 600,
  },
  secondaryButton: {
    marginTop: "6px",
    border: "none",
    background: "transparent",
    color: "#333",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "underline",
    cursor: "pointer",
  },
};
