import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const Carousel = ({ 
  images, 
  // New props for text content
  titles = [],
  descriptions = [],
  // You can also pass structured content
  slidesContent = [],
  
  autoSlide = true, 
  interval = 4000,
  transitionDuration = 700 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const length = images.length;
  const timeoutRef = useRef(null);

  // Generate default content if not provided
  const getSlideContent = (index) => {
    if (slidesContent && slidesContent[index]) {
      return slidesContent[index];
    }
    
    return {
      title: titles[index] || `Slide ${index + 1}`,
      description: descriptions[index] || "Discover amazing content",
      ctaText: "Explore More",
      ctaLink: "#"
    };
  };

  // Reset timeout on any change
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Auto slide with improved logic
  useEffect(() => {
    resetTimeout();

    if (!autoSlide || isPaused || isHovered || length <= 1) return;

    const startTransition = () => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % length);
    };

    // Wait for transition to complete before next slide
    timeoutRef.current = setTimeout(() => {
      startTransition();
    }, interval);

    return () => resetTimeout();
  }, [currentIndex, autoSlide, interval, length, isPaused, isHovered]);

  // Reset transitioning state after animation
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, transitionDuration]);

  const prevSlide = () => {
    if (isTransitioning) return;
    resetTimeout();
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    resetTimeout();
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    resetTimeout();
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') setIsPaused(prev => !prev); // Space to toggle pause
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isTransitioning]);

  // Auto-resume after 10 seconds if user forgets to unpause
  useEffect(() => {
    if (isPaused) {
      const autoResumeTimer = setTimeout(() => {
        setIsPaused(false);
      }, 10000); // Auto resume after 10 seconds

      return () => clearTimeout(autoResumeTimer);
    }
  }, [isPaused]);

  if (length === 0) return null;

  return (
    <div 
      className="relative w-full overflow-hidden bg-black group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transitionDuration: `${transitionDuration}ms`
          }}
        >
          {images.map((img, index) => {
            const content = getSlideContent(index);
            return (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 relative"
              >
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                
                {/* Gradient Overlay - Enhanced for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Text Content Overlay - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16">
                  {/* Animated Text Container */}
                  <div className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
                    currentIndex === index 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}>
                    {/* Subtitle/Badge */}
                    {content.subtitle && (
                      <div className="mb-4 md:mb-6">
                        <span className="inline-block px-4 py-2 bg-[#097969]/80 backdrop-blur-sm text-white text-sm md:text-base font-medium rounded-full animate-pulse">
                          {content.subtitle}
                        </span>
                      </div>
                    )}
                    
                    {/* Main Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                      <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {content.title}
                      </span>
                    </h1>
                    
                    {/* Description */}
                    {content.description && (
                      <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                        {content.description}
                      </p>
                    )}
                    
                    {/* Call to Action Button */}
                    {content.ctaText && (
                      <div className="mt-6 md:mt-8">
                        <a
                          href={content.ctaLink || "#"}
                          className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-[#097969] text-white font-semibold rounded-lg hover:bg-[#0a8c78] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg group/cta"
                        >
                          <span className="mr-2">{content.ctaText}</span>
                          <ChevronRight className="h-5 w-5 group-hover/cta:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className={`absolute top-1/2 left-4 md:left-8 -translate-y-1/2 p-3 md:p-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-[#097969] transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 hover:scale-110 ${
            isTransitioning ? 'cursor-not-allowed opacity-50' : ''
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className={`absolute top-1/2 right-4 md:right-8 -translate-y-1/2 p-3 md:p-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-[#097969] transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 hover:scale-110 ${
            isTransitioning ? 'cursor-not-allowed opacity-50' : ''
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </button>

        {/* Auto-play Controls */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
          {/* Timer Indicator */}
          {autoSlide && !isPaused && !isHovered && (
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/60 border-t-[#097969] rounded-full animate-spin"></div>
            </div>
          )}
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 text-white rounded-full hover:bg-[#097969] transition-all duration-300"
          
           
          >
            {isPaused ? (
              <Play className="h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <Pause className="h-4 w-4 md:h-5 md:w-5" />
            )}
          </button>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
          {currentIndex + 1} / {length}
        </div>

        {/* Current Slide Title Indicator */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {getSlideContent(currentIndex).title}
        </div>
      </div>

      {/* Indicators - Bottom Center with Text Preview */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 px-6 py-4 bg-black/40 backdrop-blur-md rounded-full">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            disabled={isTransitioning}
            className="group relative flex flex-col items-center"
            aria-label={`Go to slide ${idx + 1}`}
          >
            {/* Indicator Dot */}
            <span
              className={`block transition-all duration-300 mb-1 ${
                currentIndex === idx
                  ? "w-8 md:w-10 h-1.5 md:h-2 bg-[#097969] rounded-full"
                  : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/60 hover:bg-white rounded-full"
              } ${isTransitioning ? 'cursor-not-allowed' : ''}`}
            ></span>
            
            {/* Slide Number with Tooltip */}
            <span className="text-xs text-white/70 font-medium">
              {idx + 1}
            </span>
          
          </button>
        ))}
      </div>

      {/* Progress Bar with Timer */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-[#097969] transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / length) * 100}%`,
            transitionDuration: autoSlide && !isPaused && !isHovered ? `${interval}ms` : '300ms',
            transitionTimingFunction: 'linear'
          }}
        ></div>
      </div>

     
    </div>
  );
};

export default Carousel;