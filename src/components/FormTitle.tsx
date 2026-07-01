type FormTitleProps = {
  title: string;
};

function FormTitle({ title }: FormTitleProps) {
  return (
    <h3 className="mb-4 text-lg font-semibold">
      {title}
    </h3>
  );
}

export default FormTitle;