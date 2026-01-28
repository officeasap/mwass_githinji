// src/components/AnimationFix.tsx
import { useEffect } from "react";

export function AnimationFix() {
  useEffect(() => {
    // Add loaded class to body when JavaScript is ready
    document.body.classList.add('js-loaded');
    
    // Force visibility of animated elements after a short delay
    const timer = setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-rise');
      animatedElements.forEach(el => {
        el.classList.remove('opacity-0');
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.visibility = 'visible';
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}