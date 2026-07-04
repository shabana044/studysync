type EmptyStateProps = {
  message: string;
};

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-muted)] shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
      {message}
    </div>
  );
}

export default EmptyState;