export type Role = 'foundation' | 'mid' | 'senior';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  topic: string;
  difficulty: Difficulty;
  prompt: string;
  options: AnswerOption[];
  correctOptionId: string;
  definition: string;
  explanation: string;
  whyOthersAreWrong?: string[];
  example?: string;
}

export interface Test {
  id: string;
  role: Role;
  title: string;
  description: string;
  topics: string[];
  estimatedMinutes: number;
  questions: Question[];
}

export interface RoleInfo {
  id: Role;
  title: string;
  description: string;
  color: string;
  tests: Test[];
}
