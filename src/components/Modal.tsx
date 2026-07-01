import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  children: ReactNode;
};

function Modal({ open, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}

export default Modal;