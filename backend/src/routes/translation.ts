import express from 'express';
import {
  translateAndGrade,
  getTranslationHistory,
  getCommonErrors
} from '../controllers/translationController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/translate', authenticate, translateAndGrade);
router.get('/history', authenticate, getTranslationHistory);
router.get('/common-errors', authenticate, getCommonErrors);

export default router;
