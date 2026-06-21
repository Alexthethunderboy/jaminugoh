import { urlForImage } from '@/sanity/lib/image';

const isYoutubeLink = (url: string | null) => !!(url && (url.includes('youtube.com') || url.includes('youtu.be')));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveProjectMedia(project: any) {
  const posterUrl = project.posterUrl || (typeof project.poster === 'string' 
    ? project.poster 
    : project.poster ? urlForImage(project.poster)?.width(1920).format('webp').url() : '');
    
  // Ensure videoUrl is only MP4, never a YouTube link
  const videoUrl = project.videoFileUrl || (project.videoUrl && !isYoutubeLink(project.videoUrl) ? project.videoUrl : null);

  // If a YouTube link was pasted in videoUrl, use it as youtubeUrl
  const youtubeUrl = project.youtubeUrl || (project.videoUrl && isYoutubeLink(project.videoUrl) ? project.videoUrl : null);

  return { posterUrl, videoUrl, youtubeUrl };
}
