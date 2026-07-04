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
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">🔎</span>
        <input
          id="search"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-4 text-sm text-[var(--color-text)] shadow-sm transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

export default SearchBar;