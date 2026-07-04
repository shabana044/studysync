type SortOption = {
  value: string;
  label: string;
};

type SortSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options?: SortOption[];
};

function SortSelect({ value, onChange, options = [{ value: "name", label: "Sort by Name" }, { value: "attendance", label: "Sort by Attendance" }] }: SortSelectProps) {
  return (
    <div className="mb-6">
      <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)] dark:text-slate-200">Sort</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)] shadow-sm transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelect;