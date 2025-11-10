import api from './api';

export const grammarService = {
  async getAllTopics() {
    const response = await api.get('/grammar/topics');
    return response.data;
  },

  async getTopicById(topicId: number) {
    const response = await api.get(`/grammar/topics/${topicId}`);
    return response.data;
  },

  async submitExercise(topicId: number, answers: any[], exerciseType: string) {
    const response = await api.post('/grammar/submit', {
      topicId,
      answers,
      exerciseType
    });
    return response.data;
  },

  async getUserProgress() {
    const response = await api.get('/grammar/progress');
    return response.data;
  }
};
