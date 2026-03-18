import { useEffect, useRef } from 'react';

const Giscus = () => {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Remove any existing giscus iframe on re-render
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'aedutta/aedutta.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOJqPkvQ');
    script.setAttribute('data-category', 'Blog Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOJqPkvc4C4p8C');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'dark_high_contrast');
    script.setAttribute('data-lang', 'en');
    script.crossOrigin = 'anonymous';
    script.async = true;

    container.appendChild(script);

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={ref} className="giscus-wrapper" />;
};

export default Giscus;
