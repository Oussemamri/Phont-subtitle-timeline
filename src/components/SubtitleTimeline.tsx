'use client';

import { useState, useEffect } from 'react';
import SubtitleDisplay from './SubtitleDisplay';
import TimelineControls from './TimelineControls';
import TimelineTrack from './TimelineTrack';
import subtitlesData from '../../data/Output_from-ourApi.json';

export default function SubtitleTimeline() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animateSubtitle, setAnimateSubtitle] = useState(false);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(-1);
  const [displayedSubtitles, setDisplayedSubtitles] = useState<any[]>([]);

  // Determine the total duration of the timeline by finding the latest end_time
  const totalDuration = Math.max(...subtitlesData.map(subtitle => subtitle.end_time));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime(prevTime => {
          // Loop back to start when reaching the end
          if (prevTime >= totalDuration) {
            return 0;
          }
          return prevTime + 0.1; 
        });
      }, 100);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, totalDuration]);

  // Find currently visible subtitles
  useEffect(() => {
    const visibleSubtitles = subtitlesData.filter(
      subtitle => currentTime >= subtitle.start_time && currentTime <= subtitle.end_time
    );
    
    setDisplayedSubtitles(visibleSubtitles);
    
    // Find the current subtitle index (for new subtitle detection)
    const newIndex = subtitlesData.findIndex(
      subtitle => currentTime >= subtitle.start_time && currentTime <= subtitle.end_time
    );
    
    // Trigger animation if we've moved to a new subtitle
    if (newIndex !== -1 && newIndex !== currentSubtitleIndex) {
      setCurrentSubtitleIndex(newIndex);
      setAnimateSubtitle(true);
      
      // Reset animation after a short delay
      setTimeout(() => {
        setAnimateSubtitle(false);
      }, 1500);
    }
  }, [currentTime, currentSubtitleIndex]);

  // Handle play/pause
  const togglePlayback = () => {
    setIsPlaying(prev => !prev);
  };

  // Force animation on button press
  const triggerAnimation = () => {
    setAnimateSubtitle(true);
    
    // Reset animation after it completes
    setTimeout(() => {
      setAnimateSubtitle(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SubtitleDisplay 
        subtitles={displayedSubtitles} 
        animate={animateSubtitle} 
      />
      
      <div className="mt-8">
        <TimelineTrack 
          subtitles={subtitlesData} 
          currentTime={currentTime}
          totalDuration={totalDuration}
          onSeek={setCurrentTime}
        />
        
        <TimelineControls 
          isPlaying={isPlaying}
          onPlayPause={togglePlayback}
          onAnimate={triggerAnimation}
          currentTime={currentTime}
          totalDuration={totalDuration}
        />
      </div>
    </div>
  );
}