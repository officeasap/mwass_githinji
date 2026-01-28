// pages/ArtworkDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SculpturalButton } from "@/components/ui/SculpturalButton";
import { artworks } from "@/lib/artworks";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { whatsappService } from "@/services/whatsappService";

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const artwork = artworks.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleOpenChat = () => {
    if (artwork) {
      whatsappService.handleWhatsAppClick({
        type: 'artwork-inquiry',
        artworkTitle: artwork.title,
        artworkYear: artwork.year,
        artworkSeries: artwork.series
      });
    }
  };

  if (!artwork) {
    return (
      <Layout>
        <section className="section-sacred bg-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-foreground mb-8">Artwork Not Found</h1>
            <SculpturalButton href="/artworks" variant="primary">
              Back to Collection
            </SculpturalButton>
          </div>
        </section>
      </Layout>
    );
  }

  const renderDescription = () => {
    const description = artwork.description.replace(/\n\n/g, '<br/><br/>');
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  };

  return (
    <Layout>
      <section className="pt-8 pb-4 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <button
            onClick={() => navigate(-1)}
            className="buttonized inline-flex items-center gap-3 px-6 py-3 bg-background text-foreground-muted hover:text-foreground"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-widest">Back</span>
          </button>
        </div>
      </section>

      <section className="section-sacred bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="image-frame aspect-[4/5] w-full">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div>
                <p className="text-metadata mb-4">{artwork.year}</p>
                <h1 className="text-foreground text-4xl lg:text-5xl font-light mb-4">
                  {artwork.title}
                </h1>
                {artwork.series && (
                  <p className="text-foreground-muted text-lg">
                    From the <span className="text-foreground">{artwork.series}</span> series
                  </p>
                )}
              </div>

              <div className="card-sculptural p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-metadata mb-2">Dimensions</p>
                    <p className="text-foreground text-lg">{artwork.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-metadata mb-2">Medium</p>
                    <p className="text-foreground text-lg">{artwork.medium}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-metadata mb-2">Year Created</p>
                  <p className="text-foreground text-lg">{artwork.year}</p>
                </div>
              </div>

              <div className="card-sculptural p-8 space-y-6">
                <h3 className="text-foreground text-xl font-light">About This Artwork</h3>
                <div className="description-content text-foreground-muted leading-relaxed">
                  {renderDescription()}
                </div>
              </div>

              <div className="pt-4">
                {artwork.forSale ? (
                  <div className="space-y-4">
                    <button
                      onClick={handleOpenChat}
                      className="w-full sm:w-auto buttonized inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm uppercase tracking-widest font-medium hover:bg-foreground/90"
                    >
                      <MessageCircle size={20} />
                      <span>Chat with Artist About This Piece</span>
                    </button>
                    <p className="text-foreground-muted text-sm text-center sm:text-left">
                      Instant WhatsApp connection • Direct conversation • Quick responses
                    </p>
                  </div>
                ) : (
                  <div className="card-sculptural p-6 text-center">
                    <p className="text-foreground-muted">
                      This artwork is currently not available for sale
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sacred bg-background-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-metadata mb-4">Continue Exploring</p>
            <h2 className="text-foreground">Related Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artworks
              .filter(a => a.id !== artwork.id)
              .slice(0, 3)
              .map((relatedArtwork, index) => (
                <button
                  key={relatedArtwork.id}
                  onClick={() => navigate(`/artwork/${relatedArtwork.id}`)}
                  className="image-frame aspect-[4/5] group cursor-pointer text-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={relatedArtwork.image}
                      alt={relatedArtwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-foreground text-xl font-light">{relatedArtwork.title}</h3>
                      <p className="text-metadata mt-2">{relatedArtwork.year}</p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArtworkDetail;