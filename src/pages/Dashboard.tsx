import PageHeader from "../components/PageHeader";
import SummaryCard from "../components/dashboard/SummaryCard";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import { loadAssignments, loadExams, loadSubjects } from "../utils/storage";

function Dashboard() {
  const subjects = loadSubjects();
  const assignments = loadAssignments();
  const exams = loadExams();

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
  ).length;
  const completedAssignments = assignments.filter(
    (assignment) => assignment.status === "completed"
  ).length;
  const overdueAssignments = assignments.filter((assignment) => {
    if (assignment.status === "completed") {
      return false;
    }

    return new Date(assignment.dueDate) < new Date();
  }).length;

  const upcomingExams = exams.filter((exam) => new Date(exam.date) >= new Date()).length;
  const nextExam = exams
    .filter((exam) => new Date(exam.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  const daysUntilNextExam = nextExam
    ? Math.ceil((new Date(nextExam.date).getTime() - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" />

      <section className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-6 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Study overview</p>
        <h2 className="mt-2 text-2xl font-semibold">You are keeping everything on track.</h2>
        <p className="mt-2 max-w-2xl text-sm text-blue-50/90">
          Review your subjects, assignments, and exams in one polished workspace.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Subjects"
          value={totalSubjects.toString()}
          description="Registered subjects"
          accent="from-blue-500 to-blue-600"
        />

        <SummaryCard
          title="Attendance"
          value={`${attendance}%`}
          description="Overall attendance"
          accent="from-emerald-500 to-emerald-600"
        />

        <SummaryCard
          title="Classes"
          value={totalClasses.toString()}
          description="Total classes"
          accent="from-violet-500 to-violet-600"
        />

        <SummaryCard
          title="Attended"
          value={attendedClasses.toString()}
          description="Classes attended"
          accent="from-amber-500 to-orange-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Assignments"
          value={totalAssignments.toString()}
          description="Total assignments"
          accent="from-sky-500 to-cyan-600"
        />

        <SummaryCard
          title="Pending"
          value={pendingAssignments.toString()}
          description="Pending assignments"
          accent="from-amber-500 to-orange-500"
        />

        <SummaryCard
          title="Completed"
          value={completedAssignments.toString()}
          description="Completed assignments"
          accent="from-emerald-500 to-emerald-600"
        />

        <SummaryCard
          title="Overdue"
          value={overdueAssignments.toString()}
          description="Past-due assignments"
          accent="from-rose-500 to-red-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Upcoming Exams"
          value={upcomingExams.toString()}
          description="Scheduled exams"
          accent="from-fuchsia-500 to-pink-600"
        />

        <SummaryCard
          title="Next Exam"
          value={nextExam ? nextExam.examName : "None"}
          description="Closest upcoming exam"
          accent="from-indigo-500 to-indigo-600"
        />

        <SummaryCard
          title="Days Until Next Exam"
          value={daysUntilNextExam.toString()}
          description="Countdown"
          accent="from-teal-500 to-cyan-600"
        />

        <SummaryCard
          title="Exams Logged"
          value={exams.length.toString()}
          description="Total exams in record"
          accent="from-slate-600 to-slate-700"
        />
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Attendance Overview</h2>
            <p className="text-sm text-slate-600">A quick view of how each subject is performing.</p>
          </div>
        </div>

        <AttendanceChart />
      </div>
    </div>
  );
}

export default Dashboard;