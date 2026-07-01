import type { ReactNode } from "react";

type FormActionsProps = {
  children: ReactNode;
};

function FormActions({ children }: FormActionsProps) {
  return (
    <div className="mt-6 flex justify-end gap-3">
      {children}
    </div>
  );
}

export default FormActions;