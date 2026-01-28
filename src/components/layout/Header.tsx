import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Updated navigation array - Studio moved after Exhibitions
const navigation = [
  { name: "Home", href: "/" },  // HOME FIRST
  { name: "About", href: "/about" },
  { name: "Artworks", href: "/artworks" },
  { name: "Exhibitions", href: "/exhibitions" },
  { name: "Studio", href: "/studio" },  // STUDIO NOW AFTER EXHIBITIONS
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border backdrop-blur-lg">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo — Official Image */}
          <Link to="/" className="inline-flex items-center group">
            <img
              src="/studio1-6logo.png"
              alt="Studio 1.6 logo"
              className="h-12 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-pill text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 px-6 py-3 rounded-full ${
                  location.pathname === item.href
                    ? "active text-foreground bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 shadow-[inset_0_2px_8px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)]"
                    : "text-foreground-muted hover:text-foreground hover:bg-accent/10 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                } ${item.name === "Studio" ? "text-[#02abec] hover:text-[#02abec]/90" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden buttonized p-4 bg-gradient-to-br from-background to-muted border border-border rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={28} className="text-primary animate-spin-in" />
            ) : (
              <Menu size={28} className="text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-24 left-0 right-0 bg-gradient-to-b from-background to-background/95 border-b border-border/50 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-slide-down">
            <div className="flex flex-col py-6 px-6 space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`nav-mobile px-8 py-5 text-lg tracking-[0.15em] uppercase font-medium rounded-2xl transition-all duration-300 animate-fade-in ${
                    location.pathname === item.href
                      ? "active text-foreground bg-gradient-to-r from-primary/30 to-secondary/30 border border-primary/40 shadow-[inset_0_2px_12px_rgba(255,255,255,0.15)]"
                      : "text-foreground-muted bg-background/80 hover:bg-accent/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:-translate-y-1"
                  } ${item.name === "Studio" ? "text-[#02abec] border-l-4 border-[#02abec]" : ""}`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}