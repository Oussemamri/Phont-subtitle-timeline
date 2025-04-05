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
      
      // Remove class after animation completes
      const timer = setTimeout(() => {
        setAnimationClass('');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [animate]);

  if (subtitles.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center border rounded-lg mb-4 bg-gray-50">
        <p className="text-gray-400">No subtitle at current time</p>
      </div>
    );
  }

  return (
    <div className="min-h-32 border rounded-lg p-4 mb-4 flex items-center justify-center bg-white">
      <div className={`text-center text-xl ${animationClass}`}>
        {subtitles.map((subtitle, index) => (
          <div key={index} className="mb-2">
            {subtitle.subtitle}
            <div className="text-xs text-gray-500 mt-1">
              Emotion: {subtitle.emotion} | Intensity: {subtitle.emotion_intensity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}