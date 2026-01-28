// components/PlasmaBasinHero.tsx
import { useEffect, useRef } from "react";
import { SculpturalButton } from "@/components/ui/SculpturalButton";

export function PlasmaBasinHero() {
  const heroRef = useRef<HTMLElement>(null);
  const plasmaBasinRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    /* ------------------------------
       Plasma Particles
    ------------------------------ */
    const createParticles = () => {
      const particleCount = 12;

      hero.querySelectorAll(".plasma-particle").forEach(p => p.remove());

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "plasma-particle";

        const size = Math.random() * 40 + 15;
        const width = hero.offsetWidth || window.innerWidth;
        const height = hero.offsetHeight || window.innerHeight;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * width}px`;
        particle.style.top = `${Math.random() * height}px`;

        particle.style.animation = `plasma-float ${
          Math.random() * 10 + 10
        }s infinite ease-in-out ${Math.random() * 5}s`;

        hero.appendChild(particle);
      }
    };

    /* ------------------------------
       Scroll Effects
    ------------------------------ */
    const handleScroll = () => {
      const plasmaBasin = plasmaBasinRef.current;
      const heroContent = heroContentRef.current;
      const scrollLine = scrollLineRef.current;
      if (!plasmaBasin || !heroContent || !scrollLine) return;

      const heroHeight = hero.offsetHeight;
      const scrollProgress = Math.min(window.scrollY / heroHeight, 1);

      plasmaBasin.style.transform = `translate(-50%, -50%) scale(${
        1 + scrollProgress * 0.1
      })`;

      plasmaBasin.style.borderRadius = `
        ${45 - scrollProgress * 10}% 
        ${55 - scrollProgress * 15}% 
        ${40 - scrollProgress * 10}% 
        ${60 - scrollProgress * 20}% / 
        50% 45% 55% 50%
      `;

      plasmaBasin.style.width = `${140 + scrollProgress * 20}%`;
      plasmaBasin.style.height = `${120 + scrollProgress * 30}%`;

      heroContent.style.transform = `translateY(${scrollProgress * 30}px) scale(${
        1 - scrollProgress * 0.03
      })`;
      heroContent.style.opacity = `${1 - scrollProgress * 0.2}`;

      scrollLine.style.height = `${Math.max(
        0,
        60 - scrollProgress * 60
      )}px`;

      plasmaBasin.style.boxShadow = `
        inset 0 0 ${100 + scrollProgress * 50}px rgba(157,78,221,${
        0.2 + scrollProgress * 0.3
      }),
        0 0 ${150 + scrollProgress * 100}px rgba(108,43,217,${
        0.3 + scrollProgress * 0.2
      })
      `;
    };

    /* ------------------------------
       Idle Plasma Animation
    ------------------------------ */
    const animatePlasma = () => {
      const plasmaBasin = plasmaBasinRef.current;
      if (!plasmaBasin) return;

      if (window.scrollY < hero.offsetHeight) {
        const t = Date.now() * 0.001;
        plasmaBasin.style.borderRadius = `
          ${45 + Math.sin(t * 0.5) * 1.5}% 
          ${55 + Math.cos(t * 0.3) * 2}% 
          ${40 - Math.sin(t * 0.5) * 1.5}% 
          ${60 - Math.cos(t * 0.3) * 2}% / 
          50% 45% 55% 50%
        `;
      }

      animationRef.current = requestAnimationFrame(animatePlasma);
    };

    /* ------------------------------
       Ripple Effect
    ------------------------------ */
    const createRipple = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const size = Math.max(hero.offsetWidth, hero.offsetHeight) * 0.3;

      const ripple = document.createElement("div");
      ripple.className = "plasma-ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      hero.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = "scale(2)";
        ripple.style.opacity = "0";
      });

      setTimeout(() => ripple.remove(), 800);
    };

    /* ------------------------------
       Init
    ------------------------------ */
    createParticles();
    handleScroll();
    animationRef.current = requestAnimationFrame(animatePlasma);

    hero.addEventListener("click", createRipple);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", createParticles);

    return () => {
      hero.removeEventListener("click", createRipple);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", createParticles);
      cancelAnimationFrame(animationRef.current);
      hero.querySelectorAll(".plasma-particle").forEach(p => p.remove());
    };
  }, []);

  return (
    <section className="plasma-hero" ref={heroRef}>
      <div className="plasma-basin" ref={plasmaBasinRef} />

      <div className="plasma-hero-content" ref={heroContentRef}>
        <div className="plasma-hero-tag">Contemporary Kenyan Artist</div>
        <h1 className="plasma-hero-headline">
          Hello, I am
          <br />
          <span className="block mt-4">Mwass Githinji</span>
        </h1>
        <p className="plasma-hero-subheadline">
          Working from Nairobi's vibrant art scene, my practice emerges from a lifelong
          dialogue with mark-making—from childhood sticks on soil to oil pastels on black canvas.
          Each work navigates vulnerability and memory, building psychological spaces where
          African storytelling meets global contemplation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
          <SculpturalButton href="/artworks" variant="primary" size="lg">
            Explore Collection
          </SculpturalButton>
          <SculpturalButton href="/about" variant="outline" size="lg">
            Biography & Practice
          </SculpturalButton>
        </div>
      </div>

      <div className="plasma-scroll-indicator">
        <div className="plasma-scroll-line" ref={scrollLineRef} />
        <span>SCROLL TO ACTIVATE PLASMA</span>
      </div>
    </section>
  );
}
