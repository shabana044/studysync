import type { ReactNode } from "react";

type ButtonGroupProps = {
  children: ReactNode;
};

function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div className="flex gap-3">
      {children}
    </div>
  );
}

export default ButtonGroup;