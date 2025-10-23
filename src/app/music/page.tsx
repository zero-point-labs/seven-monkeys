'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BrandLogo from '@/components/brand/BrandLogo';
import MonkeyMascot from '@/components/brand/MonkeyMascot';
import ThemeIcon from '@/components/brand/ThemeIcon';
import SoundCloudModal from '@/components/audio/SoundCloudModal';
import { AudioProvider, useAudio } from '@/contexts/AudioContext';
import { DJ } from '@/lib/api';

// Impressive Loading Component
const LoadingScreen: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const loadingSteps = [
      { progress: 0, text: 'Loading...' },
      { progress: 50, text: 'Connecting...' },
      { progress: 100, text: 'Ready! 🎧' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 600); // Faster updates every 600ms

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4 animate-float">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-spin-slow opacity-30"></div>
            <div className="relative w-full h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center animate-glow-pulse">
              <MonkeyMascot size="lg" variant="default" />
            </div>
            <div className="absolute inset-0 border-2 border-orange-400/50 rounded-full animate-ping"></div>
          </div>
          <BrandLogo size="lg" variant="full" className="text-white animate-pulse" />
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
            {loadingText}
          </h2>
          <p className="text-gray-400 text-sm">
            Seven Monkeys DJ Platform
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-8">
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${loadingProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-orange-400 font-bold text-sm">{loadingProgress}%</span>
          </div>
        </div>

        {/* Music Wave Animation - Simplified for faster loading */}
        <div className="flex justify-center items-end space-x-1 mb-8">
          <div className="w-1 h-8 bg-orange-400 rounded-full animate-music-wave"></div>
          <div className="w-1 h-12 bg-pink-400 rounded-full animate-music-wave" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-6 bg-yellow-400 rounded-full animate-music-wave" style={{ animationDelay: '0.4s' }}></div>
          <div className="w-1 h-10 bg-orange-400 rounded-full animate-music-wave" style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* Music Notes Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-orange-400 animate-bounce" style={{ animationDelay: '0.3s' }}>♪</div>
          <div className="absolute top-1/3 right-1/4 text-pink-400 animate-bounce" style={{ animationDelay: '0.6s' }}>♫</div>
          <div className="absolute bottom-1/3 left-1/3 text-yellow-400 animate-bounce" style={{ animationDelay: '0.9s' }}>♪</div>
          <div className="absolute bottom-1/4 right-1/3 text-orange-400 animate-bounce" style={{ animationDelay: '1.2s' }}>♫</div>
        </div>
      </div>
    </div>
  );
};

// DJ data is now imported from AudioContext

// DJ Card Variant 1: Classic Card Design
const DJCardVariant1: React.FC<{ dj: DJ; index: number }> = ({ dj }) => {
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl group border-orange-400 bg-gradient-to-br from-gray-900 to-gray-800 border-2 drop-shadow-[0_0_20px_rgba(251,146,60,0.2)]">
      {/* Live Indicator */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-orange-400 font-medium">LIVE</span>
        </div>
      </div>

      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="relative">
          <MonkeyMascot 
            size="lg" 
            variant={dj.avatar as 'dj' | 'soulful' | 'lazy-sunday' | 'pool-party'} 
              className="drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
          />
            {/* Listener Count Badge */}
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-orange-400 to-pink-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {dj.listeners}
            </div>
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold text-white mb-2">
          {dj.name}
        </CardTitle>
        
        <CardDescription className="text-orange-400 font-medium">
          {dj.genre}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center pt-0">
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          {dj.description}
        </p>
        
        {/* Now Playing */}
        <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
          <div className="text-xs text-gray-400 mb-1">Now Playing</div>
          <div className="text-sm text-white font-medium truncate">{dj.currentTrack}</div>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-black font-semibold drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]"
        >
          <ThemeIcon type="play" className="mr-2" />
          Listen Live
        </Button>
      </CardContent>
    </Card>
  );
};

