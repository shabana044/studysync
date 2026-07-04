type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function SearchBar({ value, onChange, placeholder = "Search subjects..." }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-6 w-full rounded-lg border border-slate-300 p-3"
    />
  );
}

export default SearchBar;