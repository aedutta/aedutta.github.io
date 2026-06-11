import './PhysicsPage.css';

const handouts = [
  {
    label: 'Everaise Academy Physics Textbook',
    href: '/assets/docs/Everaise_Physics_Textbook.pdf',
    description:
      'The published classical mechanics textbook for Everaise Academy. Co-authored and contributed 5+ chapters.',
  },
  {
    label: 'Lagrangian Handout',
    href: '/assets/docs/Lagrangian_Handout.pdf',
    description:
      'A step-by-step guide tailored for olympiad physics problems using Lagrangian formalism. Last updated 2021.',
  },
  {
    label: 'Surface Tension Handout (partial)',
    href: '/assets/docs/ST_handout.pdf',
    description:
      'Introduces surface tension theory with examples and practice problems. Last updated 2022.',
  },
  {
    label: 'Geometric Optics Handout',
    href: '/assets/docs/geoptichandout.pdf',
    description:
      'Covers geometric optics for olympiad physics with worked examples and practice problems.',
  },
];

const translations = [
  {
    label: '2011 Indian Physics Olympiad — Solutions',
    href: '/assets/docs/INPhO_2011_Solutions.pdf',
  },
  {
    label: '2012 Indian Physics Olympiad — Solutions',
    href: '/assets/docs/INPhO_2012_Solutions.pdf',
  },
  {
    label: 'MIT OCW 8.03 Solutions Manual (partial)',
    href: '/assets/docs/MIT_OCW_8_03_Solutions_Manual.pdf',
  },
  {
    label: 'MIT OCW 8.04 Solutions Manual (partial)',
    href: '/assets/docs/MIT_OCW_8_04_Solutions_Manual.pdf',
  },
  {
    label: "Jaan Kalda's Circuits Solutions Manual (partial)",
    href: '/assets/docs/Kalda_Circuits_Solutions_Manual.pdf',
  },
];

const oldResearch = [
  {
    label: 'Path Integral Formulation and Feynman Diagrams',
    href: '/assets/docs/feynman.pdf',
    description:
      'Solutions that placed second in the 2022 Physics Unlimited Explorer Competition.',
  },
  {
    label: 'An Analytic Model of Stable and Unstable Orbital Resonance',
    href: '/assets/docs/resonance.pdf',
    description:
      'Theoretical astrophysics research accepted for presentation at LPSC 2021.',
  },
  {
    label: 'Designing a Quantum Cascade Laser',
    href: '/assets/docs/2021_PUEC.pdf',
    description:
      'Honorable mention solutions from the 2021 Physics Unlimited Explorer Competition.',
  },
  {
    label: 'Channeling Across a Body-Centered Cubic Crystal',
    href: '/assets/docs/BL4S_Document.pdf',
    description:
      'Shortlisted CERN Beamline for Schools experiment proposal (Top 20 globally).',
  },
];

const notes = [
  {
    label: 'Laplace-Runge-Lenz Vector',
    href: '/assets/docs/LRLvec.pdf',
    description: 'Slides used for Everaise Academy office hours in 2022.',
  },
  {
    label: 'AP Physics C: Electricity and Magnetism Notes',
    href: '/assets/docs/AP_Physics_C_EM_Notes.pdf',
    description: 'Study notes compiled while preparing for the AP exam.',
  },
];

const community = [
  {
    title: 'Online Physics Olympiad',
    href: 'https://opho.physoly.tech/',
    description:
      'The largest international student-run physics olympiad. Co-founded during COVID-19; currently manage a team of 20+ volunteers and a 22k+ community.',
  },
  {
    title: 'Everaise Academy',
    href: 'https://www.everaise.org/course/physics',
    description:
      'Course on the fundamentals of classical mechanics. Helped design the curriculum and wrote 5+ chapters of the published textbook.',
  },
  {
    title: "Solutions to Jaan Kalda's Handouts",
    href: 'https://physoly.tech/kalda/',
    description:
      "~300 pages of solutions and translations to Jaan Kalda's olympiad handouts. Head author on several of the solution guides.",
  },
  {
    title: 'Physoly Discord',
    href: 'https://discord.gg/phods',
    description:
      'An online community of 20k+ physics enthusiasts. Resources, translations, partnerships with Discord, and a YouTube channel.',
  },
];

const PdfList = ({ items }) => (
  <ul className="physics__list">
    {items.map(({ label, href, description }) => (
      <li key={href}>
        <a href={href} target="_blank" rel="noreferrer">
          {label}
        </a>
        {description && <span className="physics__list-desc"> — {description}</span>}
      </li>
    ))}
  </ul>
);

const PhysicsPage = () => (
  <article className="physics">
    <header className="physics__masthead">
      <h1>Physics resources</h1>
      <p className="physics__lede">
        Handouts, solution manuals, translations, and notes from my physics
        olympiad years (2020–23). Some entries are partial or work-in-progress
        — the full set of my contributions lives at{' '}
        <a href="https://physoly.tech/" target="_blank" rel="noreferrer">
          physoly.tech
        </a>
        , and informal writeups are on my{' '}
        <a
          href="https://artofproblemsolving.com/community/c911917"
          target="_blank"
          rel="noreferrer"
        >
          Art of Problem Solving blog
        </a>
        . PDFs here are free to use; please cite if you republish.
      </p>
    </header>

    <section className="physics__section">
      <h2>Community &amp; teaching</h2>
      <ul className="physics__list">
        {community.map(({ title, href, description }) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noreferrer">{title}</a>
            <span className="physics__list-desc"> — {description}</span>
          </li>
        ))}
      </ul>
    </section>

    <section className="physics__section">
      <h2>Handouts</h2>
      <PdfList items={handouts} />
    </section>

    <section className="physics__section">
      <h2>Translations &amp; solution manuals</h2>
      <PdfList items={translations} />
    </section>

    <section className="physics__section">
      <h2>Research &amp; competition writeups</h2>
      <PdfList items={oldResearch} />
    </section>

    <section className="physics__section">
      <h2>Notes &amp; slides</h2>
      <PdfList items={notes} />
    </section>
  </article>
);

export default PhysicsPage;
