import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Tex from '../components/Tex.jsx';
import { publications } from '../data/research.jsx';
import './HomePage.css';

const selectedWork = [
  {
    title: 'Multi-modal video search engine',
    teaser: 'search video like you search text',
    meta: 'TreeHacks 2026 · 2× winner',
    href: 'https://github.com/aedutta/shot-spot-treehacks-26/',
  },
  {
    title: 'Out-of-order CPU',
    teaser: '2-way superscalar with register renaming and a 16-entry ROB',
    meta: 'ECE 411 · top 10',
    href: '/assets/docs/mp_ooo_final_report.pdf',
  },
  {
    title: 'Low-latency trading engine',
    teaser: 'C++20, thread-per-core, lock-free SPSC ring buffers',
    meta: '36 ns tick-to-signal',
    href: 'https://github.com/aedutta/trading-engine',
  },
  {
    title: 'GPU-accelerated CNN inference',
    teaser: 'WMMA Tensor Cores, fused im2col, 6.6× over baseline',
    meta: 'ECE 408 · 5 / 130',
    href: '/assets/docs/ece408_m3_report.pdf',
  },
  {
    title: 'Autonomous racing drone',
    teaser: 'ROS 2 stack, min-snap planner, YOLOv8 gate segmentation',
    meta: 'Fall 2025',
    href: 'https://docs.google.com/presentation/d/1EKGWp58CEbZTYGvxlE51tSKOSMj0S25LChlRmyB2_zw/edit',
  },
];

const featuredSketches = [
  {
    path: 'game-of-life',
    label: 'Game of Life',
    loadSketch: () => import('../sketches/gameOfLife.js').then((m) => m.default),
  },
  {
    path: 'ising',
    label: 'Ising Model',
    loadSketch: () => import('../sketches/ising.js').then((m) => m.default),
  },
  {
    path: 'flow-field',
    label: 'Flow Field',
    loadSketch: () => import('../sketches/flowField.js').then((m) => m.default),
  },
  {
    path: 'cardioid',
    label: 'Cardioid Caustics',
    loadSketch: () => import('../sketches/cardioid.js').then((m) => m.default),
  },
];

const LazySketchCard = ({ path, label, loadSketch }) => {
  const ref = useRef(null);
  const hasMountedRef = useRef(false);
  const [bundle, setBundle] = useState(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      Promise.all([import('../components/P5Canvas.jsx'), loadSketch()]).then(
        ([mod, sketch]) => {
          setBundle({ Canvas: mod.default, sketch });
          setPaused(false);
        },
      );
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !hasMountedRef.current) {
          hasMountedRef.current = true;
          Promise.all([import('../components/P5Canvas.jsx'), loadSketch()]).then(
            ([mod, sketch]) => {
              setBundle({ Canvas: mod.default, sketch });
              setPaused(false);
            },
          );
        } else if (hasMountedRef.current) {
          setPaused(!visible);
        }
      },
      { rootMargin: '100px', threshold: 0 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [loadSketch]);

  return (
    <Link ref={ref} to={`/animations/${path}`} className="paper__sketch-card">
      <div
        className="paper__sketch-thumb"
        style={
          bundle
            ? undefined
            : { backgroundImage: `url(/assets/images/sketches/${path}.png)` }
        }
        aria-hidden="true"
      >
        {bundle && (
          <bundle.Canvas
            sketch={bundle.sketch}
            className="paper__sketch-canvas"
            frameRate={30}
            paused={paused}
            renderScale={0.5}
          />
        )}
      </div>
      <span className="paper__sketch-label">{label}</span>
    </Link>
  );
};

const HomePubFig = ({ src, label }) => {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <div className="paper__pub-fig paper__pub-fig--placeholder" aria-hidden="true">
        <span className="paper__pub-fig-label">{label}</span>
      </div>
    );
  }
  return (
    <div className="paper__pub-fig">
      <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
    </div>
  );
};

const featuredResearch = publications.slice(0, 2);

const blogModules = import.meta.glob('./blogs/*.jsx', { eager: true });
const blogRawModules = import.meta.glob('./blogs/*.jsx', {
  query: '?raw',
  eager: true,
  import: 'default',
});

