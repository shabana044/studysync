import { useEffect, useState } from "react";
import type { Goal } from "../../types/study";
import { loadGoals, saveGoals } from "../../utils/storage";
import Card from "../Card";
import Button from "../Button";

function GoalsPanel() {
  const [goals, setGoals] = useState<Goal[]>(() => loadGoals());
  const [title, setTitle] = useState("");

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  function addGoal() {
    if (!title.trim()) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setGoals((current) => [goal, ...current]);
    setTitle("");
  }

  function toggleGoal(id: string) {
    setGoals((current) =>
      current.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal))
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Goals & Streaks</h3>
          <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">Track personal goals and keep your streak alive.</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a goal"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
        <Button onClick={addGoal} variant="success">
          Add Goal
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {goals.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm text-[var(--color-muted)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            No goals yet. Add one to build momentum.
          </p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 dark:border-slate-700 dark:bg-slate-900">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal(goal.id)}
                  className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className={goal.completed ? "text-sm text-[var(--color-muted)] line-through dark:text-slate-400" : "text-sm text-[var(--color-text)] dark:text-slate-100"}>
                  {goal.title}
                </span>
              </label>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

export default GoalsPanel;
