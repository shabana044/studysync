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
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}

export default Input;