const previewFromRaw = (raw) => {
  const match = raw?.match(/<p>([\s\S]*?)<\/p>/);
  if (!match) return '';
  const text = match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > 90 ? text.slice(0, 90).trim() + '…' : text;
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

const writing = Object.entries(blogModules)
  .map(([path, mod]) => ({
    id: path.split('/').pop().replace('.jsx', ''),
    title: mod.meta?.title,
    date: mod.meta?.date,
    teaser: previewFromRaw(blogRawModules[path]),
  }))
  .filter((p) => p.title && p.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3);

const ChipBanner = ({ energized = false }) => {
  const body = { x: 240, y: 70, w: 120, h: 120 };
  const n = 13;
  const pitch = body.w / (n + 1);
  const leadLen = 14;
  const leadW = 3.6;
  const padLen = 18;
  const padW = 6;

  const leads = [];
  const pads = [];
  const add = (cx, cy, dir) => {
    const vert = dir === 'up' || dir === 'down';
    const sign = dir === 'up' || dir === 'left' ? -1 : 1;
    if (vert) {
      const tipY = cy + sign * leadLen;
      pads.push({ x: cx - padW / 2, y: tipY - padLen / 2 + sign * 3, w: padW, h: padLen });
      leads.push({ x: cx - leadW / 2, y: Math.min(cy, tipY), w: leadW, h: leadLen });
    } else {
      const tipX = cx + sign * leadLen;
      pads.push({ x: tipX - padLen / 2 + sign * 3, y: cy - padW / 2, w: padLen, h: padW });
      leads.push({ x: Math.min(cx, tipX), y: cy - leadW / 2, w: leadLen, h: leadW });
    }
  };
  for (let i = 0; i < n; i += 1) {
    const o = pitch * (i + 1);
    add(body.x + o, body.y, 'up');
    add(body.x + o, body.y + body.h, 'down');
    add(body.x, body.y + o, 'left');
    add(body.x + body.w, body.y + o, 'right');
  }

  const traces = [
    { p: '214,99 150,99 150,55 72,55', lit: false },
    { p: '214,161 132,161 132,205 72,205', lit: true },
    { p: '386,99 452,99 452,55 528,55', lit: true },
    { p: '386,161 470,161 470,205 528,205', lit: false },
    { p: '300,53 300,32 384,32', lit: false },
    { p: '300,207 300,230 216,230', lit: false },
  ];
  const vias = [
    [72, 55], [72, 205], [528, 55], [528, 205], [384, 32], [216, 230],
  ];
  const cx = body.x + body.w / 2;

  return (
    <svg
      className={`paper__chip${energized ? ' is-energized' : ''}`}
      viewBox="0 0 600 260"
      role="img"
      aria-label="Integrated circuit on a printed circuit board, die etched A. DUTTA"
    >
      <defs>
        <linearGradient id="chip-pcb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#222226" />
          <stop offset="0.5" stopColor="#151517" />
          <stop offset="1" stopColor="#0b0b0d" />
        </linearGradient>
        <linearGradient id="chip-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#44444b" />
          <stop offset="0.16" stopColor="#2a2a2f" />
          <stop offset="0.55" stopColor="#19191d" />
          <stop offset="1" stopColor="#0d0d10" />
        </linearGradient>
        <linearGradient id="chip-lead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f2f6" />
          <stop offset="0.5" stopColor="#a6a6ae" />
          <stop offset="1" stopColor="#d2d2d8" />
        </linearGradient>
        <radialGradient id="chip-solder" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#dcdce2" />
          <stop offset="1" stopColor="#84848c" />
        </radialGradient>
        <radialGradient id="chip-vignette" cx="0.5" cy="0.5" r="0.62">
          <stop offset="0.55" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.45" />
        </radialGradient>
      </defs>

      {/* board substrate */}
      <rect x="0" y="0" width="600" height="260" rx="12" fill="url(#chip-pcb)" />
      <rect
        x="8"
        y="8"
        width="584"
        height="244"
        rx="8"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.05"
      />

      {/* fiducials + board silkscreen */}
      {[[22, 22], [578, 238]].map(([fx, fy]) => (
        <g key={`fid-${fx}`}>
          <circle cx={fx} cy={fy} r="6" fill="#0b0b0d" />
          <circle cx={fx} cy={fy} r="3" fill="#c9a24f" />
        </g>
      ))}
      <text x="40" y="44" className="paper__chip-silk" textAnchor="start">ÆD·SYS</text>
      <text x="560" y="238" className="paper__chip-silk" textAnchor="end">REV.A · 2026</text>

      {/* copper traces */}
      {traces.map((t) => (
        <polyline
          key={t.p}
          points={t.p}
          fill="none"
          stroke="#c9a24f"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      ))}
      {/* signal pulses */}
      {traces
        .filter((t) => t.lit || energized)
        .map((t) => (
          <polyline
            key={`lit-${t.p}`}
            className="paper__chip-pulse"
            points={t.p}
            fill="none"
            stroke="#ffd9a0"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="12 260"
          />
        ))}

      {/* vias */}
      {vias.map(([vx, vy]) => (
        <g key={`via-${vx}-${vy}`}>
          <circle className="paper__chip-via" cx={vx} cy={vy} r="5.4" fill="#c9a24f" />
          <circle cx={vx} cy={vy} r="2.4" fill="#0b0b0d" />
        </g>
      ))}

      {/* passives (0805) */}
      {[
        { x: 30, y: 112, label: 'C1', lx: 36, ly: 102 },
        { x: 558, y: 112, label: 'R1', lx: 564, ly: 102 },
      ].map((c) => (
        <g key={c.label}>
          <rect x={c.x - 2.5} y={c.y - 6} width="17" height="7" rx="1" fill="url(#chip-solder)" />
          <rect x={c.x - 2.5} y={c.y + 35} width="17" height="7" rx="1" fill="url(#chip-solder)" />
          <rect x={c.x - 1} y={c.y - 4} width="14" height="9" rx="1" fill="#cfcfd6" />
          <rect x={c.x - 1} y={c.y + 31} width="14" height="9" rx="1" fill="#cfcfd6" />
          <rect x={c.x} y={c.y} width="12" height="36" rx="1.5" fill="#7c5a2e" />
          <text x={c.lx} y={c.ly} textAnchor="middle" className="paper__chip-silk">
            {c.label}
          </text>
        </g>
      ))}

      {/* power LED */}
      <g>
        <rect x="114" y="34" width="6" height="7" rx="1" fill="url(#chip-solder)" />
        <rect x="114" y="49" width="6" height="7" rx="1" fill="url(#chip-solder)" />
        <rect
          className={`paper__chip-led${energized ? ' is-on' : ''}`}
          x="113"
          y="40"
          width="8"
          height="10"
          rx="1.5"
        />
        <text x="117" y="28" textAnchor="middle" className="paper__chip-silk">PWR</text>
      </g>

      {/* solder pads under leads */}
      {pads.map((p) => (
        <rect key={`pad-${p.x}-${p.y}`} x={p.x} y={p.y} width={p.w} height={p.h} rx="1.6" fill="url(#chip-solder)" />
      ))}
      {/* gull-wing leads */}
      {leads.map((l) => (
        <rect key={`lead-${l.x}-${l.y}`} x={l.x} y={l.y} width={l.w} height={l.h} rx="1" fill="url(#chip-lead)" />
      ))}

      {/* silkscreen designator + pin-1 marker */}
      <text x={body.x - 6} y={body.y - 6} textAnchor="end" className="paper__chip-silk">U1</text>
      <circle cx={body.x - 8} cy={body.y + 6} r="2.6" fill="#e6e6ea" opacity="0.7" />

      {/* package body */}
      <rect
        x={body.x}
        y={body.y}
        width={body.w}
        height={body.h}
        rx="8"
        fill="url(#chip-body)"
        stroke="#000000"
        strokeOpacity="0.6"
      />
      {/* bevel + sheen */}
      <rect
        x={body.x + 4}
        y={body.y + 4}
        width={body.w - 8}
        height={body.h - 8}
        rx="6"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.06"
      />
      <rect
        x={body.x + 8}
        y={body.y + 8}
        width={body.w - 16}
        height="24"
        rx="5"
        fill="#ffffff"
        opacity="0.05"
      />
      {/* pin-1 dimple */}
      <circle cx={body.x + 18} cy={body.y + 18} r="7" fill="#0c0c0e" />
      <circle cx={body.x + 16} cy={body.y + 16} r="2" fill="#ffffff" opacity="0.18" />

      {/* laser-etched die markings */}
      <g textAnchor="middle">
        <text x={cx} y={body.y + 34} className="paper__chip-mark">ASHMIT DUTTA</text>
        <text x={cx} y={body.y + 50} className="paper__chip-sub">ECE · UIUC</text>
        <text x={cx} y={body.y + 78} className="paper__chip-part">AD-4080</text>
        <text x={cx} y={body.y + 94} className="paper__chip-sub">2026 · REV A</text>
      </g>

      {/* lighting vignette */}
      <rect x="0" y="0" width="600" height="260" rx="12" fill="url(#chip-vignette)" pointerEvents="none" />
    </svg>
  );
};

// --- Live telemetry the chip "reads out" -------------------------------------

const readGpu = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const ext = gl && gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return null;
    let r = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '';
    r = r
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/(ANGLE|Direct3D|Metal|OpenGL|Vulkan|vs_\d_\d|ps_\d_\d).*/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    return r ? r.slice(0, 26).toUpperCase() : null;
  } catch {
    return null;
  }
};

