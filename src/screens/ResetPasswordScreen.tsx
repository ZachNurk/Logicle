import type { CSSProperties, FormEvent } from "react";
import AuthSubmitButton from "../components/AuthSubmitButton";
import PasswordInput from "../components/PasswordInput";
import { Colors } from "../constants/theme";

type ResetPasswordScreenProps = {
  otp: string;
  newPassword: string;
  confirmPassword: string;
  resetPasswordError: string | null;
  resetPasswordInfo: string | null;
  isResettingPassword: boolean;
  onOtpChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBackToLogin: () => void;
  onCancel?: () => void;
};

export default function ResetPasswordScreen({
  otp,
  newPassword,
  confirmPassword,
  resetPasswordError,
  resetPasswordInfo,
  isResettingPassword,
  onOtpChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBackToLogin,
  onCancel,
}: ResetPasswordScreenProps) {
  return (
    <div style={styles.resetPage}>
      <form style={styles.resetCard} noValidate onSubmit={onSubmit}>
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
        <h1 style={styles.resetTitle}>Reset password</h1>
        <p style={styles.resetSubtitle}>
          Enter the 6-digit code we emailed you and choose a new password.
        </p>

        <label style={styles.inputLabel} htmlFor="reset-otp">
          One-time code
        </label>
        <input
          id="reset-otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={otp}
          onChange={(e) => onOtpChange(e.target.value.replace(/[^0-9]/g, ""))}
          style={styles.input}
          placeholder="123456"
          required
        />

        <label style={styles.inputLabel} htmlFor="reset-new-password">
          New password
        </label>
        <PasswordInput
          id="reset-new-password"
          value={newPassword}
          onChange={onNewPasswordChange}
          style={styles.input}
          placeholder="Choose a new password"
          autoComplete="new-password"
          required
        />

        <label style={styles.inputLabel} htmlFor="reset-confirm-password">
          Confirm new password
        </label>
        <PasswordInput
          id="reset-confirm-password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          style={styles.input}
          placeholder="Re-enter new password"
          autoComplete="new-password"
          required
        />

        {resetPasswordInfo ? (
          <div style={styles.resetInfo}>{resetPasswordInfo}</div>
        ) : null}

        {resetPasswordError ? (
          <div style={styles.resetError}>{resetPasswordError}</div>
        ) : null}

        <AuthSubmitButton
          isSubmitting={isResettingPassword}
          idleText="Reset password"
          submittingText="Resetting..."
        />
        <button type="button" style={styles.secondaryButton} onClick={onBackToLogin}>
          Back to Sign In
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  resetPage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: Colors.background,
    padding: "24px",
  },
  resetCard: {
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
  resetTitle: {
    margin: 0,
    fontSize: "38px",
    fontWeight: 700,
  },
  resetSubtitle: {
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
  resetError: {
    color: "#b00020",
    fontSize: "15px",
    fontWeight: 600,
  },
  resetInfo: {
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
