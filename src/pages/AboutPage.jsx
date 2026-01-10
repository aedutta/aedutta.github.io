import './AboutPage.css';
import Section from '../components/Section.jsx';

const education = [
  {
    school: 'University of Illinois, Urbana-Champaign',
    degree: 'BSc, Computer Engineering',
    graduation: 'May 2027',
    gpa: '3.6/4.0',
  },
];

const experienceTimeline = [
  {
    period: 'Jan 2025 – Jan 2026',
    title: 'Software Engineer (Student)',
    org: 'John Deere',
    description: 'Built full-stack features (React/Spring Boot/AWS). Modernized an internal exporting app used by 500+ employees. Scaled API to update 100k+ records 10x faster. Designed core error-handling infrastructure.',
  },
  {
    period: 'Jun 2024 – Aug 2024',
    title: 'Machine Learning Research Intern',
    org: 'The University of Chicago Data Science Institute',
    description: 'Contributed to Fermilab’s Exa.TrkX neutrino project using PyTorch Geometric. Improved GNN model accuracy to 98.3% with new graph layers. Processed 20k+ neutrino interactions on HPC clusters.',
  },
  {
    period: 'Jan 2026 – Present',
    title: 'Executive Board Member, Treasurer',
    org: 'IEEE, UIUC Chapter',
    description: 'Managing finances and executive decisions for the university chapter.',
  },
  {
    period: 'Aug 2024 – Present',
    title: 'Course Assistant',
    org: 'UIUC (CS 450)',
    description: 'Course Assistant forNumerical Analysis (CS 450).',
  },
  {
    period: 'Mar 2020 – Present',
    title: 'Lead Coordinator & Developer',
    org: 'Online Physics Olympiad',
    description: 'Founded the largest international student-run physics competition (20k+ community). Raised $10k+ in sponsorships from Citadel, Jane Street, etc. Built submission portal handling 1k+ teams.',
  },
];

const skills = [
  {
    title: 'Languages',
    tags: ['C/C++', 'Python', 'Java', 'JavaScript', 'HTML/CSS', 'Bash', 'LaTeX'],
  },
  {
    title: 'ML & Data',
    tags: ['PyTorch', 'PyTorch Geometric', 'TensorFlow', 'NumPy', 'pandas'],
  },
  {
    title: 'Web & Backend',
    tags: ['React.js', 'Node.js', 'Flask', 'Spring Boot', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Tools & Platforms',
    tags: ['ROS 2', 'Docker', 'AWS', 'Linux/Unix', 'GDB', 'Git'],
  },
];

const awards = [
  {
    title: 'Bradley Mottier Innovation Challenge',
    award: 'Second Place ($2000)',
    description: 'Presented a startup business plan and prototype for AR computer vision glasses aimed at enhancing communication for the deaf and hard of hearing.',
  },
  {
    title: 'USA Computing Olympiad',
    award: 'Gold Rank',
    description: 'High school algorithmic programming competition.',
  },
];

const AboutPage = () => (
  <div className="about">
    <Section title="About">
      <p>
        I’m an undergraduate at UIUC, majoring in computer engineering and minoring in math/physics. 
        I am interested in safe autonomy, high-performance computing, and firmware development.
      </p>
      <p>
        My passion for engineering stems from my background in physics competitions. 
        I founded the Online Physics Olympiad, growing it into a global community. 
        In college, I pivoted to solving practical problems through software and hardware co-design, 
        exploring everything from GNNs for particle physics to bare-metal hypervisors.
      </p>
    </Section>
    
    <Section title="Education">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {education.map((edu, index) => (
          <div key={index}>
            <h3 style={{ margin: '0 0 0.2rem', fontSize: '1.2rem' }}>{edu.school}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(233, 236, 255, 0.8)' }}>
              <span>{edu.degree}</span>
              <span>{edu.graduation}</span>
            </div>
            <div style={{ color: 'rgba(233, 236, 255, 0.6)', fontSize: '0.95rem' }}>GPA: {edu.gpa}</div>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Experience & Leadership">
      <ol className="about__timeline">
        {experienceTimeline.map(({ period, title, org, description }) => (
          <li key={period} className="about__timeline-item">
            <div className="about__timeline-dot" aria-hidden="true" />
            <div className="about__timeline-content">
              <span className="about__timeline-period">{period}</span>
              <h3>{title}</h3>
              <p className="about__timeline-org">{org}</p>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>

    <Section title="Skills">
      <div className="about__skills-grid">
        {skills.map(({ title, tags }) => (
          <article key={title} className="about__skill-card">
            <h3>{title}</h3>
            <div className="about__chip-row">
              {tags.map((tag) => (
                <span key={tag} className="about__chip">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>

    <Section title="Awards">
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {awards.map((award, index) => (
          <li key={index}>
            <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{award.title} · <span style={{ color: '#8ab4ff' }}>{award.award}</span></div>
            <div style={{ color: 'rgba(233, 236, 255, 0.7)', fontSize: '0.95rem', marginTop: '0.2rem' }}>{award.description}</div>
          </li>
        ))}
      </ul>
    </Section>
  </div>
);

export default AboutPage;
