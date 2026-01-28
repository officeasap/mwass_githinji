// components/PlasmaNavigation.tsx
import { useEffect, useRef } from 'react';
import { NavLink } from './NavLink';

export function PlasmaNavigation() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="plasma-nav" ref={navRef}>
      <div className="plasma-nav-content">
        <div className="plasma-logo">STUDIO 1.6</div>
        <div className="plasma-nav-links">
          <NavLink 
            to="/" 
            className="plasma-nav-link"
            activeClassName="active"
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/artworks" 
            className="plasma-nav-link"
            activeClassName="active"
          >
            Artworks
          </NavLink>
          <NavLink 
            to="/about" 
            className="plasma-nav-link"
            activeClassName="active"
          >
            Biography
          </NavLink>
          <NavLink 
            to="/studio" 
            className="plasma-nav-link"
            activeClassName="active"
          >
            Studio
          </NavLink>
          <NavLink 
            to="/exhibitions" 
            className="plasma-nav-link"
            activeClassName="active"
          >
            Exhibitions
          </NavLink>
          <NavLink 
            to="/contact" 
            className="plasma-nav-link"
            activeClassName="active"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}