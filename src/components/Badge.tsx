type BadgeProps = {
  text: string;
  className: string;
};

function Badge({ text, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${className}`}
    >
      {text}
    </span>
  );
}

export default Badge;