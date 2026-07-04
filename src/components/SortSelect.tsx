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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-6 w-full rounded-lg border border-slate-300 p-3"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortSelect;