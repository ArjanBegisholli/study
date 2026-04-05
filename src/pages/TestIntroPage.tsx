import { useParams, useNavigate } from 'react-router-dom';
import { roles } from '../data/index';

export function TestIntroPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const test = roles.flatMap(r => r.tests).find(t => t.id === testId);

  if (!test) return <div className="error-page">Test not found. <button onClick={() => navigate('/')}>Home</button></div>;

  return (
    <div className="intro-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      <div className="intro-card">
        <h1 className="intro-title">{test.title}</h1>
        <p className="intro-description">{test.description}</p>
        <div className="intro-meta">
          <span>🗂 {test.questions.length} questions</span>
          <span>⏱ ~{test.estimatedMinutes} minutes</span>
        </div>
        <div className="intro-topics">
          <h3>Topics covered:</h3>
          <div className="topics-list">
            {test.topics.map(t => <span key={t} className="topic-chip">{t}</span>)}
          </div>
        </div>
        <button className="start-btn" onClick={() => navigate(`/quiz/${test.id}`)}>
          Start Test →
        </button>
      </div>
    </div>
  );
}
