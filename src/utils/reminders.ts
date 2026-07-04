import { loadAssignments, loadExams } from "./storage";
import { showNotification } from "./notifications";

type ReminderOptions = {
  showEmptyAlert?: boolean;
  skipIfShownToday?: boolean;
};

const REMINDER_LAST_SHOWN_KEY = "studysync-reminder-last-shown";

function parseLocalDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getTodayKey() {
  const today = new Date();

  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function isToday(dateString: string) {
  const today = new Date();
  const date = parseLocalDate(dateString);

  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
}

function isTomorrow(dateString: string) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const date = parseLocalDate(dateString);

  return (
    tomorrow.getFullYear() === date.getFullYear() &&
    tomorrow.getMonth() === date.getMonth() &&
    tomorrow.getDate() === date.getDate()
  );
}

export function checkStudyReminders(options: ReminderOptions = {}) {
  const todayKey = getTodayKey();

  if (
    options.skipIfShownToday &&
    localStorage.getItem(REMINDER_LAST_SHOWN_KEY) === todayKey
  ) {
    return;
  }

  const assignments = loadAssignments();
  const exams = loadExams();

  const assignmentsDueToday = assignments.filter((assignment) => {
    const status = String(assignment.status).toLowerCase();
    return status !== "completed" && isToday(assignment.dueDate);
  });

  const examsTomorrow = exams.filter((exam) => isTomorrow(exam.date));

  if (assignmentsDueToday.length === 0 && examsTomorrow.length === 0) {
    if (options.showEmptyAlert) {
      alert("No study reminders for now.");
    }

    return;
  }

  const messages: string[] = [];

  if (assignmentsDueToday.length > 0) {
    const message = `You have ${assignmentsDueToday.length} assignment(s) due today.`;
    messages.push(message);
    showNotification("Assignment Reminder", message);
  }

  if (examsTomorrow.length > 0) {
    const message = `You have ${examsTomorrow.length} exam(s) tomorrow.`;
    messages.push(message);
    showNotification("Exam Reminder", message);
  }

  localStorage.setItem(REMINDER_LAST_SHOWN_KEY, todayKey);

  if (options.showEmptyAlert) {
    alert(messages.join("\n"));
  }
}