// pages/Studio.tsx
import { Layout } from "@/components/layout/Layout";
import { SculpturalButton } from "@/components/ui/SculpturalButton";
import { Mail, Phone, MapPin, Calendar, Building, Compass, Users, ArrowRight, Sparkles, Instagram } from "lucide-react";
import { whatsappService } from "@/services/whatsappService";

export default function Studio() {
  const handleOpenChat = () => {
    whatsappService.handleWhatsAppClick({
      type: 'studio-appointment'
    });
  };

  const handleExhibitionChat = () => {
    whatsappService.handleWhatsAppClick({
      type: 'general',
      prefillMessage: "Hello Mwass, I'd like to book a private viewing of 'Echoes of the Savannah' exhibition at Studio 1.6."
    });
  };

  const handleGeneralChat = () => {
    whatsappService.handleWhatsAppClick({
      type: 'general',
      prefillMessage: "Hello Mwass, I'd like to get in touch with Studio 1.6."
    });
  };

  return (
    <Layout>
      <section className="section-sacred bg-background pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 animate-fade-in opacity-0 stagger-1">
              <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 border border-border shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
                  THE CREATIVE SPACE
                </span>
              </div>
            </div>

            <div className="mb-12 animate-rise opacity-0 stagger-2">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
                <span className="text-[#02abec]">Studio</span>
                <br />
                <span className="text-[#02abec] pl-24 md:pl-32 relative">
                  <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 h-2 w-2 rounded-full bg-primary/50"></span>
                  1.6
                </span>
              </h1>
            </div>

            <div className="max-w-3xl mb-16 animate-fade-in opacity-0 stagger-3">
              <p className="text-xl text-foreground-muted leading-relaxed font-light">
                Located in the heart of Nairobi's creative district, Studio 1.6 is a sanctuary where 
                artistic concepts evolve into tangible experiences through disciplined practice and 
                experimental methodology.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in opacity-0 stagger-4">
              <div className="px-6 py-3 rounded-full bg-background border border-border shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                <MapPin className="h-4 w-4 text-foreground-muted" />
                <span className="text-sm font-medium text-foreground">Nairobi Creative District</span>
              </div>
              
              <button
                onClick={handleOpenChat}
                className="px-6 py-3 rounded-full bg-background border border-border shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 group"
              >
                <Calendar className="h-4 w-4 text-foreground-muted group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  By Appointment
                </span>
              </button>
              
              <div className="px-6 py-3 rounded-full bg-background border border-border shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                <Users className="h-4 w-4 text-foreground-muted" />
                <span className="text-sm font-medium text-foreground">Est. 2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sacred bg-background-secondary py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Creative Laboratory",
                description: "A 160-square-meter loft with north-facing windows providing consistent natural light for optimal color perception.",
                icon: Building,
                color: "from-primary/10 to-primary/5"
              },
              {
                title: "Flexible Architecture",
                description: "Movable partitions allow transformation between working studio, viewing room, and exhibition space.",
                icon: Compass,
                color: "from-secondary/10 to-secondary/5"
              },
              {
                title: "Artist Residencies",
                description: "Quarterly residency programs for emerging African artists with mentorship and exhibition opportunities.",
                icon: Users,
                color: "from-accent/10 to-accent/5"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className={`bg-gradient-to-br ${feature.color} border border-border rounded-3xl p-8 shadow-[0_16px_48px_rgba(0,0,0,0.25)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.35)] hover:-translate-y-2 transition-all duration-500 animate-fade-in opacity-0`}
                style={{ animationDelay: `${(index + 1) * 0.2}s` }}
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-background border border-border shadow-[inset_0_2px_8px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.3)]">
                    <feature.icon className="h-8 w-8 text-foreground" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-foreground-muted leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sacred bg-background py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-border rounded-4xl p-8 md:p-12 shadow-[0_32px_64px_rgba(0,0,0,0.3)] hover:shadow-[0_48px_96px_rgba(0,0,0,0.4)] transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <p className="text-metadata mb-4">Studio Exhibition</p>
                  <h2 className="text-foreground text-3xl md:text-4xl font-bold mb-6">
                    Current Exhibition
                  </h2>
                </div>

                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4 text-primary">"Echoes of the Savannah"</h3>
                  <p className="text-foreground-muted leading-relaxed font-light mb-8">
                    A collection exploring the intersection of traditional African motifs with 
                    contemporary abstraction. This exhibition showcases works created entirely 
                    within Studio 1.6, highlighting our material research and spatial methodology.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <SculpturalButton
                      href="/exhibitions"
                      variant="primary"
                      size="lg"
                      className="shadow-[0_8px_32px_rgba(var(--primary),0.3)] hover:shadow-[0_16px_48px_rgba(var(--primary),0.4)]"
                    >
                      View Exhibition Details
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </SculpturalButton>
                    
                    <button
                      onClick={handleExhibitionChat}
                      className="buttonized inline-flex items-center gap-3 px-8 py-4 bg-background border border-border text-foreground text-sm uppercase tracking-widest font-medium hover:bg-accent hover:border-primary transition-all"
                    >
                      Book a Private Viewing
                      <Calendar className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.4)]">
                  <img 
                    src="/images/artworks/exhibition1_hsslzy_odgzn8.jpg"
                    alt="Echoes of the Savannah Exhibition"
                    className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 border-2 border-border/30 rounded-3xl pointer-events-none"></div>
                  
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold tracking-wider shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    ON VIEW
                  </div>
                </div>
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-black/20 rounded-full blur-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sacred bg-background-secondary py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="mb-8">
                <p className="text-metadata mb-4">Send a Message</p>
                <h2 className="text-foreground text-2xl md:text-3xl font-bold">Studio Correspondence</h2>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-metadata mb-2">NAME</label>
                  <input 
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-6 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors engraved shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                  />
                </div>

                <div>
                  <label className="block text-metadata mb-2">EMAIL</label>
                  <input 
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors engraved shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                  />
                </div>

                <div>
                  <label className="block text-metadata mb-2">MESSAGE</label>
                  <textarea 
                    placeholder="Your message..."
                    rows={6}
                    className="w-full px-6 py-4 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors engraved shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] resize-none"
                  />
                </div>

                <SculpturalButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-[0_8px_32px_rgba(var(--primary),0.3)] hover:shadow-[0_16px_48px_rgba(var(--primary),0.4)]"
                >
                  Send Message
                </SculpturalButton>
              </form>
            </div>

            <div className="space-y-12">
              <div>
                <p className="text-metadata mb-4">Direct Contact</p>
                <h2 className="text-foreground text-2xl md:text-3xl font-bold mb-8">
                  Studio Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="buttonized p-4 bg-muted shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                      <Mail size={24} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-metadata mb-1">EMAIL</p>
                      <a
                        href="mailto:studio@mwassgithinji.com"
                        className="text-foreground hover:text-foreground-muted transition-colors text-lg"
                      >
                        studio@mwassgithinji.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="buttonized p-4 bg-muted shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                      <Phone size={24} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-metadata mb-1">PHONE / WHATSAPP</p>
                      <button
                        onClick={handleGeneralChat}
                        className="text-foreground hover:text-foreground-muted transition-colors text-lg text-left"
                      >
                        +254 724 049 148
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="buttonized p-4 bg-muted shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                      <MapPin size={24} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-metadata mb-1">STUDIO ADDRESS</p>
                      <p className="text-foreground text-lg">
                        Studio 1.6
                        <br />
                        Rungiri, Kiambu County
                        <br />
                        Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-metadata mb-6">Follow the Studio</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/mwass_githinji?igsh=dDlyaGxiNXF5Mm4y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="buttonized p-4 bg-muted text-foreground-muted hover:text-foreground hover:bg-accent shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all flex items-center gap-3"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                <iframe
                  title="Studio Location"
                  src="https://maps.google.com/maps?hl=en&q=Rungiri, Kiambu County&z=14&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Studio Location
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}