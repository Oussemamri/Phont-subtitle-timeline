import { SubtitleType } from '@/models/types';
interface TimelineTrackProps {
  subtitles: SubtitleType[];
  currentTime: number;
  totalDuration: number;
  onSeek: (time: number) => void;
}

export default function TimelineTrack({
  subtitles,
  currentTime,
  totalDuration,
  onSeek,
}: TimelineTrackProps) {
  const timeToPercent = (time: number) => (time / totalDuration) * 100;

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percent = clickPosition / rect.width;
    const newTime = percent * totalDuration;
    onSeek(newTime);
  };

  return (
    <div
      className="relative h-16 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg cursor-pointer"
      onClick={handleTrackClick}
    >
      {subtitles.map((subtitle, index) => (
        <div
          key={index}
          className="absolute h-4 bg-white opacity-70 rounded"
          style={{
            left: `${timeToPercent(subtitle.start_time)}%`,
            width: `${timeToPercent(subtitle.end_time - subtitle.start_time)}%`,
            top: '6px',
          }}
          title={subtitle.subtitle}
        />
      ))}
      <div
        className="absolute h-full w-1 bg-red-500 top-0 pointer-events-none"
        style={{ left: `${timeToPercent(currentTime)}%` }}
      />
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-sm text-white">
        <span>0:00</span>
        <span>
          {Math.floor(totalDuration / 60)}:
          {Math.floor(totalDuration % 60).toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}