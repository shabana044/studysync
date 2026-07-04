import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto max-w-7xl p-6">
      {children}
    </div>
  );
}

export default Container;