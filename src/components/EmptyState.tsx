type EmptyStateProps = {
  message: string;
};

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
      {message}
    </div>
  );
}

export default EmptyState;