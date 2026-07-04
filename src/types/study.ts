export type Subject = {
  id: string
  name: string
  totalClasses: number
  attendedClasses: number
}

export type NewSubject = {
  name: string
  totalClasses: number
  attendedClasses: number
}

export type AssignmentPriority = "high" | "medium" | "low";
export type AssignmentStatus = "pending" | "completed";

export type Assignment = {
  id: string
  title: string
  subject: string
  dueDate: string
  priority: AssignmentPriority
  status: AssignmentStatus
}

export type NewAssignment = {
  title: string
  subject: string
  dueDate: string
  priority: AssignmentPriority
  status: AssignmentStatus
}

export type Exam = {
  id: string
  subject: string
  examName: string
  date: string
  time: string
  location: string
  notes: string
}

export type NewExam = {
  subject: string
  examName: string
  date: string
  time: string
  location: string
  notes: string
}

export type StudyTask = {
  id: string
  title: string
  completed: boolean
  date: string
};

export type Goal = {
  id: string
  title: string
  completed: boolean
  createdAt: string
};

export type EditingSubject = Subject | null;