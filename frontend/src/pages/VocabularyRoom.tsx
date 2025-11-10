import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Brain, TrendingUp, AlertCircle } from 'lucide-react';
import { vocabularyService } from '../services/vocabularyService';
import { VocabularyWord, VocabularyStats } from '../types';
import toast from 'react-hot-toast';

export const VocabularyRoom: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [stats, setStats] = useState<VocabularyStats | null>(null);
  const [dueCards, setDueCards] = useState<any[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState<'review' | 'browse'>('review');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesRes, statsRes, dueRes] = await Promise.all([
        vocabularyService.getCategories(),
        vocabularyService.getStats(),
        vocabularyService.getDueCards()
      ]);

      if (categoriesRes.success) {
        setCategories(categoriesRes.data);
      }
      if (statsRes.success) {
        setStats(statsRes.data);
      }
      if (dueRes.success) {
        setDueCards(dueRes.data.cards);
      }
    } catch (error) {
      toast.error('Không thể tải dữ liệu');
    }
  };

  const handleReview = async (quality: number) => {
    if (currentCardIndex >= dueCards.length) return;

    const currentCard = dueCards[currentCardIndex];
    try {
      await vocabularyService.reviewCard(currentCard.word._id, quality);

      if (currentCardIndex < dueCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setShowAnswer(false);
      } else {
        toast.success('Đã hoàn thành ôn tập hôm nay!');
        loadData();
        setCurrentCardIndex(0);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra');
    }
  };

  const currentCard = dueCards[currentCardIndex]?.word;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Kho Từ Vựng Thông Minh
        </h1>
        <p className="text-gray-600">
          Học từ vựng với thuật toán Spaced Repetition
        </p>
      </motion.div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <BookMarked className="w-6 h-6" />
              <div className="text-sm opacity-90">Tổng từ</div>
            </div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-6 h-6" />
              <div className="text-sm opacity-90">Đã thuộc</div>
            </div>
            <div className="text-3xl font-bold">{stats.mastered}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6" />
              <div className="text-sm opacity-90">Đang học</div>
            </div>
            <div className="text-3xl font-bold">{stats.learning}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-6 h-6" />
              <div className="text-sm opacity-90">Khó</div>
            </div>
            <div className="text-3xl font-bold">{stats.difficult}</div>
          </motion.div>
        </div>
      )}

      {/* Mode Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('review')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            mode === 'review'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Ôn tập ({dueCards.length})
        </button>
        <button
          onClick={() => setMode('browse')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            mode === 'browse'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Duyệt từ
        </button>
      </div>

      {/* Review Mode */}
      {mode === 'review' && dueCards.length > 0 && currentCard && (
        <motion.div
          key={currentCardIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <div className="mb-6 text-center">
            <div className="text-sm text-gray-500 mb-2">
              Thẻ {currentCardIndex + 1} / {dueCards.length}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-primary-600 rounded-full transition-all"
                style={{ width: `${((currentCardIndex + 1) / dueCards.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-gray-800 mb-4">
              {currentCard.word}
            </div>
            <div className="text-xl text-gray-500 mb-2">
              {currentCard.pronunciation}
            </div>
          </div>

          {!showAnswer ? (
            <div className="text-center">
              <button
                onClick={() => setShowAnswer(true)}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Hiện đáp án
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Nghĩa:</h3>
                {currentCard.meanings.map((meaning: any, index: number) => (
                  <div key={index} className="mb-2">
                    <span className="text-sm text-gray-500 italic">
                      ({meaning.partOfSpeech})
                    </span>{' '}
                    <span className="text-gray-700">{meaning.vietnameseMeaning}</span>
                  </div>
                ))}
              </div>

              {currentCard.examples.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Ví dụ:</h3>
                  <ul className="space-y-2">
                    {currentCard.examples.map((example: string, index: number) => (
                      <li key={index} className="text-gray-700 italic">
                        "{example}"
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-center">
                  Bạn nhớ từ này như thế nào?
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleReview(1)}
                    className="px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Quên
                  </button>
                  <button
                    onClick={() => handleReview(3)}
                    className="px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                  >
                    Khó
                  </button>
                  <button
                    onClick={() => handleReview(5)}
                    className="px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Dễ
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {mode === 'review' && dueCards.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tuyệt vời!
          </h2>
          <p className="text-gray-600">
            Bạn đã hoàn thành tất cả từ cần ôn hôm nay
          </p>
        </div>
      )}

      {/* Browse Mode */}
      {mode === 'browse' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Chọn chủ đề
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
