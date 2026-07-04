import type { Assignment, Exam } from "../../types/study";
import Card from "../Card";

type CalendarViewProps = {
  assignments: Assignment[];
  exams: Exam[];
};

function CalendarView({ assignments, exams }: CalendarViewProps) {
  const today = new Date();
  const monthLabel = today.toLocaleString("default", { month: "long", year: "numeric" });

  const events = [...assignments, ...exams].map((item) => ({
    ...item,
    date: "dueDate" in item ? item.dueDate : item.date,
    label: "examName" in item ? item.examName : item.title,
    kind: "examName" in item ? "exam" : "assignment",
  }));

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Study Calendar</h3>
          <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">See important deadlines at a glance.</p>
        </div>
        <span className="rounded-full bg-[var(--color-bg)] px-3 py-1 text-sm font-medium text-[var(--color-primary)] dark:bg-slate-900">
          {monthLabel}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {events.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm text-[var(--color-muted)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            No assignments or exams are currently scheduled.
          </p>
        ) : (
          events.map((event) => {
            const eventDate = new Date(event.date);
            const isToday = eventDate.toDateString() === today.toDateString();

            return (
              <div key={`${event.kind}-${event.id}`} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 dark:border-slate-700 dark:bg-slate-900">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)] dark:text-slate-100">{event.label}</p>
                  <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">{eventDate.toLocaleDateString()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isToday ? "bg-[var(--color-primary)] text-white" : "bg-white text-[var(--color-primary)] dark:bg-slate-800 dark:text-slate-100"}`}>
                  {event.kind}
                </span>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

export default CalendarView;
