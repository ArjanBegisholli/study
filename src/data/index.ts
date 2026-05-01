import type { RoleInfo } from '../types/quiz';

import { foundationFundamentals } from './foundation/fundamentals';
import { foundationCodeQuality } from './foundation/code-quality';
import { foundationDebuggingTestingGit } from './foundation/debugging-testing-git';
import { foundationWebDatabase } from './foundation/web-database';

import { midAlgorithms } from './mid/algorithms';
import { midDesign } from './mid/design';
import { midDbApiSecurity } from './mid/db-api-security';
import { midConcurrency } from './mid/concurrency';

import { seniorSystemDesign } from './senior/system-design';
import { seniorArchitecture } from './senior/architecture';
import { seniorProduction } from './senior/production';
import { seniorLeadership } from './senior/leadership';

export const roles: RoleInfo[] = [
  {
    id: 'foundation',
    title: 'Foundation',
    description: 'Core programming concepts, clean code, debugging, testing, and web fundamentals.',
    color: '#4ade80',
    tests: [
      foundationFundamentals,
      foundationCodeQuality,
      foundationDebuggingTestingGit,
      foundationWebDatabase,
    ],
  },
  {
    id: 'mid',
    title: 'Mid-Level',
    description: 'Algorithms, software design, databases, APIs, security, and concurrency.',
    color: '#60a5fa',
    tests: [
      midAlgorithms,
      midDesign,
      midDbApiSecurity,
      midConcurrency,
    ],
  },
  {
    id: 'senior',
    title: 'Senior',
    description: 'System design, architecture tradeoffs, production operations, and engineering leadership.',
    color: '#f472b6',
    tests: [
      seniorSystemDesign,
      seniorArchitecture,
      seniorProduction,
      seniorLeadership,
    ],
  },
];
