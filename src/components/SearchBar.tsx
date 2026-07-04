type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function SearchBar({ value, onChange, placeholder = "Search subjects..." }: SearchBarProps) {
  return (
    <div className="mb-6">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
        <input
          id="search"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
    </div>
  );
}

export default SearchBar;