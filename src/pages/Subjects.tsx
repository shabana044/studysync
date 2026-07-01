import { subjects } from "../data/sampleData";
import Button from "../components/Button";
import { useState } from "react";
import SubjectForm from "../components/subjects/SubjectForm";
function Subjects() {
    const [showForm, setShowForm] = useState(false);
  return (
  <div>
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold">Subjects</h2>

      <Button onClick={() => setShowForm(true)}>
        Add Subject
      </Button>
    </div>

    {showForm && (
  <SubjectForm onClose={() => setShowForm(false)} />
)}

    <div className="grid gap-4 md:grid-cols-2">
      {subjects.map((subject) => {
        const percentage = Math.round(
          (subject.attendedClasses / subject.totalClasses) * 100
        );

        return (
          <div
            key={subject.id}
            className="rounded-xl bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold">{subject.name}</h3>

            <p className="mt-2 text-sm text-slate-600">
              {subject.attendedClasses} / {subject.totalClasses} classes attended
            </p>

            <p className="mt-2 text-2xl font-bold">{percentage}%</p>
          </div>
        );
      })}
    </div>
  </div>
);
}

export default Subjects;