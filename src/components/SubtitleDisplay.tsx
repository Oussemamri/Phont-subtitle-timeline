import { useEffect, useState } from 'react';
import './subtitle-animation.css';

interface SubtitleDisplayProps {
  subtitles: any[];
  animate: boolean;
}

export default function SubtitleDisplay({ subtitles, animate }: SubtitleDisplayProps) {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (animate) {
      setAnimationClass('animate-subtitle');
      const timer = setTimeout(() => setAnimationClass(''), 1500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  if (subtitles.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 bg-black text-gray-500 rounded-lg">
        <p>No subtitle at the current time</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-32 bg-black text-white rounded-lg">
      <div className={`text-3xl font-semibold ${animationClass}`}>
        {subtitles.map((subtitle, index) => (
          <div key={index}>{subtitle.subtitle}</div>
        ))}
      </div>
    </div>
  );
}