import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  grammar: Map<string, {
    completed: boolean;
    score: number;
    lastAttempt: Date;
    attempts: number;
  }>;
  vocabulary: Map<string, {
    lastReviewed: Date;
    nextReview: Date;
    easeFactor: number;
    interval: number;
    repetitions: number;
    correct: number;
    incorrect: number;
  }>;
  translation: {
    totalAttempts: number;
    averageScore: number;
    commonErrors: Array<{
      errorType: string;
      count: number;
      examples: string[];
    }>;
  };
}

const UserProgressSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  grammar: {
    type: Map,
    of: {
      completed: { type: Boolean, default: false },
      score: { type: Number, default: 0 },
      lastAttempt: { type: Date },
      attempts: { type: Number, default: 0 }
    },
    default: {}
  },
  vocabulary: {
    type: Map,
    of: {
      lastReviewed: { type: Date },
      nextReview: { type: Date },
      easeFactor: { type: Number, default: 2.5 },
      interval: { type: Number, default: 1 },
      repetitions: { type: Number, default: 0 },
      correct: { type: Number, default: 0 },
      incorrect: { type: Number, default: 0 }
    },
    default: {}
  },
  translation: {
    totalAttempts: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    commonErrors: [{
      errorType: String,
      count: Number,
      examples: [String]
    }]
  }
}, {
  timestamps: true
});

export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
