import { ExperienceTimeline } from "@/components/experience/timeline";
import { Section } from "@/components/ui/section";
import { EDUCATION, WORK_EXPERIENCE } from "@/lib/data/experience";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ExperienceTimeline entries={WORK_EXPERIENCE} />
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" title="Education">
      <ExperienceTimeline entries={EDUCATION} />
    </Section>
  );
}
