import { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Canvas = ({ sketch, className, settings, frameRate, paused }) => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    let instance;
    if (containerRef.current && typeof sketch === 'function') {
      instance = new p5((p) => {
        sketch(p, settingsRef);
        if (frameRate) {
          const origSetup = p.setup;
          p.setup = function patchedSetup() {
            if (origSetup) origSetup.call(p);
            p.frameRate(frameRate);
          };
        }
      }, containerRef.current);
      instanceRef.current = instance;
    }
    return () => {
      if (instance) {
        instance.remove();
      }
      instanceRef.current = null;
    };
  }, [sketch, frameRate]);

  useEffect(() => {
    const instance = instanceRef.current;
    if (!instance) return;
    if (paused) {
      instance.noLoop();
    } else {
      instance.loop();
    }
  }, [paused]);

  return <div className={className} ref={containerRef} />;
};

export default P5Canvas;
