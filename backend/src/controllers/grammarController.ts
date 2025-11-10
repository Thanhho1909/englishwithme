import { Request, Response } from 'express';
import GrammarTopic from '../models/GrammarTopic';
import UserProgress from '../models/UserProgress';
import aiService from '../services/aiService';

export const getAllTopics = async (req: Request, res: Response) => {
  try {
    const topics = await GrammarTopic.find().sort({ order: 1 });

    res.json({
      success: true,
      data: topics
    });
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get grammar topics'
    });
  }
};

export const getTopicById = async (req: Request, res: Response) => {
  try {
    const { topicId } = req.params;
    const topic = await GrammarTopic.findOne({ topicId: parseInt(topicId) });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      data: topic
    });
  } catch (error) {
    console.error('Get topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get topic'
    });
  }
};

export const submitExercise = async (req: Request, res: Response) => {
  try {
    const { topicId, answers, exerciseType } = req.body;
    const userId = (req as any).userId;

    const topic = await GrammarTopic.findOne({ topicId: parseInt(topicId) });
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Chấm điểm dựa trên loại bài tập
    let score = 0;
    let totalQuestions = 0;
    let results: any[] = [];

    if (exerciseType === 'quiz') {
      totalQuestions = topic.exercises.quiz.length;
      topic.exercises.quiz.forEach((question, index) => {
        const isCorrect = answers[index] === question.correctAnswer;
        if (isCorrect) score++;

        results.push({
          questionIndex: index,
          correct: isCorrect,
          userAnswer: answers[index],
          correctAnswer: question.correctAnswer,
          explanation: question.explanation
        });
      });
    } else if (exerciseType === 'fillInBlanks') {
      totalQuestions = topic.exercises.fillInBlanks.length;
      topic.exercises.fillInBlanks.forEach((question, index) => {
        const isCorrect = answers[index]?.toLowerCase().trim() === question.answer.toLowerCase().trim();
        if (isCorrect) score++;

        results.push({
          questionIndex: index,
          correct: isCorrect,
          userAnswer: answers[index],
          correctAnswer: question.answer
        });
      });
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    // Cập nhật tiến độ
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = new UserProgress({ userId });
    }

    const topicProgress = progress.grammar.get(topicId.toString()) || {
      completed: false,
      score: 0,
      lastAttempt: new Date(),
      attempts: 0
    };

    topicProgress.score = Math.max(topicProgress.score, percentage);
    topicProgress.lastAttempt = new Date();
    topicProgress.attempts++;
    topicProgress.completed = percentage >= 70; // 70% để pass

    progress.grammar.set(topicId.toString(), topicProgress);
    await progress.save();

    res.json({
      success: true,
      data: {
        score,
        totalQuestions,
        percentage,
        passed: percentage >= 70,
        results
      }
    });

  } catch (error) {
    console.error('Submit exercise error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit exercise'
    });
  }
};

export const getUserProgress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return res.json({
        success: true,
        data: {}
      });
    }

    // Convert Map to Object for JSON response
    const grammarProgress: any = {};
    progress.grammar.forEach((value, key) => {
      grammarProgress[key] = value;
    });

    res.json({
      success: true,
      data: grammarProgress
    });

  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user progress'
    });
  }
};
