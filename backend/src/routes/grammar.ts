import express from 'express';
import {
  getAllTopics,
  getTopicById,
  submitExercise,
  getUserProgress
} from '../controllers/grammarController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/topics', getAllTopics);
router.get('/topics/:topicId', getTopicById);
router.post('/submit', authenticate, submitExercise);
router.get('/progress', authenticate, getUserProgress);

export default router;