// DJ Card Variant 2: Image-Focused Layout
const DJCardVariant2: React.FC<{ dj: DJ; index: number }> = ({ dj }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-orange-400/30 hover:border-orange-400 transition-all duration-300 hover:scale-105">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-pink-400/20"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
              <MonkeyMascot size="sm" variant={dj.avatar as 'dj' | 'soulful' | 'lazy-sunday' | 'pool-party'} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{dj.name}</h3>
              <p className="text-orange-400 text-sm">{dj.genre}</p>
            </div>
          </div>
          
          {/* Live Badge */}
          <div className="flex items-center gap-1 bg-orange-400/20 backdrop-blur-sm rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-orange-400 text-xs font-medium">{dj.listeners}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {dj.description}
        </p>

        {/* Now Playing */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 mb-4">
          <div className="text-xs text-gray-400 mb-1">Now Playing</div>
          <div className="text-sm text-white font-medium">{dj.currentTrack}</div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-orange-400 hover:bg-orange-500 text-black font-semibold rounded-full py-3"
        >
          <ThemeIcon type="play" className="mr-2" />
          Start Listening
        </Button>
      </div>
    </div>
  );
};

// DJ Card Variant 3: Minimalist Design
const DJCardVariant3: React.FC<{ dj: DJ; index: number }> = ({ dj }) => {
  return (
    <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
            <MonkeyMascot size="sm" variant={dj.avatar as 'dj' | 'soulful' | 'lazy-sunday' | 'pool-party'} />
          </div>
          <div>
            <h3 className="text-white font-semibold">{dj.name}</h3>
            <p className="text-gray-400 text-sm">{dj.genre}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-orange-400 font-bold text-lg">{dj.listeners}</div>
          <div className="text-gray-400 text-xs">listeners</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4">
        {dj.description}
      </p>

      {/* Now Playing */}
      <div className="bg-gray-800/30 rounded-lg p-3 mb-4">
        <div className="text-xs text-gray-400 mb-1">Now Playing</div>
        <div className="text-sm text-white">{dj.currentTrack}</div>
      </div>

      {/* Action */}
      <Button 
        variant="outline"
        className="w-full border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black rounded-lg"
      >
        <ThemeIcon type="play" className="mr-2" />
        Listen Live
      </Button>
    </div>
  );
};

