import SummaryCard from "../components/dashboard/SummaryCard";
import {
  subjects,
  assignments,
  exams,
  studyTasks,
} from "../data/sampleData";
function Dashboard() {
    const attendance =
  Math.round(
    (subjects.reduce((sum, s) => sum + s.attendedClasses, 0) /
      subjects.reduce((sum, s) => sum + s.totalClasses, 0)) *
      100
  ) + "%";

const pendingAssignments = assignments.filter(
  (assignment) => !assignment.completed
).length;

const upcomingExams = exams.length;

const todayTasks = studyTasks.filter(
  (task) => !task.completed
).length;
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Attendance"
         value={attendance}
          description="Overall attendance"
        />

        <SummaryCard
          title="Assignments"
          value={pendingAssignments.toString()}
          description="Pending assignments"
        />

        <SummaryCard
          title="Exams"
          value={upcomingExams.toString()}
          description="Upcoming exams"
        />

        <SummaryCard
          title="Today's Tasks"
          value={todayTasks.toString()}
          description="Tasks to complete today"
        />
      </div>
    </div>
  );
}

export default Dashboard;