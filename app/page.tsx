import Navigation from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";

/**
 * Main workfolio homepage
 */
export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
    </>
  );
}
