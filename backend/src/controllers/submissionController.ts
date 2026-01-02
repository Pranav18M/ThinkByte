import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Submission from '../models/Submission';
import Problem from '../models/Problem';
import User from '../models/User';
import codeExecutor from '../services/codeExecutor';

const ALLOWED_LANGUAGES = ['javascript', 'python'];

// sanitize test cases to only include input & expectedOutput
const sanitizeTestCases = (testCases: any[]) => {
  return testCases.map(tc => ({
    input: tc.input,
    expectedOutput: tc.expectedOutput
  }));
};

// ==================== Submit Code (Judge Mode) ====================
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
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    // Judge mode: execute all test cases
    const result = await codeExecutor.execute(
      code,
      language,
      problem.functionName,
      sanitizeTestCases(problem.testCases)
    );

    // Save submission
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

    // Add to solvedProblems if fully correct
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
      error: result.error
    });
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ error: 'Code execution failed' });
  }
};

// ==================== Run Code (Playground Mode) ====================
// ==================== Run Code (Playground Mode) ====================
export const runCode = async (req: AuthRequest, res: Response) => {
  try {
    const { problemId, code, language } = req.body;

    if (!problemId || !code || !language)
      return res.status(400).json({ error: 'Missing required fields' });

    if (!ALLOWED_LANGUAGES.includes(language))
      return res.status(400).json({ error: 'Unsupported language' });

    const problem = await Problem.findById(problemId).lean();
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const [testCase] = sanitizeTestCases(problem.testCases);

    // Run single test
    const execResult = await codeExecutor.runSingleTest(
      code,
      language,
      problem.functionName,
      testCase.input
    );

    // UX fix: always show Accepted unless runtime error occurs
    const status = execResult.error ? 'Runtime Error' : 'Accepted';

    return res.json({
      status,                // Force Accepted for Run mode
      output: execResult.output,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      error: execResult.error || null
    });
  } catch (err) {
    console.error('Run error:', err);
    return res.status(500).json({ error: 'Code execution failed' });
  }
};


// ==================== Get User Submissions ====================
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

// ==================== Get Submission By ID ====================
export const getSubmissionById = async (req: AuthRequest, res: Response) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('problemId', 'title difficulty');

    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    if (submission.userId.toString() !== req.userId)
      return res.status(403).json({ error: 'Access denied' });

    return res.json(submission);
  } catch (err) {
    console.error('Get submission error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
