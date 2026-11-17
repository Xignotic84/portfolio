import Image from "next/image";
import type { ReactNode } from "react";
import { BeforeAfterSlider } from "@/components/motion/before-after-slider";
import { ExternalLink } from "@/components/ui/external-link";
import { RichText } from "@/components/ui/rich-text";
import type { StoryBlock, StoryEntry, StoryImage } from "@/lib/data/projects";
import { formatMonth } from "@/lib/format";

const IMAGE_SIZES = "(min-width: 768px) 720px, 100vw";

function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="space-y-2">
      {children}
      {caption ? <figcaption className="text-xs">{caption}</figcaption> : null}
    </figure>
  );
}

function CoverImage({ image }: { image: StoryImage }) {
  return <Image src={image.src} alt={image.alt} fill sizes={IMAGE_SIZES} className="object-cover object-top" />;
}

function Table({ block }: { block: Extract<StoryBlock, { type: "table" }> }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <caption className="caption-bottom border-t px-4 py-2 text-left text-xs">{block.caption}</caption>
        <thead className="text-xs">
          <tr className="border-b">
            {block.columns.map((column) => (
              <th key={column} scope="col" className="px-4 py-2.5 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {block.rows.map(([label, ...cells]) => (
            <tr key={label}>
              <th scope="row" className="px-4 py-2.5 font-medium text-foreground">
                {label}
              </th>
              {cells.map((cell, index) => (
                <td key={block.columns[index + 1]} className="px-4 py-2.5 font-mono text-xs tabular-nums">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-pretty">
          <RichText text={block.text} />
        </p>
      );
    case "image":
      return (
        <Figure caption={block.caption}>
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes={IMAGE_SIZES}
            className="w-full rounded-xl border"
          />
        </Figure>
      );
    case "compare":
      return (
        <Figure caption={block.caption}>
          <BeforeAfterSlider
            className="aspect-2/1 border"
            label={block.caption}
            beforeLabel={block.before.label}
            afterLabel={block.after.label}
            before={<CoverImage image={block.before} />}
            after={<CoverImage image={block.after} />}
          />
        </Figure>
      );
    case "table":
      return <Table block={block} />;
  }
}

export function Story({ entries }: { entries: StoryEntry[] }) {
  return (
    <ol className="relative space-y-14 before:absolute before:inset-y-2 before:left-[5px] before:w-px before:bg-border">
      {entries.map((entry) => (
        <li key={entry.title} className="relative pl-8">
          <span
            aria-hidden="true"
            className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-background bg-border-strong"
          />
          {entry.date ? (
            <time dateTime={entry.date} className="mb-1 block font-mono text-xs text-muted-foreground">
              {formatMonth(entry.date)}
            </time>
          ) : null}
          <h2 className="text-xl">{entry.title}</h2>
          <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">
            {entry.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
          {entry.source ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Original post:{" "}
              <ExternalLink href={entry.source.href} className="link">
                {entry.source.label}
              </ExternalLink>
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
