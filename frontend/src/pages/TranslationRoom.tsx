import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, RefreshCw, BookOpen } from 'lucide-react';
import { translationService } from '../services/translationService';
import { TranslationResult } from '../types';
import toast from 'react-hot-toast';

const SAMPLE_PROMPTS = [
  'Hôm nay tôi đã đi chợ mua rau củ và trái cây. Thời tiết rất đẹp nên tôi quyết định đi bộ.',
  'Tôi thích học tiếng Anh vì nó giúp tôi giao tiếp với nhiều người từ khắp nơi trên thế giới.',
  'Gia đình tôi thường tụ tập vào cuối tuần để cùng nhau nấu ăn và xem phim.',
  'Tôi đang làm việc tại một công ty công nghệ. Công việc rất thú vị nhưng đôi khi cũng áp lực.',
  'Sở thích của tôi là đọc sách và nghe nhạc. Tôi thường dành 1-2 giờ mỗi ngày cho những hoạt động này.'
];

export const TranslationRoom: React.FC = () => {
  const [vietnameseText, setVietnameseText] = useState('');
  const [userTranslation, setUserTranslation] = useState('');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_PROMPTS.length);
    setVietnameseText(SAMPLE_PROMPTS[randomIndex]);
    setUserTranslation('');
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!vietnameseText.trim() || !userTranslation.trim()) {
      toast.error('Vui lòng điền đầy đủ cả đoạn văn và bản dịch');
      return;
    }

    setIsLoading(true);
    try {
      const response = await translationService.translateAndGrade(
        vietnameseText,
        userTranslation
      );

      if (response.success) {
        setResult(response.data);
        toast.success(`Điểm của bạn: ${response.data.score.total}/100`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Phòng Luyện Dịch Thuật
        </h1>
        <p className="text-gray-600">
          Dịch đoạn văn tiếng Việt sang tiếng Anh và nhận phản hồi chi tiết từ AI
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Vietnamese Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Đoạn văn tiếng Việt
            </h2>
            <button
              onClick={handleRandomPrompt}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
            >
              <RefreshCw className="w-4 h-4" />
              Câu mẫu
            </button>
          </div>
          <textarea
            value={vietnameseText}
            onChange={(e) => setVietnameseText(e.target.value)}
            placeholder="Nhập đoạn văn tiếng Việt (2-5 câu)..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </motion.div>

        {/* English Translation Input */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bản dịch của bạn
          </h2>
          <textarea
            value={userTranslation}
            onChange={(e) => setUserTranslation(e.target.value)}
            placeholder="Nhập bản dịch tiếng Anh của bạn..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </motion.div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Đang chấm điểm...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Gửi để chấm điểm
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Score Card */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Kết quả đánh giá</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-sm opacity-90">Ngữ pháp</div>
                <div className="text-3xl font-bold">{result.score.grammar}/40</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-sm opacity-90">Từ vựng</div>
                <div className="text-3xl font-bold">{result.score.vocabulary}/30</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-sm opacity-90">Tự nhiên</div>
                <div className="text-3xl font-bold">{result.score.naturalness}/30</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-sm opacity-90">Tổng điểm</div>
                <div className="text-3xl font-bold">{result.score.total}/100</div>
              </div>
            </div>
          </div>

          {/* Comparisons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Bản dịch chuẩn
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {result.standardTranslation}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Bản dịch gợi ý (AI)
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {result.aiTranslation}
              </p>
            </div>
          </div>

          {/* Errors */}
          {result.feedback.errors.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Phản hồi chi tiết
              </h3>
              <div className="space-y-4">
                {result.feedback.errors.map((error, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      error.type === 'critical'
                        ? 'bg-red-50 border-red-500'
                        : 'bg-yellow-50 border-yellow-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        error.type === 'critical'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {error.type === 'critical' ? 'LỖI' : 'CẢI THIỆN'}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-1">{error.text}</p>
                        <p className="text-sm text-gray-600 mb-2">{error.explanation}</p>
                        {error.suggestions.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium">Gợi ý:</span>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                              {error.suggestions.map((suggestion, idx) => (
                                <li key={idx} className="text-gray-700">{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Improvements */}
          {result.feedback.improvements.length > 0 && (
            <div className="bg-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Lời khuyên chung
              </h3>
              <ul className="space-y-2">
                {result.feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
