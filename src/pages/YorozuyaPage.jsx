import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';
import './YorozuyaPage.css';

const capabilities = [
  {
    title: 'Full-Stack Web Apps',
    tags: ['React', 'Node', 'Spring Boot', 'Postgres'],
    description:
      'React/TypeScript frontends with Node or Spring Boot backends on Postgres or MongoDB. OAuth, Stripe, CI/CD on AWS or Vercel. Recent work: an internal exporting tool at John Deere now used daily by 500+ employees, with the underlying API tuned to update 100k+ records 10× faster.',
  },
  {
    title: 'ML & Data Systems',
    tags: ['PyTorch', 'CUDA', 'GNNs', 'HPC'],
    description:
      'Training and inference pipelines in PyTorch and PyTorch Geometric, including graph neural networks on SLURM-managed HPC clusters. Recent work: a multi-modal GNN for Fermilab\'s Exa.TrkX neutrino reconstruction reaching 98.3% accuracy, and WMMA Tensor Core kernels delivering a 6.6× CNN inference speedup.',
  },
  {
    title: 'High-Performance Systems',
    tags: ['C++20', 'Low-latency', 'Linux'],
    description:
      'C++20 services using thread-per-core designs, lock-free SPSC ring buffers, hugepage backing, and CPU pinning on isolated cores. Recent work: a cloud-native HFT engine on AWS c7i.large hitting 36 ns median tick-to-signal latency with persistent TLS gateways to the exchange.',
  },
];

const process = [
  {
    step: '01',
    title: 'Intro call',
    body: 'A free 30-minute call to understand what you\'re building, what\'s broken, or what you wish existed. You\'ll get an honest read on whether we\'re the right fit — and if we\'re not, a pointer to someone who is.',
  },
  {
    step: '02',
    title: 'Scoped proposal',
    body: 'Within 48 hours: a written scope with deliverables, timeline, and a fixed price or hourly cap. Engagements are sized so you can stop after any milestone without lock-in.',
  },
  {
    step: '03',
    title: 'Build with visibility',
    body: 'A private GitHub repository, weekly demos, and async updates throughout. You stay close to the work without being pulled into it.',
  },
  {
    step: '04',
    title: 'Handoff & support',
    body: 'Every project ships with documentation, a runbook, and a two-week bug-fix window. Retainers are available for teams that want us on call after launch.',
  },
];

const engagements = [
  {
    label: 'Project',
    summary: 'Fixed scope, fixed price',
    detail:
      'For well-defined builds — an MVP, a model trained on your data, a latency-critical service. Quoted after the intro call so the number reflects the actual work.',
  },
  {
    label: 'Retainer',
    summary: 'Ongoing partnership',
    detail:
      'For founders and teams who want a senior engineer on call. Hours roll month to month with a minimum reservation; pause or scale as the roadmap changes.',
  },
  {
    label: 'Advisory',
    summary: 'Review & technical writing',
    detail:
      'Architecture review, code audits, hiring help, and technical documentation. Useful when the team is small and the next decision is expensive.',
  },
];

const faq = [
  {
    q: 'Who works on the projects?',
    a: 'Engagements are led by Ashmit Dutta. Specialized work is delivered with a small bench of vetted collaborators — researchers and engineers we\'ve shipped alongside before. You\'ll know who is on your project before it starts.',
  },
  {
    q: 'What size of project do you take?',
    a: 'Anywhere from a one-week audit to a multi-month MVP. We\'re deliberately selective so the work we accept is work we can deliver well — if a job genuinely needs a larger firm, we\'ll say so and help you scope it that way.',
  },
  {
    q: 'Will the founder actually be on my project?',
    a: 'Yes. We don\'t bait-and-switch. The engineer you talk to on the intro call is the engineer writing the code.',
  },
  {
    q: 'Can you sign an NDA?',
    a: 'Yes. Standard mutual NDAs are fine; we can send one over if you don\'t already have a template.',
  },
  {
    q: 'Do you take equity-only work?',
    a: 'Rarely, and only for pre-seed companies we\'d want to be part of regardless. Cash is the default.',
  },
];

const YorozuyaPage = () => (
  <div className="yorozuya">
    <section className="yorozuya__hero">
      <div className="yorozuya__hero-jp" aria-hidden="true">万事屋</div>
      <span className="yorozuya__eyebrow">Yorozuya Studio</span>
      <h1>A boutique engineering studio for odd, ambitious jobs.</h1>
      <p className="yorozuya__lede">
        We partner with founders, research teams, and small companies to ship production
        software — web apps, ML systems, performance-critical infrastructure, and the
        technical writing that makes them legible. Built around the Japanese
        <i> yorozuya</i> (万事屋), the small shop that takes on any odd job.
      </p>
      <div className="yorozuya__cta-row">
        <a className="yorozuya__button" href="mailto:ashmit.dutta101@gmail.com?subject=Yorozuya%20Studio%20-%20Project%20inquiry">
          Start a project
        </a>
        <Link className="yorozuya__button yorozuya__button--ghost" to="/work">
          See our work
        </Link>
      </div>
      <div className="yorozuya__credentials">
        <span className="yorozuya__credentials-label">Engineering background</span>
        <div className="yorozuya__credentials-list">
          <span>John Deere</span>
          <span aria-hidden="true">·</span>
          <span>UChicago Data Science Institute</span>
          <span aria-hidden="true">·</span>
          <span>UIUC Assured & Trustworthy AI Lab</span>
          <span aria-hidden="true">·</span>
          <span>Stanford TreeHacks '26 (2× track winner)</span>
        </div>
      </div>
    </section>

    <Section title="Capabilities">
      <div className="yorozuya__grid">
        {capabilities.map(({ title, tags, description }) => (
          <article key={title} className="yorozuya__card">
            <h3>{title}</h3>
            <div className="yorozuya__chip-row">
              {tags.map((tag) => (
                <span key={tag} className="yorozuya__chip">{tag}</span>
              ))}
            </div>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </Section>

    <Section title="How we work">
      <ol className="yorozuya__process">
        {process.map(({ step, title, body }) => (
          <li key={step} className="yorozuya__process-item">
            <div className="yorozuya__process-step">{step}</div>
            <div className="yorozuya__process-content">
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>

    <Section title="Engagements">
      <div className="yorozuya__rates">
        {engagements.map(({ label, summary, detail }) => (
          <article key={label} className="yorozuya__rate">
            <span className="yorozuya__rate-label">{label}</span>
            <span className="yorozuya__rate-price">{summary}</span>
            <p>{detail}</p>
          </article>
        ))}
      </div>
      <p className="yorozuya__rates-note">
        Pricing is shared after the intro call so it reflects the actual scope. Students, researchers, and non-profits receive a meaningful discount — just ask.
      </p>
    </Section>

    <Section title="FAQ">
      <ul className="yorozuya__faq">
        {faq.map(({ q, a }) => (
          <li key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </li>
        ))}
      </ul>
    </Section>

    <section className="yorozuya__footer-cta">
      <h2>Have an odd job?</h2>
      <p>
        Send a short note — what you're building, your rough timeline, and what success
        looks like. We respond within one business day.
      </p>
      <a className="yorozuya__button" href="mailto:ashmit.dutta101@gmail.com?subject=Yorozuya%20Studio%20-%20Project%20inquiry">
        ashmit.dutta101@gmail.com
      </a>
    </section>
  </div>
);

export default YorozuyaPage;
