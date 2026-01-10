import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import './HomePage.css';

const phrases = [
  ' reading wikipedia.',
  ' stargazing.',
  ' meeting new people.',
  ' coding.',
  ' building operating systems.',
  ' flying drones.',
  ' solving physics problems.',
  ' playing guitar.',
  ' making puzzles.',
  ' renaissance artists.',
  ' eating korean barbeque.',
  ' rhythm games.',
  ' exploring new places.',
  ' learning new languages.',
  ' watching movies.',
  ' writing stories.',
  ' experimenting with new technologies.',
  ' listening to music.',
  ' taking long walks in nature.',
];

const contacts = [
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
    label: 'Phone',
    value: '612-323-1292',
    href: 'tel:6123231292',
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
            I am a junior studying Computer Engineering at the University of Illinois Urbana-Champaign. I am a software engineer (prev at John Deere) and researcher working at the intersection of autonomy, ML, and computer systems.
          </p>
          <p>
            I very recently joined the Assured and Trustworthy AI Research Lab under <a href="https://www.huan-zhang.com/" target="_blank" rel="noreferrer">Prof. Huan Zhang</a> to research formal verification for embedded and cyber-physical systems.
          </p>
          <p>
            I like writing fast code and shipping real systems, building <Link to="/projects">everything from RISC-V operating systems to autonomous racing drones</Link>. In high school, I built a 20k+ member global physics competition community.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a className="home__button" href="/assets/docs/aedutta.pdf" target="_blank" rel="noreferrer">
              View My Resume
            </a>
          </div>
        </div>

        <img className="home__avatar" src="/assets/images/profile2.png" alt="Ashmit Dutta" />
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


    </div>
  );
};

export default HomePage;
