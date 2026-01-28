// components/Navigation.tsx
import { NavLink } from './NavLink';
import { useState } from 'react';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items in order
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/artworks", label: "Artworks" },
    { to: "/studio", label: "Studio" }, // <-- Studio added here
    { to: "/exhibitions", label: "Exhibitions" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex-shrink-0">
            STUDIO 1.6
          </div>
          
          {/* Desktop Navigation - All items in horizontal scroll */}
          <div className="hidden md:flex flex-1 ml-8">
            <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide px-4 py-2">
              {navItems.map((item) => (
                <NavLink 
                  key={item.to}
                  to={item.to} 
                  className="text-white/70 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 min-w-max"
                  activeClassName="text-white bg-white/10"
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-2 bg-black/80 backdrop-blur-lg rounded-xl p-4">
              {navItems.map((item) => (
                <NavLink 
                  key={item.to}
                  to={item.to} 
                  className="text-white/70 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-white/5"
                  activeClassName="text-white bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}