'use client';

import { useState, useEffect } from 'react';
import SubtitleDisplay from '@/components/SubtitleDisplay';
import TimelineControls from '@/components/TimelineControls';
import TimelineTrack from '@/components/TimelineTrack';
import subtitlesData from '../../data/Output_from-ourApi.json';
import { SubtitleType } from '@/models/types';

export default function SubtitleTimeline() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animateSubtitle, setAnimateSubtitle] = useState(false);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(-1);
  const [displayedSubtitles, setDisplayedSubtitles] = useState<SubtitleType[]>([]);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  const totalDuration = Math.max(...subtitlesData.map((subtitle) => subtitle.end_time));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => (prevTime >= totalDuration ? 0 : prevTime + 0.1));
      }, 100);
    }
    return () => timer && clearInterval(timer);
  }, [isPlaying, totalDuration]);

  useEffect(() => {
    const visibleSubtitles = subtitlesData.filter(
      (subtitle) => currentTime >= subtitle.start_time && currentTime <= subtitle.end_time
    );
    setDisplayedSubtitles(visibleSubtitles);

    const newIndex = subtitlesData.findIndex(
      (subtitle) => currentTime >= subtitle.start_time && currentTime <= subtitle.end_time
    );
    if (newIndex !== -1 && newIndex !== currentSubtitleIndex) {
      setCurrentSubtitleIndex(newIndex);
      if (isAnimationEnabled) {
        triggerAnimation(); // Trigger animation when subtitle changes
      }
    }
  }, [currentTime, currentSubtitleIndex, isAnimationEnabled]);

  // Function to reliably trigger animation
  const triggerAnimation = () => {
    if (isAnimationEnabled) {
      setAnimateSubtitle(false); // Reset animation state
      setTimeout(() => setAnimateSubtitle(true), 10); // Reapply animation state with a delay
    }
  };

  const toggleAnimation = () => {
    setIsAnimationEnabled((prev) => {
      const newValue = !prev;
      if (!newValue) {
        setAnimateSubtitle(false); // Reset animation state when disabled
      }
      return newValue;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Animation Toggle Switch in the top left corner */}
      <div className="absolute -top-12 left-0 flex items-center space-x-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAnimationEnabled}
            onChange={toggleAnimation}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          <span className="ml-3 text-sm font-medium text-white">Animation</span>
        </label>
      </div>

      <SubtitleDisplay subtitles={displayedSubtitles} animate={animateSubtitle} />
      <div className="mt-8">
        <TimelineTrack
          subtitles={subtitlesData}
          currentTime={currentTime}
          totalDuration={totalDuration}
          onSeek={setCurrentTime}
        />
        <TimelineControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying((prev) => !prev)}
          onAnimate={triggerAnimation}
          currentTime={currentTime}
          totalDuration={totalDuration}
          isAnimationEnabled={isAnimationEnabled}
          toggleAnimation={toggleAnimation}
        />
      </div>
    </div>
  );
}