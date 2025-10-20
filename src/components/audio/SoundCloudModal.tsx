'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeIcon from '@/components/brand/ThemeIcon';
import MonkeyMascot from '@/components/brand/MonkeyMascot';
import { DJ } from '@/lib/api';

interface SoundCloudModalProps {
  dj: DJ | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SoundCloudModal({ dj, isOpen, onClose }: SoundCloudModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate SoundCloud embed URL
  const getEmbedUrl = (soundcloudUrl: string) => {
    // SoundCloud Widget API parameters
    const params = new URLSearchParams({
      url: soundcloudUrl,
      color: '#ff5500', // Orange color matching your theme
      auto_play: 'true',
      hide_related: 'false',
      show_comments: 'true',
      show_user: 'true',
      show_reposts: 'false',
      show_teaser: 'true',
      visual: 'true',
      show_artwork: 'true',
      height: '400'
    });

    return `https://w.soundcloud.com/player/?${params.toString()}`;
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load SoundCloud player');
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !dj) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-orange-400/30 shadow-2xl">
          {/* Header */}
          <CardHeader className="text-center pb-4 border-b border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-spin-slow opacity-30"></div>
                  <div className="relative w-full h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                    <MonkeyMascot size="md" variant={dj.avatar as 'dj' | 'soulful' | 'lazy-sunday' | 'pool-party'} />
                  </div>
                  <div className="absolute inset-0 border-2 border-orange-400/50 rounded-full animate-ping"></div>
                </div>
                <div className="text-left">
                  <CardTitle className="text-2xl font-bold text-white">{dj.name}</CardTitle>
                  <p className="text-orange-400 font-medium">{dj.genre}</p>
                </div>
              </div>
              
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full w-10 h-10 p-0"
              >
                <ThemeIcon type="stop" size="sm" />
              </Button>
            </div>

            {/* DJ Info */}
            <div className="text-center">
              <p className="text-gray-300 text-sm mb-3">{dj.description}</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-400 font-medium">LIVE</span>
                </div>
                <div className="text-gray-400">•</div>
                <div className="text-gray-300">{dj.listeners} listeners</div>
                <div className="text-gray-400">•</div>
                <div className="text-gray-300">Now Playing: {dj.currentTrack}</div>
              </div>
            </div>
          </CardHeader>

          {/* SoundCloud Player */}
          <CardContent className="p-6">
            {isLoading && (
              <div className="flex items-center justify-center h-96 bg-gray-800/50 rounded-lg mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                    <ThemeIcon type="music" size="md" />
                  </div>
                  <p className="text-gray-300">Loading SoundCloud player...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center h-96 bg-red-900/20 border border-red-500/30 rounded-lg mb-4">
                <div className="text-center">
                  <ThemeIcon type="stop" size="lg" className="text-red-400 mb-4" />
                  <p className="text-red-400 font-medium mb-2">Failed to load player</p>
                  <p className="text-gray-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            {dj.soundcloudUrl && (
              <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <iframe
                  ref={iframeRef}
                  width="100%"
                  height="400"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={getEmbedUrl(dj.soundcloudUrl)}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  className="rounded-lg shadow-lg"
                />
              </div>
            )}

            {!dj.soundcloudUrl && (
              <div className="flex items-center justify-center h-96 bg-gray-800/50 border border-gray-700/50 rounded-lg">
                <div className="text-center">
                  <ThemeIcon type="music" size="lg" className="text-gray-400 mb-4" />
                  <p className="text-gray-300 font-medium mb-2">No SoundCloud content available</p>
                  <p className="text-gray-400 text-sm">This DJ hasn&apos;t set up their SoundCloud yet</p>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                <ThemeIcon type="music" size="sm" className="text-pink-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">{dj.listeners}</div>
                <div className="text-gray-400 text-sm">Listeners</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                <ThemeIcon type="music" size="sm" className="text-orange-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">{dj.genre}</div>
                <div className="text-gray-400 text-sm">Genre</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                <ThemeIcon type="play" size="sm" className="text-green-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">LIVE</div>
                <div className="text-gray-400 text-sm">Status</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => window.open(dj.soundcloudUrl, '_blank')}
                className="flex-1 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-black font-semibold"
                disabled={!dj.soundcloudUrl}
              >
                <ThemeIcon type="external-link" className="mr-2" />
                Open in SoundCloud
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
              >
                <ThemeIcon type="stop" className="mr-2" />
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
