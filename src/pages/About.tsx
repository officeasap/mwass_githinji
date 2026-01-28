import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SculpturalButton } from "@/components/ui/SculpturalButton";

const About = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const biographyStyle = {
    fontFamily: `"DejaVu Serif Condensed", serif`,
    fontStyle: "normal",
    color: "#c2bba6",
  } as const;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-sacred bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-metadata mb-6 animate-fade-in opacity-0 stagger-1">
              Biography
            </p>
            <h1 className="text-foreground mb-8 animate-rise opacity-0 stagger-2">
              Mwass Githinji
            </h1>
            <p
              className="text-xl lg:text-2xl font-light leading-relaxed animate-fade-in opacity-0 stagger-3"
              style={biographyStyle}
            >
              (b. 1995, Kenya) A contemporary artist whose practice emerges from intuitive mark-making, 
              material experimentation, and emotional figuration. Working primarily on black canvas with 
              oil pastels and coffee, I construct psychologically charged images that probe vulnerability, 
              memory, and the complexity of human experience.
            </p>
          </div>
        </div>
      </section>

      {/* Artist Statement with Left Image */}
      <section className="section-sacred bg-background-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image on the Left */}
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

            {/* Content on the Right */}
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-metadata mb-6">Artist Statement</p>
              <h2 className="text-foreground">Practice & Philosophy</h2>

              <p style={biographyStyle}>
                My earliest relationship with drawing began outside formal spaces—using sticks on soil 
                and chalk on classroom blackboards. These formative gestures continue to shape my practice, 
                informing both my choice of surface and emphasis on emotional figuration.
              </p>
              <p style={biographyStyle}>
                The black canvas functions as a site of resistance and depth, allowing figures to emerge 
                through layers of color, line, and texture. My compositions fuse expressive anatomy with 
                fluid curves and dense mark-making, creating images that oscillate between strength and fragility.
              </p>
              <p style={biographyStyle}>
                Although I began formal training at Buruburu Institute of Fine Arts, financial constraints 
                led me to pursue an independent path of sustained experimentation. This autodidactic journey 
                has been central to developing a visual language that draws on African storytelling traditions, 
                global philosophical thought, and the influence of historical artists.
              </p>

              {!showMore && (
                <div className="text-center mt-4">
                  <SculpturalButton
                    variant="outline"
                    onClick={() => setShowMore(true)}
                  >
                    Continue Reading
                  </SculpturalButton>
                </div>
              )}

              {showMore && (
                <div className="mt-6 space-y-4">
                  <p style={biographyStyle}>
                    Vulnerability sits at the core of my work, with particular attention to the inner child 
                    and emotions often suppressed within adult experience. Working from Studio 1.6—named after 
                    Fibonacci's golden ratio—I seek harmony between intuition and intention, tradition and innovation.
                  </p>

                  <p style={biographyStyle}>
                    I have exhibited widely across Africa, Europe, Asia, and Australia, including solo exhibitions 
                    at Nairobi National Museum and Red Hill Art Gallery. My work has featured in international fairs 
                    including Aqua Art Miami, The Other Art Fair Sydney, CICA Museum Korea, and Affordable Art Fair Singapore.
                  </p>

                  <p style={biographyStyle}>
                    Through a practice that privileges introspection and material sensitivity, I continue to articulate 
                    painting as a space for encounter, reflection, and shared human experience. Each work invites viewers 
                    into psychological spaces where personal memory meets universal contemplation.
                  </p>

                  <p style={biographyStyle}>
                    In 2022, I was nominated for the Norval Sovereign African Art Prize, and my practice has been profiled 
                    in publications such as Business Daily Africa and Africa Art News, situating me among a new generation 
                    of African artists engaging deeply with questions of identity, emotion, and contemporary life.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;