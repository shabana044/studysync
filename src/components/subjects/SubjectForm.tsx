type SubjectFormProps = {
  onClose: () => void;
};

function SubjectForm({ onClose }: SubjectFormProps) {
  return (
    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <h3 className="mb-4 text-lg font-semibold">Add Subject</h3>

      <p className="mb-4">
        The form fields will be added in the next step.
      </p>

      <button
        onClick={onClose}
        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Close
      </button>
    </div>
  );
}

export default SubjectForm;