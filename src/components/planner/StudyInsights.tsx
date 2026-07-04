import { useMemo } from "react";
import type { Assignment, Exam, Goal, StudyTask, Subject } from "../../types/study";
import Card from "../Card";

type StudyInsightsProps = {
  subjects: Subject[];
  assignments: Assignment[];
  exams: Exam[];
  tasks: StudyTask[];
  goals: Goal[];
  streak: number;
};

function StudyInsights({ subjects, assignments, exams, tasks, goals, streak }: StudyInsightsProps) {
  const attendanceAverage = useMemo(() => {
    const totalClasses = subjects.reduce((sum, subject) => sum + subject.totalClasses, 0);
    const attendedClasses = subjects.reduce((sum, subject) => sum + subject.attendedClasses, 0);
    return totalClasses === 0 ? 0 : Math.round((attendedClasses / totalClasses) * 100);
  }, [subjects]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingAssignments = assignments.filter((assignment) => assignment.status === "pending").length;
  const upcomingExams = exams.filter((exam) => new Date(exam.date) >= new Date()).length;
  const completedGoals = goals.filter((goal) => goal.completed).length;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="text-lg font-semibold text-[var(--color-text)]">Study Momentum</h3>
        <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
          <div className="flex items-center justify-between rounded-xl bg-[var(--color-bg)] px-3 py-2">
            <span>Completed tasks</span>
            <span className="font-semibold text-[var(--color-text)]">{completedTasks}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[var(--color-bg)] px-3 py-2">
            <span>Pending assignments</span>
            <span className="font-semibold text-[var(--color-text)]">{pendingAssignments}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[var(--color-bg)] px-3 py-2">
            <span>Upcoming exams</span>
            <span className="font-semibold text-[var(--color-text)]">{upcomingExams}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[var(--color-bg)] px-3 py-2">
            <span>Attendance average</span>
            <span className="font-semibold text-[var(--color-text)]">{attendanceAverage}%</span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-[var(--color-text)]">Goals & Streak</h3>
        <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
          <div className="flex items-center justify-between rounded-xl bg-[var(--color-bg)] px-3 py-2">
            <span>Goals achieved</span>
            <span className="font-semibold text-[var(--color-text)]">{completedGoals}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[var(--color-bg)] px-3 py-2">
            <span>Current streak</span>
            <span className="font-semibold text-[var(--color-text)]">{streak} day{streak === 1 ? "" : "s"}</span>
          </div>
          <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-3">
            <p className="font-medium text-[var(--color-text)]">Focus tip</p>
            <p className="mt-1">Keep one small task moving every day to protect your momentum.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default StudyInsights;
