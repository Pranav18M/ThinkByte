import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Submission from '../models/Submission';
import Problem from '../models/Problem';
import User from '../models/User';
import codeExecutor from '../services/codeExecutor';

const ALLOWED_LANGUAGES = ['javascript', 'python'];

// ==========================
// SUBMIT CODE (JUDGE MODE)
// ==========================
export const submitCode = async (req: AuthRequest, res: Response) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.userId;

    if (!problemId || !code || !language) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!ALLOWED_LANGUAGES.includes(language)) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    const problem = await Problem.findById(problemId).lean();
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const result = await codeExecutor.execute(
      code,
      language,
      problem.functionName,
      problem.testCases
    );

    const submission = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: result.status,
      accuracy: result.accuracy,
      passedCases: result.passedCases,
      totalCases: result.totalCases,
      error: result.error
    });

    if (result.status === 'Accepted') {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { solvedProblems: problemId }
      });
    }

    return res.json({
      submissionId: submission._id,
      status: result.status,
      accuracy: result.accuracy,
      passedCases: result.passedCases,
      totalCases: result.totalCases,
      error: result.error || null
    });
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ error: 'Code execution failed' });
  }
};

// ==========================
// RUN CODE (REAL-TIME MODE)
// ==========================
export const runCode = async (req: AuthRequest, res: Response) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!ALLOWED_LANGUAGES.includes(language)) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    // 🔥 REAL-TIME execution (NO test cases, NO expected output)
    const result = await codeExecutor.runRaw(code, language);

    return res.json({
      output: result.stdout || '',
      error: result.stderr || null
    });
  } catch (err) {
    console.error('Run error:', err);
    return res.status(500).json({ error: 'Run execution failed' });
  }
};

// ==========================
// GET USER SUBMISSIONS
// ==========================
export const getUserSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { problemId } = req.query;

    const query: any = { userId };
    if (problemId) query.problemId = problemId;

    const submissions = await Submission.find(query)
      .populate('problemId', 'title difficulty')
      .sort({ createdAt: -1 })
      .limit(50);

    return res.json(submissions);
  } catch (err) {
    console.error('Get submissions error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// ==========================
// GET SUBMISSION BY ID
// ==========================
export const getSubmissionById = async (req: AuthRequest, res: Response) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('problemId', 'title difficulty');

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    if (submission.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    return res.json(submission);
  } catch (err) {
    console.error('Get submission error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
