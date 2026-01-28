import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Artwork } from "@/lib/artworks";

interface FeaturedCarouselProps {
  artworks: Artwork[];
}

export function FeaturedCarousel({ artworks }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  }, [artworks.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  }, [artworks.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentArtwork = artworks[currentIndex];

  const handleImageClick = () => {
    navigate(`/artwork/${currentArtwork.id}`);
  };

  return (
    <div 
      className="relative w-full h-[70vh] min-h-[500px] cathedral overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {artworks.map((artwork, index) => (
          <button
            key={artwork.id}
            onClick={() => navigate(`/artwork/${artwork.id}`)}
            className={`absolute inset-0 transition-all duration-1000 ease-out cursor-pointer ${
              index === currentIndex 
                ? "opacity-100 scale-100 z-10" 
                : "opacity-0 scale-105 z-0"
            }`}
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 pointer-events-none">
        <div className="container mx-auto">
          <div className="max-w-2xl space-y-4">
            <p className="text-metadata">Featured Work</p>
            <h2 className="text-3xl lg:text-5xl font-light text-foreground">
              {currentArtwork.title}
            </h2>
            <div className="flex items-center gap-6 text-foreground-muted">
              <span>{currentArtwork.year}</span>
              <span className="w-1 h-1 bg-foreground-muted rounded-full" />
              <span>{currentArtwork.dimensions}</span>
              <span className="w-1 h-1 bg-foreground-muted rounded-full" />
              <span>{currentArtwork.medium}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 flex items-center gap-4 z-20">
        <button
          onClick={prevSlide}
          className="buttonized p-4 bg-background/50 border border-border text-foreground hover:bg-background"
          aria-label="Previous artwork"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="buttonized p-4 bg-background/50 border border-border text-foreground hover:bg-background"
          aria-label="Next artwork"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {artworks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? "bg-foreground w-8" 
                : "bg-foreground/30 w-2 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
