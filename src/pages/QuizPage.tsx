import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roles } from '../data/index';
import { useQuizSession } from '../hooks/useQuizSession';
import { QuestionCard } from '../components/QuestionCard';
import { ScoreSummary } from '../components/ScoreSummary';
import { ProgressBar } from '../components/ProgressBar';
import type { Test } from '../types/quiz';

export function QuizPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [key, setKey] = useState(0);

  const test = roles.flatMap(r => r.tests).find(t => t.id === testId);

  if (!test) return <div className="error-page">Test not found. <button onClick={() => navigate('/')}>Home</button></div>;

  return (
    <QuizInner
      key={key}
      test={test}
      speechEnabled={speechEnabled}
      setSpeechEnabled={setSpeechEnabled}
      onRetry={() => setKey(k => k + 1)}
    />
  );
}

interface QuizInnerProps {
  test: Test;
  speechEnabled: boolean;
  setSpeechEnabled: (v: boolean) => void;
  onRetry: () => void;
}

function QuizInner({ test, speechEnabled, setSpeechEnabled, onRetry }: QuizInnerProps) {
  const navigate = useNavigate();
  const session = useQuizSession(test);

  if (session.isComplete) {
    return (
      <div className="quiz-page">
        <ScoreSummary
          test={test}
          answers={session.answers}
          onRetry={onRetry}
          onHome={() => navigate('/')}
        />
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-toolbar">
        <button className="back-btn" onClick={() => navigate('/')}>← Library</button>
        <span className="quiz-title">{test.title}</span>
        <label className="speech-toggle">
          <input
            type="checkbox"
            checked={speechEnabled}
            onChange={e => setSpeechEnabled(e.target.checked)}
          />
          🔊 Read aloud
        </label>
      </div>

      <ProgressBar current={session.currentIndex + (session.isAnswered ? 1 : 0)} total={session.totalQuestions} />

      <QuestionCard
        question={session.currentQuestion}
        selectedOptionId={session.answers[session.currentQuestion.id]}
        isAnswered={session.isAnswered}
        onSelect={session.selectAnswer}
        onNext={session.nextQuestion}
        isLast={session.currentIndex === session.totalQuestions - 1}
        speechEnabled={speechEnabled}
      />
    </div>
  );
}
