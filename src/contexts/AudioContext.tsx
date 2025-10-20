'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { djAPI, DJ } from '@/lib/api';

interface AudioContextType {
  currentDJ: DJ | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  djs: DJ[];
  selectedDJ: DJ | null; // For modal display
  playDJ: (dj: DJ) => Promise<void>;
  selectDJ: (dj: DJ | null) => void; // For opening modal
  pauseAudio: () => void;
  stopAudio: () => void;
  setError: (error: string | null) => void;
  refreshDJs: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Mock DJ data with SoundCloud URLs
export const mockDJs: DJ[] = [
  {
    id: 'vinyl-mafia',
    name: 'Vinyl Mafia',
    genre: 'House Music',
    status: 'live',
    description: 'Legendary house music vibes with soul-stirring beats',
    avatar: 'dj',
    listeners: 42,
    currentTrack: 'I Feel Like Slapping A N Today',
    soundcloudUrl: 'https://soundcloud.com/christopher-yohaya-mamunu-adjetey/i-feel-like-slapping-a-n-today',
    soundcloudTrackId: 'christopher-yohaya-mamunu-adjetey/i-feel-like-slapping-a-n-today',
    soundcloudUser: 'christopher-yohaya-mamunu-adjetey'
  },
  {
    id: 'andy-von-emmanuel',
    name: 'Andy Von Emmanuel',
    genre: 'Deep House',
    status: 'live',
    description: 'Soulful deep house that moves your spirit',
    avatar: 'soulful',
    listeners: 28,
    currentTrack: 'Electric Soulgarden Mix',
    soundcloudUrl: 'https://soundcloud.com/andyvonemmanuel/electric-soulgarden-mix',
    soundcloudTrackId: '987654321',
    soundcloudUser: 'andyvonemmanuel'
  },
  {
    id: 'moses-m',
    name: 'Moses M',
    genre: 'Sundown House',
    status: 'live',
    description: 'Sundown house sessions for lazy Sundays',
    avatar: 'lazy-sunday',
    listeners: 15,
    currentTrack: 'Chill Sunset Vibes',
    soundcloudUrl: 'https://soundcloud.com/mosesm/chill-sunset-vibes',
    soundcloudTrackId: '456789123',
    soundcloudUser: 'mosesm'
  },
  {
    id: 'pool-party-dj',
    name: 'Pool Party DJ',
    genre: 'Tropical House',
    status: 'live',
    description: 'Tropical vibes for pool parties',
    avatar: 'pool-party',
    listeners: 33,
    currentTrack: 'Tropical Paradise Mix',
    soundcloudUrl: 'https://soundcloud.com/poolpartydj/tropical-paradise-mix',
    soundcloudTrackId: '789123456',
    soundcloudUser: 'poolpartydj'
  }
];

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentDJ, setCurrentDJ] = useState<DJ | null>(null);
  const [selectedDJ, setSelectedDJ] = useState<DJ | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [djs, setDJs] = useState<DJ[]>([]);

  // Load DJs on mount
  useEffect(() => {
    refreshDJs();
  }, []);

  const refreshDJs = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedDJs = await djAPI.getAll();
      setDJs(fetchedDJs);
    } catch (err) {
      console.error('Failed to fetch DJs:', err);
      setError('Failed to load DJs');
      // Fallback to mock data
      setDJs(mockDJs);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectDJ = useCallback((dj: DJ | null) => {
    setSelectedDJ(dj);
    if (dj) {
      setCurrentDJ(dj);
      setIsPlaying(true);
    }
  }, []);

  const playDJ = useCallback(async (dj: DJ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Set new DJ
      setCurrentDJ(dj);
      setSelectedDJ(dj);
      
      // Start playing (SoundCloud will handle the actual playback)
      setIsPlaying(true);
      setIsLoading(false);
      
      // Log for debugging
      console.log(`Now playing: ${dj.name} - ${dj.currentTrack}`);
      
    } catch (err) {
      setError('Failed to start audio stream');
      setIsLoading(false);
      console.error('Audio playback error:', err);
    }
  }, []);

  const pauseAudio = useCallback(async () => {
    try {
      setIsPlaying(false);
      console.log('Audio paused');
    } catch (err) {
      console.error('Failed to pause audio:', err);
    }
  }, []);

  const stopAudio = useCallback(async () => {
    try {
      setCurrentDJ(null);
      setSelectedDJ(null);
      setIsPlaying(false);
      console.log('Audio stopped');
    } catch (err) {
      console.error('Failed to stop audio:', err);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsPlaying(false);
      setCurrentDJ(null);
    };
  }, []);

  const value: AudioContextType = {
    currentDJ,
    selectedDJ,
    isPlaying,
    isLoading,
    error,
    djs,
    playDJ,
    selectDJ,
    pauseAudio,
    stopAudio,
    setError,
    refreshDJs
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

export type { DJ };
