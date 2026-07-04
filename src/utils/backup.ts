import {
  ASSIGNMENTS_KEY,
  EXAMS_KEY,
  GOALS_KEY,
  STREAK_KEY,
  SUBJECTS_KEY,
  TASKS_KEY,
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

export function importStudySyncData(file: File) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));

      if (data.subjects) {
        localStorage.setItem(SUBJECTS_KEY, JSON.stringify(data.subjects));
      }

      if (data.assignments) {
        localStorage.setItem(
          ASSIGNMENTS_KEY,
          JSON.stringify(data.assignments)
        );
      }

      if (data.exams) {
        localStorage.setItem(EXAMS_KEY, JSON.stringify(data.exams));
      }

      if (data.tasks) {
        localStorage.setItem(TASKS_KEY, JSON.stringify(data.tasks));
      }

      if (data.goals) {
        localStorage.setItem(GOALS_KEY, JSON.stringify(data.goals));
      }

      if (typeof data.streak === "number") {
        localStorage.setItem(STREAK_KEY, JSON.stringify(data.streak));
      }

      alert("Backup imported successfully. Refreshing app...");
      window.location.reload();
    } catch {
      alert("Invalid backup file.");
    }
  };

  reader.readAsText(file);
}
export function resetStudySyncData() {
  const confirmed = confirm(
    "Are you sure you want to delete all StudySync data? This cannot be undone."
  );

  if (!confirmed) return;

  [
  "studysync-subjects",
  "studysync-assignments",
  "studysync-exams",
  "studysync-tasks",
  "studysync-goals",
  "studysync-streak",
  "studysync-reminder-last-shown",
  "studysync-theme",
].forEach((key) => localStorage.removeItem(key));

  alert("All StudySync data has been deleted.");
  window.location.reload();
}