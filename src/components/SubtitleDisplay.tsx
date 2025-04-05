import { useEffect, useState } from 'react';
import './subtitle-animation.css';
import { SubtitleType } from '@/models/types';

interface SubtitleDisplayProps {
  subtitles: SubtitleType[];
  animate: boolean;
}

export default function SubtitleDisplay({ subtitles, animate }: SubtitleDisplayProps) {
  const [animationClass, setAnimationClass] = useState('');
  const [visibleSubtitles, setVisibleSubtitles] = useState<SubtitleType[]>([]);

  // Handle subtitle appearance and animation
  useEffect(() => {
    // When subtitles change, immediately show them
    setVisibleSubtitles(subtitles);
    
    // Trigger the animation when requested
    if (animate) {
      setAnimationClass('animate-subtitle');
      const timer = setTimeout(() => {
        setAnimationClass(''); // Remove the class after the animation duration
      }, 1500); // Match the animation duration in CSS
      return () => clearTimeout(timer);
    } else {
      setAnimationClass(''); // Ensure the animation class is removed when animate is false
    }
  }, [subtitles, animate]);

  // Function to split text into individual characters with spans
  const splitTextIntoChars = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  if (visibleSubtitles.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 bg-black text-gray-500 rounded-lg">
        <p>No subtitle at the current time</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-32 bg-black text-white rounded-lg">
      <div className={`text-3xl font-semibold ${animationClass}`}>
        {visibleSubtitles.map((subtitle, index) => (
          <div key={index}>
            {splitTextIntoChars(subtitle.subtitle)}
          </div>
        ))}
      </div>
    </div>
  );
}