import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roles } from '../data/index';

const learningPrinciples = [
  {
    title: 'Retrieval beats rereading',
    body: 'Before opening the answer, try to recall the idea from memory. Practice tests, flashcards, and explaining concepts aloud create stronger long-term memory than rereading notes.',
  },
  {
    title: 'Space your study',
    body: 'Review material after a delay: same day, next day, three days later, then weekly. Spaced repetition makes forgetting work for you by forcing useful recall.',
  },
  {
    title: 'Mix related topics',
    body: 'Interleave algorithms, debugging, databases, and design instead of studying one topic for hours. Switching topics improves transfer because you learn when to use each idea.',
  },
  {
    title: 'Chunk and color-code',
    body: 'Group ideas into small chunks and attach a consistent visual cue. This page uses green for fundamentals, blue for mid-level implementation, purple for senior tradeoffs, and amber for practice actions.',
  },
  {
    title: 'Teach the concept',
    body: 'After reading a section, explain it as if mentoring a junior developer. If the explanation gets vague, turn that weak spot into your next practice question.',
  },
];

const referenceGuides = [
  {
    title: 'Programming fundamentals',
    tone: 'foundation',
    bullets: [
      'Big O describes growth as input size increases. Ignore constants and lower-order terms so you can compare algorithms at scale.',
      'Arrays provide O(1) indexed access because the address can be computed directly. Linked lists trade direct access for cheaper local insertion when you already have a node.',
      'Stacks are LIFO and model call stacks, undo history, and depth-first traversal. Queues are FIFO and model schedulers, breadth-first traversal, and work pipelines.',
      'Pure functions return the same output for the same input and avoid side effects. They are easier to test, cache, parallelize, and reason about.',
      'Recursion needs a base case and progress toward that base case. Without both, it risks infinite recursion or stack overflow.',
      'Type systems catch categories of mistakes before runtime. Stronger types are most useful when they encode domain rules instead of only primitive shapes.',
    ],
  },
  {
    title: 'Clean code, testing, and debugging',
    tone: 'foundation',
    bullets: [
      'Readable code optimizes for the next person who must change it. Prefer clear names, small cohesive functions, and visible control flow.',
      'Unit tests isolate one behavior. Integration tests verify components working together. End-to-end tests protect critical user journeys but are slower and more brittle.',
      'A good bug report contains expected behavior, actual behavior, reproduction steps, environment, and any logs or screenshots that narrow the search.',
      'Debug by forming hypotheses. Change one variable at a time, collect evidence, and keep notes so you do not circle back to disproven causes.',
      'Git commits should be small and explain why the change exists. Branches make risky work reversible and reviewable.',
    ],
  },
  {
    title: 'Web, databases, APIs, and security',
    tone: 'mid',
    bullets: [
      'HTTP methods communicate intent: GET reads, POST creates or triggers processing, PUT replaces, PATCH updates part of a resource, and DELETE removes.',
      'Indexes speed reads by maintaining searchable structures, but they cost disk space and slower writes. Index fields used in filters, joins, and ordering.',
      'Transactions protect consistency through atomicity, consistency, isolation, and durability. Use them when multiple writes must succeed or fail together.',
      'REST emphasizes resources and standard HTTP semantics. GraphQL lets clients request exact shapes but requires careful performance and authorization design.',
      'Validate input at boundaries, encode output for the target context, and enforce authorization on the server. Client-side checks are helpful UX, not security.',
      'Authentication proves identity; authorization decides what that identity can do. Keep these concerns separate in design and tests.',
    ],
  },
  {
    title: 'Algorithms, design, and concurrency',
    tone: 'mid',
    bullets: [
      'Choose data structures by access pattern: frequent lookup favors maps, ordered traversal favors trees or sorted arrays, and priority scheduling favors heaps.',
      'Binary search requires a sorted search space and a monotonic condition. It is often useful beyond arrays, such as finding capacity thresholds.',
      'Design patterns are names for tradeoffs, not rules. Use them when they simplify communication and remove duplication without hiding the flow.',
      'Concurrency introduces shared-state hazards. Prefer immutability, message passing, locks with small critical sections, and clear ownership.',
      'Async improves throughput for waiting work; parallelism improves throughput for CPU work. They solve different bottlenecks.',
      'APIs should be boring, predictable, versioned carefully, and explicit about errors, pagination, idempotency, and rate limits.',
    ],
  },
  {
    title: 'System design and architecture',
    tone: 'senior',
    bullets: [
      'Start designs with requirements, constraints, scale assumptions, and failure modes. Architecture is mostly explicit tradeoffs.',
      'Caching reduces latency and load but adds invalidation, staleness, and consistency concerns. Pick cache keys and expiration policies deliberately.',
      'Horizontal scaling adds instances; vertical scaling adds resources to one instance. Horizontal scaling usually requires stateless services or shared state externalization.',
      'Queues smooth spikes and decouple producers from consumers. They also add ordering, retry, deduplication, and dead-letter decisions.',
      'Observability combines logs, metrics, traces, and alerts so teams can ask new questions about production without shipping new code.',
      'Reliability work should be driven by user impact. Define SLOs, measure error budgets, and spend engineering effort where it protects important journeys.',
    ],
  },
  {
    title: 'Senior engineering habits',
    tone: 'senior',
    bullets: [
      'Senior engineers make tradeoffs visible. They document context, rejected alternatives, risks, and the signals that would cause a decision to change.',
      'Good technical leadership reduces ambiguity for others without removing ownership. Ask clarifying questions and turn vague goals into executable slices.',
      'Reviews should focus on correctness, maintainability, security, operability, and fit with existing patterns. Style-only feedback should be automated where possible.',
      'Incident response values fast mitigation, clear communication, and blameless learning. Postmortems should produce specific prevention or detection improvements.',
      'Mentoring is not giving answers immediately. It is creating the next useful question, model, or feedback loop so someone can grow.',
    ],
  },
];

