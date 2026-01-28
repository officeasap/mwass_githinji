import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SculpturalButton } from "@/components/ui/SculpturalButton";
import { exhibitions, Exhibition } from "@/lib/exhibitions";
import { Calendar, MapPin } from "lucide-react";

const Exhibitions = () => {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const getDateRange = (start: string, end: string) => {
    return `${formatDate(start)} — ${formatDate(end)}`;
  };

  const isOngoing = (endDate: string) => {
    return new Date(endDate) > new Date();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-sacred bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-metadata mb-6 animate-fade-in opacity-0 stagger-1">
              Past & Present
            </p>
            <h1 className="text-foreground mb-8 animate-rise opacity-0 stagger-2">
              Exhibitions
            </h1>
            <p className="text-xl text-foreground-muted font-light leading-relaxed animate-fade-in opacity-0 stagger-3">
              A chronicle of institutional presentations and gallery collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-sacred bg-background-secondary relative">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Timeline Line (desktop only) */}
          <div className="hidden lg:block timeline-line" />

          <div className="space-y-16 lg:space-y-24">
            {exhibitions.map((exhibition, index) => (
              <ExhibitionCard 
                key={exhibition.id} 
                exhibition={exhibition}
                index={index}
                isOngoing={isOngoing(exhibition.endDate)}
                dateRange={getDateRange(exhibition.startDate, exhibition.endDate)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sacred bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-foreground mb-8">Curatorial Inquiries</h2>
          <p className="text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            For exhibition proposals, institutional loans, or curatorial collaborations, 
            please reach out to the studio.
          </p>
          <SculpturalButton href="/contact" variant="primary" size="lg">
            Contact for Exhibitions
          </SculpturalButton>
        </div>
      </section>
    </Layout>
  );
};

interface ExhibitionCardProps {
  exhibition: Exhibition;
  index: number;
  isOngoing: boolean;
  dateRange: string;
}

function ExhibitionCard({ exhibition, index, isOngoing, dateRange }: ExhibitionCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div 
      className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 animate-rise opacity-0 ${
        isEven ? "" : "lg:direction-rtl"
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Image - Clickable */}
      <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <button className="image-frame aspect-[4/3] overflow-hidden w-full cursor-pointer">
          <img
            src={exhibition.image}
            alt={exhibition.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </button>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div className="space-y-6">
          {/* Status Badge */}
          {isOngoing && (
            <span className="inline-block px-4 py-2 bg-foreground text-background text-xs uppercase tracking-widest shadow-elevated radius-primary">
              Currently Showing
            </span>
          )}

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-light text-foreground">
            {exhibition.title}
          </h2>

          {/* Meta */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-foreground-muted">
              <MapPin size={16} />
              <span>{exhibition.gallery}, {exhibition.location}</span>
            </div>
            <div className="flex items-center gap-3 text-foreground-muted">
              <Calendar size={16} />
              <span>{dateRange}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-foreground-muted leading-relaxed">
            {exhibition.description}
          </p>
        </div>
      </div>

      {/* Timeline Dot (desktop only) */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-foreground shadow-elevated rounded-full z-10" />
    </div>
  );
}

export default Exhibitions;
