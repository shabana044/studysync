import PageHeader from "../components/PageHeader";
import SummaryCard from "../components/dashboard/SummaryCard";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import { loadAssignments, loadSubjects } from "../utils/storage";

function Dashboard() {
  const subjects = loadSubjects();
  const assignments = loadAssignments();

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

  return (
    <div>
      <PageHeader title="Dashboard" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Subjects"
          value={totalSubjects.toString()}
          description="Registered subjects"
        />

        <SummaryCard
          title="Attendance"
          value={`${attendance}%`}
          description="Overall attendance"
        />

        <SummaryCard
          title="Classes"
          value={totalClasses.toString()}
          description="Total classes"
        />

        <SummaryCard
          title="Attended"
          value={attendedClasses.toString()}
          description="Classes attended"
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Assignments"
          value={totalAssignments.toString()}
          description="Total assignments"
        />

        <SummaryCard
          title="Pending"
          value={pendingAssignments.toString()}
          description="Pending assignments"
        />

        <SummaryCard
          title="Completed"
          value={completedAssignments.toString()}
          description="Completed assignments"
        />

        <SummaryCard
          title="Overdue"
          value={overdueAssignments.toString()}
          description="Past-due assignments"
        />
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Attendance Overview
        </h2>

        <AttendanceChart />
      </div>
    </div>
  );
}

export default Dashboard;