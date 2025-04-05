import Image from "next/image";
import SubtitleTimeline from '@/components/SubtitleTimeline';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 gap-8">
      <h1 className="text-4xl font-bold mb-4">PHONT Subtitle Timeline</h1>

      
      <SubtitleTimeline />
    </div>
  );
}
