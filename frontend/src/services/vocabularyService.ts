import api from './api';

export const vocabularyService = {
  async getCategories() {
    const response = await api.get('/vocabulary/categories');
    return response.data;
  },

  async getWordsByCategory(category: string, limit = 50, skip = 0) {
    const response = await api.get(`/vocabulary/category/${category}`, {
      params: { limit, skip }
    });
    return response.data;
  },

  async getDueCards() {
    const response = await api.get('/vocabulary/due-cards');
    return response.data;
  },

  async reviewCard(wordId: string, quality: number) {
    const response = await api.post('/vocabulary/review', {
      wordId,
      quality
    });
    return response.data;
  },

  async getStats() {
    const response = await api.get('/vocabulary/stats');
    return response.data;
  },

  async getDifficultWords() {
    const response = await api.get('/vocabulary/difficult');
    return response.data;
  }
};
