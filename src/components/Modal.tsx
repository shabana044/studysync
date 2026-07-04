import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  children: ReactNode;
};

function Modal({ open, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
        {children}
      </div>
    </div>
  );
}

export default Modal;