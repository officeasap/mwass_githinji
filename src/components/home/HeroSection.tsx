import { SculpturalButton } from "@/components/ui/SculpturalButton";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, hsl(var(--accent)) 0%, transparent 50%),
                             radial-gradient(circle at 70% 80%, hsl(var(--muted)) 0%, transparent 40%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Eyebrow */}
          <p className="text-metadata animate-fade-in opacity-0 stagger-1">
            Contemporary Kenyan Artist
          </p>

          {/* Main Heading */}
          <h1 className="text-foreground animate-rise opacity-0 stagger-2">
            Hello, I am
            <br />
            <span className="block mt-4">Mwass Githinji</span>
          </h1>

          {/* Artistic Studio Paragraph — UPDATED WITH BIOGRAPHY ELEMENTS */}
          <p
            className="text-lg lg:text-xl max-w-3xl mx-auto animate-fade-in opacity-0 stagger-3 leading-relaxed"
            style={{
              fontFamily: `"DejaVu Serif Condensed", serif`,
              fontStyle: "normal",
              color: "#c2bba6",
            }}
          >
            Working from Nairobi's vibrant art scene, my practice emerges from a lifelong 
            dialogue with mark-making—from childhood sticks on soil to oil pastels on black canvas. 
            Each work navigates vulnerability and memory, building psychological spaces where 
            African storytelling meets global contemplation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 animate-fade-in opacity-0 stagger-4">
            <SculpturalButton href="/artworks" variant="primary" size="lg">
              Explore Collection
            </SculpturalButton>
            <SculpturalButton href="/about" variant="outline" size="lg">
              Biography & Practice
            </SculpturalButton>
          </div>

          {/* Surgical Break to free Scroll indicator */}
          <br />
          <br/>
<br/>
<br/>
<br/>
        </div>
      </div>

      {/* Scroll Indicator - FIXED CENTERING */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center animate-fade-in opacity-0 stagger-5">
        <div className="flex flex-col items-center gap-2">
          <span className="text-metadata text-xs">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground-muted to-transparent" />
        </div>
      </div>
    </section>
  );
}