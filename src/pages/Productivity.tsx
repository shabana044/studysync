import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import DailyPlanner from "../components/planner/DailyPlanner";
import PomodoroTimer from "../components/planner/PomodoroTimer";
import CalendarView from "../components/planner/CalendarView";
import StudyInsights from "../components/planner/StudyInsights";
import GoalsPanel from "../components/planner/GoalsPanel";
import AttendanceInsights from "../components/planner/AttendanceInsights";
import { loadAssignments, loadExams, loadGoals, loadStreak, loadSubjects, loadTasks, saveStreak } from "../utils/storage";

function Productivity() {
  const subjects = loadSubjects();
  const assignments = loadAssignments();
  const exams = loadExams();
  const tasks = loadTasks();
  const goals = loadGoals();
  const [streak, setStreak] = useState(() => loadStreak());

  const completedTasks = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);

  useEffect(() => {
    if (completedTasks > 0 && completedTasks % 3 === 0) {
      setStreak((current) => {
        const next = current + 1;
        saveStreak(next);
        return next;
      });
    }
  }, [completedTasks]);

  return (
    <div className="space-y-8">
      <PageHeader title="Productivity Hub" />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <DailyPlanner />
          <StudyInsights subjects={subjects} assignments={assignments} exams={exams} tasks={tasks} goals={goals} streak={streak} />
        </div>

        <div className="space-y-6">
          <PomodoroTimer />
          <GoalsPanel />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CalendarView assignments={assignments} exams={exams} />
        <AttendanceInsights subjects={subjects} />
      </div>
    </div>
  );
}

export default Productivity;
