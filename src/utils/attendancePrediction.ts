export function classesNeededFor75Percent(
  attendedClasses: number,
  totalClasses: number
): number {
  let attended = attendedClasses;
  let total = totalClasses;
  let classes = 0;

  while ((attended / total) * 100 < 75) {
    attended++;
    total++;
    classes++;
  }

  return classes;
}