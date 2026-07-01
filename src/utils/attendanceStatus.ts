export function getAttendanceStatus(percentage: number) {
  if (percentage >= 90) {
    return {
      label: "Excellent",
      color: "text-green-600",
    };
  }

  if (percentage >= 75) {
    return {
      label: "Safe",
      color: "text-blue-600",
    };
  }

  return {
    label: "Low",
    color: "text-red-600",
  };
}