type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
};

function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;