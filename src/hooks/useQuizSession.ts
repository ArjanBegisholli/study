import { useState } from 'react';
import type { Test, Question } from '../types/quiz';

export interface QuizSessionState {
  test: Test;
  currentIndex: number;
  answers: Record<string, string>;
  isAnswered: boolean;
  isComplete: boolean;
}

export function useQuizSession(test: Test) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion: Question = test.questions[currentIndex];

  function selectAnswer(optionId: string) {
    if (isAnswered) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    setIsAnswered(true);
  }

  function nextQuestion() {
    if (currentIndex < test.questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  }

  const score = Object.entries(answers).reduce((acc, [qId, aId]) => {
    const q = test.questions.find(q => q.id === qId);
    return q?.correctOptionId === aId ? acc + 1 : acc;
  }, 0);

  return {
    test,
    currentIndex,
    currentQuestion,
    answers,
    isAnswered,
    isComplete,
    score,
    totalQuestions: test.questions.length,
    selectAnswer,
    nextQuestion,
  };
}
