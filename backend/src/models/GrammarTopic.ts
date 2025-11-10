import mongoose, { Schema, Document } from 'mongoose';

export interface IGrammarTopic extends Document {
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

const GrammarTopicSchema: Schema = new Schema({
  topicId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  titleVi: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  order: {
    type: Number,
    required: true
  },
  content: {
    explanation: {
      type: String,
      required: true
    },
    visualAid: {
      type: String
    },
    examples: [{
      english: {
        type: String,
        required: true
      },
      vietnamese: {
        type: String,
        required: true
      }
    }],
    tips: [{
      type: String
    }]
  },
  exercises: {
    fillInBlanks: [{
      question: String,
      answer: String,
      options: [String]
    }],
    findErrors: [{
      incorrectSentence: String,
      correctSentence: String,
      explanation: String
    }],
    sentenceArrange: [{
      words: [String],
      correctSentence: String
    }],
    quiz: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }]
  }
}, {
  timestamps: true
});

export default mongoose.model<IGrammarTopic>('GrammarTopic', GrammarTopicSchema);
