import Card from "../Card";
import Badge from "../Badge";
import AttendanceProgress from "./AttendanceProgress";
import type { Subject } from "../../types/study";
import { calculateAttendancePercentage } from "../../utils/attendance";
import { classesNeededFor75Percent } from "../../utils/attendancePrediction";
import { getAttendanceStatus } from "../../utils/attendanceStatus";

type SubjectCardProps = {
  subject: Subject;
  onDelete: (id: string) => void;
  onEdit: (subject: Subject) => void;
  onUpdateAttendance: (id: string, type: "attended" | "total") => void;
};

function SubjectCard({ subject, onDelete, onEdit, onUpdateAttendance }: SubjectCardProps) {
  const percentage = calculateAttendancePercentage(
    subject.attendedClasses,
    subject.totalClasses
  );

  const classesNeeded = classesNeededFor75Percent(
    subject.attendedClasses,
    subject.totalClasses
  );

  const status = getAttendanceStatus(percentage);

  return (
    <Card>
      <h3 className="text-lg font-semibold">{subject.name}</h3>

      <p className="mt-2 text-sm text-slate-600">
        {subject.attendedClasses} / {subject.totalClasses} classes attended
      </p>

      <AttendanceProgress percentage={percentage} />

      <div className="mt-3">
        <Badge text={status.label} className={status.color} />
      </div>

      <p className="mt-3 text-sm text-slate-600">
        {classesNeeded === 0
          ? "✅ Attendance is above 75%"
          : `📚 Attend the next ${classesNeeded} class${
              classesNeeded > 1 ? "es" : ""
            } to reach 75%`}
      </p>
<div className="mt-4 flex gap-2">
  <button
    onClick={() => onUpdateAttendance(subject.id, "attended")}
    className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
  >
    + Attended
  </button>

  <button
    onClick={() => onUpdateAttendance(subject.id, "total")}
    className="rounded-lg bg-slate-600 px-3 py-2 text-sm text-white hover:bg-slate-700"
  >
    + Class
  </button>
</div>
      <button
        onClick={() => onEdit(subject)}
        className="mt-4 mr-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(subject.id)}
        className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Delete Subject
      </button>
    </Card>
  );
}

export default SubjectCard;