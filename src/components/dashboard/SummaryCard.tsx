type SummaryCardProps = {
  title: string;
  value: string;
  description: string;
  accent?: string;
};

function SummaryCard({ title, value, description, accent = "from-blue-500 to-blue-600" }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${accent}`} />
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default SummaryCard;