import { useSpeech } from '../hooks/useSpeech';
import { AnswerOption } from './AnswerOption';
import { ExplanationPanel } from './ExplanationPanel';
import { TopicBadge } from './TopicBadge';
import type { Question } from '../types/quiz';

interface Props {
  question: Question;
  selectedOptionId?: string;
  isAnswered: boolean;
  onSelect: (id: string) => void;
  onNext: () => void;
  isLast: boolean;
  speechEnabled: boolean;
}

export function QuestionCard({
  question,
  selectedOptionId,
  isAnswered,
  onSelect,
  onNext,
  isLast,
  speechEnabled,
}: Props) {
  const { speak } = useSpeech();

  const handleReadQuestion = () => {
    speak(question.prompt);
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <TopicBadge topic={question.topic} difficulty={question.difficulty} />
        {speechEnabled && (
          <button className="speech-button" onClick={handleReadQuestion} title="Read question aloud" aria-label="Read question aloud">
            🔊
          </button>
        )}
      </div>

      <p className="question-prompt">{question.prompt}</p>

      <div className="answer-list">
        {question.options.map(option => (
          <AnswerOption
            key={option.id}
            id={option.id}
            text={option.text}
            isSelected={selectedOptionId === option.id}
            isCorrect={option.id === question.correctOptionId}
            isAnswered={isAnswered}
            onSelect={onSelect}
          />
        ))}
      </div>

      {isAnswered && selectedOptionId && (
        <>
          <ExplanationPanel
            question={question}
            selectedOptionId={selectedOptionId}
            speechEnabled={speechEnabled}
          />
          <button className="next-button" onClick={onNext}>
            {isLast ? 'View Results →' : 'Next Question →'}
          </button>
        </>
      )}
    </div>
  );
}
