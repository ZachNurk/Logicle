import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import type { AuthUser } from "../hooks/user/useAuth";
import { Colors } from "../constants/theme";
import { formatLocalDateKey, normalizeDayId } from "../utils/dateKeys";

type StatsModalProps = {
  currentUser: AuthUser | null;
  /**
   * Prefer passing this from `useUserProgress` so the calendar updates as soon as
   * a day is marked complete; `currentUser.completedDayIds` can lag until refresh.
   */
  completedDayIds?: string[];
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

const MIN_STATS_YEAR = 2025;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function StatsModal({
  currentUser,
  completedDayIds: completedDayIdsProp,
  onClose,
  title = "Your Stats",
  onEndless,
  onLogout,
}: StatsModalProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const [viewYear, setViewYear] = useState(() =>
    Math.max(MIN_STATS_YEAR, currentYear),
  );
  const completedDayIds =
    completedDayIdsProp ?? currentUser?.completedDayIds ?? [];
  const completedSet = useMemo(
    () => new Set(completedDayIds.map(normalizeDayId)),
    [completedDayIds],
  );
  const today = formatLocalDateKey(now);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <button type="button" style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        )}
        <h2 style={styles.title}>{title}</h2>

        <div style={styles.statRow}>
          <span style={styles.statLabel}>Puzzles completed</span>
          <span style={styles.statValue}>
            {completedDayIds.length}
          </span>
        </div>

        <div style={styles.yearNavRow}>
          <div style={styles.yearNavSideLeft}>
            {viewYear > MIN_STATS_YEAR ? (
              <button
                type="button"
                style={styles.yearNavArrow}
                onClick={() =>
                  setViewYear((y) => Math.max(MIN_STATS_YEAR, y - 1))
                }
                aria-label="Previous year"
              >
                ←
              </button>
            ) : null}
          </div>
          <span style={styles.yearNavYear}>{viewYear}</span>
          <div style={styles.yearNavSideRight}>
            {viewYear < currentYear ? (
              <button
                type="button"
                style={styles.yearNavArrow}
                onClick={() => setViewYear((y) => Math.min(y + 1, currentYear))}
                aria-label="Next year"
              >
                →
              </button>
            ) : null}
          </div>
        </div>

        <div style={styles.twelveMonthScroll}>
          <div style={styles.twelveMonthGrid}>
          {MONTH_NAMES.map((name, m) => {
            const days = getMonthDays(viewYear, m);
            const isCurrentMonth =
              viewYear === currentYear && m === currentMonth;
            return (
              <div
                key={`${viewYear}-${name}`}
                style={{
                  ...styles.miniMonthCard,
                  ...(isCurrentMonth ? styles.miniMonthCardCurrent : {}),
                }}
              >
                <div style={styles.miniMonthTitle}>{name}</div>
                <div style={styles.miniMonthGrid}>
                  {days.map((day) => {
                    const key = formatLocalDateKey(day);
                    const completed = completedSet.has(normalizeDayId(key));
                    const isToday = key === today;
                    return (
                      <div
                        key={key}
                        style={{
                          ...styles.miniDayCell,
                          ...(completed ? styles.miniDayCellCompleted : {}),
                          ...(isToday ? styles.miniDayCellToday : {}),
                        }}
                      >
                        {day.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {onEndless && (
          <button type="button" style={styles.endlessButton} onClick={onEndless}>
            Play Endless Mode
          </button>
        )}
        {onLogout && (
          <button type="button" style={styles.logoutButton} onClick={onLogout}>
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
    padding: "16px",
    boxSizing: "border-box",
  },
  box: {
    position: "relative",
    background: Colors.background,
    borderRadius: "16px",
    padding: "28px 28px 32px",
    maxWidth: "980px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    boxSizing: "border-box",
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
    margin: "0 0 20px 0",
    fontSize: "20px",
    fontWeight: 700,
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    marginBottom: "16px",
  },
  statLabel: {
    fontSize: "15px",
    color: "#444",
  },
  statValue: {
    fontSize: "22px",
    fontWeight: 700,
  },
  yearNavRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px",
    minHeight: "40px",
  },
  yearNavSideLeft: {
    flex: "1 1 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  yearNavSideRight: {
    flex: "1 1 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  yearNavArrow: {
    width: "40px",
    height: "40px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: Colors.surface1,
    fontSize: "18px",
    lineHeight: 1,
    cursor: "pointer",
    color: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  yearNavYear: {
    flex: "0 0 auto",
    fontSize: "16px",
    fontWeight: 700,
    color: "#333",
    minWidth: "64px",
    textAlign: "center",
  },
  twelveMonthScroll: {
    width: "100%",
    overflowX: "auto",
    paddingBottom: "4px",
  },
  twelveMonthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "14px 16px",
    alignItems: "start",
    minWidth: "720px",
  },
  miniMonthCard: {
    background: Colors.surface1,
    border: "1px solid #d8d4ce",
    borderRadius: "8px",
    padding: "10px 10px 12px",
    minWidth: 0,
  },
  miniMonthCardCurrent: {
    borderColor: "#111",
    boxShadow: "0 0 0 1px #111",
  },
  miniMonthTitle: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#333",
    marginBottom: "8px",
    letterSpacing: "0.02em",
  },
  miniMonthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    gap: "4px",
  },
  miniDayCell: {
    aspectRatio: "1",
    minHeight: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2px",
    fontSize: "10px",
    fontWeight: 600,
    background: Colors.surface2,
    color: "#333",
    border: "1px solid #c8c4be",
    boxSizing: "border-box",
  },
  miniDayCellCompleted: {
    background: "#22c55e",
    color: "#fff",
    borderColor: "#16a34a",
  },
  miniDayCellToday: {
    outline: "2px solid #111",
    outlineOffset: "-1px",
  },
  endlessButton: {
    marginTop: "24px",
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
    background: Colors.surface1,
    color: "#555",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
