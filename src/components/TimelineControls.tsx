interface TimelineControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onAnimate: () => void;
  currentTime: number;
  totalDuration: number;
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
}

export default function TimelineControls({
  isPlaying,
  onPlayPause,
  onAnimate,
  currentTime,
  totalDuration,
  isAnimationEnabled, // Keep this prop for potential future use
  toggleAnimation, // Keep this prop for potential future use
}: TimelineControlsProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex space-x-4">
        <button
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          onClick={onPlayPause}
        >
          {isPlaying ? '❚❚ Pause' : '▶ Play'}
        </button>
        <button
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          onClick={onAnimate}
        >
          Animate
        </button>
      </div>
      <div className="text-white text-sm">
        {formatTime(currentTime)} / {formatTime(totalDuration)}
      </div>
    </div>
  );
}