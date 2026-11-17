import { ExternalLink } from "@/components/ui/external-link";
import { SocialLinks } from "@/components/ui/social-links";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="py-14 sm:pt-20">
      <h1 id="hero-title" className="text-3xl sm:text-4xl">
        Hey, I&apos;m {site.name}!
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        I&apos;m a {site.role} based in {site.location.city}, {site.location.country}. Currently working at{" "}
        <ExternalLink href={site.currentEmployer.url} className="link">
          {site.currentEmployer.name}
        </ExternalLink>
        .
      </p>
      <SocialLinks className="mt-5 -ml-3" />
    </section>
  );
}
