import type { Subject } from "../../types/study";
import Card from "../Card";

type AttendanceInsightsProps = {
  subjects: Subject[];
};

function AttendanceInsights({ subjects }: AttendanceInsightsProps) {
  const subjectsWithAttendance = subjects
    .map((subject) => ({
      ...subject,
      attendance: subject.totalClasses === 0 ? 0 : Math.round((subject.attendedClasses / subject.totalClasses) * 100),
    }))
    .sort((a, b) => a.attendance - b.attendance);

  const lowAttendance = subjectsWithAttendance.filter((subject) => subject.attendance < 75);
  const safeAttendance = subjectsWithAttendance.filter((subject) => subject.attendance >= 75);
  const bestSubject = subjectsWithAttendance[subjectsWithAttendance.length - 1];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Attendance Insights</h3>
      <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-slate-300">Spot subjects that need attention and celebrate steady performers.</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-semibold text-[var(--color-text)] dark:text-slate-100">Needs attention</p>
          {lowAttendance.length === 0 ? (
            <p className="mt-2 text-sm text-[var(--color-muted)] dark:text-slate-300">Your attendance is looking healthy.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)] dark:text-slate-300">
              {lowAttendance.map((subject) => (
                <li key={subject.id} className="flex items-center justify-between rounded-lg bg-white/70 px-2 py-1 dark:bg-slate-800">
                  <span>{subject.name}</span>
                  <span className="font-semibold text-[var(--color-danger)]">{subject.attendance}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-semibold text-[var(--color-text)] dark:text-slate-100">Safe subjects</p>
          {safeAttendance.length === 0 ? (
            <p className="mt-2 text-sm text-[var(--color-muted)] dark:text-slate-300">Add subjects to start tracking attendance.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)] dark:text-slate-300">
              {safeAttendance.map((subject) => (
                <li key={subject.id} className="flex items-center justify-between rounded-lg bg-white/70 px-2 py-1 dark:bg-slate-800">
                  <span>{subject.name}</span>
                  <span className="font-semibold text-[var(--color-success)]">{subject.attendance}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm text-[var(--color-muted)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        <p className="font-semibold text-[var(--color-text)] dark:text-slate-100">Best subject</p>
        {bestSubject ? (
          <p className="mt-1">{bestSubject.name} is currently leading with {bestSubject.attendance}% attendance.</p>
        ) : (
          <p className="mt-1">Add a subject to unlock insights.</p>
        )}
      </div>
    </Card>
  );
}

export default AttendanceInsights;
