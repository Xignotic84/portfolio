import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { STACK } from "@/lib/data/stack";

export function Stack() {
  return (
    <Section id="stack" title="Stack">
      <dl className="card divide-y">
        {STACK.map(({ group, items }) => (
          <div key={group} className="space-y-2 p-4">
            <dt className="text-xs font-medium text-muted-foreground">{group}</dt>
            <dd>
              <TagList label={group} items={items} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
