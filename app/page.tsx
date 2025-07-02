import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { ContactSection } from "@/components/sections/contact";

/**
 * Main portfolio homepage
 */
export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Contact Section */}
        <ContactSection />
      </main>
    </>
  );
}
