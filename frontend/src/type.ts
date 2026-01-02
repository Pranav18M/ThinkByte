// ===== Problem =====
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
}

// ===== Submit Result =====
export interface SubmissionResult {
  submissionId: string;
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Timeout';
  accuracy: number;
  passedCases: number;
  totalCases: number;
  error?: string;
}

// ===== Run Result (IMPORTANT FIX) =====
export interface RunResult {
  status: 'Accepted' | 'Runtime Error';
  output: string;
  input: any;
  expectedOutput: any;
  error?: string | null;
}
