import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';
import './ProjectsPage.css';

const technicalProjects = [
  {
    title: 'Autonomous Drone Racing / Crazyflie 2.1',
    href: 'https://docs.google.com/presentation/d/1EKGWp58CEbZTYGvxlE51tSKOSMj0S25LChlRmyB2_zw/edit?usp=sharing',
    period: 'Oct 2025 – Dec 2025',
    description: (
      <>
        Built a ROS 2 autonomy stack for Crazyflie 2.1 integrating Geometric Controller and CasADi MinSnap trajectory optimization (ECE 484). Developed Python hardware interface bridging planners to embedded firmware via CRTP radio. Finetuned and trained on NeRF data for a YOLOv8-seg gate segmentation model with PyTorch and a multi-Bayesian optimizer.
        <br />
        <i>Our drone was the fastest and most accurate in the class.</i>
      </>
    ),
  },
  {
    title: 'RISC-V Operating System',
    href: '', // No link provided in resume
    period: 'Mar 2025 – Present',
    description: (
      <>
        Built a Unix-like OS from scratch in C for a RISC-V machine with paging, multitasking, process isolation, file I/O, and shell support. Implemented drivers (UART, VIRTIO, RTC), a read/write filesystem, system calls, ELF program loading, and Sv39 virtual memory. Developed fork/exec support, pipes, and a trap-based preemptive scheduler; debugged using GDB and QEMU.
        <br />
        <i>Working with professor on research project for developing a bare-metal hypervisor to run multiple OSes concurrently.</i>
      </>
    ),
  },
  {
    title: 'Ultra-Low Latency Trading Engine',
    href: 'https://github.com/aedutta/trading-engine',
    period: 'Dec 2025 – Present',
    description: (
      <>
        Built a cloud-native HFT engine in C++20 for Coinbase markets, achieving 36ns median tick-to-signal latency on AWS c7i.large. Implemented a thread-per-core, lock-free design using hugepage-backed SPSC ring buffers, CPU pinning, and isolated cores. Developed a low-latency execution gateway with Boost.Beast and OpenSSL, using persistent HTTP/TLS, TCP NODELAY, and JWT caching.
      </>
    ),
  },
  {
    title: 'FPGA DJ Board',
    href: 'https://github.com/aedutta/fpga-dj-board',
    period: 'Oct 2024 – Dec 2024',
    description: (
      <>
        Built an FPGA audio processor integrating DDR3 memory reads from a micro-SD chip (storing WAV file data). Built PWM audio handling and interfacing, FFT IP, and real-time user controls on the board for looping, filtering, and playback speed. Verified functionality with Vivado testbenches that emulate SD transactions, DDR3 bursts, then confirmed end-to-end playback and effects on hardware.
      </>
    ),
  },
  {
    title: 'Autonomous Helper Dog',
    href: 'https://github.com/aedutta/Pawsitive-Pathways',
    period: 'Feb 2024',
    description: (
      <>
        <b>HackIllinois - John Deere Embedded Track.</b> Pawsitive Pathways is an autonomous service-dog robot that uses a camera and computer vision to detect crosswalks and guide users safely across them. Live video from a Raspberry Pi camera is processed to identify lane boundaries and adjust motor speeds for accurate navigation. Integrated with the Google Maps API, the system provides real-time routing from Location A to Location B, while a companion mobile app delivers audio instructions to ensure a safe and seamless journey.
      </>
    ),
  },
];

const publications = [
  {
    title: 'The Challenge of Teaching Reasoning to LLMs Without RL or Distillation',
    venue: 'ICML AI for Math Workshop, 2025',
    href: 'https://arxiv.org/abs/2507.09850',
    description: '',
  },
  {
    title: 'A Novel AI-Based Technique for 3D Shape Acquisition of Confectionery Sunflower Seeds and Associated Shape Descriptors',
    venue: '21st International Sunflower Conference, 2023',
    href: 'https://scholar.google.com/scholar_lookup?title=A%20novel%20AI-based%20technique%20for%203d%20shape%20acquisition%20of%20confectionery%20sunflower%20seeds%20%20and%20associated%20shape%20descriptors', // Using previous link or similar
    description: '',
  },
];

const researchItems = [
  {
    title: 'WaggleNet',
    href: 'https://www.wagglenet.org/',
    description: (
      <>
        Undergraduate researcher under Prof. Christopher Schmitz. We design, build, develop and deploy IoT solutions for beekeepers. I worked on the audio team to combine hardware and software to get audio input from bees and predict their behaviors using machine learning models.
      </>
    ),
  },
  {
    title: 'Illinois Mathematics Lab',
    href: 'https://iml.math.illinois.edu/',
    description: (
      <>
        Research scholar working on a semester-long project on <a href="/assets/docs/IML_SP24.pdf" target="_blank" rel="noreferrer">Quantum Noise and Simulation</a> (Spring 2024).
      </>
    ),
  },
];

