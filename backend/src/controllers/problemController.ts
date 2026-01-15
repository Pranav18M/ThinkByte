import { Request, Response } from 'express';
import Problem from '../models/Problem';

export const getAllProblems = async (req: Request, res: Response) => {
  try {
    const { difficulty, tag } = req.query;
    
    let query: any = {};
    if (difficulty) query.difficulty = difficulty;
    if (tag) query.tags = tag;

    const problems = await Problem.find(query)
      .select('-testCases')
      .sort({ createdAt: -1 });

    const enrichedProblems = problems.map(problem => ({
      ...problem.toObject(),
      acceptanceRate: problem.totalSubmissions > 0 
        ? Math.round((problem.totalAccepted / problem.totalSubmissions) * 100) 
        : 0
    }));

    res.json(enrichedProblems);
  } catch (error) {
    console.error('Get problems error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProblemById = async (req: Request, res: Response) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const { testCases, ...problemData } = problem.toObject();
    
    const sampleTestCases = testCases.filter(tc => !tc.isHidden).slice(0, 3);
    
    const response = {
      ...problemData,
      sampleTestCases,
      totalTestCases: testCases.length,
      hiddenTestCases: testCases.filter(tc => tc.isHidden).length,
      acceptanceRate: problem.totalSubmissions > 0 
        ? Math.round((problem.totalAccepted / problem.totalSubmissions) * 100) 
        : 0
    };

    res.json(response);
  } catch (error) {
    console.error('Get problem error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createProblem = async (req: Request, res: Response) => {
  try {
    const { 
      title, 
      description, 
      difficulty, 
      tags, 
      testCases, 
      starterCode,
      functionName,
      constraints,
      examples,
      hints
    } = req.body;

    if (!title || !description || !difficulty || !tags || !testCases || !starterCode || !functionName) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const problem = new Problem({
      title,
      description,
      difficulty,
      tags,
      functionName,
      testCases,
      starterCode,
      constraints: constraints || { timeLimit: 3000, memoryLimit: 256 },
      examples: examples || [],
      hints: hints || [],
      acceptanceRate: 0,
      totalSubmissions: 0,
      totalAccepted: 0
    });

    await problem.save();
    res.status(201).json(problem);
  } catch (error) {
    console.error('Create problem error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProblem = async (req: Request, res: Response) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json(problem);
  } catch (error) {
    console.error('Update problem error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProblem = async (req: Request, res: Response) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json({ message: 'Problem deleted successfully' });
  } catch (error) {
    console.error('Delete problem error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};