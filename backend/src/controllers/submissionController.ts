import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Submission from '../models/Submission';
import Problem from '../models/Problem';
import User from '../models/User';
import codeExecutor from '../services/codeExecutor';

const ALLOWED_LANGUAGES = ['javascript', 'python'];

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

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const result = await codeExecutor.execute(
      code,
      language,
      problem.functionName,
      problem.testCases,
      problem.constraints
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
      executionTime: result.executionTime,
      memoryUsed: result.memoryUsed,
      error: result.error,
      testCaseResults: result.testCaseResults,
      failedTestCase: result.failedTestCase
    });

    problem.totalSubmissions += 1;
    if (result.status === 'Accepted') {
      problem.totalAccepted += 1;
      await User.findByIdAndUpdate(userId, {
        $addToSet: { solvedProblems: problemId }
      });
    }
    problem.acceptanceRate = problem.totalSubmissions > 0 
      ? (problem.totalAccepted / problem.totalSubmissions) * 100 
      : 0;
    await problem.save();

    return res.json({
      submissionId: submission._id,
      status: result.status,
      accuracy: result.accuracy,
      passedCases: result.passedCases,
      totalCases: result.totalCases,
      executionTime: result.executionTime,
      memoryUsed: result.memoryUsed,
      error: result.error || null,
      failedTestCase: result.failedTestCase || null
    });
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ error: 'Code execution failed' });
  }
};

export const runCode = async (req: AuthRequest, res: Response) => {
  try {
    const { problemId, code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!ALLOWED_LANGUAGES.includes(language)) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    if (problemId) {
      const problem = await Problem.findById(problemId);
      if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
      }

      const sampleTestCases = problem.testCases.filter(tc => !tc.isHidden).slice(0, 3);
      
      const result = await codeExecutor.execute(
        code,
        language,
        problem.functionName,
        sampleTestCases,
        problem.constraints
      );

      return res.json({
        output: result.testCaseResults.length > 0 ? JSON.stringify(result.testCaseResults[0].actualOutput) : '',
        error: result.error || null,
        testCaseResults: result.testCaseResults,
        passedCases: result.passedCases,
        totalCases: result.totalCases
      });
    } else {
      const result = await codeExecutor.runRaw(code, language);
      return res.json({
        output: result.stdout || '',
        error: result.stderr || null
      });
    }
  } catch (err) {
    console.error('Run error:', err);
    return res.status(500).json({ error: 'Run execution failed' });
  }
};

export const getUserSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { problemId } = req.query;

    const query: any = { userId };
    if (problemId) query.problemId = problemId;

    const submissions = await Submission.find(query)
      .populate('problemId', 'title difficulty')
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-testCaseResults');

    return res.json(submissions);
  } catch (err) {
    console.error('Get submissions error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

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