import cases from '../content/cases.json';
import evidence from '../content/evidence.json';
import decisions from '../content/decisions.json';
import failures from '../content/failures.json';

type CaseFile = {
  caseId: string;
  title: string;
  category: string;
  status: string;
  priority: 'Now' | 'Next' | 'Later';
  proofMaturity: number;
  signalScore: number;
  coreClaim: string;
  problem: string;
  whyItMatters: string;
  myRole: string[];
  skills: string[];
  evidenceIds: string[];
  decisionIds: string[];
  failureIds: string[];
  proofGaps: string[];
  nextProofTarget: string;
};

type Evidence = {
  id: string;
  title: string;
  project: string;
  type: string;
  status: string;
  maturity: number;
  claimSupported: string;
  summary: string;
};

type Decision = {
  id: string;
  project: string;
  decision: string;
  context: string;
  chosenPath: string;
  rejectedPath: string;
  reason: string;
  tradeoff: string;
};

type Failure = {
  id: string;
  project: string;
  failure: string;
  badAssumption: string;
  rootCause: string;
  fix: string;
  testAddedOrNeeded: string;
  whatItProves: string;
};

const caseFiles = cases as CaseFile[];
const proofItems = evidence as Evidence[];
const decisionItems = decisions as Decision[];
const failureItems = failures as Failure[];

const maturityLabels = ['Idea', 'Scoped', 'Designed', 'Prototype', 'Tested', 'Demo Ready', 'Shipped', 'Verified'];
const priorityGroups = ['Now', 'Next', 'Later'] as const;

function maturityLabel(level: number) {
  return maturityLabels[level] ?? 'Unknown';
}

function CardMeta({ item }: { item: CaseFile }) {
  return (
    <div className="meta">
      <span className="badge accent">{item.caseId}</span>
      <span className="badge">{item.category}</span>
      <span className="badge blue">Level {item.proofMaturity}: {maturityLabel(item.proofMaturity)}</span>
      <span className="badge">Signal {item.signalScore}/10</span>
    </div>
  );
}

