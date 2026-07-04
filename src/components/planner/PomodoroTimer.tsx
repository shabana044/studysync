import { useEffect, useMemo, useState } from "react";
import Card from "../Card";
import Button from "../Button";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

type Mode = "focus" | "break";

function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setIsRunning(false);
          const nextMode = mode === "focus" ? "break" : "focus";
          setMode(nextMode);
          return nextMode === "focus" ? FOCUS_TIME : BREAK_TIME;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, mode]);

  const minutes = useMemo(() => Math.floor(secondsLeft / 60).toString().padStart(2, "0"), [secondsLeft]);
  const seconds = useMemo(() => (secondsLeft % 60).toString().padStart(2, "0"), [secondsLeft]);

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
  }

  function toggleTimer() {
    setIsRunning((current) => !current);
  }

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Pomodoro Timer</h3>
          <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">Stay focused with short breaks.</p>
        </div>
        <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-[var(--color-primary)] dark:bg-slate-800">
          {mode === "focus" ? "Focus" : "Break"}
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-6xl font-semibold tracking-[0.2em] text-[var(--color-text)] dark:text-slate-100">
          {minutes}:{seconds}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={toggleTimer} variant="primary">
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} variant="secondary">
          Reset
        </Button>
      </div>
    </Card>
  );
}

export default PomodoroTimer;
