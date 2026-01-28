import { Artwork } from "@/lib/artworks";
import { ArtworkCard } from "./ArtworkCard";

interface MasonryGridProps {
  artworks: Artwork[];
}

export function MasonryGrid({ artworks }: MasonryGridProps) {
  return (
    <div className="masonry-grid">
      {artworks.map((artwork, index) => (
        <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
      ))}
    </div>
  );
}
