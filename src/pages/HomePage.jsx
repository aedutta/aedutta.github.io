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

const keySpecs = [
  { param: 'Type', value: 'Computer Engineer', cond: 'B.S. ECE, senior' },
  { param: 'Institution', value: 'UIUC', cond: 'Urbana–Champaign' },
  { param: 'Domain', value: 'Autonomy · ML · Systems', cond: 'digital + analog' },
  { param: 'Operating Temp', value: 'Champaign-rated', cond: 'stable down to −10 °C' },
  { param: 'Research', value: 'NN Verification', cond: 'Assured & Trustworthy AI Lab' },
  { param: 'Coolant', value: 'Korean BBQ', cond: 'applied under load' },
];

const features = [
  <>AI evals intern at <a href="https://nablon.ai/researchers"><b>Nablon&nbsp;AI</b></a></>,
  <>Neural-network verification, <a href="https://www.huan-zhang.com/" target="_blank" rel="noreferrer">Assured&nbsp;&amp;&nbsp;Trustworthy&nbsp;AI&nbsp;Lab</a></>,
  <>Co-author, <a href="https://arxiv.org/abs/2507.09850" target="_blank" rel="noreferrer">ICML&nbsp;2025 workshop</a> (NVIDIA Nemo)</>,
  <>2×&nbsp;track-prize winner, <a href="https://github.com/aedutta/shot-spot-treehacks-26/" target="_blank" rel="noreferrer">Stanford&nbsp;TreeHacks&nbsp;2026</a></>,
  <>Founder, <a href="https://opho.physoly.tech/" target="_blank" rel="noreferrer">Online Physics Olympiad</a> (20k+ members)</>,
  <>Prior: <b>John Deere</b> SWE · <b>UChicago DSI</b> / Fermilab</>,
];

const HomePage = () => (
  <article className="paper paper--datasheet">
    <div className="ds-runhead" aria-hidden="true">
      <span>AD-2026 · PERSONAL DATASHEET</span>
      <span>REV. A · 2026</span>
    </div>

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

    <section className="ds-specs" aria-label="key specifications">
      <div className="ds-specs__caption">Key Specifications</div>
      <dl className="ds-specs__grid">
        {keySpecs.map(({ param, value, cond }) => (
          <div className="ds-specs__cell" key={param}>
            <dt className="ds-specs__param">{param}</dt>
            <dd className="ds-specs__value">
              {value}
              <span className="ds-specs__cond">{cond}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>

    <section className="paper__section">
      <h2 className="paper__heading">
        <span className="paper__section-num">§1.</span> General Description
      </h2>
      <div className="ds-overview">
        <div className="ds-features">
          <h3 className="ds-subhead">Features</h3>
          <ul className="ds-features__list">
            {features.map((f, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="ds-desc">
          <p className="paper__lede">
            I'm a senior computer engineer at UIUC, drawn to problems where the
            hardware meets the model — autonomy, machine learning, and systems. Currently working at an AI startup. 
            <a href="#fn-1" id="fnref-1" className="paper__fnref" aria-describedby="footnote-label">
              <sup>1</sup>
            </a>
          </p>
          <p>
            <b>Current interests:</b> multimodal inference, neural-network{' '}
            <a
              href="https://github.com/Verified-Intelligence/alpha-beta-CROWN"
              target="_blank"
              rel="noreferrer"
            >
              verification
            </a>, and physics reasoning in LLMs.
          </p>
          <p>
            For fun I've built a Unix-like operating system, an out-of-order
            CPU, and an autonomous drone from scratch.
          </p>
        </div>
      </div>
    </section>

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
