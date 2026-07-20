import Badge from "../components/Badge";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import SummaryCard from "../components/dashboard/SummaryCard";
import {
  formatLastUpdated,
  loadAssignments,
  loadExams,
  loadLastUpdated,
  loadSubjects,
  loadTasks,
} from "../utils/storage";

function formatDateLabel(value: string) {
  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatShortDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function Dashboard() {
  const subjects = loadSubjects();
  const assignments = loadAssignments();
  const exams = loadExams();
  const tasks = loadTasks();
  const lastUpdated = loadLastUpdated();

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  endOfWeek.setHours(23, 59, 59, 999);

  const totalSubjects = subjects.length;

  const totalClasses = subjects.reduce(
    (sum, subject) => sum + subject.totalClasses,
    0
  );

  const attendedClasses = subjects.reduce(
    (sum, subject) => sum + subject.attendedClasses,
    0
  );

  const attendance =
    totalClasses === 0
      ? 0
      : Math.round((attendedClasses / totalClasses) * 100);

  const totalAssignments = assignments.length;
  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "pending"
  );
  const completedAssignments = assignments.filter(
    (assignment) => assignment.status === "completed"
  );
  const overdueAssignments = assignments.filter((assignment) => {
    if (assignment.status === "completed") {
      return false;
    }

    return new Date(`${assignment.dueDate}T00:00:00`) < startOfToday;
  });

  const upcomingExams = exams
    .filter((exam) => new Date(`${exam.date}T00:00:00`) >= startOfToday)
    .sort((a, b) => new Date(`${a.date}T00:00:00`).getTime() - new Date(`${b.date}T00:00:00`).getTime());
  const nextExam = upcomingExams[0];
  const daysUntilNextExam = nextExam
    ? Math.ceil((new Date(`${nextExam.date}T00:00:00`).getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const todayTasks = tasks
    .filter((task) => task.date === todayKey && !task.completed)
    .sort((a, b) => a.title.localeCompare(b.title));

  const lowAttendanceSubjects = subjects
    .filter((subject) => subject.totalClasses > 0 && Math.round((subject.attendedClasses / subject.totalClasses) * 100) < 75)
    .sort((a, b) => {
      const attendanceA = Math.round((a.attendedClasses / a.totalClasses) * 100);
      const attendanceB = Math.round((b.attendedClasses / b.totalClasses) * 100);

      return attendanceA - attendanceB;
    });

  const pendingAssignmentsPreview = pendingAssignments
    .sort((a, b) => new Date(`${a.dueDate}T00:00:00`).getTime() - new Date(`${b.dueDate}T00:00:00`).getTime())
    .slice(0, 3);

  const upcomingExamsPreview = upcomingExams.slice(0, 3);

  const thisWeekItems = [
    ...pendingAssignments
      .filter((assignment) => {
        const dueDate = new Date(`${assignment.dueDate}T00:00:00`);
        return dueDate >= startOfToday && dueDate <= endOfWeek;
      })
      .map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        subtitle: assignment.subject,
        date: new Date(`${assignment.dueDate}T00:00:00`),
        type: "Assignment",
      })),
    ...upcomingExams
      .filter((exam) => {
        const examDate = new Date(`${exam.date}T00:00:00`);
        return examDate >= startOfToday && examDate <= endOfWeek;
      })
      .map((exam) => ({
        id: exam.id,
        title: exam.examName,
        subtitle: exam.subject,
        date: new Date(`${exam.date}T00:00:00`),
        type: "Exam",
      })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" />

      <section className="rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-600 via-green-600 to-blue-600 p-6 text-white shadow-lg dark:border-slate-700">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-50">Study overview</p>
            <h2 className="mt-2 text-2xl font-semibold">Your week is looking organized.</h2>
            <p className="mt-2 max-w-2xl text-sm text-emerald-50/90">
              Keep an eye on today&apos;s plan, upcoming deadlines, and subjects that need extra attention.
            </p>
            <p className="mt-4 text-sm text-emerald-100/90">
              Last updated: {formatLastUpdated(lastUpdated)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge text={`Today • ${new Intl.DateTimeFormat("en", { weekday: "long", month: "short", day: "numeric" }).format(today)}`} className="border-white/30 bg-white/15 text-white" />
            <Badge text={`${pendingAssignments.length} pending`} className="border-white/30 bg-white/15 text-white" />
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Subjects" value={totalSubjects.toString()} description="Registered subjects" accent="from-blue-500 to-blue-600" />
        <SummaryCard title="Attendance" value={`${attendance}%`} description="Overall attendance" accent="from-emerald-500 to-emerald-600" />
        <SummaryCard title="Classes" value={totalClasses.toString()} description="Total classes" accent="from-violet-500 to-violet-600" />
        <SummaryCard title="Attended" value={attendedClasses.toString()} description="Classes attended" accent="from-amber-500 to-orange-500" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Assignments" value={totalAssignments.toString()} description="Total assignments" accent="from-sky-500 to-cyan-600" />
        <SummaryCard title="Pending" value={pendingAssignments.length.toString()} description="Pending assignments" accent="from-amber-500 to-orange-500" />
        <SummaryCard title="Completed" value={completedAssignments.length.toString()} description="Completed assignments" accent="from-emerald-500 to-emerald-600" />
        <SummaryCard title="Overdue" value={overdueAssignments.length.toString()} description="Past-due assignments" accent="from-rose-500 to-red-600" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Upcoming Exams" value={upcomingExams.length.toString()} description="Scheduled exams" accent="from-fuchsia-500 to-pink-600" />
        <SummaryCard title="Next Exam" value={nextExam ? nextExam.examName : "None"} description="Closest upcoming exam" accent="from-indigo-500 to-indigo-600" />
        <SummaryCard title="Days Until Next Exam" value={daysUntilNextExam.toString()} description="Countdown" accent="from-teal-500 to-cyan-600" />
        <SummaryCard title="Exams Logged" value={exams.length.toString()} description="Total exams in record" accent="from-slate-600 to-slate-700" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Today&apos;s study plan</h3>
                <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">A focused preview of what matters most today.</p>
              </div>
              <Badge text="Today" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-200" />
            </div>

            <div className="mt-4 space-y-3">
              {todayTasks.length > 0 ? (
                todayTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-3 dark:border-slate-700 dark:bg-slate-800/80">
                    <div>
                      <p className="font-medium text-[var(--color-text)] dark:text-slate-100">{task.title}</p>
                      <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">Planned for today</p>
                    </div>
                    <Badge text="Focus" className="bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-200" />
                  </div>
                ))
              ) : (
                <EmptyState message="No study tasks are scheduled for today yet." />
              )}
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Upcoming this week</h3>
                <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">A compact look at deadlines and exams in the next seven days.</p>
              </div>
              <Badge text="This week" className="bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-200" />
            </div>

            <div className="mt-4 space-y-3">
              {thisWeekItems.length > 0 ? (
                thisWeekItems.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="flex items-start justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-3 dark:border-slate-700 dark:bg-slate-800/80">
                    <div>
                      <p className="font-medium text-[var(--color-text)] dark:text-slate-100">{item.title}</p>
                      <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">{item.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <Badge text={item.type} className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100" />
                      <p className="mt-2 text-sm text-[var(--color-muted)] dark:text-slate-300">{formatDateLabel(item.date.toISOString().slice(0, 10))}</p>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState message="Nothing is coming up in the next week." />
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Attendance warnings</h3>
                <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">Subjects that may need extra attention.</p>
              </div>
              <Badge text="Needs care" className="bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-200" />
            </div>

            <div className="mt-4 space-y-3">
              {lowAttendanceSubjects.length > 0 ? (
                lowAttendanceSubjects.map((subject) => {
                  const attendancePercent = Math.round((subject.attendedClasses / subject.totalClasses) * 100);

                  return (
                    <div key={subject.id} className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-[var(--color-text)] dark:text-slate-100">{subject.name}</p>
                          <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">{subject.attendedClasses}/{subject.totalClasses} classes attended</p>
                        </div>
                        <Badge text={`${attendancePercent}%`} className="bg-white text-amber-700 dark:bg-slate-800 dark:text-amber-200" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyState message="All subjects are on a healthy attendance track." />
              )}
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Pending assignments</h3>
                <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">The next tasks to complete.</p>
              </div>
              <Badge text="Priority" className="bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-200" />
            </div>

            <div className="mt-4 space-y-3">
              {pendingAssignmentsPreview.length > 0 ? (
                pendingAssignmentsPreview.map((assignment) => (
                  <div key={assignment.id} className="flex items-start justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-3 dark:border-slate-700 dark:bg-slate-800/80">
                    <div>
                      <p className="font-medium text-[var(--color-text)] dark:text-slate-100">{assignment.title}</p>
                      <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <Badge text={assignment.priority} className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100" />
                      <p className="mt-2 text-sm text-[var(--color-muted)] dark:text-slate-300">Due {formatDateLabel(assignment.dueDate)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState message="No assignments are currently pending." />
              )}
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-slate-100">Upcoming exams</h3>
                <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">The next exams on your calendar.</p>
              </div>
              <Badge text="Exam prep" className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/70 dark:text-fuchsia-200" />
            </div>

            <div className="mt-4 space-y-3">
              {upcomingExamsPreview.length > 0 ? (
                upcomingExamsPreview.map((exam) => (
                  <div key={exam.id} className="flex items-start justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-3 dark:border-slate-700 dark:bg-slate-800/80">
                    <div>
                      <p className="font-medium text-[var(--color-text)] dark:text-slate-100">{exam.examName}</p>
                      <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">{exam.subject}</p>
                    </div>
                    <div className="text-right">
                      <Badge text="Exam" className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/70 dark:text-fuchsia-200" />
                      <p className="mt-2 text-sm text-[var(--color-muted)] dark:text-slate-300">{formatShortDate(exam.date)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState message="No upcoming exams are scheduled." />
              )}
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)] dark:text-slate-100">Attendance overview</h2>
            <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">A clearer snapshot of subject-wise attendance performance.</p>
          </div>
          <Badge text="Live progress" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-200" />
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <AttendanceChart />
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;