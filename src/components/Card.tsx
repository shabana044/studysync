import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {children}
    </div>
  );
}

export default Card;