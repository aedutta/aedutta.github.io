export default function Bio() {
  return (
    <section className="paper__bio">
      <p>
        I'm a senior in Computer Engineering at UIUC, and I currently work on AI
        evals at{' '}
        <a href="https://nablon.ai/researchers" target="_blank" rel="noreferrer">
          Nablon AI
        </a>
        . I work on AI safety and reasoning research. At UIUC, I do formal
        neural network verification research with{' '}
        <a href="https://huan-zhang.com" target="_blank" rel="noreferrer">
          Huan Zhang's group
        </a>
        .
      </p>

      <p>
        I run{' '}
        <a href="https://aipho.org" target="_blank" rel="noreferrer">
          AIPhO
        </a>
        , the AI Physics Olympiad. It's a funded benchmark competition. Olympiad
        medalists and physics grad students write original problems that
        frontier models can't solve. Teams fine-tune open-weight models and
        compete on them. The project is modeled on{' '}
        <a href="https://aimoprize.com" target="_blank" rel="noreferrer">
          AIMO
        </a>
        , and the AIMO team advises us.
      </p>

      <p>
        AIPhO grew out of{' '}
        <a href="https://opho.physoly.tech" target="_blank" rel="noreferrer">
          OPhO
        </a>
        , the Online Physics Olympiad, which I co-founded six years ago. OPhO is
        now the largest student-run international physics competition, with a
        22k+ community. Sponsors have included Citadel, Jane Street, and Wolfram.
      </p>

      <p>
        Before this, I spent a year as a software engineer at John Deere, where
        I shipped production tools to 500+ users. I did ML research at UChicago's
        Data Science Institute, building graph neural networks for Fermilab's
        neutrino reconstruction project. I also co-authored{' '}
        <a href="https://arxiv.org/abs/2507.09850" target="_blank" rel="noreferrer">
          <em>
            Is Human-Written Data Enough? The Challenge of Teaching Reasoning to
            LLMs Without RL or Distillation
          </em>
        </a>{' '}
        with NVIDIA researchers, published at an ICML 2025 workshop.
      </p>

      <p>
        For fun, I build at hackathons — most recently a multimodal video search
        engine that won two track prizes at{' '}
        <a
          href="https://github.com/aedutta/shot-spot-treehacks-26/"
          target="_blank"
          rel="noreferrer"
        >
          Stanford TreeHacks 2026
        </a>
        .
      </p>
    </section>
  );
}
