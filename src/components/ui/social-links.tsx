import { Mail } from "lucide-react";
import type { ComponentType } from "react";
import { ButtonLink } from "@/components/motion/button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { getSocialLinks, type SocialLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialLink["kind"], ComponentType<{ className?: string }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      {getSocialLinks().map(({ kind, href, label }) => {
        const Icon = ICONS[kind];
        const external = kind !== "email";
        return (
          <li key={kind}>
            <ButtonLink
              href={href}
              variant="ghost"
              size="sm"
              external={external}
              rel={external ? "noopener noreferrer me" : undefined}
            >
              <Icon className="size-4" />
              {label}
            </ButtonLink>
          </li>
        );
      })}
    </ul>
  );
}
