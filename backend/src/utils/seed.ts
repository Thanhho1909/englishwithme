import dotenv from 'dotenv';
import connectDB from './database';
import { seedGrammar } from './seedGrammar';
import { seedVocabulary } from './seedVocabulary';

dotenv.config();

const seed = async () => {
  try {
    console.log('🌱 Bắt đầu seed dữ liệu...');

    // Kết nối database
    await connectDB();

    // Seed grammar topics
    await seedGrammar();

    // Seed vocabulary
    await seedVocabulary();

    console.log('✅ Hoàn thành seed dữ liệu!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed:', error);
    process.exit(1);
  }
};

seed();
