import { useSpeech } from '../hooks/useSpeech';
import { AnswerOption } from './AnswerOption';
import { ExplanationPanel } from './ExplanationPanel';
import { TopicBadge } from './TopicBadge';
import type { AnswerOption as AnswerOptionType, Question } from '../types/quiz';

interface Props {
  question: Question;
  selectedOptionId?: string;
  isAnswered: boolean;
  onSelect: (id: string) => void;
  onNext: () => void;
  isLast: boolean;
  speechEnabled: boolean;
}

function createQuestionSeed(questionId: string) {
  let hash = 0;
  for (let i = 0; i < questionId.length; i += 1) {
    hash = Math.imul(31, hash) + questionId.charCodeAt(i);
  }
  return hash >>> 0;
}

function seededRandom(seed: number) {
  const multiplier = 1664525;
  const increment = 1013904223;
  const modulus = 4294967296;
  let state = seed || 1;
  return () => {
    state = (Math.imul(multiplier, state) + increment) >>> 0;
    return state / modulus;
  };
}

function shuffledOptions(options: AnswerOptionType[], seedText: string) {
  const shuffled = [...options];
  const random = seededRandom(createQuestionSeed(seedText));
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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
  const displayOptions = shuffledOptions(question.options, question.id);

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
        {displayOptions.map((option, index) => (
          <AnswerOption
            key={option.id}
            id={option.id}
            displayLabel={String.fromCharCode(65 + index)}
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
