type AttendanceProgressProps = {
  percentage: number;
};

function AttendanceProgress({
  percentage,
}: AttendanceProgressProps) {
  return (
    <div className="mt-4">
      <div className="mb-1 flex justify-between text-sm">
        <span>Attendance</span>
        <span>{percentage}%</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-green-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default AttendanceProgress;
