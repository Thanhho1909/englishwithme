export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  level: number;
  xp: number;
  streak: number;
  lastActiveDate: Date;
  createdAt: Date;
  badges: string[];
}

export interface TranslationResult {
  userTranslation: string;
  aiTranslation: string;
  standardTranslation: string;
  score: {
    grammar: number;
    vocabulary: number;
    naturalness: number;
    total: number;
  };
  feedback: {
    errors: Array<{
      type: 'critical' | 'warning';
      text: string;
      explanation: string;
      suggestions: string[];
    }>;
    improvements: string[];
  };
}

export interface VocabularyWord {
  _id: string;
  word: string;
  pronunciation: string;
  meanings: Array<{
    partOfSpeech: string;
    definition: string;
    vietnameseMeaning: string;
  }>;
  examples: string[];
  collocations: string[];
  synonyms: string[];
  antonyms: string[];
  category: string;
  difficulty: number;
}

export interface GrammarTopic {
  _id: string;
  topicId: number;
  title: string;
  titleVi: string;
  difficulty: number;
  order: number;
  content: {
    explanation: string;
    visualAid: string;
    examples: Array<{
      english: string;
      vietnamese: string;
    }>;
    tips: string[];
  };
  exercises: {
    fillInBlanks: Array<{
      question: string;
      answer: string;
      options?: string[];
    }>;
    findErrors: Array<{
      incorrectSentence: string;
      correctSentence: string;
      explanation: string;
    }>;
    sentenceArrange: Array<{
      words: string[];
      correctSentence: string;
    }>;
    quiz: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  };
}

export interface UserProgress {
  userId: string;
  grammar: {
    [topicId: string]: {
      completed: boolean;
      score: number;
      lastAttempt: Date;
      attempts: number;
    };
  };
  vocabulary: {
    [wordId: string]: {
      lastReviewed: Date;
      nextReview: Date;
      easeFactor: number;
      interval: number;
      repetitions: number;
      correct: number;
      incorrect: number;
    };
  };
  translation: {
    totalAttempts: number;
    averageScore: number;
    commonErrors: Array<{
      errorType: string;
      count: number;
      examples: string[];
    }>;
  };
  achievements: {
    level: number;
    xp: number;
    badges: string[];
    streak: number;
  };
}

export interface SpacedRepetitionCard {
  wordId: string;
  word: VocabularyWord;
  nextReviewDate: Date;
  interval: number;
  easeFactor: number;
  repetitions: number;
}
