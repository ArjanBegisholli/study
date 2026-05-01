import type { Difficulty } from '../types/quiz';

interface Props {
  topic: string;
  difficulty?: Difficulty;
}

export function TopicBadge({ topic, difficulty }: Props) {
  return (
    <div className="topic-badge-row">
      <span className="topic-badge">{topic}</span>
      {difficulty && <span className={`difficulty-badge difficulty-${difficulty}`}>{difficulty}</span>}
    </div>
  );
}
