import { useState, useEffect, useRef } from 'react';

/**
 * Returns true when the observed element is out of view (user has scrolled past it).
 * Use to show a sticky CTA bar on mobile when the main product actions leave the viewport.
 */
export function useStickyProductBar() {
  const [showBar, setShowBar] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowBar(!entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { showBar, actionsRef: ref };
}
