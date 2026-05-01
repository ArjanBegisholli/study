import type { Test } from '../types/quiz';

interface Props {
  test: Test;
  answers: Record<string, string>;
  onRetry: () => void;
  onHome: () => void;
}

export function ScoreSummary({ test, answers, onRetry, onHome }: Props) {
  const correct = test.questions.filter(q => answers[q.id] === q.correctOptionId).length;
  const wrong = test.questions.length - correct;
  const pct = Math.round((correct / test.questions.length) * 100);

  const topicMap: Record<string, { correct: number; total: number }> = {};
  test.questions.forEach(q => {
    if (!topicMap[q.topic]) topicMap[q.topic] = { correct: 0, total: 0 };
    topicMap[q.topic].total++;
    if (answers[q.id] === q.correctOptionId) topicMap[q.topic].correct++;
  });

  const grade = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '📖' : '💪';
  const message = pct >= 90 ? 'Outstanding!' : pct >= 70 ? 'Great work!' : pct >= 50 ? 'Keep studying!' : 'Keep going!';

  return (
    <div className="score-summary">
      <div className="score-grade">{grade}</div>
      <h2 className="score-title">{message}</h2>
      <p className="score-test-name">{test.title}</p>

      <div className="score-stats">
        <div className="score-stat correct-stat">
          <span className="stat-number">{correct}</span>
          <span className="stat-label">Correct</span>
        </div>
        <div className="score-stat wrong-stat">
          <span className="stat-number">{wrong}</span>
          <span className="stat-label">Wrong</span>
        </div>
        <div className="score-stat pct-stat">
          <span className="stat-number">{pct}%</span>
          <span className="stat-label">Score</span>
        </div>
      </div>

      <div className="topic-breakdown">
        <h3>Topic Breakdown</h3>
        {Object.entries(topicMap).map(([topic, { correct: c, total: t }]) => (
          <div key={topic} className="topic-row">
            <span className="topic-name">{topic}</span>
            <div className="topic-bar-track">
              <div
                className="topic-bar-fill"
                style={{ width: `${Math.round((c / t) * 100)}%`, background: c / t >= 0.7 ? '#4CAF50' : c / t >= 0.5 ? '#FF9800' : '#f44336' }}
              />
            </div>
            <span className="topic-score">{c}/{t}</span>
          </div>
        ))}
      </div>

      <div className="score-actions">
        <button className="btn-primary" onClick={onRetry}>Retry Test</button>
        <button className="btn-secondary" onClick={onHome}>Back to Library</button>
      </div>
    </div>
  );
}
