export function calculateAttendancePercentage(
  attendedClasses: number,
  totalClasses: number
): number {
  if (totalClasses === 0) return 0;

  return Math.round((attendedClasses / totalClasses) * 100);
}