const measureRefresh = () =>
  new Promise((resolve) => {
    let last = null;
    let count = 0;
    let total = 0;
    const tick = (t) => {
      if (last !== null) {
        total += t - last;
        count += 1;
      }
      last = t;
      if (count < 12) requestAnimationFrame(tick);
      else resolve(Math.round(1000 / (total / count)));
    };
    requestAnimationFrame(tick);
  });

const readDevice = async () => {
  const out = [];
  if (navigator.hardwareConcurrency) out.push(`CORES ${navigator.hardwareConcurrency}`);
  if (navigator.deviceMemory) out.push(`MEM ${navigator.deviceMemory} GB`);
  const gpu = readGpu();
  if (gpu) out.push(`GPU ${gpu}`);
  try {
    const hz = await measureRefresh();
    if (hz && hz > 30 && hz < 400) out.push(`DISPLAY ${hz} HZ`);
  } catch {
    /* ignore */
  }
  const conn = navigator.connection;
  if (conn && conn.effectiveType) out.push(`NET ${conn.effectiveType.toUpperCase()}`);
  try {
    const battery = navigator.getBattery && (await navigator.getBattery());
    if (battery) {
      out.push(`BATT ${Math.round(battery.level * 100)}%${battery.charging ? ' CHG' : ''}`);
    }
  } catch {
    /* ignore */
  }
  if (navigator.language) out.push(`LOCALE ${navigator.language.toUpperCase()}`);
  return out;
};

