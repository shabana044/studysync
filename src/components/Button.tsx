type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
};

function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  const variantClasses = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-green-700 focus:ring-green-500",
    secondary: "bg-[var(--color-secondary)] text-white hover:bg-blue-700 focus:ring-blue-500",
    danger: "bg-[var(--color-danger)] text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-[var(--color-success)] text-white hover:bg-green-600 focus:ring-green-500",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;