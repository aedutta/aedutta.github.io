import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import './HomePage.css';

const phrases = [
  ' reading wikipedia.',
  ' stargazing.',
  ' meeting new people.',
  ' playing guitar.',
  ' coding.',
  ' making puzzles.',
  ' renaissance artists.',
  ' eating korean barbeque.',
  ' rhythm games.',
  ' exploring new places.',
  ' learning new languages.',
  ' solving complex problems.',
  ' watching movies.',
  ' writing stories.',
  ' experimenting with new technologies.',
  ' listening to music.',
  ' taking long walks in nature.',
];

const contacts = [
  {
    label: 'Phone',
    value: '(612) 323-1292',
    href: 'tel:+16123231292',
  },
  {
    label: 'Primary Email',
    value: 'ashmitd2@illinois.edu',
    href: 'mailto:ashmitd2@illinois.edu',
  },
  {
    label: 'Personal Email',
    value: 'ashmit.dutta105@gmail.com',
    href: 'mailto:ashmit.dutta105@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: '@ashmitdutta',
    href: 'https://www.linkedin.com/in/ashmitdutta/',
  },
  {
    label: 'GitHub',
    value: '@aedutta',
    href: 'https://github.com/aedutta',
  },
  {
    label: 'Location',
    value: 'Washington, DC Area · Champaign, IL',
  },
];

const highlightCards = [
  {
    title: 'Student Software Engineer',
    subtitle: 'John Deere · Jan 2025 – Present',
    description:
      'Shipping Full-stack (React + Spring Boot) features on AWS to modernize legacy Java applications.',
    href: 'https://www.deere.com/en/index.html',
    linkText: 'About John Deere Research Park',
  },
  {
    title: 'Machine Learning Research Assistant',
    subtitle: 'UChicago Data Science Institute · Summer 2024',
    description:
      'Trained multi-modal graph neural networks for Fermilab’s Exa.TrkX neutrino project using PyTorch Geometric.',
    href: 'https://datascience.uchicago.edu/',
    linkText: 'UChicago DSI overview',
  },
  {
    title: 'Lead Coordinator & Developer',
    subtitle: 'Online Physics Olympiad · 2020 – Present',
    description:
      'Grew the largest student-run physics competition to 15k+ learners, raising $10k+ in sponsorships and building tech tools.',
    href: 'https://opho.physoly.tech/',
    linkText: 'Visit the OPhO community',
  },
];

const experienceTimeline = [
  {
    period: 'Jan 2025 – Present',
    title: 'Student Software Engineer',
    org: 'John Deere',
    description: 'Own React/AWS features, data workflows, and observability to modernize legacy applications.',
  },
  {
    period: 'Jun 2024 – Aug 2024',
    title: 'Machine Learning Research Assistant',
    org: 'UChicago Data Science Institute',
    description: 'Built multi-modal GNNs on HPC clusters for Fermilab’s Exa.TrkX neutrino reconstruction project.',
  },
  {
    period: 'Aug 2024 – Dec 2024',
    title: 'Course Assistant · CS 450 Numerical Analysis',
    org: 'UIUC',
    description: 'Supported 150+ students through weekly grading, office hours, and numerical programming reviews.',
  },
  {
    period: 'Mar 2020 – Present',
    title: 'Lead Coordinator & Developer',
    org: 'Online Physics Olympiad',
    description: 'Lead operations, sponsorships, and engineering for a 15k+ global student competition.',
  },
];

const currentFocus = [
  {
    title: 'What I’m exploring right now',
    items: [
      'Programming safe autonomous cars with ROS2',
      'The networking stack, designing client and server protocols from scratch',
      'Building a bare-metal hypervisor (VM manager) in C',
    ],
  },
  {
    title: 'What I’m looking for',
    items: [
      'Summer 2026 internships focused on software engineering or firmware design',
      'Collaborations that combine research rigor with community impact',
      'Chances to mentor students entering physics, math, or ECE pathways',
    ],
  },
];

const skills = [
  {
    title: 'Software & Systems',
    tags: ['Java', 'Python', 'C/C++', 'SystemVerilog', 'CUDA', 'Spring Boot', 'React', 'TypeScript', 'Vite', 'Node.js', 'HTML/CSS'],
  },
  {
    title: 'Machine Learning',
    tags: ['PyTorch', 'scikit-learn', 'TensorFlow', 'NumPy', 'Pandas', 'Slurm HPC'],
  },
  {
    title: 'Platforms & Tooling',
    tags: ['AWS', 'Docker', 'Linux/Unix', 'GDB', 'PostgreSQL', 'MongoDB', 'MySQL', 'Git'],
  },
];

