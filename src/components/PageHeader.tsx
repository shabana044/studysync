import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  action?: ReactNode;
};

function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-[var(--color-text)] dark:text-slate-100">{title}</h2>
      {action}
    </div>
  );
}

export default PageHeader;