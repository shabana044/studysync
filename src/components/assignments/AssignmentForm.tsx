import { useEffect, useState, type FormEvent } from "react";
import FormActions from "../FormActions";
import FormTitle from "../FormTitle";
import Input from "../Input";
import type { Assignment, NewAssignment } from "../../types/study";

type AssignmentFormProps = {
  onClose: () => void;
  onSubmit: (assignment: NewAssignment) => void;
  editingAssignment: Assignment | null;
  subjects: string[];
};

function AssignmentForm({
  onClose,
  onSubmit,
  editingAssignment,
  subjects,
}: AssignmentFormProps) {
  const [title, setTitle] = useState(editingAssignment?.title ?? "");
  const [subject, setSubject] = useState(editingAssignment?.subject ?? "");
  const [dueDate, setDueDate] = useState(editingAssignment?.dueDate ?? "");
  const [priority, setPriority] = useState<Assignment["priority"]>(
    editingAssignment?.priority ?? "medium"
  );
  const [status, setStatus] = useState<Assignment["status"]>(
    editingAssignment?.status ?? "pending"
  );

  useEffect(() => {
    setTitle(editingAssignment?.title ?? "");
    setSubject(editingAssignment?.subject ?? "");
    setDueDate(editingAssignment?.dueDate ?? "");
    setPriority(editingAssignment?.priority ?? "medium");
    setStatus(editingAssignment?.status ?? "pending");
  }, [editingAssignment]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
      priority,
      status,
    });

    setTitle("");
    setSubject("");
    setDueDate("");
    setPriority("medium");
    setStatus("pending");
    onClose();
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-green-50 p-4 dark:border-slate-700 dark:bg-slate-800">
      <FormTitle title={editingAssignment ? "Edit Assignment" : "Add Assignment"} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={title}
          placeholder="Example: React practice quiz"
          onChange={setTitle}
        />

        <div>
          <label className="mb-1 block text-sm font-medium">Subject</label>
          <select
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="">Select a subject</option>
            {subjects.map((subjectName) => (
              <option key={subjectName} value={subjectName}>
                {subjectName}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={setDueDate}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Priority</label>
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as Assignment["priority"])}
              className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as Assignment["status"])}
              className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <FormActions>
          <button
            type="submit"
            className="rounded-xl bg-[var(--color-primary)] px-4 py-2 text-white transition hover:bg-indigo-700"
          >
            {editingAssignment ? "Update Assignment" : "Save Assignment"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[var(--color-muted)] px-4 py-2 text-white transition hover:bg-slate-600"
          >
            Cancel
          </button>
        </FormActions>
      </form>
    </div>
  );
}

export default AssignmentForm;
