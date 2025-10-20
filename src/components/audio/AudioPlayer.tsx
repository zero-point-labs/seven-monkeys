'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import ThemeIcon from '@/components/brand/ThemeIcon';
import { Howl } from 'howler';

interface AudioPlayerProps {
  djId: string;
  djName: string;
  streamUrl: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export default function AudioPlayer({
  djId,
  djName,
  streamUrl,
  isPlaying,
  onPlay,
  onPause,
  onStop
}: AudioPlayerProps) {
  const howlRef = useRef<Howl | null>(null);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Howl instance for better mobile support
  useEffect(() => {
    if (!streamUrl) return;

    setIsLoading(true);
    setError(null);

    // Clean up previous instance
    if (howlRef.current) {
      howlRef.current.unload();
    }

    // Create new Howl instance with mobile-optimized settings
    howlRef.current = new Howl({
      src: [streamUrl],
      html5: true, // Use HTML5 audio for better mobile support
      preload: false, // Don't preload for streaming
      volume: isMuted ? 0 : volume,
      format: ['mp3', 'aac', 'ogg', 'm4a'], // Support multiple formats
      onload: () => {
        setIsLoading(false);
        console.log('Audio loaded successfully');
      },
      onloaderror: (id, error) => {
        setIsLoading(false);
        setError('Failed to load audio stream');
        console.error('Audio load error:', error);
      },
      onplay: () => {
        console.log('Audio started playing');
        startProgressTracking();
      },
      onpause: () => {
        console.log('Audio paused');
        stopProgressTracking();
      },
      onstop: () => {
        console.log('Audio stopped');
        stopProgressTracking();
        setCurrentTime(0);
      },
      onend: () => {
        console.log('Audio ended');
        stopProgressTracking();
      }
    });

    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
      stopProgressTracking();
    };
  }, [streamUrl]);

  // Handle play/pause based on isPlaying prop
  useEffect(() => {
    if (!howlRef.current) return;

    if (isPlaying && !howlRef.current.playing()) {
      howlRef.current.play();
    } else if (!isPlaying && howlRef.current.playing()) {
      howlRef.current.pause();
    }
  }, [isPlaying]);

  // Update volume when volume state changes
  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const startProgressTracking = () => {
    stopProgressTracking();
    progressIntervalRef.current = setInterval(() => {
      if (howlRef.current) {
        const seek = howlRef.current.seek();
        if (typeof seek === 'number') {
          setCurrentTime(seek);
        }
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handlePlayPause = () => {
    if (isLoading) return;

    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleStop = () => {
    if (howlRef.current) {
      howlRef.current.stop();
    }
    onStop();
  };

  const handleVolumeChange = (value: number[]) => {
    const vol = value[0];
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-orange-400/20">
      <CardContent className="p-6">
        
        {/* Player Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">{djName}</h3>
            <p className="text-sm text-gray-400">Live Stream</p>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && (
              <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
            )}
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleStop}
            className="border-gray-600 text-gray-400 hover:border-red-400 hover:text-red-400"
          >
            <ThemeIcon type="stop" size="sm" />
          </Button>
          
          <Button
            size="lg"
            onClick={handlePlayPause}
            disabled={isLoading}
            className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-black font-bold px-8 py-3 rounded-xl drop-shadow-[0_0_20px_rgba(251,146,60,0.4)]"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <ThemeIcon type="pause" size="md" />
            ) : (
              <ThemeIcon type="play" size="md" />
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleMuteToggle}
            className={`border-gray-600 ${isMuted ? 'text-red-400 border-red-400' : 'text-gray-400'} hover:border-orange-400 hover:text-orange-400`}
          >
            <ThemeIcon type={isMuted ? "mute" : "volume"} size="sm" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : '∞'}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-pink-400 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' 
              }}
            />
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <ThemeIcon type={isMuted ? "mute" : "volume"} size="sm" className={isMuted ? "text-red-400" : "text-gray-400"} />
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={1}
            min={0}
            step={0.1}
            className="flex-1"
          />
          <span className="text-xs text-gray-400 w-8">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>

        {/* Stream Info */}
        <div className="mt-4 p-3 bg-gray-800/40 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Stream URL</div>
          <div className="text-sm text-gray-300 font-mono break-all">
            {streamUrl || 'No stream available'}
          </div>
          
          {/* Mobile Optimization Info */}
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span>🎧</span>
                  <span>Mobile Optimized</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>📱</span>
                  <span>Background Play</span>
                </span>
              </div>
              <div className="text-orange-400 font-medium">
                Howler.js Powered
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
