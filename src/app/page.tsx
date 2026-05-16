import HeroStream from "@/components/sections/HeroStream";
import WorksGallery from "@/components/sections/WorksGallery";
import ScreenplayVault from "@/components/sections/ScreenplayVault";
import SonicLab from "@/components/sections/SonicLab";
import { Metadata } from "@/components/ui/typography";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroStream />
      <WorksGallery />
      <ScreenplayVault />
      <SonicLab />
      
      {/* Footer / Connect Section */}
      <section className="relative min-h-[60vh] bg-charcoal flex flex-col items-center justify-center py-24 text-center">
        <Metadata className="mb-8">Ready to collaborate?</Metadata>
        <h2 className="text-[12vw] font-display font-bold uppercase text-silver leading-none mb-12">
          Let's Talk
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
