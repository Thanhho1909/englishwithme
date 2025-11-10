import mongoose, { Schema, Document } from 'mongoose';

export interface IVocabularyWord extends Document {
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
  imageUrl?: string;
}

const VocabularyWordSchema: Schema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  pronunciation: {
    type: String,
    required: true
  },
  meanings: [{
    partOfSpeech: {
      type: String,
      required: true
    },
    definition: {
      type: String,
      required: true
    },
    vietnameseMeaning: {
      type: String,
      required: true
    }
  }],
  examples: [{
    type: String
  }],
  collocations: [{
    type: String
  }],
  synonyms: [{
    type: String
  }],
  antonyms: [{
    type: String
  }],
  category: {
    type: String,
    required: true,
    index: true
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  imageUrl: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IVocabularyWord>('VocabularyWord', VocabularyWordSchema);
