/**
 * Utility functions for YouTube video URLs and thumbnails.
 */

/**
 * Extracts the 11-character YouTube video ID from a given YouTube link.
 * Supports:
 * - standard watch URLs: youtube.com/watch?v=VIDEO_ID
 * - short URLs: youtu.be/VIDEO_ID
 * - embed URLs: youtube.com/embed/VIDEO_ID
 * - shorts URLs: youtube.com/shorts/VIDEO_ID
 * - mobile URLs: m.youtube.com/watch?v=VIDEO_ID
 */
export function getYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  
  // Clean up whitespace
  const trimmed = url.trim();
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  // Try directly checking for 11 character string if no format matched
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.')) {
    return trimmed;
  }
  
  return null;
}

/**
 * Returns the professional hqdefault thumbnail URL for a YouTube video.
 * Fallbacks to the provided default image if not a YouTube URL.
 */
export function getYouTubeThumbnailUrl(url: string | null | undefined, defaultThumbnailUrl: string): string {
  const videoId = getYouTubeId(url);
  if (videoId) {
    // hqdefault (480x360) is always available and fits video covers nicely.
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return defaultThumbnailUrl;
}

/**
 * Returns a direct watch link for native playback on YouTube.
 * If not a YouTube video, returns the original URL.
 */
export function getYouTubeWatchUrl(url: string | null | undefined): string {
  if (!url) return '';
  const videoId = getYouTubeId(url);
  if (videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  return url;
}

/**
 * Returns an embeddable YouTube URL.
 * If not a YouTube video, returns the original URL.
 */
export function getYouTubeEmbedUrl(url: string | null | undefined): string {
  if (!url) return '';
  const videoId = getYouTubeId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}