// DJ 3D Floating Layout: Centered with 3D effects
const DJ3DFloatingLayout: React.FC<{ dj: DJ; imagePath: string }> = ({ dj, imagePath }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Initialize audio when component mounts
  useEffect(() => {
    const audioElement = new Audio('/audio/jdmusic.mp3');
    audioElement.preload = 'auto';
    audioElement.volume = 0.8;
    
    // Audio event listeners
    audioElement.addEventListener('play', () => setIsPlaying(true));
    audioElement.addEventListener('pause', () => setIsPlaying(false));
    audioElement.addEventListener('ended', () => setIsPlaying(false));
    audioElement.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    });

    setAudio(audioElement);

    // Cleanup
    return () => {
      audioElement.pause();
      audioElement.removeEventListener('play', () => setIsPlaying(true));
      audioElement.removeEventListener('pause', () => setIsPlaying(false));
      audioElement.removeEventListener('ended', () => setIsPlaying(false));
      audioElement.removeEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
      });
    };
  }, []);

  // Handle play/pause
  const handlePlayPause = async () => {
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="text-center">
      {/* 3D Floating Portrait Container */}
      <div className="relative mb-12">
        {/* Background Glow Effects - Behind DJ */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
          {/* Outer Glow Effect */}
          <div 
            className="rounded-full opacity-30 blur-3xl"
            style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, #f8d550 0%, transparent 70%)',
              animation: 'pulse 4s ease-in-out infinite'
            }}
          ></div>
        </div>

        {/* Glow Rings - Behind DJ */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 5 }}>
          <div 
            className="rounded-full opacity-40"
            style={{
              width: '500px',
              height: '500px',
              background: 'conic-gradient(from 0deg, transparent, #f8d550, transparent)',
              animation: 'spin 20s linear infinite'
            }}
          ></div>
        </div>

        {/* Inner Glow Ring - Behind DJ */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 6 }}>
          <div 
            className="rounded-full opacity-30"
            style={{
              width: '400px',
              height: '400px',
              background: 'conic-gradient(from 180deg, transparent, #f8d550, transparent)',
              animation: 'spin 15s linear infinite reverse'
            }}
          ></div>
        </div>

        {/* 3D Portrait - In Front */}
        <div 
          className="relative inline-block transition-all duration-700 hover:scale-110 hover:-translate-y-4"
          style={{
            zIndex: 10,
            transform: 'perspective(1000px) rotateX(5deg) rotateY(-5deg)',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
            animation: 'float 6s ease-in-out infinite'
          }}
        >
          <img 
            src={imagePath}
            alt={`${dj.name} portrait`}
            className="w-96 h-[480px] object-contain"
            style={{
              maxHeight: '480px',
              transform: 'translateZ(50px)'
            }}
          />
        </div>

        {/* Floating Particles - In Front */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
          <div className="absolute top-8 left-8 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#f8d550', animationDelay: '0s' }}></div>
          <div className="absolute top-16 right-12 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: '#f8d550', animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-16 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: '#f8d550', animationDelay: '2s' }}></div>
          <div className="absolute bottom-8 right-8 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: '#f8d550', animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-4 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: '#f8d550', animationDelay: '4s' }}></div>
          <div className="absolute top-1/3 right-4 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: '#f8d550', animationDelay: '5s' }}></div>
        </div>
      </div>

      {/* DJ Information */}
      <div className="space-y-6">
        {/* DJ Name */}
        <h3 className="text-6xl font-light text-white tracking-wide" style={{
          textShadow: '0 0 30px rgba(248, 213, 80, 0.5)',
          animation: 'glow 3s ease-in-out infinite alternate'
        }}>
          {dj.name}
        </h3>
        
        {/* Genre */}
        <p className="text-3xl font-light tracking-wider uppercase" style={{ 
          color: '#f8d550',
          textShadow: '0 0 20px rgba(248, 213, 80, 0.6)'
        }}>
          {dj.genre}
        </p>

        {/* Play Button */}
        <div className="pt-8">
          <Button 
            onClick={handlePlayPause}
            className="rounded-3xl px-16 py-8 text-2xl font-light tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:-translate-y-2"
            style={{
              background: 'linear-gradient(135deg, rgba(248, 213, 80, 0.2), rgba(248, 213, 80, 0.1))',
              border: '2px solid rgba(248, 213, 80, 0.4)',
              color: '#f8d550',
              boxShadow: '0 20px 40px rgba(248, 213, 80, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              textShadow: '0 0 10px rgba(248, 213, 80, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(248, 213, 80, 0.3), rgba(248, 213, 80, 0.2))';
              e.currentTarget.style.borderColor = '#f8d550';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(248, 213, 80, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(248, 213, 80, 0.2), rgba(248, 213, 80, 0.1))';
              e.currentTarget.style.borderColor = 'rgba(248, 213, 80, 0.4)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(248, 213, 80, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            <ThemeIcon type={isPlaying ? "pause" : "play"} className="mr-6" />
            {isPlaying ? 'Now Playing' : 'Listen'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// DJ Card Sophisticated: Light yellow background, rectangular, premium design
const DJCardSophisticated: React.FC<{ dj: DJ; index: number }> = ({ dj }) => {
  const { selectDJ, currentDJ, isPlaying } = useAudio();

  return (
    <div 
      className="group relative transition-all duration-500 hover:scale-101 hover:-translate-y-1"
      style={{
        backgroundColor: 'rgba(248, 213, 80, 0.15)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(248, 213, 80, 0.3)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(248, 213, 80, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        background: 'linear-gradient(135deg, rgba(248, 213, 80, 0.1) 0%, rgba(248, 213, 80, 0.05) 100%)'
      }}></div>
      
      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="flex items-center gap-8">
          {/* DJ Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ 
              background: 'rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <MonkeyMascot size="md" variant={dj.avatar as 'dj' | 'soulful' | 'lazy-sunday' | 'pool-party'} />
            </div>
          </div>

          {/* DJ Info */}
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-xl font-light text-black tracking-wide">{dj.name}</h3>
              
              {/* Live Status */}
              <div className="inline-flex items-center gap-2" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '2px 8px',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#d03829' }}></div>
                <span className="text-xs font-light tracking-wider uppercase text-black/70">{dj.listeners} listening</span>
              </div>
            </div>
            
            <p className="text-sm font-light mb-3 tracking-wider uppercase text-black/60">{dj.genre}</p>

            {/* Description */}
            <p className="text-black/80 text-sm leading-relaxed font-light mb-4">
              {dj.description}
            </p>

            {/* Now Playing */}
            <div className="p-3 rounded-lg" style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <div className="text-xs text-black/50 mb-1 font-light tracking-wider uppercase">Now Playing</div>
              <div className="text-black text-sm font-light">{dj.currentTrack}</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            <Button 
              onClick={() => selectDJ(dj)}
              className="rounded-lg px-8 py-3 text-sm font-light tracking-wider uppercase transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                color: '#d03829'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
              }}
            >
              <ThemeIcon type={currentDJ?.id === dj.id && isPlaying ? "pause" : "play"} className="mr-2" />
              {currentDJ?.id === dj.id && isPlaying ? 'Playing' : 'Listen'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// DJ Card Vertical: Clean vertical stack layout
const DJCardVertical: React.FC<{ dj: DJ; index: number }> = ({ dj }) => {
  const { selectDJ, currentDJ, isPlaying } = useAudio();

  return (
    <div 
      className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-102 hover:-translate-y-1"
      style={{
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(20px)',
        borderColor: '#f8d550' + '20',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
      }}
    >
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl" style={{ backgroundColor: '#f8d550' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="flex items-center gap-6">
          {/* DJ Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ 
              background: 'rgba(248, 213, 80, 0.1)',
              border: '1px solid rgba(248, 213, 80, 0.2)'
            }}>
              <MonkeyMascot size="lg" variant={dj.avatar as 'dj' | 'soulful' | 'lazy-sunday' | 'pool-party'} />
            </div>
          </div>

          {/* DJ Info */}
          <div className="flex-grow min-w-0">
            <h3 className="text-2xl font-light text-white mb-2 tracking-wide">{dj.name}</h3>
            <p className="text-base font-light mb-3 tracking-wider uppercase" style={{ color: '#f8d550' }}>{dj.genre}</p>
            
            {/* Live Status */}
            <div className="inline-flex items-center gap-2 mb-4" style={{
              backgroundColor: 'rgba(248, 213, 80, 0.1)',
              borderRadius: '20px',
              padding: '4px 12px',
              border: '1px solid rgba(248, 213, 80, 0.2)'
            }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#f8d550' }}></div>
              <span className="text-xs font-light tracking-wider uppercase" style={{ color: '#f8d550' }}>{dj.listeners} listening</span>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed font-light mb-4">
              {dj.description}
            </p>

            {/* Now Playing */}
            <div className="p-4 rounded-xl mb-4" style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(248, 213, 80, 0.1)'
            }}>
              <div className="text-xs text-white/50 mb-1 font-light tracking-wider uppercase">Now Playing</div>
              <div className="text-white text-sm font-light">{dj.currentTrack}</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            <Button 
              onClick={() => selectDJ(dj)}
              className="rounded-2xl px-6 py-4 text-sm font-light tracking-wider uppercase transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'rgba(248, 213, 80, 0.1)',
                border: '1px solid rgba(248, 213, 80, 0.3)',
                color: '#f8d550'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(248, 213, 80, 0.2)';
                e.currentTarget.style.borderColor = '#f8d550';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(248, 213, 80, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(248, 213, 80, 0.3)';
              }}
            >
              <ThemeIcon type={currentDJ?.id === dj.id && isPlaying ? "pause" : "play"} className="mr-2" />
              {currentDJ?.id === dj.id && isPlaying ? 'Playing' : 'Listen'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// DJ Card Variant 4: Enhanced Hero-Style Layout with Mobile-Friendly Animations
const DJCardVariant4: React.FC<{ dj: DJ; index: number }> = ({ dj }) => {
  const [isActive, setIsActive] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { selectDJ, currentDJ, isPlaying } = useAudio();

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const cardElement = document.getElementById(`dj-card-${dj.id}`);
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  }, [dj.id]);

  const handleTouchStart = () => {
    setIsActive(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsActive(false), 300);
  };

  const handleTouchCancel = () => {
    setIsActive(false);
  };

  return (
    <div 
      id={`dj-card-${dj.id}`}
      className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ${
        isActive || isInView 
          ? 'scale-102 -translate-y-1' 
          : 'sm:hover:scale-102 sm:hover:-translate-y-1'
      }`}
      style={{
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(20px)',
        borderColor: isActive || isInView ? '#f8d550' + '50' : '#f8d550' + '20',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: isActive || isInView 
          ? '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(248, 213, 80, 0.1)' 
          : '0 10px 30px rgba(0,0,0,0.2)'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl" style={{ backgroundColor: '#f8d550' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6">
        {/* DJ Info */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="relative w-full h-full rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105" style={{ 
              background: 'rgba(248, 213, 80, 0.1)',
              border: '1px solid rgba(248, 213, 80, 0.2)'
            }}>
              <MonkeyMascot size="lg" variant={dj.avatar as 'dj' | 'soulful' | 'lazy-sunday' | 'pool-party'} />
            </div>
          </div>
          
          <h3 className="text-xl font-light text-white mb-2 tracking-wide">{dj.name}</h3>
          <p className="text-sm font-light mb-4 tracking-wider uppercase" style={{ color: '#f8d550' }}>{dj.genre}</p>
          
          {/* Live Status */}
          <div className="inline-flex items-center gap-2 mb-6" style={{
            backgroundColor: 'rgba(248, 213, 80, 0.1)',
            borderRadius: '20px',
            padding: '6px 12px',
            border: '1px solid rgba(248, 213, 80, 0.2)'
          }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#f8d550' }}></div>
            <span className="text-xs font-light tracking-wider uppercase" style={{ color: '#f8d550' }}>{dj.listeners} listening</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm text-center mb-6 leading-relaxed font-light">
          {dj.description}
        </p>

        {/* Now Playing */}
        <div className="mb-8 p-4 rounded-2xl" style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(248, 213, 80, 0.1)'
        }}>
          <div className="text-xs text-white/50 mb-2 text-center font-light tracking-wider uppercase">Now Playing</div>
          <div className="text-white text-sm text-center font-light">{dj.currentTrack}</div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => selectDJ(dj)}
          className="w-full rounded-2xl py-4 text-sm font-light tracking-wider uppercase transition-all duration-300 group-hover:scale-105"
          style={{
            background: 'rgba(248, 213, 80, 0.1)',
            border: '1px solid rgba(248, 213, 80, 0.3)',
            color: '#f8d550'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(248, 213, 80, 0.2)';
            e.currentTarget.style.borderColor = '#f8d550';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(248, 213, 80, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(248, 213, 80, 0.3)';
          }}
        >
          <ThemeIcon type={currentDJ?.id === dj.id && isPlaying ? "pause" : "play"} className="mr-3" />
          {currentDJ?.id === dj.id && isPlaying ? 'Now Playing' : 'Listen'}
        </Button>
      </div>
    </div>
  );
};

// Music Page Content Component
function MusicPageContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { selectedDJ, djs, isLoading: djsLoading, selectDJ } = useAudio();

  useEffect(() => {
    // Faster loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds - much faster loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#d03829' }}>
      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes float {
          0%, 100% { transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateY(-20px); }
        }
        
        @keyframes glow {
          0% { text-shadow: 0 0 30px rgba(248, 213, 80, 0.5); }
          100% { text-shadow: 0 0 40px rgba(248, 213, 80, 0.8), 0 0 60px rgba(248, 213, 80, 0.4); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      {/* Mobile-First Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md" style={{ borderBottomColor: '#f8d550' + '30' }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <BrandLogo size="md" variant="full" className="text-white" />
            <Button 
              variant="outline" 
              size="sm"
              className="text-sm px-3 py-2"
              style={{ 
                borderColor: '#f8d550', 
                color: '#f8d550',
                boxShadow: '0 0 10px rgba(248, 213, 80, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8d550' + '10';
                e.currentTarget.style.color = '#f8d550';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#f8d550';
              }}
            >
              <ThemeIcon type="home" size="sm" className="mr-1" />
              Bar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative px-4 py-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight">
            <span style={{ color: '#f8d550', fontWeight: '300', letterSpacing: '-0.02em' }}>DJ</span>
            <span className="text-white ml-3 md:ml-6 font-extralight" style={{ letterSpacing: '-0.02em' }}>Platform</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Curated musical experiences for the discerning listener
          </p>

          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-6 py-3 mb-12" style={{ 
            background: 'rgba(0,0,0,0.2)',
            borderColor: '#f8d550' + '40',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}>
            <div className="w-2 h-2 rounded-full" style={{ 
              backgroundColor: '#f8d550'
            }}></div>
            <span className="text-sm font-light tracking-wider uppercase" style={{ color: '#f8d550' }}>Live Now</span>
          </div>
        </div>
      </section>

              {/* SoundCloud Modal */}
              <SoundCloudModal 
                dj={selectedDJ}
                isOpen={!!selectedDJ}
                onClose={() => selectDJ(null)}
              />

              {/* DJs Section - Redesigned */}
              <main className="container mx-auto px-4 pb-8">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">Select Your Experience</h2>
          <p className="text-white/60 text-base font-light tracking-wide">Four distinct musical journeys await</p>
        </div>

        {/* Vertical DJ Stack */}
        <div className="space-y-8 max-w-2xl mx-auto">
          {djs.map((dj: DJ, index: number) => (
            <div 
              key={dj.id}
              className="opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <DJCardVertical dj={dj} index={index} />
            </div>
          ))}
        </div>

        {/* Sophisticated Light Yellow DJ Stack */}
        <div className="mt-20">
          <div className="text-center mb-16 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">Premium Selection</h2>
            <p className="text-white/60 text-base font-light tracking-wide">Curated experiences for the discerning listener</p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {djs.map((dj: DJ, index: number) => (
              <div 
                key={`premium-${dj.id}`}
                className="opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${(index * 150) + 600}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <DJCardSophisticated dj={dj} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Portrait DJ Section */}
        <div className="mt-24">
          <div className="text-center mb-20 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">Featured Artists</h2>
            <p className="text-white/60 text-lg font-light tracking-wide">Meet our signature DJs</p>
          </div>
          
          <div className="space-y-32 max-w-5xl mx-auto px-8">
            {/* DJ One */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
              <DJ3DFloatingLayout 
                dj={djs[0]} 
                imagePath="/djone.png"
              />
            </div>
            
            {/* DJ Two */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1400ms', animationFillMode: 'forwards' }}>
              <DJ3DFloatingLayout 
                dj={djs[1]} 
                imagePath="/djtwo.png"
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 text-center opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-8 bg-black/30 backdrop-blur-sm rounded-3xl px-8 py-6 transition-all duration-300" style={{
            borderColor: '#f8d550' + '20',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}>
            <div className="text-center">
              <div className="text-2xl font-light mb-1" style={{ color: '#f8d550' }}>{djs.length}</div>
              <div className="text-white/60 text-xs font-light tracking-wider uppercase">Active DJs</div>
            </div>
            <div className="w-px h-8" style={{ backgroundColor: '#f8d550' + '20' }}></div>
            <div className="text-center">
              <div className="text-2xl font-light mb-1" style={{ color: '#f8d550' }}>{djs.reduce((sum: number, dj: DJ) => sum + dj.listeners, 0)}</div>
              <div className="text-white/60 text-xs font-light tracking-wider uppercase">Total Listeners</div>
            </div>
            <div className="w-px h-8" style={{ backgroundColor: '#f8d550' + '20' }}></div>
            <div className="text-center">
              <div className="text-2xl font-light mb-1" style={{ color: '#f8d550' }}>24/7</div>
              <div className="text-white/60 text-xs font-light tracking-wider uppercase">Live Stream</div>
            </div>
          </div>
        </div>
      </main>

      {/* Sophisticated Footer */}
      <footer className="bg-black/80 backdrop-blur-sm mt-24" style={{ borderTopColor: '#f8d550' + '20', borderTopWidth: '1px', borderTopStyle: 'solid' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <BrandLogo size="md" variant="full" className="text-white mb-6" />
            <p className="text-sm text-white/60 font-light tracking-wide mb-8">
              Seven Monkeys The Bar • Where Music Meets Magic
            </p>
            <div className="flex justify-center gap-8">
              <Button variant="ghost" size="sm" className="text-white/60 text-sm font-light tracking-wider uppercase hover:text-white transition-colors duration-300">
                Privacy
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 text-sm font-light tracking-wider uppercase hover:text-white transition-colors duration-300">
                Terms
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 text-sm font-light tracking-wider uppercase hover:text-white transition-colors duration-300">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main Music Page Component with Audio Provider
export default function MusicPage() {
  return (
    <AudioProvider>
      <MusicPageContent />
    </AudioProvider>
  );
}
