import type { Subject, Assignment, Exam, StudyTask } from '../types/study'

export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Data Structures',
    totalClasses: 30,
    attendedClasses: 25,
  },
  {
    id: '2',
    name: 'Operating Systems',
    totalClasses: 28,
    attendedClasses: 21,
  },
]

export const assignments: Assignment[] = [
  {
    id: '1',
    title: 'OS Lab Record',
    subject: 'Operating Systems',
    dueDate: '2026-07-10',
    priority: 'high',
    status: 'pending',
  },
]

export const exams: Exam[] = [
  {
    id: '1',
    subject: 'Data Structures',
    examName: 'Internal Exam 1',
    date: '2026-07-20',
    time: '10:00',
    location: 'Room 101',
    notes: 'Bring calculator',
  },
]

export const studyTasks: StudyTask[] = [
  {
    id: '1',
    title: 'Revise arrays and linked lists',
    completed: false,
  },
]