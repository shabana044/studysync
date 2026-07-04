import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  children: ReactNode;
};

function Modal({ open, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export default Modal;