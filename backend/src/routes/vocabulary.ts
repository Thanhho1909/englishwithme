import express from 'express';
import {
  getVocabularyByCategory,
  getCategories,
  getDueCards,
  reviewCard,
  getVocabularyStats,
  getDifficultWords
} from '../controllers/vocabularyController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/category/:category', getVocabularyByCategory);
router.get('/due-cards', authenticate, getDueCards);
router.post('/review', authenticate, reviewCard);
router.get('/stats', authenticate, getVocabularyStats);
router.get('/difficult', authenticate, getDifficultWords);

export default router;
