import FormTitle from "../FormTitle";
import Input from "../Input";
import ButtonGroup from "../ButtonGroup";
import { useState } from "react";
import type { NewSubject } from "../../types/study";
type SubjectFormProps = {
  onClose: () => void;
  onAddSubject: (subject: NewSubject) => void;
};

function SubjectForm({ onClose, onAddSubject }: SubjectFormProps) {
    const [name, setName] = useState("");
const [totalClasses, setTotalClasses] = useState("");
const [attendedClasses, setAttendedClasses] = useState("");
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
      <FormTitle title="Add Subject" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Subject Name
          </label>
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
        </div>

        <ButtonGroup>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save Subject
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
          >
            Cancel
          </button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default SubjectForm;