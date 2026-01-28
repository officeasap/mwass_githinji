import { SculpturalButton } from "@/components/ui/SculpturalButton";

export function AboutPreview() {
  return (
    <section className="section-sacred bg-background-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image */}
          <div className="relative">
            <div className="card-sculptural aspect-[4/5] overflow-hidden">
              <img
                src="/images/artist-studio copy.png"
                alt="Artist at work in Studio 1.6"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent engraved hidden lg:block" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-metadata">The Artist</p>
              <h2 className="text-foreground">Mwass Githinji</h2>
            </div>

            {/* Artistic Statement — UPDATED WITH BIOGRAPHY */}
            <div
              className="space-y-4 text-sm lg:text-base leading-relaxed"
              style={{
                fontFamily: `"DejaVu Serif Condensed", serif`,
                fontStyle: "normal",
                color: "#c2bba6",
              }}
            >
              <p>
                I paint from Nairobi's soil, carrying marks from childhood blackboards into black canvas depths.
              </p>
              <p>
                My art navigates vulnerability and memory through intuitive gestures with oil pastels and coffee, 
                creating psychological spaces where strength meets fragility. Each layer builds toward shared 
                human experience—a conversation between canvas, creator, and witness.
              </p>
              <p>
                Studio 1.6 embodies the Fibonacci ratio, mirroring the balance I seek between African storytelling 
                traditions and global philosophical thought. From solo exhibitions at Nairobi National Museum to 
                international fairs, my practice remains rooted in emotional figuration and material sensitivity, 
                inviting you into spaces of reflection and encounter.
              </p>
            </div>

            {/* Full page link */}
            <SculpturalButton href="/about" variant="outline">
              Read Biography
            </SculpturalButton>
          </div>
        </div>
      </div>
    </section>
  );
}