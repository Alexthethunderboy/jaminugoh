import HeroStream from "@/components/sections/HeroStream";
import WorksGallery from "@/components/sections/WorksGallery";
import ScreenplayVault from "@/components/sections/ScreenplayVault";
import SonicLab from "@/components/sections/SonicLab";
import { Metadata } from "@/components/ui/typography";
import { client } from "@/sanity/lib/client";
import { heroSectionQuery, projectsQuery, screenplaysQuery, audioTracksQuery } from "@/sanity/lib/queries";
import { FALLBACK_HERO, FALLBACK_PROJECTS, FALLBACK_SCRIPTS, FALLBACK_TRACKS } from "@/data/fallback";

export default async function Home() {
  let hero = FALLBACK_HERO;
  let projects = FALLBACK_PROJECTS;
  let screenplays = FALLBACK_SCRIPTS;
  let tracks = FALLBACK_TRACKS;

  try {
    const config = client.config();
    if (config.projectId && config.projectId !== 'dummy-project-id') {
      const [fetchedHero, fetchedProjects, fetchedScreenplays, fetchedTracks] = await Promise.all([
        client.fetch(heroSectionQuery),
        client.fetch(projectsQuery),
        client.fetch(screenplaysQuery),
        client.fetch(audioTracksQuery)
      ]);

      if (fetchedHero) hero = fetchedHero;
      if (fetchedProjects && fetchedProjects.length > 0) projects = fetchedProjects;
      if (fetchedScreenplays && fetchedScreenplays.length > 0) screenplays = fetchedScreenplays;
      if (fetchedTracks && fetchedTracks.length > 0) tracks = fetchedTracks;
    }
  } catch (error) {
    console.error("Failed to fetch sanity data:", error);
  }

  return (
    <main className="relative min-h-screen">
      <HeroStream data={hero} />
      <WorksGallery projects={projects} />
      <ScreenplayVault scripts={screenplays} />
      <SonicLab tracks={tracks} />
      
      {/* Footer / Connect Section */}
      <section className="relative min-h-[60vh] bg-charcoal flex flex-col items-center justify-center py-24 text-center">
        <Metadata className="mb-8">Ready to collaborate?</Metadata>
        <h2 className="text-[12vw] font-display font-bold uppercase text-silver leading-none mb-12">
          Let&apos;s Talk
        </h2>
        <a 
          href="mailto:jamin@example.com" 
          className="text-micro border-b border-silver/20 pb-2 hover:border-silver transition-colors"
        >
          jaminugoh.film@gmail.com
        </a>
        
        <div className="mt-24 flex gap-8">
          {["Instagram", "Vimeo", "YouTube", "LinkedIn"].map((social) => (
            <a key={social} href="#" className="text-micro text-silver/40 hover:text-white transition-colors">
              {social}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
