import mongoose, { Document, Schema } from 'mongoose';

export interface ITestCaseResult {
  testCaseNumber: number;
  input: any;
  expectedOutput: any;
  actualOutput: any;
  passed: boolean;
  executionTime: number;
  error?: string;
}

export interface ISubmission extends Document {
  userId: mongoose.Types.ObjectId;
  problemId: mongoose.Types.ObjectId;
  code: string;
  language: 'javascript' | 'python';
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Timeout' | 'Compilation Error' | 'Memory Limit Exceeded';
  accuracy: number;
  passedCases: number;
  totalCases: number;
  executionTime?: number;
  memoryUsed?: number;
  error?: string;
  testCaseResults: ITestCaseResult[];
  failedTestCase?: ITestCaseResult;
  createdAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['javascript', 'python'],
    required: true
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Timeout', 'Compilation Error', 'Memory Limit Exceeded'],
    required: true
  },
  accuracy: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  passedCases: {
    type: Number,
    required: true,
    min: 0
  },
  totalCases: {
    type: Number,
    required: true,
    min: 0
  },
  executionTime: {
    type: Number
  },
  memoryUsed: {
    type: Number
  },
  error: {
    type: String
  },
  testCaseResults: [{
    testCaseNumber: { type: Number, required: true },
    input: { type: Schema.Types.Mixed },
    expectedOutput: { type: Schema.Types.Mixed },
    actualOutput: { type: Schema.Types.Mixed },
    passed: { type: Boolean, required: true },
    executionTime: { type: Number },
    error: { type: String }
  }],
  failedTestCase: {
    testCaseNumber: { type: Number },
    input: { type: Schema.Types.Mixed },
    expectedOutput: { type: Schema.Types.Mixed },
    actualOutput: { type: Schema.Types.Mixed },
    passed: { type: Boolean },
    executionTime: { type: Number },
    error: { type: String }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ISubmission>('Submission', SubmissionSchema);