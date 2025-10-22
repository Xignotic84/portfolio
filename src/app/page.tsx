import WorkExperience from "@/components/WorkExperience";
import {Separator} from "@/components/ui/separator";
import Hero from "@/components/Hero";
import MusicBlock from "@/components/MusicBlock";

export default function Home() {
  return (
    <div className={'flex-row space-y-4'}>
      <Hero/>
      <Separator/>
      <div className="grid grid-cols-1 md:grid-cols-3 s gap-4">
        <WorkExperience/>
        <MusicBlock/>
      </div>
    </div>
  );
}
