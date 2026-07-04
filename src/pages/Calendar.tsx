import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { loadAssignments, loadExams } from "../utils/storage";
import type { Assignment, Exam } from "../types/study";

type DayItem =
  | { kind: "assignment"; item: Assignment }
  | { kind: "exam"; item: Exam };

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonthLabel(date: Date) {
  return date.toLocaleDateString("en", { month: "long", year: "numeric" });
}

function CalendarPage() {
  const assignments = loadAssignments();
  const exams = loadExams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const firstDay = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const calendarDays = useMemo(() => {
    const days: Array<{ date: Date; inCurrentMonth: boolean }> = [];

    for (let index = 0; index < firstDay; index += 1) {
      const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), index - firstDay + 1);
      days.push({ date: previousMonthDate, inCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      days.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day), inCurrentMonth: true });
    }

    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remainingCells; day += 1) {
      days.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day), inCurrentMonth: false });
    }

    return days;
  }, [currentDate, daysInMonth, firstDay]);

  const selectedKey = toDateKey(selectedDate);
  const selectedItems = useMemo(() => {
    const items: DayItem[] = [];

    assignments.forEach((assignment) => {
      if (assignment.dueDate === selectedKey) {
        items.push({ kind: "assignment", item: assignment });
      }
    });

    exams.forEach((exam) => {
      if (exam.date === selectedKey) {
        items.push({ kind: "exam", item: exam });
      }
    });

    return items;
  }, [assignments, exams, selectedKey]);

  function changeMonth(direction: number) {
    setCurrentDate((value) => new Date(value.getFullYear(), value.getMonth() + direction, 1));
  }

  function handleSelectDate(date: Date) {
    setSelectedDate(date);
    setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Calendar" />

      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)] dark:text-slate-100">{formatMonthLabel(currentDate)}</h2>
            <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">Track assignments and exams across the month.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => changeMonth(-1)}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-bg)]"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-bg)]"
            >
              Today
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-bg)]"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] dark:text-slate-300">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const dayKey = toDateKey(day.date);
            const hasAssignment = assignments.some((assignment) => assignment.dueDate === dayKey);
            const hasExam = exams.some((exam) => exam.date === dayKey);
            const isToday = dayKey === toDateKey(new Date());
            const isSelected = dayKey === selectedKey;
            const isCurrentMonth = day.inCurrentMonth;

            return (
              <button
                key={`${dayKey}-${index}`}
                onClick={() => handleSelectDate(day.date)}
                className={`min-h-[92px] rounded-xl border p-2 text-left transition ${
                  isCurrentMonth
                    ? "border-[var(--color-border)] bg-[var(--color-surface)] dark:border-slate-700 dark:bg-slate-800"
                    : "border-transparent bg-[var(--color-bg)] text-[var(--color-muted)] dark:bg-slate-900 dark:text-slate-400"
                } ${isSelected ? "ring-2 ring-[var(--color-primary)]" : ""} ${isToday ? "shadow-inner" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${isToday ? "text-[var(--color-primary)]" : "text-[var(--color-text)] dark:text-slate-100"}`}>
                    {day.date.getDate()}
                  </span>
                  {isToday ? <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" /> : null}
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {hasAssignment ? <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" /> : null}
                  {hasExam ? <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" /> : null}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">{selectedDate.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</h3>
            <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">Items scheduled for this date.</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {selectedItems.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm text-[var(--color-muted)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              No assignments or exams for this day.
            </p>
          ) : (
            selectedItems.map((item, index) => (
              <div key={`${item.kind}-${index}`} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 dark:border-slate-700 dark:bg-slate-900">
                {item.kind === "assignment" ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[var(--color-text)] dark:text-slate-100">{item.item.title}</p>
                      <span className="rounded-full bg-[var(--color-success)]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-success)]">
                        Assignment
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-muted)]">Subject: {item.item.subject}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
                      <span>Priority: {item.item.priority}</span>
                      <span>Status: {item.item.status}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[var(--color-text)] dark:text-slate-100">{item.item.examName}</p>
                      <span className="rounded-full bg-[var(--color-secondary)]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                        Exam
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-muted)]">Subject: {item.item.subject}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
                      <span>Time: {item.item.time}</span>
                      <span>Location: {item.item.location}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

export default CalendarPage;
