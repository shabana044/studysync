type BadgeProps = {
  text: string;
  className: string;
};

function Badge({ text, className }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      {text}
    </span>
  );
}

export default Badge;