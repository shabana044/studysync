import Card from "../Card";
import Badge from "../Badge";
import type { Exam } from "../../types/study";

type ExamCardProps = {
  exam: Exam;
  onDelete: (id: string) => void;
  onEdit: (exam: Exam) => void;
};

function ExamCard({ exam, onDelete, onEdit }: ExamCardProps) {
  const examDate = new Date(exam.date);
  const today = new Date();
  const diffTime = examDate.getTime() - today.setHours(0, 0, 0, 0);
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isUpcoming = daysLeft >= 0;

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)]">{exam.examName}</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{exam.subject}</p>
        </div>
        <Badge
          text={daysLeft >= 0 ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} left` : "Past"}
          className={daysLeft < 0 ? "bg-red-100 text-red-700 dark:bg-red-950/70 dark:text-red-200" : isUpcoming ? "bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-200" : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100"}
        />
      </div>

      <div className="mt-4 space-y-2 text-sm text-[var(--color-muted)] dark:text-slate-300">
        <p><span className="font-medium text-[var(--color-text)] dark:text-slate-100">Date:</span> {exam.date}</p>
        <p><span className="font-medium text-[var(--color-text)] dark:text-slate-100">Time:</span> {exam.time}</p>
        <p><span className="font-medium text-[var(--color-text)] dark:text-slate-100">Location:</span> {exam.location}</p>
        {exam.notes ? <p><span className="font-medium text-[var(--color-text)] dark:text-slate-100">Notes:</span> {exam.notes}</p> : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => onEdit(exam)}
          className="rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(exam.id)}
          className="rounded-xl bg-[var(--color-danger)] px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Card>
  );
}

export default ExamCard;
