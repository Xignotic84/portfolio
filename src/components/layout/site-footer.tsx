import { SocialLinks } from "@/components/ui/social-links";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-5xl px-4 pb-10">
      <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {site.name}
        </p>
        <SocialLinks className="-ml-3 sm:-mr-3 sm:ml-0" />
      </div>
    </footer>
  );
}