const InteractiveChip = () => {
  const [energized, setEnergized] = useState(false);
  const [segments, setSegments] = useState(['BOOTING…']);
  const [idx, setIdx] = useState(0);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const timerRef = useRef(0);

  // Read the visitor's device telemetry once on mount.
  useEffect(() => {
    let alive = true;
    (async () => {
      const device = await readDevice();
      if (!alive) return;
      setSegments(device.length ? device : ['SYSTEM ONLINE']);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Cycle the readout through the collected segments.
  useEffect(() => {
    if (segments.length <= 1) return undefined;
    const id = setInterval(() => setIdx((i) => (i + 1) % segments.length), 2400);
    return () => clearInterval(id);
  }, [segments]);

  useEffect(
    () => () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timerRef.current);
      clearInterval(rafRef.current);
    },
    [],
  );

  const handleMove = (e) => {
    const frame = e.currentTarget;
    const r = frame.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const t = frame.querySelector('.paper__chip-tilt');
      if (!t) return;
      t.style.setProperty('--rx', `${((0.5 - py) * 9).toFixed(2)}deg`);
      t.style.setProperty('--ry', `${((px - 0.5) * 13).toFixed(2)}deg`);
      t.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      t.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    });
  };

  const handleLeave = (e) => {
    const t = e.currentTarget.querySelector('.paper__chip-tilt');
    if (!t) return;
    // Only level out the tilt — leave the glare position alone so it fades
    // in place instead of sliding to center.
    t.style.setProperty('--rx', '0deg');
    t.style.setProperty('--ry', '0deg');
  };

  const energize = () => {
    setEnergized(true);
    setIdx(0);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setEnergized(false), 1600);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      energize();
    }
  };

  return (
    <div className="paper__chip-stage">
      <div
        className="paper__chip-frame"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onClick={energize}
        onKeyDown={handleKey}
        role="button"
        tabIndex={0}
        aria-label="Interactive circuit board — tilt it with your cursor, click to energize"
      >
        <div className="paper__chip-tilt">
          <ChipBanner energized={energized} />
          <span className="paper__chip-glare" aria-hidden="true" />
        </div>
      </div>
      <div className="paper__chip-bar">
        <span className="paper__chip-readout" aria-live="polite">
          <span
            className={`paper__chip-stat${energized ? ' is-on' : ''}`}
            aria-hidden="true"
          />
          <span className="paper__chip-readout-prompt">SYS&gt;</span>
          <span className="paper__chip-readout-val">
            {energized ? 'POWER OK · SELF-TEST PASS' : segments[idx]}
          </span>
          <span className="paper__chip-readout-cursor" aria-hidden="true">
            ▋
          </span>
        </span>
        <span className="paper__chip-hint">Tilt · Click to energize</span>
      </div>
    </div>
  );
};

