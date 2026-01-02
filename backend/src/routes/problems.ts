import { Router } from 'express';
import {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem
} from '../controllers/problemController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/', authenticate, createProblem); // Admin only in production
router.put('/:id', authenticate, updateProblem); // Admin only in production
router.delete('/:id', authenticate, deleteProblem); // Admin only in production

export default router;