// /web/components/course/VideoPlayer.tsx

interface VideoPlayerProps {
  videoId?: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  // If no video ID was provided, show a message.
  if (!videoId) {
    return <div className="max-w-4xl mx-auto text-center">Video not available.</div>;
  }
  
  // This structure creates a responsive container that keeps the 16:9 video ratio.
  return (
    <div className="max-w-4xl mx-auto bg-black rounded-lg shadow-xl overflow-hidden">
      <div className="aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}