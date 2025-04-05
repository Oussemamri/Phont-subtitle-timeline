interface TimelineTrackProps {
  subtitles: any[];
  currentTime: number;
  totalDuration: number;
  onSeek: (time: number) => void;
}

export default function TimelineTrack({
  subtitles,
  currentTime,
  totalDuration,
  onSeek
}: TimelineTrackProps) {
  
  // Convert time to percentage of total duration
  const timeToPercent = (time: number) => (time / totalDuration) * 100;
  
  // Handle timeline click to seek
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percent = clickPosition / rect.width;
    const newTime = percent * totalDuration;
    onSeek(newTime);
  };

  return (
    <div className="relative h-12 bg-gray-100 rounded-lg mb-4 cursor-pointer" onClick={handleTrackClick}>
      {/* Subtitle markers */}
      {subtitles.map((subtitle, index) => (
        <div
          key={index}
          className="absolute h-6 bg-blue-400 opacity-70 rounded"
          style={{
            left: `${timeToPercent(subtitle.start_time)}%`,
            width: `${timeToPercent(subtitle.end_time - subtitle.start_time)}%`,
            top: '12px'
          }}
          title={subtitle.subtitle}
        />
      ))}
      
      {/* Current time indicator */}
      <div
        className="absolute h-full w-0.5 bg-red-500 top-0 pointer-events-none"
        style={{ left: `${timeToPercent(currentTime)}%` }}
      />
      
      {/* Time labels */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-xs text-gray-600">
        <span>0:00</span>
        <span>{Math.floor(totalDuration / 60)}:{Math.floor(totalDuration % 60).toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
}