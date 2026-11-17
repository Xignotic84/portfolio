import type { BreadcrumbList, Graph, WithContext } from "schema-dts";
import { EDUCATION } from "@/lib/data/experience";
import type { CaseStudyProject } from "@/lib/data/projects";
import { site } from "@/lib/site";

export const HOME_GRAPH: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
    {
      "@type": "ProfilePage",
      url: site.url,
      mainEntity: {
        "@type": "Person",
        name: site.name,
        alternateName: site.handle,
        url: site.url,
        jobTitle: site.role,
        worksFor: { "@type": "Organization", name: site.currentEmployer.name, url: site.currentEmployer.url },
        alumniOf: EDUCATION.map((entry) => ({
          "@type": "CollegeOrUniversity" as const,
          name: entry.organization,
          url: entry.url,
        })),
        sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
      },
    },
  ],
};

export function projectBreadcrumbs(project: CaseStudyProject): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: project.name, item: `${site.url}/projects/${project.id}` },
    ],
  };
}
