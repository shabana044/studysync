import type { Assignment, Exam, Goal, StudyTask, Subject } from "../types/study";

export const SUBJECTS_KEY = "studysync-subjects";
export const ASSIGNMENTS_KEY = "studysync-assignments";
export const EXAMS_KEY = "studysync-exams";
export const TASKS_KEY = "studysync-tasks";
export const GOALS_KEY = "studysync-goals";
export const STREAK_KEY = "studysync-streak";
export const LAST_UPDATED_KEY = "studysync-last-updated";

export function updateLastUpdated() {
  localStorage.setItem(LAST_UPDATED_KEY, new Date().toISOString());
}

export function loadLastUpdated(): string | null {
  return localStorage.getItem(LAST_UPDATED_KEY);
}

export function formatLastUpdated(value: string | null) {
  if (!value) {
    return "Not updated yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not updated yet";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function saveSubjects(subjects: Subject[]) {
  localStorage.setItem(
    SUBJECTS_KEY,
    JSON.stringify(subjects)
  );
  updateLastUpdated();
}

export function loadSubjects(): Subject[] {
  const data = localStorage.getItem(SUBJECTS_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveAssignments(assignments: Assignment[]) {
  localStorage.setItem(
    ASSIGNMENTS_KEY,
    JSON.stringify(assignments)
  );
  updateLastUpdated();
}

export function loadAssignments(): Assignment[] {
  const data = localStorage.getItem(ASSIGNMENTS_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveExams(exams: Exam[]) {
  localStorage.setItem(
    EXAMS_KEY,
    JSON.stringify(exams)
  );
  updateLastUpdated();
}

export function loadExams(): Exam[] {
  const data = localStorage.getItem(EXAMS_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveTasks(tasks: StudyTask[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  updateLastUpdated();
}

export function loadTasks(): StudyTask[] {
  const data = localStorage.getItem(TASKS_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveGoals(goals: Goal[]) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  updateLastUpdated();
}

export function loadGoals(): Goal[] {
  const data = localStorage.getItem(GOALS_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveStreak(streak: number) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  updateLastUpdated();
}

export function loadStreak(): number {
  const data = localStorage.getItem(STREAK_KEY);

  if (!data) {
    return 0;
  }

  return JSON.parse(data);
}