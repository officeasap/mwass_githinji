import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { SculpturalButton } from "@/components/ui/SculpturalButton";
import { artworks, Artwork } from "@/lib/artworks";

type YearFilter = "all" | 2025 | 2024 | 2023 | 2022;

const Artworks = () => {
  const [activeFilter, setActiveFilter] = useState<YearFilter>("all");
  const navigate = useNavigate();

  const filters: { label: string; value: YearFilter }[] = [
    { label: "All Works", value: "all" },
    { label: "2025", value: 2025 },
    { label: "2024", value: 2024 },
    { label: "2023", value: 2023 },
    { label: "2022", value: 2022 },
  ];

  const filteredArtworks = activeFilter === "all" 
    ? artworks 
    : artworks.filter(a => a.year === activeFilter);

  // Group by series
  const series = [...new Set(artworks.map(a => a.series).filter(Boolean))];

  const formatPrice = (price: number | null) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-sacred bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-metadata mb-6 animate-fade-in opacity-0 stagger-1">
              The Collection
            </p>
            <h1 className="text-foreground mb-8 animate-rise opacity-0 stagger-2">
              Artworks
            </h1>
            <p className="text-xl text-foreground-muted font-light leading-relaxed animate-fade-in opacity-0 stagger-3">
              Oil paintings channeling Mesopotamian mythology through 
              contemporary African expression.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-y border-border sticky top-24 z-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`buttonized px-6 py-3 text-sm uppercase tracking-widest ${
                  activeFilter === filter.value
                    ? "bg-foreground text-background shadow-cathedral"
                    : "bg-transparent border border-border text-foreground-muted hover:text-foreground hover:border-foreground"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="section-sacred bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {filteredArtworks.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground-muted text-lg">
                No artworks found for this period.
              </p>
            </div>
          ) : (
            <div className="masonry-grid">
              {filteredArtworks.map((artwork, index) => (
                <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Series Section */}
      <section className="section-sacred bg-background-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-metadata mb-4">Curated Collections</p>
            <h2 className="text-foreground">Series</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {series.map((seriesName, index) => {
              const seriesArtworks = artworks.filter(a => a.series === seriesName);
              const coverArtwork = seriesArtworks[0];
              
              return (
                <button
                  key={seriesName}
                  onClick={() => navigate(`/artwork/${coverArtwork.id}`)}
                  className="image-frame group overflow-hidden animate-rise opacity-0 text-left cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={coverArtwork.image}
                      alt={seriesName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 bg-card">
                    <h3 className="text-xl text-foreground mb-2">{seriesName}</h3>
                    <p className="text-metadata">{seriesArtworks.length} works</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="section-sacred bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-foreground mb-8">Interested in Acquiring?</h2>
          <p className="text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            For pricing, availability, and acquisition details, please contact the studio directly.
          </p>
          <SculpturalButton href="/contact" variant="primary" size="lg">
            Enquire Now
          </SculpturalButton>
        </div>
      </section>
    </Layout>
  );
};

export default Artworks;
