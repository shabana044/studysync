import Card from "../Card";
import Badge from "../Badge";
import AttendanceProgress from "./AttendanceProgress";
import type { Subject } from "../../types/study";
import { calculateAttendancePercentage } from "../../utils/attendance";
import { getSubjectIcon } from "../../utils/subjectIcons";
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
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-2xl shadow-sm">
            {getSubjectIcon(subject.name)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{subject.name}</h3>
            <p className="text-sm text-slate-600">
              {subject.attendedClasses} / {subject.totalClasses} classes attended
            </p>
          </div>
        </div>
        <Badge text={status.label} className={status.color} />
      </div>

      <AttendanceProgress percentage={percentage} />

      <p className="mt-3 text-sm text-slate-600">
        {classesNeeded === 0
          ? "✅ Attendance is above 75%"
          : `📚 Attend the next ${classesNeeded} class${
              classesNeeded > 1 ? "es" : ""
            } to reach 75%`}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onUpdateAttendance(subject.id, "attended")}
          className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          + Attended
        </button>

        <button
          onClick={() => onUpdateAttendance(subject.id, "total")}
          className="rounded-xl bg-slate-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          + Class
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onEdit(subject)}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(subject.id)}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Card>
  );
}

export default SubjectCard;