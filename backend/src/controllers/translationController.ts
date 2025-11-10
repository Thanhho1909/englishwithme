import { Request, Response } from 'express';
import aiService from '../services/aiService';
import UserProgress from '../models/UserProgress';
import User from '../models/User';

export const translateAndGrade = async (req: Request, res: Response) => {
  try {
    const { vietnameseText, userTranslation } = req.body;
    const userId = (req as any).userId; // From auth middleware

    if (!vietnameseText || !userTranslation) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Gọi AI để chấm điểm
    const result = await aiService.translateAndGrade(vietnameseText, userTranslation);

    // Cập nhật tiến độ người dùng
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = new UserProgress({ userId });
    }

    // Cập nhật thống kê dịch thuật
    progress.translation.totalAttempts++;
    const currentTotal = progress.translation.averageScore * (progress.translation.totalAttempts - 1);
    progress.translation.averageScore = (currentTotal + result.score.total) / progress.translation.totalAttempts;

    // Lưu lỗi thường gặp
    result.feedback.errors.forEach(error => {
      const existingError = progress!.translation.commonErrors.find(
        e => e.errorType === error.text
      );

      if (existingError) {
        existingError.count++;
        if (existingError.examples.length < 5) {
          existingError.examples.push(userTranslation);
        }
      } else {
        progress!.translation.commonErrors.push({
          errorType: error.text,
          count: 1,
          examples: [userTranslation]
        });
      }
    });

    await progress.save();

    // Cập nhật XP và streak
    const user = await User.findById(userId);
    if (user) {
      // Thêm XP dựa trên điểm số
      const xpGained = Math.floor(result.score.total / 2);
      user.xp += xpGained;

      // Tính level mới (mỗi 1000 XP = 1 level)
      user.level = Math.floor(user.xp / 1000) + 1;

      // Cập nhật streak
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastActive = new Date(user.lastActiveDate);
      lastActive.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === 0) {
        // Cùng ngày, không thay đổi streak
      } else if (daysDiff === 1) {
        // Ngày tiếp theo, tăng streak
        user.streak++;
      } else {
        // Bỏ lỡ, reset streak
        user.streak = 1;
      }

      user.lastActiveDate = new Date();
      await user.save();

      return res.json({
        success: true,
        data: result,
        userStats: {
          xpGained,
          totalXP: user.xp,
          level: user.level,
          streak: user.streak
        }
      });
    }

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process translation'
    });
  }
};

export const getTranslationHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return res.json({
        success: true,
        data: {
          totalAttempts: 0,
          averageScore: 0,
          commonErrors: []
        }
      });
    }

    res.json({
      success: true,
      data: progress.translation
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get translation history'
    });
  }
};

export const getCommonErrors = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return res.json({
        success: true,
        data: []
      });
    }

    // Sắp xếp theo số lần sai giảm dần
    const sortedErrors = progress.translation.commonErrors
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 lỗi

    res.json({
      success: true,
      data: sortedErrors
    });

  } catch (error) {
    console.error('Get common errors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get common errors'
    });
  }
};
