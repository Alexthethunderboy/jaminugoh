import React from 'react';
import { client } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import TransitionLink from '@/components/layout/TransitionLink';
import { H1, Metadata } from '@/components/ui/typography';

export const revalidate = 60;

export interface ArchiveProject {
  _id?: string;
  title?: string;
  slug?: string;
  year?: string;
  role?: string;
  poster?: unknown;
  posterUrl?: string;
  videoUrl?: string;
  videoFileUrl?: string;
}

export default async function ArchivePage() {
  let projects: ArchiveProject[] = [];

  try {
    const config = client.config();
    if (config.projectId && config.projectId !== 'dummy-project-id') {
      const fetchedProjects = await client.fetch(projectsQuery);
      if (fetchedProjects && fetchedProjects.length > 0) {
        projects = fetchedProjects;
      }
    }
  } catch (error) {
    console.error("Failed to fetch sanity projects for archive:", error);
  }

  return (
    <main className="min-h-screen bg-obsidian text-silver pt-32 pb-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center md:text-left">
          <Metadata className="mb-4 text-silver/60">Selected Works</Metadata>
          <H1 className="text-[12vw] md:text-[8vw] font-display font-bold uppercase leading-none tracking-tighter text-white">
            Archive
          </H1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {projects.map((project: ArchiveProject, idx: number) => {
            const finalPosterUrl = project.posterUrl || (typeof project.poster === 'string' 
              ? project.poster 
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              : project.poster ? urlForImage(project.poster as any)?.url() : '');
              
            const finalVideoUrl = project.videoFileUrl || project.videoUrl;

            return (
              <div key={project._id || idx} className="group flex flex-col">
                {project.slug ? (
                  <TransitionLink href={`/projects/${project.slug}`} className="relative w-full aspect-4/5 md:aspect-video bg-charcoal overflow-hidden rounded-sm block cursor-pointer mb-6">
                    {finalVideoUrl ? (
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        poster={finalPosterUrl}
                      >
                        <source src={finalVideoUrl} type="video/mp4" />
                      </video>
                    ) : finalPosterUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={finalPosterUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    ) : null}
                  </TransitionLink>
                ) : (
                  <div className="relative w-full aspect-4/5 md:aspect-video bg-charcoal overflow-hidden rounded-sm mb-6">
                    {finalVideoUrl ? (
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        poster={finalPosterUrl}
                      >
                        <source src={finalVideoUrl} type="video/mp4" />
                      </video>
                    ) : finalPosterUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={finalPosterUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    ) : null}
                  </div>
                )}
                
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl md:text-2xl font-display font-bold uppercase text-white group-hover:text-silver transition-colors">
                      {project.title}
                    </h2>
                    <Metadata className="text-silver/40">{project.year}</Metadata>
                  </div>
                  <Metadata className="text-silver/60">{project.role}</Metadata>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
