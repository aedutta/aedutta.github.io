import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import P5Canvas from '../components/P5Canvas.jsx';
import gameOfLifeSketch from '../sketches/gameOfLife.js';
import isingSketch from '../sketches/ising.js';
import flowFieldSketch from '../sketches/flowField.js';
import cardioidSketch from '../sketches/cardioid.js';
import auroraVeilSketch from '../sketches/auroraVeil.js';
import doublePendulumSketch from '../sketches/doublePendulum.js';
import kuramotoSketch from '../sketches/kuramoto.js';

const sketches = {
  'game-of-life': gameOfLifeSketch,
  ising: isingSketch,
  'flow-field': flowFieldSketch,
  cardioid: cardioidSketch,
  'aurora-veil': auroraVeilSketch,
  'double-pendulum': doublePendulumSketch,
  kuramoto: kuramotoSketch,
};

const RECORD_MS = 5000;
const PRE_ROLL_MS = 1500;

const SketchRecorder = () => {
  const { slug } = useParams();
  const containerRef = useRef(null);
  const [status, setStatus] = useState('init');

  useEffect(() => {
    if (!sketches[slug]) {
      setStatus('unknown sketch');
      return undefined;
    }

    let mediaRecorder;
    let cancelled = false;

    const start = async () => {
      // Give the sketch a moment to settle into an interesting state
      await new Promise((r) => setTimeout(r, PRE_ROLL_MS));
      if (cancelled) return;

      const canvas = containerRef.current?.querySelector('canvas');
      if (!canvas || !canvas.captureStream) {
        setStatus('no canvas / MediaRecorder unsupported');
        return;
      }

      const stream = canvas.captureStream(30);
      const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm;codecs=vp8';

      const chunks = [];
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime,
        videoBitsPerSecond: 600_000,
      });
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size) chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slug}.webm`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setStatus('done — file downloaded');
      };

      mediaRecorder.start();
      setStatus('recording…');
      setTimeout(() => {
        if (!cancelled && mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, RECORD_MS);
    };

    start();

    return () => {
      cancelled = true;
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    };
  }, [slug]);

  const sketch = sketches[slug];
  if (!sketch) {
    return (
      <div style={{ padding: '2rem', color: '#fff', background: '#000', minHeight: '100vh' }}>
        Unknown sketch: {slug}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0e101a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'monospace',
        gap: '1rem',
      }}
    >
      <div ref={containerRef}>
        <P5Canvas sketch={sketch} />
      </div>
      <div
        style={{
          position: 'fixed',
          top: '0.5rem',
          left: '0.5rem',
          fontSize: '0.75rem',
          opacity: 0.6,
        }}
      >
        {slug} · {status}
      </div>
    </div>
  );
};

export default SketchRecorder;
