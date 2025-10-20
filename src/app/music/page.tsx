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
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-orange-400/20 transition-all duration-700 ${
                isActive || isInView 
                  ? 'border-orange-400/60 scale-101 shadow-xl shadow-orange-400/15 -translate-y-0.5' 
                  : 'sm:hover:border-orange-400/60 sm:hover:scale-101 sm:hover:shadow-xl sm:hover:shadow-orange-400/15 sm:hover:-translate-y-0.5'
              }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {/* Animated Background Pattern */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${
        isActive || isInView ? 'opacity-25' : 'opacity-10 group-hover:opacity-25'
      }`}>
        <div className={`absolute top-0 right-0 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse ${
          isActive || isInView ? 'animate-spin-slow' : 'group-hover:animate-spin-slow'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-24 h-24 bg-pink-400 rounded-full blur-2xl animate-pulse ${
          isActive || isInView ? 'animate-spin-slow' : 'group-hover:animate-spin-slow'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-400 rounded-full blur-xl animate-pulse ${
          isActive || isInView ? 'animate-spin-slow' : 'group-hover:animate-spin-slow'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-4 left-4 w-1 h-1 bg-orange-400 rounded-full ${
          isActive || isInView ? 'animate-ping' : 'animate-bounce group-hover:animate-ping'
        }`} style={{ animationDelay: '0.5s' }}></div>
        <div className={`absolute top-8 right-8 w-1 h-1 bg-pink-400 rounded-full ${
          isActive || isInView ? 'animate-ping' : 'animate-bounce group-hover:animate-ping'
        }`} style={{ animationDelay: '1.5s' }}></div>
        <div className={`absolute bottom-6 left-6 w-1 h-1 bg-yellow-400 rounded-full ${
          isActive || isInView ? 'animate-ping' : 'animate-bounce group-hover:animate-ping'
        }`} style={{ animationDelay: '2.5s' }}></div>
        <div className={`absolute bottom-4 right-4 w-1 h-1 bg-orange-400 rounded-full ${
          isActive || isInView ? 'animate-ping' : 'animate-bounce group-hover:animate-ping'
        }`} style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6">
        {/* DJ Info */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4">
            <div className={`absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-spin-slow transition-opacity duration-500 ${
              isActive || isInView ? 'opacity-40' : 'opacity-20 group-hover:opacity-40'
            }`}></div>
            <div className={`relative w-full h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center transition-all duration-500 ${
              isActive || isInView 
                ? 'scale-110 animate-glow-pulse' 
                : 'group-hover:scale-110 group-hover:animate-glow-pulse'
            }`}>
              <MonkeyMascot size="md" variant={dj.avatar as 'dj' | 'soulful' | 'lazy-sunday' | 'pool-party'} />
            </div>
            {/* Pulsing Ring */}
            <div className={`absolute inset-0 border-2 rounded-full animate-ping transition-all duration-500 ${
              isActive || isInView ? 'border-orange-400/60' : 'border-orange-400/30 group-hover:border-orange-400/60'
            }`}></div>
            {/* Hover Ring */}
            <div className={`absolute inset-0 border-2 rounded-full transition-all duration-500 ${
              isActive || isInView 
                ? 'border-pink-400/40 animate-ping' 
                : 'border-transparent group-hover:border-pink-400/40 group-hover:animate-ping'
            }`} style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <h3 className={`text-lg sm:text-xl font-bold text-white mb-1 transition-all duration-300 ${
            isActive || isInView 
              ? 'text-orange-400 scale-105' 
              : 'group-hover:text-orange-400 group-hover:scale-105'
          }`}>{dj.name}</h3>
          <p className={`text-orange-400 font-medium mb-2 transition-all duration-300 ${
            isActive || isInView 
              ? 'text-pink-400 scale-105' 
              : 'group-hover:text-pink-400 group-hover:scale-105'
          }`}>{dj.genre}</p>
          
          {/* Live Status */}
          <div className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 mb-3 sm:mb-4 transition-all duration-300 ${
            isActive || isInView 
              ? 'bg-orange-400/30 scale-105' 
              : 'bg-orange-400/20 group-hover:bg-orange-400/30 group-hover:scale-105'
          }`}>
            <div className={`w-2 h-2 bg-orange-400 rounded-full ${
              isActive || isInView ? 'animate-bounce' : 'animate-pulse group-hover:animate-bounce'
            }`}></div>
            <span className="text-orange-400 text-xs sm:text-sm font-medium">LIVE • {dj.listeners} listeners</span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-gray-300 text-xs sm:text-sm text-center mb-3 sm:mb-4 leading-relaxed transition-all duration-300 ${
          isActive || isInView 
            ? 'text-gray-200 scale-105' 
            : 'group-hover:text-gray-200 group-hover:scale-105'
        }`}>
          {dj.description}
        </p>

        {/* Now Playing */}
        <div className={`backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 transition-all duration-300 ${
          isActive || isInView 
            ? 'bg-gray-800/60 scale-105' 
            : 'bg-gray-800/40 group-hover:bg-gray-800/60 group-hover:scale-105'
        }`}>
          <div className="text-xs text-gray-400 mb-2 text-center">Now Playing</div>
          <div className={`text-white font-medium text-center transition-colors duration-300 ${
            isActive || isInView ? 'text-orange-400' : 'group-hover:text-orange-400'
          }`}>{dj.currentTrack}</div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => selectDJ(dj)}
          className={`w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-black font-bold rounded-xl py-2 sm:py-3 text-sm sm:text-lg transition-all duration-500 ${
            isActive || isInView 
              ? 'drop-shadow-[0_0_30px_rgba(251,146,60,0.6)] scale-101 -translate-y-0.5' 
              : 'drop-shadow-[0_0_15px_rgba(251,146,60,0.3)] sm:group-hover:drop-shadow-[0_0_30px_rgba(251,146,60,0.6)] sm:hover:scale-101 sm:hover:-translate-y-0.5'
          } ${
            currentDJ?.id === dj.id && isPlaying ? 'ring-2 ring-orange-400 ring-opacity-50' : ''
          }`}
        >
          <ThemeIcon type={currentDJ?.id === dj.id && isPlaying ? "pause" : "play"} className={`mr-2 ${
            isActive || isInView ? 'animate-bounce' : 'sm:group-hover:animate-bounce'
          }`} />
          {currentDJ?.id === dj.id && isPlaying ? 'Now Playing' : 'Tune In Now'}
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Mobile-First Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <BrandLogo size="md" variant="full" className="text-white" />
            <Button 
              variant="outline" 
              size="sm"
              className="border-orange-400 text-orange-400 hover:bg-orange-400/10 hover:text-orange-300 drop-shadow-[0_0_10px_rgba(251,146,60,0.4)] text-sm px-3 py-2"
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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]">DJ</span>
            <span className="text-pink-400 ml-2 md:ml-4 drop-shadow-[0_0_20px_rgba(244,114,182,0.6)]">Platform</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Choose your DJ and dive into the ultimate music experience
          </p>

          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400/20 to-pink-400/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]"></div>
            <span className="text-orange-400 text-sm font-medium">Live Streaming</span>
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
        <div className="text-center mb-8 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Choose Your DJ</h2>
          <p className="text-gray-400 text-sm md:text-base">All DJs are currently live</p>
        </div>

        {/* DJs Grid - Enhanced Landing Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {djs.map((dj: DJ, index: number) => {
            // Different animation styles for each card
            const animations = [
              'animate-slide-in-left',
              'animate-bounce-in', 
              'animate-rotate-in',
              'animate-flip-in'
            ];
            
            const animationClass = animations[index % animations.length];
            const delay = index * 100; // Faster staggered timing
            
            return (
              <div 
                key={dj.id}
                className={`group opacity-0 ${animationClass}`}
                style={{
                  animationDelay: `${delay}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <DJCardVariant4 dj={dj} index={index} />
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 text-center opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-6 py-3 hover:border-orange-400/50 transition-all duration-300">
            <div className="text-center">
              <div className="text-orange-400 font-bold text-lg">{djs.length}</div>
              <div className="text-gray-400 text-xs">Active DJs</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div className="text-center">
                      <div className="text-pink-400 font-bold text-lg">{djs.reduce((sum: number, dj: DJ) => sum + dj.listeners, 0)}</div>
              <div className="text-gray-400 text-xs">Total Listeners</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-orange-400 font-bold text-lg">24/7</div>
              <div className="text-gray-400 text-xs">Live Stream</div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile-First Footer */}
      <footer className="bg-black/90 backdrop-blur-sm border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <BrandLogo size="sm" variant="full" className="text-white mb-3" />
            <p className="text-xs text-gray-400">
            Seven Monkeys The Bar • Where Music Meets Magic
          </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400 text-xs">
                Privacy
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400 text-xs">
                Terms
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400 text-xs">
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
