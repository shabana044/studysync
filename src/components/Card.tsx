import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}

export default Card;