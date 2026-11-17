export const site = {
  name: "Franz Herrmann",
  handle: "Xignotic",
  url: "https://xignotic.dev",
  locale: "en_US",
  role: "Full Stack Engineer",
  title: "Franz Herrmann · Full Stack Engineer",
  description:
    "Franz Herrmann is a Full Stack Engineer based in Amsterdam, Netherlands, currently working at Booking.com.",
  location: {
    city: "Amsterdam",
    country: "Netherlands",
  },
  currentEmployer: {
    name: "Booking.com",
    url: "https://booking.com",
  },
  keywords: [
    "Franz Herrmann",
    "Xignotic",
    "Full Stack Engineer",
    "Software Engineer",
    "Booking.com",
    "TopStats.gg",
    "TypeScript",
    "React",
    "Node.js",
    "Amsterdam",
  ],
  links: {
    github: "https://github.com/Xignotic84",
    linkedin: "",
    email: "contact@xignotic.dev",
  },
} as const;

export type SocialLink = {
  label: string;
  href: string;
  kind: "github" | "linkedin" | "email";
};

export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [
    { label: "GitHub", href: site.links.github, kind: "github" },
    { label: "LinkedIn", href: site.links.linkedin, kind: "linkedin" },
    { label: "Email", href: site.links.email ? `mailto:${site.links.email}` : "", kind: "email" },
  ];
  return links.filter((link) => link.href);
}
