import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-8">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      {children}
    </section>
  );
}

export default Section;
