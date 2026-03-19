import type { CSSProperties } from "react";
import type { AuthUser } from "../hooks/user/useAuth";

type StatsModalProps = {
  currentUser: AuthUser | null;
  onClose?: () => void;
  title?: string;
  onEndless?: () => void;
  onLogout?: () => void;
};

function getMonthDays(year: number, month: number): Date[] {
  const days: Date[] = [];
  const total = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= total; d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

function toDateKey(date: Date): string {
  return date.toLocaleDateString("en-CA"); // YYYY-MM-DD
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function StatsModal({ currentUser, onClose, title = "Your Stats", onEndless, onLogout }: StatsModalProps) {
  const now = new Date();
  const days = getMonthDays(now.getFullYear(), now.getMonth());
  const completedSet = new Set(currentUser?.completedDayIds ?? []);
  const today = toDateKey(now);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <button style={styles.closeButton} onClick={onClose}>✕</button>
        )}
        <h2 style={styles.title}>{title}</h2>

        <div style={styles.statRow}>
          <span style={styles.statLabel}>Puzzles completed</span>
          <span style={styles.statValue}>{currentUser?.completedDayIds?.length ?? 0}</span>
        </div>

        <p style={styles.monthLabel}>
          {MONTH_NAMES[now.getMonth()]} {now.getFullYear()}
        </p>

        <div style={styles.grid}>
          {days.map((day) => {
            const key = toDateKey(day);
            const completed = completedSet.has(key);
            const isToday = key === today;
            return (
              <div
                key={key}
                style={{
                  ...styles.dayCell,
                  ...(completed ? styles.dayCellCompleted : {}),
                  ...(isToday ? styles.dayCellToday : {}),
                }}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>

        {onEndless && (
          <button style={styles.endlessButton} onClick={onEndless}>
            Play Endless Mode
          </button>
        )}
        {onLogout && (
          <button style={styles.logoutButton} onClick={onLogout}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  box: {
    position: "relative",
    background: "#fff",
    borderRadius: "16px",
    padding: "32px",
    minWidth: "340px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  closeButton: {
    position: "absolute",
    top: "14px",
    right: "14px",
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
    color: "#555",
    lineHeight: 1,
  },
  title: {
    margin: "0 0 24px 0",
    fontSize: "20px",
    fontWeight: 700,
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    marginBottom: "20px",
  },
  statLabel: {
    fontSize: "15px",
    color: "#444",
  },
  statValue: {
    fontSize: "22px",
    fontWeight: 700,
  },
  monthLabel: {
    margin: "0 0 10px 0",
    fontSize: "13px",
    fontWeight: 600,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px",
  },
  dayCell: {
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 500,
    background: "#f0f0f0",
    color: "#333",
  },
  dayCellCompleted: {
    background: "#22c55e",
    color: "#fff",
    fontWeight: 700,
  },
  dayCellToday: {
    outline: "2px solid #333",
    outlineOffset: "-2px",
  },
  endlessButton: {
    marginTop: "20px",
    width: "100%",
    height: "42px",
    border: "none",
    borderRadius: "8px",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  logoutButton: {
    marginTop: "8px",
    width: "100%",
    height: "42px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fff",
    color: "#555",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
