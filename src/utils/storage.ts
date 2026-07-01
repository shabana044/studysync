import type { Subject } from "../types/study";

export const SUBJECTS_KEY = "studysync-subjects";

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