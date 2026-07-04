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
      <label className="mb-1.5 block text-sm font-medium text-slate-700">Sort</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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