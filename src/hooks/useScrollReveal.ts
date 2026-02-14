import { useEffect, useRef } from 'react';

/**
 * Adds .revealed when the element enters the viewport (with threshold).
 * Use with class "reveal-on-scroll" for the CSS transition.
 */
export function useScrollReveal(threshold = 0.1, rootMargin = '0px 0px -40px 0px') {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
