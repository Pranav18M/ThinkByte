import { Router } from 'express';
import {
  submitCode,
  runCode,
  getUserSubmissions,
  getSubmissionById
} from '../controllers/submissionController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/run', authenticate, runCode);      // quick test
router.post('/submit', authenticate, submitCode); // final submit

router.get('/', authenticate, getUserSubmissions);
router.get('/:id', authenticate, getSubmissionById);

export default router;
