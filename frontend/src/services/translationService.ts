import api from './api';
import { TranslationResult } from '../types';

export const translationService = {
  async translateAndGrade(vietnameseText: string, userTranslation: string) {
    const response = await api.post('/translation/translate', {
      vietnameseText,
      userTranslation
    });
    return response.data;
  },

  async getHistory() {
    const response = await api.get('/translation/history');
    return response.data;
  },

  async getCommonErrors() {
    const response = await api.get('/translation/common-errors');
    return response.data;
  }
};
