import { useSpeech } from '../hooks/useSpeech';
import type { Question } from '../types/quiz';

const optionLabelPrefix = /^Option [A-D]:\s*/;

function createExplanationKey(questionId: string, explanation: string) {
  let hash = 0;
  for (let i = 0; i < explanation.length; i += 1) {
    hash = (hash * 31 + explanation.charCodeAt(i)) % Number.MAX_SAFE_INTEGER;
  }
  return `${questionId}-${hash.toString(36)}`;
}

interface Props {
  question: Question;
  selectedOptionId: string;
  speechEnabled: boolean;
}

export function ExplanationPanel({ question, selectedOptionId, speechEnabled }: Props) {
  const { speak } = useSpeech();
  const isCorrect = selectedOptionId === question.correctOptionId;
  const correctOption = question.options.find(o => o.id === question.correctOptionId);

  const handleReadExplanation = () => {
    speak(`${question.definition}. ${question.explanation}. ${question.example ?? ''}`);
  };

  return (
    <div className={`explanation-panel ${isCorrect ? 'explanation-correct' : 'explanation-wrong'}`}>
      <div className="explanation-header">
        <span className="explanation-result-icon">{isCorrect ? '🎉' : '📖'}</span>
        <strong>{isCorrect ? 'Correct!' : `Correct answer: ${correctOption?.text}`}</strong>
        {speechEnabled && (
          <button className="speech-button" onClick={handleReadExplanation} title="Read aloud" aria-label="Read aloud">
            🔊
          </button>
        )}
      </div>

      <div className="explanation-section">
        <h4>📌 Definition</h4>
        <p>{question.definition}</p>
      </div>

      <div className="explanation-section">
        <h4>💡 Explanation</h4>
        <p>{question.explanation}</p>
      </div>

      {question.whyOthersAreWrong && question.whyOthersAreWrong.length > 0 && (
        <div className="explanation-section">
          <h4>❌ Why other answers are wrong</h4>
          <ul>
            {question.whyOthersAreWrong.map(w => (
              <li key={createExplanationKey(question.id, w)}>{w.replace(optionLabelPrefix, '')}</li>
            ))}
          </ul>
        </div>
      )}

      {question.example && (
        <div className="explanation-section explanation-example">
          <h4>🔧 Real-world example</h4>
          <p>{question.example}</p>
        </div>
      )}
    </div>
  );
}
