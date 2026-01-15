export type JudgeStatus =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Runtime Error'
  | 'Timeout'
  | 'Compilation Error'
  | 'Memory Limit Exceeded';

export interface User {
  id: string;
  name: string;
  email: string;
  solvedProblems?: string[];
}

export interface TestCaseResult {
  testCaseNumber: number;
  input: any;
  expectedOutput: any;
  actualOutput: any;
  passed: boolean;
  executionTime: number;
  error?: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Constraints {
  timeLimit: number;
  memoryLimit: number;
}

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
  sampleTestCases?: Array<{
    input: any;
    expectedOutput: any;
  }>;
  totalTestCases?: number;
  hiddenTestCases?: number;
  constraints?: Constraints;
  examples?: Example[];
  hints?: string[];
  acceptanceRate?: number;
  totalSubmissions?: number;
  totalAccepted?: number;
}

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
  executionTime?: number;
  memoryUsed?: number;
  error?: string;
  createdAt: string;
}

export interface SubmissionResult {
  submissionId: string;
  status: JudgeStatus;
  accuracy: number;
  passedCases: number;
  totalCases: number;
  executionTime?: number;
  memoryUsed?: number;
  error?: string | null;
  failedTestCase?: TestCaseResult;
}

export interface RunResult {
  output: string;
  error?: string | null;
  testCaseResults?: TestCaseResult[];
  passedCases?: number;
  totalCases?: number;
}