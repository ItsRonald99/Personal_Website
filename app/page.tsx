import content from "@/data/content";
import HeroSection from "@/app/sections/HeroSection";
import ProjectsSection from "@/app/sections/ProjectsSection";
import InterestsSection from "@/app/sections/InterestsSection";
import EducationSection from "@/app/sections/EducationSection";
import FooterSection from "@/app/sections/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection
        content={{
          name: content.name,
          role: content.role,
          tagline: content.tagline,
          bio: content.bio,
          github: content.github,
          email: content.email,
        }}
      />
      <ProjectsSection projects={content.projects} />
      <InterestsSection interests={content.interests} />
      <EducationSection education={content.education} />
      <FooterSection
        content={{ name: content.name, github: content.github, email: content.email }}
      />
    </main>
  );
}