const projectLinks = [
  { 
    title: 'Analog Spectrum Viewer',
    href: '/assets/docs/spectrumviewer.pdf',
    description: 'A document detailing the design of an analog spectrum analyzer.',
  },
  { 
    title: 'Generative Art', 
    href: '/animations', 
    internal: true,
    description: 'A collection of p5.js animations and mathematical visualizations.',
  },
  {
    title: 'Computer Vision AR glasses',
    href: 'https://github.com/aedutta/ASL-Identification',
    description: (
      <>
        My team <a href="https://ise.illinois.edu/newsroom/61015" target="_blank" rel="noreferrer">won second place at the Bradley Mottier Innovation Competition</a> ($2000 prize) for our startup pitch.
      </>
    ),
  },
];

const highSchoolOutreach = [
  {
    title: 'Online Physics Olympiad',
    href: 'https://opho.physoly.tech/',
    description:
      'The biggest international student-run physics olympiad in the world. I co-founded the competition during COVID-19 and currently manage a team of 20+ volunteers.',
  },
  {
    title: 'Everaise Academy',
    href: 'https://www.everaise.org/course/physics',
    description:
      'A course designed to teach students the fundamentals of classical mechanics. I helped design the course content and wrote over 5 chapters of the published textbook.',
  },
  {
    title: 'Solutions to Jaan Kalda\'s Handouts',
    href: 'https://physoly.tech/kalda/',
    description:
      'Almost 300 pages of solutions and translations to Jaan Kalda\'s olympiad handouts. I served as the head author for several of the solution guides.',
  },
  {
    title: 'Physoly',
    href: 'https://discord.gg/phods',
    description:
      'An online community of 10k+ physics enthusiasts. We created resources/translations for physics olympiads, partnered with Discord, and curated a YouTube channel.',
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


const ProjectCard = ({ title, href, internal, description }) => (
  <article className="projects__card">
    <h3 className="projects__card-title">
      {internal ? (
        <Link to={href}>{title}</Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer">
          {title}
        </a>
      )}
    </h3>
    <div className="projects__card-desc">{description}</div>
  </article>
);

const ListItem = ({ label, href, description }) => (
  <li>
    <a href={href} target="_blank" rel="noreferrer">
      <strong>{label}</strong>
    </a>
    <span style={{ color: 'rgba(233, 236, 255, 0.7)' }}>{description}</span>
  </li>
);

const ProjectsPage = () => {
  return (
    <div className="projects">
      <Section title="Technical Projects">
        <div className="projects__grid">
          {technicalProjects.map((item, i) => (
            <article key={i} className="projects__card">
              <h3 className="projects__card-title">
                 {item.href ? <a href={item.href} target="_blank" rel="noreferrer">{item.title}</a> : item.title}
                 {item.period && <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.4)', marginLeft: '0.5rem' }}>{item.period}</span>}
              </h3>
              <div className="projects__card-desc">{item.description}</div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Publications">
        <div className="projects__grid">
          {publications.map((item, i) => (
            <article key={i} className="projects__card">
               <h3 className="projects__card-title" style={{ fontSize: '1rem' }}>
                 {item.href ? <a href={item.href} target="_blank" rel="noreferrer">{item.title}</a> : item.title}
               </h3>
               <div className="projects__card-desc" style={{ fontStyle: 'italic', color: 'rgba(233, 236, 255, 0.6)' }}>{item.venue}</div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Research Experience">
        <div className="projects__grid">
          {researchItems.map((item, i) => (
            <ProjectCard key={i} {...item} />
          ))}
        </div>
      </Section>
      
      <Section title="Other Projects">
        <div className="projects__grid">
          {projectLinks.map((item, i) => (
            <ProjectCard key={i} {...item} />
          ))}
        </div>
      </Section>

      <Section title="Community & Outreach (High School)">
        <div className="projects__grid">
          {highSchoolOutreach.map((item, i) => (
            <ProjectCard key={i} {...item} />
          ))}
        </div>
      </Section>

      <Section title="Public Writings & Handouts">
        <ul className="projects__list">
          {handouts.map((item, i) => (
            <ListItem key={i} {...item} />
          ))}
        </ul>
      </Section>

      <Section title="Old Research Projects">
        <ul className="projects__list">
          {researchProjects.map((item, i) => (
            <ListItem key={i} {...item} />
          ))}
        </ul>
      </Section>
      
      <Section title="Translations & Solution Manuals">
         <ul className="projects__list">
          {translations.map((item, i) => (
            <ListItem key={i} {...item} />
          ))}
        </ul>
      </Section>

       <Section title="Notes & Slides">
         <ul className="projects__list">
          {notes.map((item, i) => (
            <ListItem key={i} {...item} />
          ))}
        </ul>
      </Section>
    </div>
  );
};

export default ProjectsPage;
