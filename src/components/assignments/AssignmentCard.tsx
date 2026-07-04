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

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{assignment.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{assignment.subject}</p>
        </div>
        <div className="flex gap-2">
          <Badge text={assignment.priority.toUpperCase()} className={priorityStyles[assignment.priority]} />
          <Badge text={assignment.status.toUpperCase()} className={statusStyles[assignment.status]} />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        Due: {assignment.dueDate}
      </p>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => onEdit(assignment)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(assignment.id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Card>
  );
}

export default AssignmentCard;
