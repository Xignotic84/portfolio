import { Fragment } from "react";
import { ExternalLink } from "@/components/ui/external-link";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https:\/\/[^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\((https:\/\/[^)\s]+)\)$/;

export function RichText({ text }: { text: string }) {
  return text.split(TOKEN).map((part, index) => {
    const link = LINK.exec(part);
    if (link) {
      return (
        <ExternalLink key={index} href={link[2]} className="link">
          {link[1]}
        </ExternalLink>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}
