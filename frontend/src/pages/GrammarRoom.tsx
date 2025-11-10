import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';
import { grammarService } from '../services/grammarService';
import { GrammarTopic } from '../types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const GrammarRoom: React.FC = () => {
  const [topics, setTopics] = useState<GrammarTopic[]>([]);
  const [progress, setProgress] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [topicsRes, progressRes] = await Promise.all([
        grammarService.getAllTopics(),
        grammarService.getUserProgress()
      ]);

      if (topicsRes.success) {
        setTopics(topicsRes.data);
      }
      if (progressRes.success) {
        setProgress(progressRes.data);
      }
    } catch (error) {
      toast.error('Không thể tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 2) return 'Dễ';
    if (difficulty <= 3) return 'Trung bình';
    return 'Khó';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Phòng Tập Ngữ Pháp
        </h1>
        <p className="text-gray-600">
          12 chủ đề ngữ pháp cơ bản từ dễ đến khó
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => {
          const topicProgress = progress[topic.topicId];
          const isCompleted = topicProgress?.completed || false;
          const score = topicProgress?.score || 0;

          return (
            <motion.div
              key={topic._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/grammar/${topic.topicId}`)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-bold">{topic.order}</span>
                  </div>
                  {isCompleted && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(topic.difficulty)}`}>
                  {getDifficultyText(topic.difficulty)}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {topic.titleVi}
              </p>

              {isCompleted && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>Điểm cao nhất:</span>
                  </div>
                  <span className={`font-bold ${
                    score >= 80 ? 'text-green-600' :
                    score >= 60 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {score}%
                  </span>
                </div>
              )}

              {!isCompleted && (
                <div className="flex items-center gap-2 text-sm text-primary-600 pt-3 border-t border-gray-200">
                  <BookOpen className="w-4 h-4" />
                  <span>Bắt đầu học</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
