import { useEffect, useState, type FormEvent } from "react";
import FormActions from "../FormActions";
import FormTitle from "../FormTitle";
import Input from "../Input";
import type { Exam, NewExam } from "../../types/study";

type ExamFormProps = {
  onClose: () => void;
  onSubmit: (exam: NewExam) => void;
  editingExam: Exam | null;
  subjects: string[];
};

function ExamForm({ onClose, onSubmit, editingExam, subjects }: ExamFormProps) {
  const [subject, setSubject] = useState(editingExam?.subject ?? "");
  const [examName, setExamName] = useState(editingExam?.examName ?? "");
  const [date, setDate] = useState(editingExam?.date ?? "");
  const [time, setTime] = useState(editingExam?.time ?? "");
  const [location, setLocation] = useState(editingExam?.location ?? "");
  const [notes, setNotes] = useState(editingExam?.notes ?? "");

  useEffect(() => {
    setSubject(editingExam?.subject ?? "");
    setExamName(editingExam?.examName ?? "");
    setDate(editingExam?.date ?? "");
    setTime(editingExam?.time ?? "");
    setLocation(editingExam?.location ?? "");
    setNotes(editingExam?.notes ?? "");
  }, [editingExam]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      subject: subject.trim(),
      examName: examName.trim(),
      date,
      time,
      location: location.trim(),
      notes: notes.trim(),
    });

    setSubject("");
    setExamName("");
    setDate("");
    setTime("");
    setLocation("");
    setNotes("");
    onClose();
  }

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <FormTitle title={editingExam ? "Edit Exam" : "Add Exam"} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Subject</label>
          <select
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2"
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
          label="Exam Name"
          value={examName}
          placeholder="Example: Midterm Exam"
          onChange={setExamName}
        />

        <Input label="Date" type="date" value={date} onChange={setDate} />

        <Input label="Time" type="time" value={time} onChange={setTime} />

        <Input
          label="Location"
          value={location}
          placeholder="Example: Lab 2"
          onChange={setLocation}
        />

        <Input
          label="Notes"
          value={notes}
          placeholder="Optional notes"
          onChange={setNotes}
        />

        <FormActions>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {editingExam ? "Update Exam" : "Save Exam"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
          >
            Cancel
          </button>
        </FormActions>
      </form>
    </div>
  );
}

export default ExamForm;
