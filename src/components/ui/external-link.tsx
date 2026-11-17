import Link from "next/link";
import type { ComponentProps } from "react";

export const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

export function NewTabHint() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

export function ExternalLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link {...NEW_TAB} {...props}>
      {children}
      <NewTabHint />
    </Link>
  );
}
