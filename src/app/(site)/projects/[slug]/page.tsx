import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { projectBySlugQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { H1, Metadata } from '@/components/ui/typography';
import React from 'react';
import TransitionLink from '@/components/layout/TransitionLink';
import { ArrowLeft } from 'lucide-react';
import ScreenplayTrigger from '@/components/ui/ScreenplayTrigger';
import PlayVideoButton from '@/components/ui/PlayVideoButton';
import ClientHeroVideo from '@/components/ui/ClientHeroVideo';
import ClientGalleryVideo from '@/components/ui/ClientGalleryVideo';
import { resolveProjectMedia } from '@/lib/media';

interface ExpandedGalleryItem {
  mediaType?: string;
  imageUrl?: string;
  imageFile?: unknown;
  videoUrl?: string;
  videoFileUrl?: string;
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await client.fetch(projectBySlugQuery, { slug: resolvedParams.slug });

  if (!project) {
    notFound();
  }

  const { posterUrl: mainPosterUrl, videoUrl: mainVideoUrl, youtubeUrl: finalYoutubeUrl } = resolveProjectMedia(project);

  const finalScriptUrl = project.scriptFileUrl || project.scriptUrl;

  return (
    <main className="min-h-screen bg-obsidian text-silver pb-24">
      {/* Back Button */}
      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50">
        <TransitionLink 
          href="/" 
          className="flex items-center gap-2 text-silver hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          <span className="text-micro uppercase tracking-widest">Back to Gallery</span>
        </TransitionLink>
      </div>

      {/* Hero Section for Project */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal pointer-events-none">
          <ClientHeroVideo 
            videoUrl={mainVideoUrl || null} 
            posterUrl={mainPosterUrl || null} 
            title={project.title} 
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-obsidian" />
        </div>
        
        <div className="relative z-10 text-center px-4 pt-20 max-w-5xl mx-auto">
          <Metadata className="mb-4 text-silver/70">
            {project.year} • {project.role}
          </Metadata>
          <H1 className="text-[10vw] md:text-[6vw] font-display font-bold uppercase leading-[0.9] tracking-tighter mix-blend-difference">
            {project.title}
          </H1>
          <PlayVideoButton videoUrl={mainVideoUrl || ''} youtubeUrl={finalYoutubeUrl || undefined} />
        </div>
      </section>

      {/* Content Section */}
      <section className="relative w-full px-4 md:px-12 py-12 md:py-24 max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Embedded Project Video */}
        {(finalYoutubeUrl || mainVideoUrl) && (
          <div className="w-full aspect-video mb-12 md:mb-16 bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <ClientGalleryVideo 
              videoUrl={finalYoutubeUrl || mainVideoUrl!} 
              posterUrl={mainPosterUrl || ''} 
            />
          </div>
        )}

        {project.description && (
          <div className="prose prose-invert prose-lg max-w-none text-silver/80 w-full text-left">
            <PortableText value={project.description} />
          </div>
        )}

        {finalScriptUrl && (
          <ScreenplayTrigger scriptUrl={finalScriptUrl} />
        )}
      </section>

      {/* Expanded Gallery */}
      {project.expandedGallery && project.expandedGallery.length > 0 && (
        <section className="w-full px-4 md:px-12 pb-24">
          <div className="columns-1 md:columns-2 gap-4 md:gap-8 max-w-7xl mx-auto space-y-4 md:space-y-8">
            {project.expandedGallery.map((item: ExpandedGalleryItem, idx: number) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const itemPosterUrl = item.imageUrl || (item.imageFile ? urlForImage(item.imageFile as any)?.url() : '');
              const itemVideoUrl = item.videoFileUrl || item.videoUrl;

              return (
                <div key={idx} className="relative w-full bg-charcoal rounded-sm overflow-hidden group break-inside-avoid">
                  {item.mediaType === 'video' && itemVideoUrl ? (
                    <ClientGalleryVideo videoUrl={itemVideoUrl} posterUrl={itemPosterUrl} />
                  ) : itemPosterUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={itemPosterUrl} 
                      alt={`Gallery item ${idx + 1}`} 
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
