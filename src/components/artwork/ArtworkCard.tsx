import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Artwork } from "@/lib/artworks";

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price: number | null) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleClick = () => {
    navigate(`/artwork/${artwork.id}`);
  };

  return (
    <button
      className="image-frame group relative overflow-hidden animate-rise cursor-pointer text-left w-full"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />
        
        {/* Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-background/80 transition-opacity duration-500 flex flex-col justify-end p-6 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="space-y-2">
            <h3 className="text-xl font-light text-foreground">{artwork.title}</h3>
            <p className="text-metadata">{artwork.year}</p>
            {artwork.price && (
              <p className="text-foreground-muted text-sm">
                {formatPrice(artwork.price)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Info Bar (always visible on mobile) */}
      <div className="p-4 bg-card lg:hidden">
        <h3 className="text-lg font-light text-foreground truncate">{artwork.title}</h3>
        <p className="text-metadata mt-1">{artwork.year}</p>
      </div>
    </button>
  );
}
