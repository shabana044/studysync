export type Subject = {
  id: string
  name: string
  totalClasses: number
  attendedClasses: number
}

export type Assignment = {
  id: string
  title: string
  subject: string
  dueDate: string
  completed: boolean
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
}