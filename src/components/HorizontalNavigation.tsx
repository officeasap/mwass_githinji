// components/HorizontalNavigation.tsx
import { NavLink } from './NavLink';
import { useRef, useEffect, useState } from 'react';

export function HorizontalNavigation() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  // Check scroll position for fade effects
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    setShowLeftFade(scrollLeft > 0);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  // Navigation items
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/artworks", label: "Artworks" },
    { to: "/studio", label: "Studio" },
    { to: "/exhibitions", label: "Exhibitions" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-2 relative">
        {/* Logo */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            STUDIO 1.6
          </div>
        </div>
        
        {/* Left fade indicator */}
        {showLeftFade && (
          <div className="absolute left-20 top-0 bottom-0 w-12 bg-gradient-to-r from-black/90 to-transparent pointer-events-none z-10" />
        )}
        
        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="ml-28 mr-28 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-fade-right"
        >
          <div className="flex items-center gap-2 py-2 min-w-max">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-200 rounded-full hover:bg-white/10 border border-transparent hover:border-white/20"
                activeClassName="text-white bg-white/10 border-white/20"
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        
        {/* Right fade indicator */}
        {showRightFade && (
          <div className="absolute right-4 top-0 bottom-0 w-12 bg-gradient-to-l from-black/90 to-transparent pointer-events-none z-10" />
        )}
        
        {/* Scroll hint (only visible on touch devices) */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {/* Mobile menu button for smaller screens */}
      <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
        <button className="text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}