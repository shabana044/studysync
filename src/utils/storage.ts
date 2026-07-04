import type { Assignment, Subject } from "../types/study";

export const SUBJECTS_KEY = "studysync-subjects";
export const ASSIGNMENTS_KEY = "studysync-assignments";

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