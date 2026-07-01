import { useState } from "react";
type SubjectFormProps = {
  onClose: () => void;
};

function SubjectForm({ onClose }: SubjectFormProps) {
    const [name, setName] = useState("");
const [totalClasses, setTotalClasses] = useState("");
const [attendedClasses, setAttendedClasses] = useState("");
  return (
    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <h3 className="mb-4 text-lg font-semibold">Add Subject</h3>

      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Subject Name
          </label>
          <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full rounded-lg border border-slate-300 p-2"
  placeholder="Example: Operating Systems"
/>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Total Classes
          </label>
          <input
  type="number"
  value={totalClasses}
  onChange={(e) => setTotalClasses(e.target.value)}
  className="w-full rounded-lg border border-slate-300 p-2"
  placeholder="Example: 30"
/>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Attended Classes
          </label>
         <input
  type="number"
  value={attendedClasses}
  onChange={(e) => setAttendedClasses(e.target.value)}
  className="w-full rounded-lg border border-slate-300 p-2"
  placeholder="Example: 25"
/>
        </div>

        <div className="flex gap-3">
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
        </div>
      </form>
    </div>
  );
}

export default SubjectForm;