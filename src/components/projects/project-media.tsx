import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function ProjectMedia({
  project,
  sizes,
  className,
  preload,
  zoomOnHover,
}: {
  project: Project;
  sizes: string;
  className?: string;
  preload?: boolean;
  zoomOnHover?: boolean;
}) {
  const { image, name } = project;
  const contained = image.fit === "contain";

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {contained ? (
        <Image src={image.src} alt="" fill sizes={sizes} className="scale-125 object-cover opacity-70 blur-2xl" />
      ) : null}
      <Image
        src={image.src}
        alt={`Screenshot of ${name}`}
        fill
        sizes={sizes}
        preload={preload}
        className={cn(
          contained ? "object-contain p-6" : "object-cover object-top",
          zoomOnHover && "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]",
        )}
      />
    </div>
  );
}
