import { urlForImage } from '@/sanity/lib/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveProjectMedia(project: any) {
  const posterUrl = project.posterUrl || (typeof project.poster === 'string' 
    ? project.poster 
    : project.poster ? urlForImage(project.poster)?.width(1920).format('webp').url() : '');
    
  const videoUrl = project.videoFileUrl || project.videoUrl;

  return { posterUrl, videoUrl };
}
