type InputProps = {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

function Input({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)] dark:text-slate-200">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)] shadow-sm transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
      />
    </div>
  );
}

export default Input;