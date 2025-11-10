import { Request, Response } from 'express';
import VocabularyWord from '../models/VocabularyWord';
import UserProgress from '../models/UserProgress';
import spacedRepetitionService from '../services/spacedRepetitionService';

export const getVocabularyByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { limit = 50, skip = 0 } = req.query;

    const words = await VocabularyWord.find({ category })
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ difficulty: 1 });

    const total = await VocabularyWord.countDocuments({ category });

    res.json({
      success: true,
      data: {
        words,
        total,
        hasMore: Number(skip) + words.length < total
      }
    });
  } catch (error) {
    console.error('Get vocabulary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vocabulary'
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await VocabularyWord.distinct('category');

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get categories'
    });
  }
};

export const getDueCards = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
      progress = new UserProgress({ userId });
      await progress.save();
    }

    // Lấy danh sách từ cần ôn
    const dueCardIds = spacedRepetitionService.getDueCards(progress.vocabulary);

    // Lấy thông tin chi tiết của các từ
    const words = await VocabularyWord.find({
      _id: { $in: dueCardIds }
    });

    // Kết hợp với thông tin tiến độ
    const cardsWithProgress = words.map(word => {
      const wordProgress = progress!.vocabulary.get(word._id.toString());
      return {
        word,
        progress: wordProgress
      };
    });

    res.json({
      success: true,
      data: {
        cards: cardsWithProgress,
        total: cardsWithProgress.length
      }
    });

  } catch (error) {
    console.error('Get due cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get due cards'
    });
  }
};

export const reviewCard = async (req: Request, res: Response) => {
  try {
    const { wordId, quality } = req.body; // quality: 0-5
    const userId = (req as any).userId;

    if (quality < 0 || quality > 5) {
      return res.status(400).json({
        success: false,
        message: 'Quality must be between 0 and 5'
      });
    }

    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = new UserProgress({ userId });
    }

    // Lấy hoặc tạo mới progress cho từ này
    let wordProgress = progress.vocabulary.get(wordId) || {
      lastReviewed: new Date(),
      nextReview: new Date(),
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      correct: 0,
      incorrect: 0
    };

    // Cập nhật số lần đúng/sai
    if (quality >= 3) {
      wordProgress.correct++;
    } else {
      wordProgress.incorrect++;
    }

    // Tính toán lịch ôn tập tiếp theo
    const newSchedule = spacedRepetitionService.calculateNextReview(
      {
        easeFactor: wordProgress.easeFactor,
        interval: wordProgress.interval,
        repetitions: wordProgress.repetitions,
        nextReview: wordProgress.nextReview
      },
      quality
    );

    // Cập nhật progress
    wordProgress = {
      ...wordProgress,
      lastReviewed: new Date(),
      ...newSchedule
    };

    progress.vocabulary.set(wordId, wordProgress);
    await progress.save();

    res.json({
      success: true,
      data: {
        nextReview: newSchedule.nextReview,
        interval: newSchedule.interval,
        stats: {
          correct: wordProgress.correct,
          incorrect: wordProgress.incorrect
        }
      }
    });

  } catch (error) {
    console.error('Review card error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to review card'
    });
  }
};

export const getVocabularyStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return res.json({
        success: true,
        data: {
          total: 0,
          mastered: 0,
          learning: 0,
          difficult: 0,
          masteryRate: 0
        }
      });
    }

    const stats = spacedRepetitionService.getStudyStats(progress.vocabulary);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vocabulary stats'
    });
  }
};

export const getDifficultWords = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return res.json({
        success: true,
        data: []
      });
    }

    const difficultWordIds = spacedRepetitionService.getDifficultWords(progress.vocabulary);
    const words = await VocabularyWord.find({
      _id: { $in: difficultWordIds }
    });

    res.json({
      success: true,
      data: words
    });

  } catch (error) {
    console.error('Get difficult words error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get difficult words'
    });
  }
};
