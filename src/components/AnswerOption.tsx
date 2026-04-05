interface Props {
  id: string;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isAnswered: boolean;
  onSelect: (id: string) => void;
}

export function AnswerOption({ id, text, isSelected, isCorrect, isAnswered, onSelect }: Props) {
  let className = 'answer-option';
  if (isAnswered) {
    if (isCorrect) className += ' correct';
    else if (isSelected) className += ' wrong';
    else className += ' disabled';
  }
  if (!isAnswered) className += ' clickable';

  return (
    <button
      className={className}
      onClick={() => !isAnswered && onSelect(id)}
      disabled={isAnswered && !isSelected && !isCorrect}
    >
      <span className="answer-letter">{id.toUpperCase()}</span>
      <span className="answer-text">{text}</span>
      {isAnswered && isCorrect && <span className="answer-icon">✓</span>}
      {isAnswered && isSelected && !isCorrect && <span className="answer-icon">✗</span>}
    </button>
  );
}