export function LearningPage() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('all');

  const connectedNotes = useMemo(() => {
    const selectedRoles = activeRole === 'all' ? roles : roles.filter(role => role.id === activeRole);
    return selectedRoles.flatMap(role =>
      role.tests.map(test => ({
        role,
        test,
        topics: test.topics.map(topic => ({
          topic,
          questions: test.questions.filter(question => question.topic === topic),
        })).filter(group => group.questions.length > 0),
      })),
    );
  }, [activeRole]);

  return (
    <div className="learning-page">
      <header className="learning-hero">
        <button className="back-btn" onClick={() => navigate('/')}>← Library</button>
        <div>
          <p className="learning-kicker">Learning Section</p>
          <h1>Study smarter before the test</h1>
          <p>
            Use the warm, chunked cards below to preview core ideas, then switch to quiz mode for retrieval practice.
            The notes are connected to the app questions and expanded with practical engineering study guidance.
          </p>
        </div>
      </header>

      <section className="learning-principles" aria-label="Study methods">
        {learningPrinciples.map((principle, index) => (
          <article key={principle.title} className="principle-card">
            <span className="principle-number">{index + 1}</span>
            <h2>{principle.title}</h2>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>

      <section className="reference-section">
        <div className="section-heading">
          <p className="learning-kicker">Compressed guide</p>
          <h2>High-yield engineering notes</h2>
        </div>
        <div className="reference-grid">
          {referenceGuides.map(guide => (
            <article key={guide.title} className={`reference-card reference-${guide.tone}`}>
              <h3>{guide.title}</h3>
              <ul>
                {guide.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="connected-section">
        <div className="section-heading">
          <p className="learning-kicker">Question-connected library</p>
          <h2>Definitions, explanations, and examples from every test</h2>
        </div>
        <div className="learning-filters" role="tablist" aria-label="Filter learning notes by level">
          <button className={activeRole === 'all' ? 'active' : ''} onClick={() => setActiveRole('all')}>All</button>
          {roles.map(role => (
            <button
              key={role.id}
              className={activeRole === role.id ? 'active' : ''}
              onClick={() => setActiveRole(role.id)}
            >
              {role.title}
            </button>
          ))}
        </div>

        <div className="connected-notes">
          {connectedNotes.map(({ role, test, topics }) => (
            <article key={test.id} className="learning-test-card" style={{ '--role-color': role.color } as CSSProperties}>
              <div className="learning-test-header">
                <span>{role.title}</span>
                <h3>{test.title}</h3>
                <p>{test.description}</p>
              </div>
              {topics.map(group => (
                <details key={group.topic} className="topic-notes">
                  <summary>{group.topic}</summary>
                  <div className="topic-note-list">
                    {group.questions.map(question => (
                      <section key={question.id} className="question-note">
                        <h4>{question.prompt}</h4>
                        <p><strong>Definition:</strong> {question.definition}</p>
                        <p><strong>Why it matters:</strong> {question.explanation}</p>
                        {question.example && <p><strong>Example:</strong> {question.example}</p>}
                      </section>
                    ))}
                  </div>
                </details>
              ))}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
