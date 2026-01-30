// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import FloatingChat from "@/components/chat/FloatingChat"; // ✅ Fixed: Removed { }

// Pages
import Index from "@/pages/Index";          // Home page
import About from "@/pages/About";
import Artworks from "@/pages/Artworks";
import ArtworkDetail from "@/pages/ArtworkDetail";
import Exhibitions from "@/pages/Exhibitions";
import Contact from "@/pages/Contact";
import Studio from "@/pages/Studio";
import NotFound from "@/pages/NotFound";
import AdminArtStudio from "@/pages/AdminArtStudio"; // ✅ ADD THIS LINE

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toasts */}
        <Toaster />
        <Sonner
          position="bottom-right"
          toastOptions={{
            style: {
              background: "hsl(40, 4%, 13%)",
              border: "1px solid hsl(40, 4%, 20%)",
              color: "hsl(40, 10%, 90%)",
              boxShadow: "0 10px 28px rgba(0, 0, 0, 0.55)",
              borderRadius: "18px",
            },
          }}
        />

        {/* Router */}
        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            {/* Home */}
            <Route path="/" element={<Index />} />

            {/* Primary Pages */}
            <Route path="/studio" element={<Studio />} />
            <Route path="/about" element={<About />} />
            <Route path="/artworks" element={<Artworks />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/exhibitions" element={<Exhibitions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/admin/art-studio" element={<AdminArtStudio />} />

            {/* ✅ ADD THIS ROUTE - NO WALLS SHAKEN */}
            <Route path="/admin/art-studio" element={<AdminArtStudio />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Global Floating UI */}
          <FloatingChat />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;