import type { CSSProperties } from "react";

type AuthSubmitButtonProps = {
  isSubmitting: boolean;
  idleText: string;
  submittingText: string;
  disabled?: boolean;
};

export default function AuthSubmitButton({
  isSubmitting,
  idleText,
  submittingText,
  disabled = false,
}: AuthSubmitButtonProps) {
  return (
    <button type="submit" style={styles.button} disabled={isSubmitting || disabled}>
      {isSubmitting ? submittingText : idleText}
    </button>
  );
}

const styles: Record<string, CSSProperties> = {
  button: {
    marginTop: "8px",
    height: "42px",
    border: "none",
    borderRadius: "8px",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
