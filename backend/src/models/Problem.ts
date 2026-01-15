import mongoose, { Document, Schema } from 'mongoose';

interface ITestCase {
  input: any;
  expectedOutput: any;
  isHidden: boolean;
}

interface IStarterCode {
  javascript: string;
  python: string;
}

interface IConstraints {
  timeLimit: number;
  memoryLimit: number;
}

interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  functionName: string;
  testCases: ITestCase[];
  starterCode: IStarterCode;
  constraints: IConstraints;
  examples: IExample[];
  hints: string[];
  acceptanceRate: number;
  totalSubmissions: number;
  totalAccepted: number;
  createdAt: Date;
}

const ProblemSchema = new Schema<IProblem>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  functionName: {
    type: String,
    required: true
  },
  testCases: [{
    input: { type: Schema.Types.Mixed, required: true },
    expectedOutput: { type: Schema.Types.Mixed, required: true },
    isHidden: { type: Boolean, default: false }
  }],
  starterCode: {
    javascript: { type: String, required: true },
    python: { type: String, required: true }
  },
  constraints: {
    timeLimit: { type: Number, default: 3000 },
    memoryLimit: { type: Number, default: 256 }
  },
  examples: [{
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String }
  }],
  hints: [{ type: String }],
  acceptanceRate: { type: Number, default: 0 },
  totalSubmissions: { type: Number, default: 0 },
  totalAccepted: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IProblem>('Problem', ProblemSchema);