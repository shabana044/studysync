type SummaryCardProps = {
  title: string;
  value: string;
  description: string;
  accent?: string;
};

function SummaryCard({ title, value, description, accent = "from-blue-500 to-blue-600" }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${accent}`} />
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] dark:text-slate-300">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-[var(--color-text)] dark:text-slate-100">{value}</p>
      <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-slate-300">{description}</p>
    </div>
  );
}

export default SummaryCard;