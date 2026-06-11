import Tex from '../../components/Tex.jsx';

export const meta = {
  title: 'The Solovay–Kitaev Theorem',
  date: '2024-02-15',
};

const preStyle = {
  background: 'var(--paper-2, #f6f3ec)',
  border: '1px solid var(--rule)',
  borderRadius: '6px',
  padding: '1rem 1.25rem',
  overflowX: 'auto',
  fontSize: '0.85rem',
  lineHeight: 1.6,
};

export default () => (
  <>
    <p>
      <em>
        I did some of my own research in this area — you can read my poster{' '}
        <a href="/assets/docs/IML_SP24.pdf" target="_blank" rel="noreferrer">
          here
        </a>
        .
      </em>
    </p>
    <p>
      I’ve been thinking about a question that sounds almost too basic to ask:
      if you build a quantum computer, what gates do you actually need to put in
      it?
    </p>
    <p>
      In classical computing this question has a famous answer. Any logic
      circuit, no matter how complicated, can be built out of AND, OR, and NOT.
      Three gates and you’re done — they form a basis for everything. So the
      natural question is whether quantum computing has its own version of this,
      and that’s exactly what the Solovay–Kitaev theorem answers. The catch is
      that quantum gates live in a continuum (they’re unitary matrices, and
      there are uncountably many of them), so a finite gate set can never hit
      every gate exactly. The best you can hope for is approximation. The
      surprise is how cheap that approximation turns out to be.
    </p>

    <h2>the statement</h2>
    <p>
      Here’s the theorem, from Dawson and Nielsen’s writeup{' '}
      <a href="#sk-ref-1">[1]</a>:
    </p>
    <blockquote>
      Let <Tex>{String.raw`\mathcal{G}`}</Tex> be an instruction set for{' '}
      <Tex>{String.raw`SU(d)`}</Tex>, and let a desired accuracy{' '}
      <Tex>{String.raw`\epsilon > 0`}</Tex> be given. There is a constant{' '}
      <Tex>{String.raw`c`}</Tex> such that for any{' '}
      <Tex>{String.raw`U \in SU(d)`}</Tex> there exists a finite sequence{' '}
      <Tex>{String.raw`S`}</Tex> of gates from <Tex>{String.raw`\mathcal{G}`}</Tex>{' '}
      of length <Tex>{String.raw`O(\log^{c}(1/\epsilon))`}</Tex> with{' '}
      <Tex>{String.raw`d(U, S) < \epsilon`}</Tex>.
    </blockquote>
    <p>
      In the analysis we’ll sketch here,{' '}
      <Tex>{String.raw`c \sim 3.97`}</Tex>.
    </p>
    <p>
      Some quick unpacking. An <em>instruction set</em>{' '}
      <Tex>{String.raw`\mathcal{G}`}</Tex> for a <Tex>{String.raw`d`}</Tex>-dimensional
      qudit is a finite set of gates where (1) every{' '}
      <Tex>{String.raw`g \in \mathcal{G}`}</Tex> is in{' '}
      <Tex>{String.raw`SU(d)`}</Tex>, meaning unitary with determinant 1, (2)
      every gate’s inverse <Tex>{String.raw`g^\dagger`}</Tex> is also in{' '}
      <Tex>{String.raw`\mathcal{G}`}</Tex>, and (3) the set is{' '}
      <em>universal</em>: the group it generates is dense in{' '}
      <Tex>{String.raw`SU(d)`}</Tex>, so any target <Tex>{String.raw`U`}</Tex> can
      be approximated to any accuracy by some product{' '}
      <Tex>{String.raw`S = g_1 \cdots g_m`}</Tex>.
    </p>
    <p>By “approximated” I mean in operator norm,</p>
    <Tex displayMode>
      {String.raw`d(U, S) \equiv \lVert U - S \rVert \equiv \sup_{\lVert \psi \rVert = 1} \lVert (U - S)\psi \rVert < \epsilon,`}
    </Tex>
    <p>which is the notion of distance we’ll use throughout.</p>
    <p>
      Note what universality does and doesn’t give you. Density is just an
      existence statement — it says a good approximating sequence is out there{' '}
      <em>somewhere</em>, but for all you know it could have length{' '}
      <Tex>{String.raw`\exp(\exp(1/\epsilon))`}</Tex>. Solovay–Kitaev is the
      statement that the sequence is actually <em>short</em>: polylogarithmic in{' '}
      <Tex>{String.raw`1/\epsilon`}</Tex>. Each extra digit of precision costs
      you almost nothing.
    </p>
    <p>
      A standard example of an instruction set is the Hadamard gate plus the{' '}
      <Tex>{String.raw`T`}</Tex> gate:
    </p>
    <Tex displayMode>
      {String.raw`H := \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}, \qquad T := \begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}.`}
    </Tex>
    <p>
      Fun fact: from just these two you can build the Pauli gates
    </p>
    <Tex displayMode>
      {String.raw`X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \qquad Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \qquad Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}`}
    </Tex>
    <p>
      <em>exactly</em>, no approximation needed (e.g.{' '}
      <Tex>{String.raw`Z = T^4`}</Tex>, <Tex>{String.raw`X = HZH`}</Tex>).
    </p>

    <h2>why the scaling matters</h2>
    <p>
      Suppose you have a quantum algorithm made of <Tex>{String.raw`m`}</Tex>{' '}
      gates <Tex>{String.raw`U_1, \dots, U_m`}</Tex>, none of which are
      necessarily in your instruction set. Errors add up, so if you want the
      whole algorithm accurate to <Tex>{String.raw`\epsilon`}</Tex>, each gate
      needs to be accurate to <Tex>{String.raw`\epsilon/m`}</Tex>.
    </p>
    <p>
      Now compare two worlds. If approximating a gate to accuracy{' '}
      <Tex>{String.raw`\epsilon/m`}</Tex> took a sequence of length{' '}
      <Tex>{String.raw`O(m/\epsilon)`}</Tex>, then compiling all{' '}
      <Tex>{String.raw`m`}</Tex> gates would cost{' '}
      <Tex>{String.raw`O(m^2/\epsilon)`}</Tex> — the algorithm’s length blows up
      quadratically, and dividing by <Tex>{String.raw`\epsilon`}</Tex> hurts.
      With Solovay–Kitaev, each gate costs only{' '}
      <Tex>{String.raw`O(\log^{3.97}(m/\epsilon))`}</Tex>, so the whole compiled
      algorithm has length
    </p>
    <Tex displayMode>
      {String.raw`O\!\left(m \log^{3.97} \frac{m}{\epsilon}\right),`}
    </Tex>
    <p>
      and the classical compile time is{' '}
      <Tex>{String.raw`O(m \log^{2.97}(m/\epsilon))`}</Tex>. Basically linear in{' '}
      <Tex>{String.raw`m`}</Tex> with a polylog tax. That’s the difference
      between gate compilation being a footnote and being the bottleneck of
      quantum computing.
    </p>

    <h2>the algorithm</h2>
    <p>
      What I like most about Solovay–Kitaev is that the proof is an algorithm.
      Here it is, in its entirety:
    </p>
    <pre style={preStyle}>{`function SolovayKitaev(Gate U, depth n) {
    if (n == 0)
        return BasicApproximation(U);
    else
        U_{n-1} = SolovayKitaev(U, n - 1);
        V, W    = GC-Decompose(U · U_{n-1}†);
        V_{n-1} = SolovayKitaev(V, n - 1);
        W_{n-1} = SolovayKitaev(W, n - 1);
        return U_n = V_{n-1} W_{n-1} V_{n-1}† W_{n-1}† U_{n-1};
}`}</pre>
    <p>
      At depth 0 you just look up a decent approximation in a precomputed table
      (this is where density gets used). The interesting part is the recursive
      step, and the key object is{' '}
      <Tex>{String.raw`V W V^\dagger W^\dagger`}</Tex>, which is just the group
      commutator <Tex>{String.raw`[V, W]`}</Tex>.
    </p>
    <p>
      The idea: say the depth-<Tex>{String.raw`(n-1)`}</Tex> call hands you{' '}
      <Tex>{String.raw`U_{n-1}`}</Tex>, an{' '}
      <Tex>{String.raw`\epsilon_{n-1}`}</Tex>-approximation to{' '}
      <Tex>{String.raw`U`}</Tex>. Define the leftover error
    </p>
    <Tex displayMode>
      {String.raw`\Delta \equiv U U_{n-1}^\dagger, \qquad d(I, \Delta) < \epsilon_{n-1}.`}
    </Tex>
    <p>
      <Tex>{String.raw`\Delta`}</Tex> is some unitary sitting very close to the
      identity, and we want to approximate <em>it</em> using our gate set. The
      trick is to write <Tex>{String.raw`\Delta`}</Tex> as a group commutator of
      two unitaries <Tex>{String.raw`V, W`}</Tex>, recursively approximate those,
      and it turns out that{' '}
      <Tex>{String.raw`[V_{n-1}, W_{n-1}]`}</Tex> approximates{' '}
      <Tex>{String.raw`\Delta`}</Tex> to accuracy
    </p>
    <Tex displayMode>
      {String.raw`\epsilon_n = c_{\text{approx}}\, \epsilon_{n-1}^2`}
    </Tex>
    <p>
      for a small constant{' '}
      <Tex>{String.raw`c_{\text{approx}} \approx 8 c_{\text{gc}} \approx 4\sqrt{2}`}</Tex>.
    </p>
    <p>
      Stop and look at that for a second: the error gets <em>squared</em> every
      level. Squaring a small number makes it way smaller, and this quadratic
      convergence is the entire reason the gate count ends up polylogarithmic in{' '}
      <Tex>{String.raw`1/\epsilon`}</Tex>.
    </p>

    <h2>where do V and W come from?</h2>
    <p>
      The <code>GC-Decompose</code> step is where the geometry lives, and for
      qubits it’s all happening on the Bloch sphere. A state on the Bloch sphere
      at angles <Tex>{String.raw`\theta, \phi`}</Tex> looks like
    </p>
    <Tex displayMode>
      {String.raw`\lvert \hat{n} \rangle = \cos\frac{\theta}{2}\lvert 0 \rangle + \sin\frac{\theta}{2}\, e^{i\phi}\, \lvert 1 \rangle,`}
    </Tex>
    <p>
      and every single-qubit unitary is (up to phase) a rotation of this sphere.
    </p>
    <p>
      We want <Tex>{String.raw`V`}</Tex> and <Tex>{String.raw`W`}</Tex> with{' '}
      <Tex>{String.raw`V W V^\dagger W^\dagger = U`}</Tex> such that both are
      close to the identity:
    </p>
    <Tex displayMode>
      {String.raw`d(I, V),\; d(I, W) < c_{\text{gc}} \sqrt{\epsilon}.`}
    </Tex>
    <p>
      Note the <Tex>{String.raw`\sqrt{\epsilon}`}</Tex> — the commutator of two
      rotations near the identity is <em>quadratically</em> closer to the
      identity than the rotations themselves, which is the same squaring
      phenomenon from the other direction.
    </p>
    <p>
      Concretely, if <Tex>{String.raw`V`}</Tex> and <Tex>{String.raw`W`}</Tex>{' '}
      are rotations by an angle <Tex>{String.raw`\phi`}</Tex> about
      perpendicular axes, their group commutator is a rotation by{' '}
      <Tex>{String.raw`\theta`}</Tex> about some axis{' '}
      <Tex>{String.raw`\hat n`}</Tex>, where
    </p>
    <Tex displayMode>
      {String.raw`\sin(\theta/2) = 2 \sin^2(\phi/2) \sqrt{1 - \sin^4(\phi/2)}.`}
    </Tex>
    <p>
      And for a unitary <Tex>{String.raw`T`}</Tex> rotating the Bloch sphere by
      angle <Tex>{String.raw`\tau`}</Tex>, the distance to the identity is
    </p>
    <Tex displayMode>
      {String.raw`d(I, T) = 2\sin(\tau/4) = \tau/2 + O(\tau^3).`}
    </Tex>
    <p>
      Chasing these through gives <Tex>{String.raw`c_{\text{gc}} = 1/\sqrt{2}`}</Tex>.
      (There’s a nice Python implementation of all of this floating around if you
      want to watch the recursion actually converge.)
    </p>

    <h2>the sad part: arbitrary unitaries</h2>
    <p>
      So far everything has been about approximating one gate in{' '}
      <Tex>{String.raw`SU(d)`}</Tex> for small <Tex>{String.raw`d`}</Tex>. What
      if you ask a bigger question: with circuits of <Tex>{String.raw`T`}</Tex>{' '}
      gates on <Tex>{String.raw`n`}</Tex> qubits, can you reach <em>every</em>{' '}
      unitary in <Tex>{String.raw`U(N)`}</Tex>,{' '}
      <Tex>{String.raw`N = 2^n`}</Tex>, to accuracy{' '}
      <Tex>{String.raw`\delta`}</Tex>?
    </p>
    <p>
      There’s a slick volume-counting argument that says no, not without
      exponential cost.
    </p>
    <p>
      Picture a ball of radius <Tex>{String.raw`\delta`}</Tex> around every
      unitary your circuits can produce. If you want to cover all of{' '}
      <Tex>{String.raw`U(N)`}</Tex>, you need at least
    </p>
    <Tex displayMode>
      {String.raw`N_{\text{balls}} \geq \frac{\mathrm{Vol}(U(N))}{\mathrm{Vol}(\delta\text{-ball})}`}
    </Tex>
    <p>
      balls. Now, <Tex>{String.raw`U(N)`}</Tex> contains a ball of some fixed
      radius <Tex>{String.raw`C`}</Tex> around the identity, with volume{' '}
      <Tex>{String.raw`\Omega_{N^2} C^{N^2}`}</Tex> (here{' '}
      <Tex>{String.raw`\Omega_{N^2}`}</Tex> is the volume of the unit ball in the
      right dimension — the dimension of the group is{' '}
      <Tex>{String.raw`N^2`}</Tex>, which is the thing to notice). Each little{' '}
      <Tex>{String.raw`\delta`}</Tex>-ball has volume{' '}
      <Tex>{String.raw`\Omega_{N^2} \delta^{N^2}`}</Tex>. So
    </p>
    <Tex displayMode>
      {String.raw`N_{\text{balls}} \geq \left(\frac{C}{\delta}\right)^{N^2}.`}
    </Tex>
    <p>
      How many circuits do we have to work with? Our universal set has a
      constant number of gate types, each acting on at most{' '}
      <Tex>{String.raw`k`}</Tex> qubits, so the number of choices at each step of
      the circuit is at most a constant times{' '}
      <Tex>{String.raw`\binom{n}{k} = \mathrm{poly}(n)`}</Tex>. The number of
      circuits with <Tex>{String.raw`T`}</Tex> gates is then
    </p>
    <Tex displayMode>
      {String.raw`N_T \leq (\mathrm{poly}(n))^T.`}
    </Tex>
    <p>
      Each circuit covers at most one ball, so covering requires{' '}
      <Tex>{String.raw`N_T \geq N_{\text{balls}}`}</Tex>, and solving for{' '}
      <Tex>{String.raw`T`}</Tex>:
    </p>
    <Tex displayMode>
      {String.raw`T \geq 2^{2n} \, \frac{\log(C/\delta)}{\log(\mathrm{poly}(n))}.`}
    </Tex>
    <p>
      Exponential in the number of qubits. So while Solovay–Kitaev makes any{' '}
      <em>particular</em> unitary cheap to approximate once you can reach its
      neighborhood, almost all of <Tex>{String.raw`U(N)`}</Tex> is simply out of
      reach — there are exponentially more unitaries than there are short
      circuits, full stop. I keep coming back to a line of John Preskill’s about
      how future quantum engineers, no matter how good their hardware gets, will
      find that most quantum states stay forever beyond their grasp. Hilbert
      space is just absurdly big, and it’s humbling.
    </p>

    <h2>a footnote on qudits</h2>
    <p>
      Everything above was phrased for qubits, but qudits — the{' '}
      <Tex>{String.raw`d`}</Tex>-dimensional generalization — work too. The Bloch
      sphere picture has to be replaced and some of the estimates get modified,
      but the structure of the argument (recursive refinement via group
      commutators, error squaring at each level) carries through. Maybe a post
      for another day.
    </p>

    <hr style={{ margin: '2.5rem 0 1.5rem', border: 'none', borderTop: '1px solid var(--rule)' }} />
    <p id="sk-ref-1" style={{ fontSize: '0.9rem' }}>
      [1] C. M. Dawson and M. A. Nielsen. “The Solovay–Kitaev algorithm.”{' '}
      <em>Quantum Information &amp; Computation</em>, 6(1):81–95, 2006.{' '}
      <a
        href="https://arxiv.org/abs/quant-ph/0505030"
        target="_blank"
        rel="noreferrer"
      >
        arXiv:quant-ph/0505030
      </a>
      .
    </p>
  </>
);
