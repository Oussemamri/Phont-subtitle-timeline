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
      triggerAnimation(); // Trigger animation when subtitle changes
    }
  }, [currentTime, currentSubtitleIndex]);

  // Function to reliably trigger animation
  const triggerAnimation = () => {
    setAnimateSubtitle(false); // Reset animation state
    setTimeout(() => setAnimateSubtitle(true), 10); // Reapply animation state with a delay
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
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
          onAnimate={triggerAnimation} // Use the refined triggerAnimation function
          currentTime={currentTime}
          totalDuration={totalDuration}
        />
      </div>
    </div>
  );
}