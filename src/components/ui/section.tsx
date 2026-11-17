import type { ReactNode } from "react";

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className="space-y-6">
      <h2 id={headingId} className="text-2xl sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
