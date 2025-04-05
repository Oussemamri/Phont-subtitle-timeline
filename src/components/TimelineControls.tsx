interface TimelineControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onAnimate: () => void;
  currentTime: number;
  totalDuration: number;
}

export default function TimelineControls({
  isPlaying,
  onPlayPause,
  onAnimate,
  currentTime,
  totalDuration
}: TimelineControlsProps) {
  
  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={onPlayPause}
        >
          {isPlaying ? '❚❚ Pause' : '▶ Play'}
        </button>
        
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          onClick={onAnimate}
        >
          Animate Subtitle
        </button>
      </div>
      
      <div className="text-sm">
        {formatTime(currentTime)} / {formatTime(totalDuration)}
      </div>
    </div>
  );
}