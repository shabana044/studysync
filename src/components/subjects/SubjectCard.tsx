import { calculateAttendancePercentage } from "../../utils/attendance";
import AttendanceProgress from "./AttendanceProgress";
import type { Subject } from "../../types/study";

type SubjectCardProps = {
  subject: Subject;
};

function SubjectCard({ subject }: SubjectCardProps) {
  const percentage = calculateAttendancePercentage(
  subject.attendedClasses,
  subject.totalClasses
);

  return (
  <div className="rounded-xl bg-white p-5 shadow-sm">
    <h3 className="text-lg font-semibold">{subject.name}</h3>

    <p className="mt-2 text-sm text-slate-600">
      {subject.attendedClasses} / {subject.totalClasses} classes attended
    </p>

    <AttendanceProgress percentage={percentage} />
  </div>
);
}

export default SubjectCard;