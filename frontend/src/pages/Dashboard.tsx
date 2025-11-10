import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Languages, BookMarked, Trophy, Flame, Star } from 'lucide-react';
import { useAuthStore } from '../context/authStore';
import { grammarService } from '../services/grammarService';
import { vocabularyService } from '../services/vocabularyService';
import { translationService } from '../services/translationService';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    grammar: { completed: 0, total: 12 },
    vocabulary: { total: 0, mastered: 0 },
    translation: { totalAttempts: 0, averageScore: 0 }
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [grammarProgress, vocabStats, translationHistory] = await Promise.all([
        grammarService.getUserProgress(),
        vocabularyService.getStats(),
        translationService.getHistory()
      ]);

      const completedTopics = Object.values(grammarProgress.data || {}).filter(
        (t: any) => t.completed
      ).length;

      setStats({
        grammar: { completed: completedTopics, total: 12 },
        vocabulary: vocabStats.data || { total: 0, mastered: 0 },
        translation: translationHistory.data || { totalAttempts: 0, averageScore: 0 }
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const features = [
    {
      title: 'Phòng Luyện Dịch',
      description: 'Dịch văn bản và nhận phản hồi AI',
      icon: Languages,
      color: 'from-blue-500 to-blue-600',
      path: '/translation',
      stat: `${stats.translation.totalAttempts} lần dịch`
    },
    {
      title: 'Phòng Ngữ Pháp',
      description: '12 chủ đề từ cơ bản đến nâng cao',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      path: '/grammar',
      stat: `${stats.grammar.completed}/${stats.grammar.total} hoàn thành`
    },
    {
      title: 'Kho Từ Vựng',
      description: 'Học từ với Spaced Repetition',
      icon: BookMarked,
      color: 'from-purple-500 to-purple-600',
      path: '/vocabulary',
      stat: `${stats.vocabulary.mastered} từ đã thuộc`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-xl p-8 text-white mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Xin chào, {user?.username}!
            </h1>
            <p className="text-lg opacity-90">
              Chào mừng bạn đến với Meu English
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl">👋</div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5" />
              <span className="text-sm opacity-90">Level</span>
            </div>
            <div className="text-2xl font-bold">{user?.level}</div>
          </div>

          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5" />
              <span className="text-sm opacity-90">XP</span>
            </div>
            <div className="text-2xl font-bold">{user?.xp}</div>
          </div>

          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5" />
              <span className="text-sm opacity-90">Streak</span>
            </div>
            <div className="text-2xl font-bold">{user?.streak} ngày</div>
          </div>

          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5" />
              <span className="text-sm opacity-90">Huy hiệu</span>
            </div>
            <div className="text-2xl font-bold">{user?.badges?.length || 0}</div>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Bắt đầu học ngay
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(feature.path)}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-r ${feature.color} p-6 text-white`}>
                <feature.icon className="w-12 h-12 mb-3" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.description}</p>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tiến độ</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {feature.stat}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          💡 Bí quyết học hiệu quả
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Học 15-20 phút mỗi ngày thay vì học dồn 2-3 giờ mỗi tuần</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Ôn tập đúng lúc sắp quên để ghi nhớ lâu dài</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Học từ vựng trong câu có ý nghĩa, không học từ đơn lẻ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Tập trung vào điểm yếu thay vì cứ lặp lại những gì đã biết</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};
