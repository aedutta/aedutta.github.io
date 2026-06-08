import { Link } from 'react-router-dom';
import Tex from '../components/Tex.jsx';
import P5Canvas from '../components/P5Canvas.jsx';
import gameOfLifeSketch from '../sketches/gameOfLife.js';
import isingSketch from '../sketches/ising.js';
import flowFieldSketch from '../sketches/flowField.js';
import cardioidSketch from '../sketches/cardioid.js';
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
  {
    title: 'RISC-V operating system',
    teaser: 'Unix-like in C: paging, scheduler, filesystem, Sv39 virtual memory',
    meta: 'ECE 391',
    href: '/work',
  },
];

const featuredSketches = [
  { path: 'game-of-life', label: 'Game of Life', sketch: gameOfLifeSketch },
  { path: 'ising', label: 'Ising Model', sketch: isingSketch },
  { path: 'flow-field', label: 'Flow Field', sketch: flowFieldSketch },
  { path: 'cardioid', label: 'Cardioid Caustics', sketch: cardioidSketch },
];

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

const HomePage = () => (
  <article className="paper">
    <header className="paper__masthead">
      <h1 className="paper__title">Ashmit Dutta</h1>
      <p className="paper__subtitle">
        Electrical &amp; Computer Engineering, University of Illinois Urbana–Champaign
      </p>
    </header>

    <section className="paper__section">
      <h2 className="paper__heading">
        <span className="paper__section-num">§1.</span> About
      </h2>
      <p className="paper__lede">
        <span className="paper__dropcap">I</span>
        'm a senior at UIUC studying computer engineering. Most of what I do
        lives between autonomy, machine learning, and computer systems. I'm
        currently an ML engineering intern at <b>Nablon AI</b> and a researcher
        in Prof.{' '}
        <a href="https://www.huan-zhang.com/" target="_blank" rel="noreferrer">
          Huan Zhang
        </a>
        's Assured and Trustworthy AI Research Lab, working on neural network
        verification (
        <a
          href="https://github.com/Verified-Intelligence/auto_LiRPA"
          target="_blank"
          rel="noreferrer"
        >
          auto_LiRPA
        </a>
        ,{' '}
        <a
          href="https://github.com/Verified-Intelligence/alpha-beta-CROWN"
          target="_blank"
          rel="noreferrer"
        >
          <Tex>{'\\alpha\\text{-}\\beta\\text{-}\\mathrm{CROWN}'}</Tex>
        </a>
        ).
        <a href="#fn-1" id="fnref-1" className="paper__fnref" aria-describedby="footnote-label">
          <sup>1</sup>
        </a>
      </p>
      <p>
        Before that, I worked as a software engineer at <b>John Deere</b> and
        an ML research intern at the <b>UChicago Data Science Institute</b>{' '}
        (on Fermilab's <i>Exa.TrkX</i> neutrino reconstruction project). I'm
        also a co-author on an{' '}
        <a href="https://arxiv.org/abs/2507.09850" target="_blank" rel="noreferrer">
          ICML 2025 workshop paper
        </a>{' '}
        about finetuning chain-of-thought in LLMs.
      </p>
      <p>
        I like writing fast code and shipping real systems:{' '}
        <Link to="/work">
          CUDA kernels, autonomous racing drones, RISC-V operating systems
        </Link>
        . In high school, I co-founded the{' '}
        <a href="https://opho.physoly.tech/" target="_blank" rel="noreferrer">
          Online Physics Olympiad
        </a>
        , now a 22k+ community and the largest student-run international
        physics competition.
      </p>
    </section>

    <section className="paper__section">
      <h2 className="paper__heading">
        <span className="paper__section-num">§2.</span> Work
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
          <span className="paper__section-num">§3.</span> Writing
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
        <span className="paper__section-num">§4.</span> Sketches
        <Link to="/animations" className="paper__see-all">
          see all →
        </Link>
      </h2>
      <div className="paper__sketches">
        {featuredSketches.map(({ path, label, sketch }) => (
          <Link key={path} to={`/animations/${path}`} className="paper__sketch-card">
            <div className="paper__sketch-thumb" aria-hidden="true">
              <P5Canvas sketch={sketch} className="paper__sketch-canvas" />
            </div>
            <span className="paper__sketch-label">{label}</span>
          </Link>
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
      <a href="/assets/docs/resume_ashmit.pdf" target="_blank" rel="noreferrer">résumé ↗</a>
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
