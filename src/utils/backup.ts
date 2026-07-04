import {
  loadAssignments,
  loadExams,
  loadGoals,
  loadStreak,
  loadSubjects,
  loadTasks,
} from "./storage";

export function exportStudySyncData() {
  const data = {
    subjects: loadSubjects(),
    assignments: loadAssignments(),
    exams: loadExams(),
    tasks: loadTasks(),
    goals: loadGoals(),
    streak: loadStreak(),
    exportedAt: new Date().toISOString(),
  };

  const file = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(file);

  const link = document.createElement("a");
  link.href = url;
  link.download = "studysync-backup.json";
  link.click();

  URL.revokeObjectURL(url);
}