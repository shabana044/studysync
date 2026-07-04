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
  title: string
  subject: string
  date: string
}

export type StudyTask = {
  id: string
  title: string
  completed: boolean
};

export type EditingSubject = Subject | null;