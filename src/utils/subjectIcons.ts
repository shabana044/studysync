export function getSubjectIcon(name: string) {
  const subject = name.toLowerCase();

  if (subject.includes("math")) return "📐";
  if (subject.includes("operating")) return "💻";
  if (subject.includes("database")) return "🗄️";
  if (subject.includes("network")) return "🌐";
  if (subject.includes("software")) return "⚙️";
  if (subject.includes("web")) return "🌍";
  if (subject.includes("data")) return "📊";
  if (subject.includes("react")) return "⚛️";

  return "📚";
}