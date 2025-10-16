import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';

const researchItems = [
  {
    text: 'I am currently working as an undergraduate researcher at ',
    linkText: 'WaggleNet',
    href: 'https://www.wagglenet.org/',
    tail:
      ' under Prof. Christopher Schmitz. We design, build, develop and deploy IoT solutions for beekeepers. I am working on the audio team to combine hardware and software to get audio input from bees and predict their behaviors using machine learning models.',
  },
  {
    text: 'In Spring 2024, I was a research scholar at the ',
    linkText: 'Illinois Mathematics Lab',
    href: 'https://iml.math.illinois.edu/',
    tail: ' where I worked on a semester-long project on ',
    extraLinkText: 'Quantum Noise and Simulation',
    extraHref: '/assets/docs/IML_SP24.pdf',
    extraTail: '.',
  },
  {
    text: 'In Summer 2023, I worked with ',
    linkText: 'Dr. Branislav Kisacanin',
    href: 'https://scholar.google.com/citations?user=v1_28voAAAAJ',
    tail:
      ' to apply NeRFs to visualize sunflower seed samples and apply shape analysis. I\'m added as an author for an abstract that is submitted and accepted to present at the International Sunflower Conference in late August 2024.',
  },
];

const projectLinks = [
  { label: 'Analog Spectrum Viewer', href: '/assets/docs/spectrumviewer.pdf' },
  { label: 'Generative Art', href: '/animations', internal: true },
  {
    label: 'Computer Vision AR glasses',
    href: 'https://github.com/aedutta/ASL-Identification',
    extra: (
      <>
        . <i>Progress:</i> My team{' '}
        <a href="https://ise.illinois.edu/newsroom/61015">won second place at the Bradley Mottier Innovation Competition</a> at UIUC pitching a startup idea, leading to us winning $2000.
      </>
    ),
  },
];

const highSchoolOutreach = [
  {
    label: 'Online Physics Olympiad',
    href: 'https://opho.physoly.tech/',
    description:
      ' – The biggest international student-run physics olympiad in the world. I co-founded the competition during COVID-19 and currently manage a team of 20+ volunteers. Over 4 years, I have written dozens of challenging physics problems while planning out most of the logistics for the competition.',
  },
  {
    label: 'Everaise Academy',
    href: 'https://www.everaise.org/course/physics',
    description:
      ' – A course designed to teach students the fundamentals of classical mechanics. I helped design the course content and wrote over 5 chapters of the published textbook on Amazon.',
  },
  {
    label: 'Solutions to Jaan Kalda\'s Handouts',
    href: 'https://physoly.tech/kalda/',
    description:
      ' – Almost 300 pages of solutions and translations to Jaan Kalda\'s olympiad handouts. I served as the head author for several of the solution guides.',
  },
  {
    label: 'Physoly',
    href: 'https://discord.gg/phods',
    description:
      ' – An online community of 10k+ physics enthusiasts. We created resources/translations for physics olympiads, partnered with Discord, and curated a YouTube channel with 850+ subscribers.',
  },
];

const handouts = [
  {
    label: 'Lagrangian Handout',
    href: '/assets/docs/Lagrangian_Handout.pdf',
    description:
      ' – A step-by-step guide tailored for olympiad physics problems using Lagrangian formalism. Last updated 2021.',
  },
  {
    label: 'Surface Tension Handout (Partial)',
    href: '/assets/docs/ST_handout.pdf',
    description:
      ' – Introduces surface tension theory with examples and practice problems. Last updated 2022.',
  },
];

const researchProjects = [
  {
    label: 'Path Integral Formulation and Feynman Diagrams',
    href: '/assets/docs/feynman.pdf',
    description:
      ' – Solutions that placed second in the 2022 Physics Unlimited Explorer Competition.',
  },
  {
    label: 'An Analytic Model of Stable and Unstable Orbital Resonance',
    href: '/assets/docs/resonance.pdf',
    description:
      ' – Theoretical astrophysics research accepted for presentation at LPSC 2021.',
  },
  {
    label: 'Designing a Quantum Cascade Laser',
    href: '/assets/docs/2021_PUEC.pdf',
    description:
      ' – Honorable mention solutions from the 2021 Physics Unlimited Explorer Competition.',
  },
  {
    label: 'Channeling Across a Body-Centered Cubic Crystal',
    href: '/assets/docs/BL4S_Document.pdf',
    description:
      ' – Shortlisted CERN Beamline for Schools experiment proposal (Top 20 globally).',
  },
];

const translations = [
  {
    label: '2011 Indian Physics Olympiad',
    href: '/assets/docs/INPhO_2011_Solutions.pdf',
  },
  {
    label: '2012 Indian Physics Olympiad',
    href: '/assets/docs/INPhO_2012_Solutions.pdf',
  },
  {
    label: 'MIT OCW 8.03 Solutions Manual (Partial)',
    href: '/assets/docs/MIT_OCW_8_03_Solutions_Manual.pdf',
  },
  {
    label: 'MIT OCW 8.04 Solutions Manual (Partial)',
    href: '/assets/docs/MIT_OCW_8_04_Solutions_Manual.pdf',
  },
];

const notes = [
  {
    label: 'Laplace-Runge-Lenz Vector',
    href: '/assets/docs/LRLvec.pdf',
    description:
      ' – Slides used for Everaise Academy office hours in 2022.',
  },
  {
    label: 'AP Physics C: Electricity and Magnetism Notes',
    href: '/assets/docs/AP_Physics_C_EM_Notes.pdf',
    description: ' – Study notes compiled while preparing for the AP exam.',
  },
];

const ProjectsPage = () => (
  <div>
    <h2>Projects</h2>
    <p>
      This is a place where I add anything that I have spent a lot of time on and would like to share.
    </p>

    <Section title="Research">
      <ul>
        {researchItems.map((item) => (
          <li key={item.href}>
            {item.text}
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.linkText}
            </a>
            {item.tail}
            {item.extraHref && (
              <>
                <a href={item.extraHref} target="_blank" rel="noreferrer">
                  {item.extraLinkText}
                </a>
                {item.extraTail}
              </>
            )}
          </li>
        ))}
      </ul>
    </Section>

    <Section title="Finished Projects" headingLevel="h3">
      <ul>
        {projectLinks.map(({ label, href, internal, extra }) => (
          <li key={label}>
            {internal ? (
              <Link to={href}>{label}</Link>
            ) : (
              <a href={href} target="_blank" rel="noreferrer">
                {label}
              </a>
            )}
            {extra}
          </li>
        ))}
      </ul>
    </Section>

    <Section title="High School" headingLevel="h3">
      <p>
        Throughout high school, I was deeply involved in physics olympiads. Below are a couple of key contributions of
        mine as an active member of this community.
      </p>

      <Section title="Outreach" headingLevel="h4">
        <ul>
          {highSchoolOutreach.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
              {item.description}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Handouts" headingLevel="h4">
        <ul>
          {handouts.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
              {item.description}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="High School Research/Projects" headingLevel="h4">
        <ul>
          {researchProjects.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
              {item.description}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Translations & Solution Manuals" headingLevel="h4">
        <ul>
          {translations.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Notes & Slides" headingLevel="h4">
        <ul>
          {notes.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
              {item.description}
            </li>
          ))}
        </ul>
      </Section>
    </Section>
  </div>
);

export default ProjectsPage;
