import type { Subject } from "../../types/study";

type SubjectCardProps = {
  subject: Subject;
};

function SubjectCard({ subject }: SubjectCardProps) {
  const percentage = Math.round(
    (subject.attendedClasses / subject.totalClasses) * 100
  );

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{subject.name}</h3>

      <p className="mt-2 text-sm text-slate-600">
        {subject.attendedClasses} / {subject.totalClasses} classes attended
      </p>

      <p className="mt-2 text-2xl font-bold">{percentage}%</p>
    </div>
  );
}

export default SubjectCard;