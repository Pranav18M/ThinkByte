import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
  userId: mongoose.Types.ObjectId;
  problemId: mongoose.Types.ObjectId;
  code: string;
  language: 'javascript' | 'python';
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Timeout';
  accuracy: number;
  passedCases: number;
  totalCases: number;
  executionTime?: number;
  error?: string;
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
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Timeout'],
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
  error: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ISubmission>('Submission', SubmissionSchema);