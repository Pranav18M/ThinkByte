import mongoose, { Document, Schema } from 'mongoose';

interface ITestCase {
  input: any;
  expectedOutput: any;
}

interface IStarterCode {
  javascript: string;
  python: string;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  functionName: string;
  testCases: ITestCase[];
  starterCode: IStarterCode;
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
    expectedOutput: { type: Schema.Types.Mixed, required: true }
  }],
  starterCode: {
    javascript: { type: String, required: true },
    python: { type: String, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IProblem>('Problem', ProblemSchema);