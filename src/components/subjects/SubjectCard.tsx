import { classesNeededFor75Percent } from "../../utils/attendancePrediction";
import { calculateAttendancePercentage } from "../../utils/attendance";
import AttendanceProgress from "./AttendanceProgress";
import { getAttendanceStatus } from "../../utils/attendanceStatus";
import Badge from "../Badge";
import Card from "../Card";
import type { Subject } from "../../types/study";

type SubjectCardProps = {
  subject: Subject;
};

function SubjectCard({ subject }: SubjectCardProps) {
  const percentage = calculateAttendancePercentage(
  subject.attendedClasses,
  subject.totalClasses
);
const status = getAttendanceStatus(percentage);
const classesNeeded = classesNeededFor75Percent(
  subject.attendedClasses,
  subject.totalClasses
);

 return (
  <Card>
    <h3 className="text-lg font-semibold">{subject.name}</h3>

    <p className="mt-2 text-sm text-slate-600">
      {subject.attendedClasses} / {subject.totalClasses} classes attended
    </p>

    <AttendanceProgress percentage={percentage} />

<div className="mt-3">
  <Badge
    text={status.label}
    className={status.color}
  />
</div>

    <p className="mt-3 text-sm text-slate-600">
      {classesNeeded === 0
        ? "✅ Attendance is above 75%"
        : `📚 Attend the next ${classesNeeded} class${
            classesNeeded > 1 ? "es" : ""
          } to reach 75%`}
    </p>
  </Card>
);
}

export default SubjectCard;