import type { MetadataRoute } from "next";
import { CASE_STUDY_PROJECTS } from "@/lib/data/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url }, ...CASE_STUDY_PROJECTS.map((project) => ({ url: `${site.url}/projects/${project.id}` }))];
}
