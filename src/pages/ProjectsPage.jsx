import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';
import './ProjectsPage.css';

const technicalProjects = [
  {
    title: 'Out-of-Order RV32IM Processor (ECE 411)',
    href: '/assets/docs/mp_ooo_final_report.pdf',
    period: 'Mar 2026 – May 2026',
    tags: ['Hardware', 'Systems'],
    featured: true,
    description: (
      <>
        A 2-way superscalar out-of-order RV32IM core in SystemVerilog — register renaming, a 16-entry ROB, split load/store queue, and a tournament branch predictor. Synthesized at 500 MHz with zero Spike mismatches, and ranked top 10 in the class design competition at 3.6× the staff baseline.
      </>
    ),
  },
  {
    title: 'Drone Controller PCB (ECE 395)',
    href: '/assets/docs/395 Final Report (1).pdf',
    period: 'Jan 2026 – May 2026',
    tags: ['Hardware', 'Embedded', 'RF'],
    featured: true,
    description: (
      <>
        A handheld controller PCB (Skylink v1.0) that pairs with a custom quadcopter over a sub-GHz link — an STM32 samples dual thumb-joysticks and a BMI270 IMU and transmits to a CC1101 transceiver. Schematic, 4-layer layout, and bare-metal firmware all in-house; reworked the RF matching network from 433 to 315 MHz and verified the link end-to-end.
      </>
    ),
  },
  {
    title: 'CUDA CNN Optimization (ECE 408)',
    href: '/assets/docs/ece408_m3_report.pdf',
    period: 'Mar 2026 – Apr 2026',
    tags: ['GPU', 'ML', 'Systems'],
    featured: true,
    description: (
      <>
        Optimized a forward-pass CNN in CUDA for an NVIDIA A40, pairing an implicit-GEMM kernel with a WMMA Tensor Core kernel that fuses im2col and FP16/FP32 matmul. Hit 12.55 ms at batch 10,000 (0.8714 accuracy) — ~6.6× over the fused baseline and well under the 60 ms target — placing 5th of 130 in the class design competition.
      </>
    ),
  },
  {
    title: 'Stanford TreeHacks 2026 — 2x Track Winner',
    href: 'https://github.com/aedutta/shot-spot-treehacks-26',
    period: 'Feb 2026',
    tags: ['Hackathon', 'ML'],
    featured: true,
    description: (
      <>
        <b>What if you could search video like you search text?</b> 🏆 2nd place, Modal Inference track. 🏆 3rd place, Bright Data AI-Driven Data track.
      </>
    ),
  },
  {
    title: 'Autonomous Drone Racing / Crazyflie 2.1',
    href: 'https://docs.google.com/presentation/d/1EKGWp58CEbZTYGvxlE51tSKOSMj0S25LChlRmyB2_zw/edit?usp=sharing',
    period: 'Oct 2025 – Dec 2025',
    tags: ['Robotics', 'ML'],
    featured: true,
    description: (
      <>
        Built a ROS 2 autonomy stack for Crazyflie 2.1 integrating Geometric Controller and CasADi MinSnap trajectory optimization (ECE 484). Developed Python hardware interface bridging planners to embedded firmware via CRTP radio. Finetuned and trained on NeRF data for a YOLOv8-seg gate segmentation model with PyTorch and a multi-Bayesian optimizer.
        <br />
        <i>Our drone was the fastest and most accurate in the class.</i>
      </>
    ),
  },
  {
    title: 'Ultra-Low Latency Trading Engine',
    href: 'https://github.com/aedutta/trading-engine',
    period: 'Dec 2025 – Jan 2026',
    tags: ['Systems', 'C++'],
    featured: true,
    description: (
      <>
        Built a cloud-native HFT engine in C++20 for Coinbase markets, achieving 36ns median tick-to-signal latency on AWS c7i.large. Implemented a thread-per-core, lock-free design using hugepage-backed SPSC ring buffers, CPU pinning, and isolated cores. Developed a low-latency execution gateway with Boost.Beast and OpenSSL, using persistent HTTP/TLS, TCP NODELAY, and JWT caching.
      </>
    ),
  },
  {
    title: 'RISC-V Operating System',
    href: '', // No link provided in resume
    period: 'Mar 2025 – May 2025',
    tags: ['Systems', 'C'],
    featured: true,
    description: (
      <>
        Built a Unix-like OS from scratch in C for a RISC-V machine with paging, multitasking, process isolation, file I/O, and shell support. Implemented drivers (UART, VIRTIO, RTC), a read/write filesystem, system calls, ELF program loading, and Sv39 virtual memory. Developed fork/exec support, pipes, and a trap-based preemptive scheduler; debugged using GDB and QEMU.
        <br />
        <i>Working with professor on research project for developing a bare-metal hypervisor to run multiple OSes concurrently.</i>
      </>
    ),
  },
  {
    title: 'FPGA DJ Controller (ECE 385)',
    href: 'https://github.com/aedutta/fpga-dj-board',
    period: 'Oct 2024 – Dec 2024',
    tags: ['Hardware', 'FPGA'],
    description: (
      <>
        An FPGA-based audio effects processor that works like a DJ controller — loop, speed up/slow down, and filter live audio. Streams raw PCM from an SD card through DDR3 into a DSP pipeline (FIR filter, echo) and out as PWM, with on-board switches and HEX/LED status. Verified in Vivado testbenches, then confirmed end-to-end on hardware.{' '}
        <a href="/assets/docs/DJ Controller Report.pdf" target="_blank" rel="noreferrer">
          Full report ↗
        </a>
      </>
    ),
  },
  {
    title: 'Autonomous Helper Dog',
    href: 'https://github.com/aedutta/Pawsitive-Pathways',
    period: 'Feb 2024',
    tags: ['Hackathon', 'Robotics'],
    description: (
      <>
        <b>HackIllinois - John Deere Embedded Track.</b> Pawsitive Pathways is an autonomous service-dog robot that uses a camera and computer vision to detect crosswalks and guide users safely across them. Live video from a Raspberry Pi camera is processed to identify lane boundaries and adjust motor speeds for accurate navigation. Integrated with the Google Maps API, the system provides real-time routing from Location A to Location B, while a companion mobile app delivers audio instructions to ensure a safe and seamless journey.
      </>
    ),
  },
  {
    title: 'Computer Vision AR glasses',
    href: 'https://github.com/aedutta/ASL-Identification',
    tags: ['ML', 'Hardware'],
    description: (
      <>
        My team <a href="https://ise.illinois.edu/newsroom/61015" target="_blank" rel="noreferrer">won second place at the Bradley Mottier Innovation Competition</a> ($2000 prize) for our startup pitch.
      </>
    ),
  },
  {
    title: 'Online Physics Olympiad',
    href: 'https://github.com/physoly/OPhO',
    period: 'Mar 2020 – Present',
    tags: ['Web'],
    description: (
      <>
        Created the main website and submission portal for the Online Physics Olympiad, hosting 2k+ annual participants a year.
      </>
    ),
  },
  { 
    title: 'Analog Spectrum Viewer',
    href: '/assets/docs/spectrumviewer.pdf',
    tags: ['Hardware'],
    description: 'A document detailing the design of an analog spectrum analyzer for ECE 198 (James Scholar Honors Project).',
  },
  { 
    title: 'Generative Art', 
    href: '/animations', 
    internal: true,
    tags: ['Creative'],
    description: 'A collection of p5.js animations and mathematical visualizations.',
  },
];

const ProjectCard = ({ title, href, internal, description, period, venue, tags, featured }) => (
  <article className={`projects__card${featured ? ' projects__card--featured' : ''}`}>
    <div className="projects__card-header">
      <h3 className="projects__card-title">
        {internal ? (
          <Link to={href}>{title}</Link>
        ) : href ? (
          <a href={href} target="_blank" rel="noreferrer">
            {title}
          </a>
        ) : (
          <span>{title}</span>
        )}
      </h3>
      {period && <span className="projects__period">{period}</span>}
    </div>

    {tags && tags.length > 0 && (
      <div className="projects__tags">
        {tags.map((tag) => (
          <span key={tag} className={`projects__tag projects__tag--${tag.toLowerCase()}`}>
            {tag}
          </span>
        ))}
      </div>
    )}

    {venue && <div className="projects__venue">{venue}</div>}

    {description && <div className="projects__card-desc">{description}</div>}
  </article>
);

const ProjectsPage = () => (
  <div className="projects">
    <Section title="Projects">
      <div className="projects__grid">
        {technicalProjects.map((item, i) => (
          <ProjectCard key={i} {...item} />
        ))}
      </div>
    </Section>
  </div>
);

export default ProjectsPage;
