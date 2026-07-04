import { useEffect, useMemo, useState } from "react";
import type { StudyTask } from "../../types/study";
import { loadTasks, saveTasks } from "../../utils/storage";
import Card from "../Card";
import Button from "../Button";

function DailyPlanner() {
  const today = new Date().toISOString().slice(0, 10);
  const [tasks, setTasks] = useState<StudyTask[]>(() => loadTasks());
  const [title, setTitle] = useState("");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const todayTasks = useMemo(() => tasks.filter((task) => task.date === today), [tasks, today]);

  function handleAddTask() {
    if (!title.trim()) return;

    const task: StudyTask = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      date: today,
    };

    setTasks((current) => [task, ...current]);
    setTitle("");
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Daily Planner</h3>
          <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">Plan your study focus for today.</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a study task"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
        <Button onClick={handleAddTask} variant="primary">
          Add Task
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {todayTasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm text-[var(--color-muted)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            No study tasks yet for today.
          </p>
        ) : (
          todayTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 dark:border-slate-700 dark:bg-slate-900">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className={task.completed ? "text-sm text-[var(--color-muted)] line-through dark:text-slate-400" : "text-sm text-[var(--color-text)] dark:text-slate-100"}>
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm font-medium text-[var(--color-danger)] transition hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

export default DailyPlanner;