const HomePage = () => (
  <article className="paper">
    <header className="paper__masthead">
      <div className="paper__masthead-main">
        <h1 className="paper__title">Ashmit Dutta</h1>
        <p className="paper__subtitle">
          Electrical &amp; Computer Engineering, University of Illinois Urbana–Champaign
        </p>
      </div>
      <nav className="paper__social" aria-label="social links">
        <a href="https://github.com/aedutta" target="_blank" rel="noreferrer">
          GitHub<span className="paper__social-arrow">↗</span>
        </a>
        <a href="https://www.linkedin.com/in/ashmitdutta/" target="_blank" rel="noreferrer">
          LinkedIn<span className="paper__social-arrow">↗</span>
        </a>
        <a href="https://x.com/ashmit105" target="_blank" rel="noreferrer">
          X<span className="paper__social-arrow">↗</span>
        </a>
        <a
          href="https://scholar.google.com/citations?user=VSpPcv4AAAAJ&hl=en"
          target="_blank"
          rel="noreferrer"
        >
          Scholar<span className="paper__social-arrow">↗</span>
        </a>
      </nav>
    </header>

    <section className="paper__section">
      <h2 className="paper__heading">
        <span className="paper__section-num">§1.</span> About
      </h2>
      <p className="paper__lede">
        I'm a senior in computer engineering at UIUC, working between
        autonomy, machine learning, and systems. I'm an AI evals intern at{' '}
        <a href="https://nablon.ai/researchers"><b>Nablon AI</b></a> and a researcher
        in Prof.{' '}
        <a href="https://www.huan-zhang.com/" target="_blank" rel="noreferrer">
          Huan Zhang
        </a>
        's lab on{' '}
        <a
          href="https://github.com/Verified-Intelligence/alpha-beta-CROWN"
          target="_blank"
          rel="noreferrer"
        >
          neural network verification
        </a>.
        <a href="#fn-1" id="fnref-1" className="paper__fnref" aria-describedby="footnote-label">
          <sup>1</sup>
        </a>
      </p>
      <p>
        Previously a software engineer at <b>John Deere</b> and an ML research
        intern at the <b>UChicago Data Science Institute</b> (Fermilab's{' '}
        <i>Exa.TrkX</i>), and a co-author on an{' '}
        <a href="https://arxiv.org/abs/2507.09850" target="_blank" rel="noreferrer">
          ICML 2025 workshop paper
        </a>{' '}
        with NVIDIA's <a href="https://www.kaggle.com/competitions/ai-mathematical-olympiad-progress-prize-2/writeups/nemoskills-1st-place-solution-nemoskills" target="_blank" rel="noreferrer">Nemo</a> team.
      </p>
      <p>
        In high school, I co-founded the{' '}
        <a href="https://opho.physoly.tech/" target="_blank" rel="noreferrer">
          Online Physics Olympiad
        </a>
        , now a 20k+ member community.
      </p>
    </section>

    <aside className="paper__statement">
      <InteractiveChip />
    </aside>

    <section className="paper__section">
      <h2 className="paper__heading">
        <span className="paper__section-num">§2.</span> Research
        <Link to="/research" className="paper__see-all">
          see all →
        </Link>
      </h2>
      <ol className="paper__pubs">
        {featuredResearch.map((p) => (
          <li key={p.slug} className="paper__pub">
            <a href={p.href} target="_blank" rel="noreferrer" className="paper__pub-fig-link">
              <HomePubFig src={p.figure} label={p.figureLabel} />
            </a>
            <div className="paper__pub-body">
              <a href={p.href} target="_blank" rel="noreferrer" className="paper__pub-title">
                {p.title}
              </a>
              <span className="paper__pub-meta">
                {p.venue}
                {p.year ? `, ${p.year}` : ''}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="paper__section">
      <h2 className="paper__heading">
        <span className="paper__section-num">§3.</span> Work
        <Link to="/work" className="paper__see-all">
          see all →
        </Link>
      </h2>
      <ol className="paper__list paper__list--bib paper__list--teased">
        {selectedWork.map(({ title, teaser, meta, href }) => {
          const isExternal = href.startsWith('http') || href.endsWith('.pdf');
          return (
            <li key={title}>
              <div className="paper__bib-row">
                {isExternal ? (
                  <a href={href} target="_blank" rel="noreferrer">
                    {title}
                  </a>
                ) : (
                  <Link to={href}>{title}</Link>
                )}
                <span className="paper__list-meta">{meta}</span>
              </div>
              <span className="paper__list-teaser">{teaser}</span>
            </li>
          );
        })}
      </ol>
    </section>

    {writing.length > 0 && (
      <section className="paper__section">
        <h2 className="paper__heading">
          <span className="paper__section-num">§4.</span> Writing
          <Link to="/blog" className="paper__see-all">
            see all →
          </Link>
        </h2>
        <ol className="paper__list paper__list--bib paper__list--teased">
          {writing.map(({ id, title, date, teaser }) => (
            <li key={id}>
              <div className="paper__bib-row">
                <Link to={`/blog/${id}`}>{title}</Link>
                <span className="paper__list-meta">{formatDate(date)}</span>
              </div>
              {teaser && <span className="paper__list-teaser">{teaser}</span>}
            </li>
          ))}
        </ol>
      </section>
    )}

    <section className="paper__section">
      <h2 className="paper__heading">
        <span className="paper__section-num">§5.</span> Sketches
        <Link to="/animations" className="paper__see-all">
          see all →
        </Link>
      </h2>
      <div className="paper__sketches">
        {featuredSketches.map((s) => (
          <LazySketchCard key={s.path} {...s} />
        ))}
      </div>
    </section>

    <nav className="paper__elsewhere" aria-label="elsewhere">
      <a href="mailto:ashmitd2@illinois.edu">ashmitd2@illinois.edu</a>
      <span className="paper__elsewhere-sep"> · </span>
      <a href="https://github.com/aedutta" target="_blank" rel="noreferrer">github</a>
      <span className="paper__elsewhere-sep"> · </span>
      <a href="https://www.linkedin.com/in/ashmitdutta/" target="_blank" rel="noreferrer">linkedin</a>
      <span className="paper__elsewhere-sep"> · </span>
      <a href="https://scholar.google.com/citations?user=VSpPcv4AAAAJ&hl=en" target="_blank" rel="noreferrer">scholar</a>
      <span className="paper__elsewhere-sep"> · </span>
      <a href="/assets/docs/resume_ashmit.pdf" target="_blank" rel="noreferrer">résumé ↗</a>
      <span className="paper__elsewhere-sep"> · </span>
      <Link to="/research">research</Link>
      <span className="paper__elsewhere-sep"> · </span>
      <Link to="/blog">blog</Link>
      <span className="paper__elsewhere-sep"> · </span>
      <Link to="/animations">art</Link>
      <span className="paper__elsewhere-sep"> · </span>
      <Link to="/physics">physics</Link>
    </nav>

    <aside className="paper__footnotes">
      <ol className="paper__footnotes-list">
        <li id="fn-1">
          Also: stargazing, rhythm games, korean barbeque, long walks in
          nature, and reading wikipedia.{' '}
          <a href="#fnref-1" className="paper__fn-back" aria-label="back to text">
            ↩
          </a>
        </li>
      </ol>
    </aside>

    <details className="paper__cite">
      <summary>Cite this page</summary>
      <pre className="paper__bibtex">{`@misc{dutta:web,
  author       = {Dutta, Ashmit},
  title        = {Ashmit Dutta --- personal homepage},
  year         = {2026},
  howpublished = {\\url{https://ashmitdutta.xyz}},
}`}</pre>
    </details>

    <div className="paper__colophon">
      Typeset in EB Garamond · math via <Tex>{'\\KaTeX'}</Tex>
    </div>
  </article>
);

export default HomePage;
