import type { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
};

function Grid({ children }: GridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}

export default Grid;