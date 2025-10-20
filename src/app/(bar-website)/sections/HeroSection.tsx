import React from 'react';
import { Button } from '@/components/ui/button';
import { Marquee } from '@/components/ui/marquee';
import BrandLogo from '@/components/brand/BrandLogo';
import MonkeyMascot from '@/components/brand/MonkeyMascot';
import ThemeIcon from '@/components/brand/ThemeIcon';

const HeroSection: React.FC = () => {
  const marqueeItems = [
    "Pool Parties",
    "Mexican Nights", 
    "Soulful Sessions",
    "Lazy Sundays",
    "DJ Sets",
    "Cocktails",
    "Live Music"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <BrandLogo size="xl" variant="full" className="text-white" />
        </div>

        {/* Monkey Mascot */}
        <div className="mb-8 flex justify-center">
          <MonkeyMascot 
            size="xl" 
            variant="default" 
            className="drop-shadow-2xl"
          />
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          <span className="text-teal-400">Where Music</span>
          <br />
          <span className="text-coral-400">Meets Magic</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
          Experience the ultimate fusion of tropical vibes, soulful beats, and unforgettable moments
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-teal-500 to-coral-500 hover:from-teal-600 hover:to-coral-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ThemeIcon type="music" className="mr-2" />
            Listen Live Now
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ThemeIcon type="events" className="mr-2" />
            View Events
          </Button>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center justify-center gap-2 text-white/80">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live DJ Session Active</span>
        </div>

        {/* Marquee */}
        <div className="mt-16">
          <Marquee pauseOnHover className="[--duration:20s]">
            {marqueeItems.map((item, index) => (
              <div
                key={index}
                className="mx-4 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium border border-white/20"
              >
                {item}
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <ThemeIcon type="menu" size="lg" />
      </div>
    </section>
  );
};

export default HeroSection;
