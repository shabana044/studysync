import type { Assignment, Exam, Subject } from "../types/study";

export const SUBJECTS_KEY = "studysync-subjects";
export const ASSIGNMENTS_KEY = "studysync-assignments";
export const EXAMS_KEY = "studysync-exams";

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