const HomePage = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);

  const currentPhrase = useMemo(() => phrases[phraseIndex], [phraseIndex]);

  useEffect(() => {
    let timeout;

    if (typing) {
      if (displayText.length < currentPhrase.length) {
        timeout = window.setTimeout(
          () => setDisplayText(currentPhrase.slice(0, displayText.length + 1)),
          80,
        );
      } else {
        timeout = window.setTimeout(() => setTyping(false), 1000);
      }
    } else if (displayText.length > 0) {
      timeout = window.setTimeout(
        () => setDisplayText(currentPhrase.slice(0, displayText.length - 1)),
        40,
      );
    } else {
      timeout = window.setTimeout(() => {
        setTyping(true);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      }, 200);
    }

    return () => window.clearTimeout(timeout);
  }, [typing, currentPhrase, displayText]);

  return (
    <div className="home">
      <section className="home__intro">
        <div className="home__bio">
          <h1>Hi, I'm Ashmit!</h1>
          <h3 className="home__typing">
            I like <span className="home__typing-text">{displayText}</span>
            <span className={`home__cursor ${typing ? 'home__cursor--typing' : ''}`}> </span>
          </h3>
          <p>
            I am an undergraduate student majoring in computer engineering at the University of Illinois
            Urbana-Champaign. I will be working as a software engineer intern at{' '}
            <a href="https://www.deere.com/en/index.html" target="_blank" rel="noreferrer">
              John Deere
            </a>{' '}
            at Research Park UIUC during the spring. I have been writing code and doing research/
            <Link to="/coursework">coursework</Link> in graph neural networks, computer vision, robotics, and
            audio signal processing.
          </p>
        </div>
        <img className="home__avatar" src="/assets/images/profile.jpg" alt="Ashmit Dutta" />
      </section>

      <section className="home__contacts">
        <ul>
          {contacts.map(({ label, value, href }) => (
            <li key={label}>
              <span>{label}</span>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer">
                  {value}
                </a>
              ) : (
                <span>{value}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="home__highlights">
        <div className="home__section-heading">
          <h2>Highlights</h2>
          <p>Snapshots from the projects and communities that energize me right now.</p>
        </div>
        <div className="home__highlight-grid">
          {highlightCards.map(({ title, subtitle, description, href, linkText }) => (
            <article key={title} className="home__highlight-card">
              <h3>{title}</h3>
              <p className="home__highlight-subtitle">{subtitle}</p>
              <p>{description}</p>
              {href && (
                <a className="home__highlight-link" href={href} target="_blank" rel="noreferrer">
                  {linkText}
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="home__experience">
        <div className="home__section-heading">
          <h2>Experience</h2>
          <p>A quick timeline of what I’ve been building, researching, and organizing.</p>
        </div>
        <ol className="home__timeline">
          {experienceTimeline.map(({ period, title, org, description }) => (
            <li key={period} className="home__timeline-item">
              <div className="home__timeline-dot" aria-hidden="true" />
              <div className="home__timeline-content">
                <span className="home__timeline-period">{period}</span>
                <h3>{title}</h3>
                <p className="home__timeline-org">{org}</p>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="home__current">
        <div className="home__section-heading">
          <h2>Right now</h2>
          <p>Here’s what I’m learning, seeking, and always happy to chat about.</p>
        </div>
        <div className="home__current-grid">
          {currentFocus.map(({ title, items }) => (
            <article key={title} className="home__current-card">
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="home__skills">
        <div className="home__section-heading">
          <h2>Skills snapshot</h2>
          <p>A sampling of the stacks and tools I lean on for research, product engineering, and rapid prototyping.</p>
        </div>
        <div className="home__skills-grid">
          {skills.map(({ title, tags }) => (
            <article key={title} className="home__skill-card">
              <h3>{title}</h3>
              <div className="home__chip-row">
                {tags.map((tag) => (
                  <span key={tag} className="home__chip">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home__cta">
        <div>
          <h2>Let’s collaborate</h2>
          <p>
            Whether you’re building something ambitious, sprinting on a research idea, or looking to empower student
            communities, I’m always up for a conversation. I love work that bridges rigorous engineering with human
            impact.
          </p>
        </div>
        <div className="home__cta-buttons">
          <a className="home__button" href="mailto:ashmit.dutta105@gmail.com">
            Email me
          </a>
          <Link className="home__button home__button--ghost" to="/projects">
            Browse projects
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
