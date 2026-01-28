import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FeaturedCarousel } from "@/components/artwork/FeaturedCarousel";
import { MasonryGrid } from "@/components/artwork/MasonryGrid";
import { SculpturalButton } from "@/components/ui/SculpturalButton";
import { artworks, getFeaturedArtworks } from "@/lib/artworks";

const Index = () => {
  const featuredArtworks = getFeaturedArtworks();
  const displayedArtworks = artworks.slice(0, 12);

  return (
    <Layout>
      {/* Hero (full-bleed by design) */}
      <HeroSection />

      {/* Featured Carousel */}
      <section className="section-sacred bg-background">
        <div className="app-container mb-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-metadata mb-4">Featured Works</p>
              <h2 className="text-foreground">Selected Collection</h2>
            </div>
          </div>
        </div>
        <FeaturedCarousel artworks={featuredArtworks} />
      </section>

      {/* Masonry Grid */}
      <section className="section-sacred bg-background">
        <div className="app-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-metadata mb-4">The Collection</p>
              <h2 className="text-foreground">Recent Works</h2>
            </div>
            <SculpturalButton href="/artworks" variant="ghost">
              View All →
            </SculpturalButton>
          </div>
          <MasonryGrid artworks={displayedArtworks} />
        </div>
      </section>

      {/* About Preview (self-contained section) */}
      <AboutPreview />

      {/* CTA Section */}
      <section className="section-sacred bg-background">
        <div className="app-container">
          <div className="cathedral bg-background-secondary p-12 lg:p-20 text-center">
            <p className="text-metadata mb-6">Interested in a piece?</p>
            <h2 className="text-foreground mb-8">Commission or Enquire</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Each artwork represents months of meticulous craftsmanship.
              For acquisition enquiries or commission discussions,
              I welcome your correspondence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SculpturalButton href="/contact" variant="primary" size="lg">
                Contact Studio
              </SculpturalButton>
              <SculpturalButton href="/exhibitions" variant="outline" size="lg">
                View Exhibitions
              </SculpturalButton>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