export default function HomePage() {
  const nowCases = caseFiles.filter((item) => item.priority === 'Now');

  return (
    <main>
      <section className="hero" id="mission-control">
        <div>
          <div className="eyebrow">Veriforge / Mission Control</div>
          <h1>Where my work becomes proof.</h1>
          <p className="lede">
            Veriforge is my living evidence system for the systems I build, the decisions I make,
            the failures I learn from, and the proof I collect. I do not just list projects. I map
            my claims to case files, decisions, failures, tests, architecture, demos, and shipped work.
          </p>
          <div className="actions">
            <a className="button primary" href="#case-files">Enter Case Files</a>
            <a className="button" href="#proof-wall">View Proof Wall</a>
            <a className="button" href="#failures">Failure Ledger</a>
            <a className="button" href="#decisions">Decision Ledger</a>
          </div>
        </div>
      </section>

      <section id="narrative" className="split">
        <div>
          <div className="eyebrow">My Narrative</div>
          <h2>I use QA thinking to build safer systems.</h2>
        </div>
        <div className="card highlight">
          <p>
            I started from QA, but I do not want to stay boxed into checking screens. I use QA
            thinking to build safer systems: systems that control automation, expose failures,
            validate decisions, and turn vague ideas into testable products.
          </p>
          <div className="meta">
            <span className="badge">QA</span>
            <span className="badge">Debugging</span>
            <span className="badge">Automation</span>
            <span className="badge">AI Safety</span>
            <span className="badge">Approval Systems</span>
            <span className="badge">Product Building</span>
          </div>
        </div>
      </section>

      <section id="proof-claims">
        <div className="eyebrow">Proof Claims</div>
        <h2>Claims I must prove, not just say.</h2>
        <div className="grid">
          {[
            'I design control systems for risky automation.',
            'I debug complex automation systems by separating symptoms from root causes.',
            'I turn vague ideas into structured, testable, buildable systems.',
            'I use QA thinking to design safer product workflows.',
            'I create human-in-the-loop systems where automation needs control.',
            'I document proof gaps instead of pretending unfinished work is production-ready.'
          ].map((claim) => (
            <article className="card" key={claim}>
              <div className="kicker">Claim</div>
              <h3>{claim}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="case-files">
        <div className="eyebrow">Case Files</div>
        <h2>Now / Next / Later proof map.</h2>
        {priorityGroups.map((priority) => {
          const group = caseFiles.filter((item) => item.priority === priority);
          if (!group.length) return null;

          return (
            <div key={priority} style={{ marginTop: 28 }}>
              <h3>{priority}</h3>
              <div className="grid">
                {group.map((item) => (
                  <article className="card" key={item.caseId}>
                    <CardMeta item={item} />
                    <h3>{item.title}</h3>
                    <p><strong>Claim:</strong> {item.coreClaim}</p>
                    <p><strong>Problem:</strong> {item.problem}</p>
                    <p><strong>Next proof target:</strong> {item.nextProofTarget}</p>
                    <div className="meta">
                      {item.skills.slice(0, 4).map((skill) => <span className="badge" key={skill}>{skill}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section id="flagship-details">
        <div className="eyebrow">Flagship Details</div>
        <h2>The first three systems carry the story.</h2>
        <div className="list">
          {nowCases.map((item) => (
            <article className="card" key={item.caseId}>
              <div className="split">
                <div>
                  <CardMeta item={item} />
                  <h3>{item.title}</h3>
                  <p>{item.whyItMatters}</p>
                  <div className="score">{item.signalScore}/10</div>
                  <p>Signal score</p>
                </div>
                <div>
                  <div className="kicker">My role</div>
                  <div className="list">
                    {item.myRole.map((role) => <div className="item" key={role}><p>{role}</p></div>)}
                  </div>
                  <div style={{ marginTop: 18 }} className="kicker">Proof gaps</div>
                  <div className="list">
                    {item.proofGaps.map((gap) => <div className="item" key={gap}><p>{gap}</p></div>)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="proof-wall">
        <div className="eyebrow">Proof Wall</div>
        <h2>Evidence items, not vague self-praise.</h2>
        <div className="grid two">
          {proofItems.map((item) => (
            <article className="card" key={item.id}>
              <div className="meta">
                <span className="badge accent">{item.id}</span>
                <span className="badge">{item.type}</span>
                <span className="badge blue">Level {item.maturity}: {maturityLabel(item.maturity)}</span>
              </div>
              <h3>{item.title}</h3>
              <p><strong>Project:</strong> {item.project}</p>
              <p>{item.summary}</p>
              <p><strong>Claim supported:</strong> {item.claimSupported}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="failures">
        <div className="eyebrow">Failure Ledger</div>
        <h2>Failures are proof of how I think under pressure.</h2>
        <div className="grid two">
          {failureItems.map((item) => (
            <article className="card" key={item.id}>
              <div className="meta">
                <span className="badge accent">{item.id}</span>
                <span className="badge">{item.project}</span>
              </div>
              <h3>{item.failure}</h3>
              <p><strong>Bad assumption:</strong> {item.badAssumption}</p>
              <p><strong>Root cause:</strong> {item.rootCause}</p>
              <p><strong>Fix:</strong> {item.fix}</p>
              <p><strong>What it proves:</strong> {item.whatItProves}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="decisions">
        <div className="eyebrow">Decision Ledger</div>
        <h2>Decisions show judgment better than feature lists.</h2>
        <div className="grid two">
          {decisionItems.map((item) => (
            <article className="card" key={item.id}>
              <div className="meta">
                <span className="badge accent">{item.id}</span>
                <span className="badge">{item.project}</span>
              </div>
              <h3>{item.decision}</h3>
              <p><strong>Context:</strong> {item.context}</p>
              <p><strong>Chosen:</strong> {item.chosenPath}</p>
              <p><strong>Rejected:</strong> {item.rejectedPath}</p>
              <p><strong>Tradeoff:</strong> {item.tradeoff}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="operating-style" className="split">
        <div>
          <div className="eyebrow">Operating Style</div>
          <h2>The rule is simple: proof beats claims.</h2>
        </div>
        <div className="card highlight">
          <div className="list">
            {[
              'I turn vague ideas into scoped systems.',
              'I prefer proof over claims.',
              'I treat failures as debugging material, not embarrassment.',
              'I care about controls, tests, and real execution.',
              'I do not consider a project serious until it has proof.'
            ].map((line) => <div className="item" key={line}><p>{line}</p></div>)}
          </div>
        </div>
      </section>

      <div className="footer">
        Veriforge MVP / Static evidence UI. Next: split this into reusable components, add detail pages, and validate build in CI.
      </div>
    </main>
  );
}
