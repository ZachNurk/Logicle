import { useState } from "react";
import type { CSSProperties } from "react";

type PasswordInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  /** Style of the underlying input so it matches the surrounding form. */
  style?: CSSProperties;
  /** "current-password" for sign-in, "new-password" for create/reset. */
  autoComplete?: "current-password" | "new-password" | "off";
};

/**
 * Password field with a show/hide eye toggle.
 *
 * The toggle button lives inside a positioned wrapper, with the input taking
 * the full width and reserving right-side padding for the icon. We render the
 * icon inline as SVG so this component has no external icon dependency.
 */
export default function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  required,
  style,
  autoComplete,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.wrapper}>
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        style={{
          ...style,
          width: "100%",
          boxSizing: "border-box",
          paddingRight: "48px",
        }}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
        tabIndex={0}
        style={{
          ...styles.toggle,
          ...(hover ? styles.toggleHover : {}),
        }}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
  },
  toggle: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    height: "36px",
    width: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    color: "#555",
    cursor: "pointer",
    borderRadius: "6px",
    padding: 0,
    transition: "background-color 0.15s, color 0.15s",
  },
  toggleHover: {
    color: "#111",
    background: "rgba(0,0,0,0.06)",
  },
};
