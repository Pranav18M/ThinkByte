// ==================== Shared Status ====================
export type JudgeStatus =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Runtime Error'
  | 'Timeout';

// ==================== User ====================
export interface User {
  id: string;
  name: string;
  email: string;
  solvedProblems?: string[];
}

// ==================== Problem ====================
export interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  functionName: string;
  starterCode: {
    javascript: string;
    python: string;
  };
  testCasesCount?: number;
}

// ==================== Submission (History List) ====================
export interface Submission {
  _id: string;
  problemId: {
    _id: string;
    title: string;
    difficulty: string;
  };
  code: string;
  language: 'javascript' | 'python';
  status: JudgeStatus;
  accuracy: number;
  passedCases: number;
  totalCases: number;
  error?: string;
  createdAt: string;
}

// ==================== Submit API Result ====================
export interface SubmissionResult {
  submissionId: string;
  status: JudgeStatus;
  accuracy: number;
  passedCases: number;
  totalCases: number;
  error?: string;
}

// ==================== Run API Result (Playground Mode) ====================
export interface RunResult {
  status: 'Accepted' | 'Runtime Error';
  output: string;
  input: any;
  expectedOutput: any;
  error?: string | null;
}
