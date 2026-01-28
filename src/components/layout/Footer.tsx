import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Artworks", href: "/artworks" },
  { name: "Exhibitions", href: "/exhibitions" },
  { name: "Studio", href: "/studio" }, // Added Studio
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border pt-12 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main footer content with vertical padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/studio1-6logo.png"
                alt="Studio 1.6 logo"
                className="h-10 w-auto"
              />
            </Link>

            <p className="leading-relaxed max-w-xs" style={{ color: '#b4ac94' }}>
              African storytelling through mythic authority.
              Each work channels the Fibonacci spiral of existence.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="uppercase tracking-wider text-sm font-medium" style={{ color: '#b4ac94' }}>
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="kinetic hover:text-foreground transition-colors"
                  style={{ color: '#b4ac94' }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="uppercase tracking-wider text-sm font-medium" style={{ color: '#b4ac94' }}>
              Contact
            </h4>
            
            {/* Contact Info with #b4ac94 icons and text */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin 
                  size={18} 
                  className="shadow-inner"
                  style={{ color: '#b4ac94' }}
                />
                <span style={{ color: '#b4ac94' }}>Rungiri, Kiambu County</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone 
                  size={18} 
                  className="shadow-inner"
                  style={{ color: '#b4ac94' }}
                />
                <span style={{ color: '#b4ac94' }}>+254 797 227 376</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail 
                  size={18} 
                  className="shadow-inner"
                  style={{ color: '#b4ac94' }}
                />
                <span style={{ color: '#b4ac94' }}>studio@mwassgithinji.com</span>
              </div>
            </div>

            {/* Note about social media */}
            <p className="text-xs pt-4 opacity-80" style={{ color: '#b4ac94' }}>
              Connect with Studio 1.6 on social media through our Contact page.
            </p>
          </div>
        </div>

        {/* Bottom line with breathing space */}
        <div className="border-t border-border pt-8 pb-4 text-center text-sm" style={{ color: '#b4ac94' }}>
          © {new Date().getFullYear()} Studio 1.6 — All Rights Reserved
        </div>
      </div>
    </footer>
  );
}