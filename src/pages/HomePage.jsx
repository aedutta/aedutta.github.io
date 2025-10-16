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
    label: 'Personal Email',
    value: 'ashmit (dot) dutta105 (at) gmail (dot) com',
  },
  {
    label: 'University Email',
    value: 'ashmitd2 (at) illinois (dot) edu',
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
    label: 'Discord',
    value: '@aedutta',
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
    </div>
  );
};

export default HomePage;
