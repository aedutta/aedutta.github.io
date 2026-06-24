import { useState } from 'react';
import { publications, researchExperience, me } from '../data/research.jsx';
import './ResearchPage.css';

const PubFigure = ({ src, label }) => {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <div className="research__fig research__fig--placeholder" aria-hidden="true">
        <span className="research__fig-label">{label}</span>
      </div>
    );
  }
  return (
    <div className="research__fig">
      <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
    </div>
  );
};

const ResearchPage = () => (
  <article className="research">
    <header className="research__masthead">
      <h1 className="research__title">Research</h1>
      <p className="research__subtitle">
        Selected publications and research experience.{' '}
        <a
          href="https://scholar.google.com/citations?user=VSpPcv4AAAAJ&hl=en"
          target="_blank"
          rel="noreferrer"
        >
          Google Scholar ↗
        </a>
      </p>
    </header>

    <section className="research__section">
      <h2 className="research__heading">Publications &amp; Posters</h2>
      <ol className="research__pubs">
        {publications.map((p, i) => (
          <li className="research__pub" key={p.slug}>
            <span className="research__pub-num">[{i + 1}]</span>
            <PubFigure src={p.figure} label={p.figureLabel} />
            <div className="research__pub-body">
              <h3 className="research__pub-title">
                <a href={p.href} target="_blank" rel="noreferrer">
                  {p.title}
                </a>
              </h3>
              {p.authors.length > 0 && (
              <p className="research__pub-authors">
                {p.authors.map((a, j) => (
                  <span key={`${p.slug}-${j}`}>
                    {j > 0 && ', '}
                    {a === me ? <strong>{a}</strong> : a}
                  </span>
                ))}
              </p>
              )}
              <p className="research__pub-venue">
                {p.venue}
                {p.year ? `, ${p.year}` : ''}
              </p>
              {p.abstract && (
                <p className="research__pub-abstract">{p.abstract}</p>
              )}
              <p className="research__pub-links">
                <a href={p.href} target="_blank" rel="noreferrer">
                  [
                  {p.linkLabel ??
                    (p.href.includes('arxiv')
                      ? 'pdf / arXiv'
                      : p.href.endsWith('.pdf')
                        ? 'pdf'
                        : 'link')}
                  ]
                </a>
                {p.published && (
                  <a href={p.published} target="_blank" rel="noreferrer">
                    [published]
                  </a>
                )}
                {p.poster && (
                  <a href={p.poster} target="_blank" rel="noreferrer">
                    [poster]
                  </a>
                )}
                {p.code && (
                  <a href={p.code} target="_blank" rel="noreferrer">
                    [code]
                  </a>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="research__section">
      <h2 className="research__heading">Research Experience</h2>
      <ul className="research__exp">
        {researchExperience.map((r) => (
          <li className="research__exp-item" key={r.title}>
            <div className="research__exp-head">
              <h3 className="research__exp-title">
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noreferrer">
                    {r.title}
                  </a>
                ) : (
                  r.title
                )}
              </h3>
              {r.period && <span className="research__exp-period">{r.period}</span>}
            </div>
            {r.org && <p className="research__exp-org">{r.org}</p>}
            {r.description && (
              <p className="research__exp-desc">{r.description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  </article>
);

export default ResearchPage;
