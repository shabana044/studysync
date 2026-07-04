import type { Assignment, Exam, Goal, StudyTask, Subject } from "../types/study";

export const SUBJECTS_KEY = "studysync-subjects";
export const ASSIGNMENTS_KEY = "studysync-assignments";
export const EXAMS_KEY = "studysync-exams";
export const TASKS_KEY = "studysync-tasks";
export const GOALS_KEY = "studysync-goals";
export const STREAK_KEY = "studysync-streak";

export function saveSubjects(subjects: Subject[]) {
  localStorage.setItem(
    SUBJECTS_KEY,
    JSON.stringify(subjects)
  );
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
}

export function loadStreak(): number {
  const data = localStorage.getItem(STREAK_KEY);

  if (!data) {
    return 0;
  }

  return JSON.parse(data);
}