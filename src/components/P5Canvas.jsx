import { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Canvas = ({ sketch, className, settings }) => {
  const containerRef = useRef(null);
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    let instance;
    if (containerRef.current && typeof sketch === 'function') {
      instance = new p5((p) => sketch(p, settingsRef));
    }
    return () => {
      if (instance) {
        instance.remove();
      }
    };
  }, [sketch]);

  return <div className={className} ref={containerRef} />;
};

export default P5Canvas;
