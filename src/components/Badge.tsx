type BadgeProps = {
  text: string;
  className: string;
};

function Badge({ text, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-transparent px-3 py-1 text-xs font-semibold shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 ${className}`}
    >
      {text}
    </span>
  );
}

export default Badge;