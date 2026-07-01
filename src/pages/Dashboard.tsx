import SummaryCard from "../components/dashboard/SummaryCard";

function Dashboard() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Attendance"
          value="82%"
          description="Overall attendance"
        />

        <SummaryCard
          title="Assignments"
          value="3"
          description="Pending assignments"
        />

        <SummaryCard
          title="Exams"
          value="2"
          description="Upcoming exams"
        />

        <SummaryCard
          title="Today's Tasks"
          value="5"
          description="Tasks to complete today"
        />
      </div>
    </div>
  );
}

export default Dashboard;