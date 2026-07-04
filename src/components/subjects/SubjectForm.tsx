import { useState } from "react";
import FormActions from "../FormActions";
import FormTitle from "../FormTitle";
import Input from "../Input";
import type { NewSubject, Subject } from "../../types/study";

type SubjectFormProps = {
  onClose: () => void;
  onAddSubject: (subject: NewSubject) => void;
  editingSubject: Subject | null;
};

function SubjectForm({
  onClose,
  onAddSubject,
  editingSubject,
}: SubjectFormProps) {
  const [name, setName] = useState(editingSubject?.name ?? "");
  const [totalClasses, setTotalClasses] = useState(
    editingSubject?.totalClasses.toString() ?? ""
  );
  const [attendedClasses, setAttendedClasses] = useState(
    editingSubject?.attendedClasses.toString() ?? ""
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onAddSubject({
      name,
      totalClasses: Number(totalClasses),
      attendedClasses: Number(attendedClasses),
    });

    setName("");
    setTotalClasses("");
    setAttendedClasses("");
    onClose();
  }

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <FormTitle title={editingSubject ? "Edit Subject" : "Add Subject"} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Subject Name"
          value={name}
          placeholder="Example: Operating Systems"
          onChange={setName}
        />

        <Input
          label="Total Classes"
          type="number"
          value={totalClasses}
          placeholder="Example: 30"
          onChange={setTotalClasses}
        />

        <Input
          label="Attended Classes"
          type="number"
          value={attendedClasses}
          placeholder="Example: 25"
          onChange={setAttendedClasses}
        />

        <FormActions>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
           {editingSubject ? "Update Subject" : "Save Subject"}
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

export default SubjectForm;