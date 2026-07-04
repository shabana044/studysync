import Card from "../Card";
import Badge from "../Badge";
import type { Assignment } from "../../types/study";

type AssignmentCardProps = {
  assignment: Assignment;
  onDelete: (id: string) => void;
  onEdit: (assignment: Assignment) => void;
};

function AssignmentCard({ assignment, onDelete, onEdit }: AssignmentCardProps) {
  const priorityStyles: Record<Assignment["priority"], string> = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-emerald-100 text-emerald-700",
  };

  const statusStyles: Record<Assignment["status"], string> = {
    pending: "bg-slate-100 text-slate-700",
    completed: "bg-green-100 text-green-700",
  };

  const dueDate = new Date(assignment.dueDate);
  const today = new Date();
  const diffTime = dueDate.getTime() - today.setHours(0, 0, 0, 0);
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isOverdue = daysRemaining < 0 && assignment.status !== "completed";

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{assignment.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{assignment.subject}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge text={assignment.priority.toUpperCase()} className={priorityStyles[assignment.priority]} />
          <Badge text={assignment.status.toUpperCase()} className={statusStyles[assignment.status]} />
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p><span className="font-medium text-slate-800">Due:</span> {assignment.dueDate}</p>
        <p className={isOverdue ? "font-semibold text-red-600" : "text-slate-600"}>
          {isOverdue ? "Overdue" : `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) === 1 ? "" : "s"} ${daysRemaining >= 0 ? "remaining" : "past due"}`}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => onEdit(assignment)}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(assignment.id)}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Card>
  );
}

export default AssignmentCard;
