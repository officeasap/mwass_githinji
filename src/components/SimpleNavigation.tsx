// components/SimpleNavigation.tsx
import { NavLink } from './NavLink';

export function SimpleNavigation() {
  // ALL navigation items including Studio
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/artworks", label: "Artworks" },
    { to: "/studio", label: "Studio" }, // STUDIO IS HERE
    { to: "/exhibitions", label: "Exhibitions" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-black/70 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            STUDIO 1.6
          </div>
          
          {/* ALL Navigation Items - Horizontal Scroll */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex items-center gap-4 md:gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
              {navItems.map((item) => (
                <NavLink 
                  key={item.to}
                  to={item.to}
                  className="inline-block px-3 md:px-4 py-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5 text-sm md:text-base"
                  activeClassName="text-white bg-white/10 font-medium"
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}