import VocabularyWord from '../models/VocabularyWord';

const vocabularyWords = [
  // Cơ Bản 500
  {
    word: 'hello',
    pronunciation: '/həˈloʊ/',
    meanings: [
      {
        partOfSpeech: 'interjection',
        definition: 'used as a greeting',
        vietnameseMeaning: 'xin chào, chào'
      }
    ],
    examples: [
      'Hello! How are you today?',
      'She said hello to everyone in the room.'
    ],
    collocations: ['say hello', 'hello world'],
    synonyms: ['hi', 'hey', 'greetings'],
    antonyms: ['goodbye', 'bye'],
    category: 'Cơ Bản 500',
    difficulty: 1
  },
  {
    word: 'thank',
    pronunciation: '/θæŋk/',
    meanings: [
      {
        partOfSpeech: 'verb',
        definition: 'to express gratitude',
        vietnameseMeaning: 'cảm ơn'
      }
    ],
    examples: [
      'Thank you for your help.',
      'I want to thank everyone who supported me.'
    ],
    collocations: ['thank you', 'thank someone for something'],
    synonyms: ['appreciate', 'be grateful'],
    antonyms: [],
    category: 'Cơ Bản 500',
    difficulty: 1
  },
  {
    word: 'family',
    pronunciation: '/ˈfæməli/',
    meanings: [
      {
        partOfSpeech: 'noun',
        definition: 'a group of people related by blood or marriage',
        vietnameseMeaning: 'gia đình'
      }
    ],
    examples: [
      'My family is very important to me.',
      'We have a big family reunion every year.'
    ],
    collocations: ['family member', 'extended family', 'nuclear family'],
    synonyms: ['relatives', 'household'],
    antonyms: [],
    category: 'Cuộc Sống Hàng Ngày',
    difficulty: 1
  },
  {
    word: 'work',
    pronunciation: '/wɜːrk/',
    meanings: [
      {
        partOfSpeech: 'verb',
        definition: 'to do a job or activity',
        vietnameseMeaning: 'làm việc'
      },
      {
        partOfSpeech: 'noun',
        definition: 'job or employment',
        vietnameseMeaning: 'công việc'
      }
    ],
    examples: [
      'I work at a technology company.',
      'She goes to work by bus.',
      'Hard work pays off.'
    ],
    collocations: ['go to work', 'at work', 'work hard'],
    synonyms: ['job', 'employment', 'labor'],
    antonyms: ['rest', 'play'],
    category: 'Công Việc & Học Tập',
    difficulty: 1
  },
  {
    word: 'study',
    pronunciation: '/ˈstʌdi/',
    meanings: [
      {
        partOfSpeech: 'verb',
        definition: 'to learn about something',
        vietnameseMeaning: 'học, nghiên cứu'
      }
    ],
    examples: [
      'I study English every day.',
      'She is studying medicine at university.'
    ],
    collocations: ['study hard', 'study for an exam'],
    synonyms: ['learn', 'research'],
    antonyms: [],
    category: 'Công Việc & Học Tập',
    difficulty: 1
  },
  {
    word: 'travel',
    pronunciation: '/ˈtrævəl/',
    meanings: [
      {
        partOfSpeech: 'verb',
        definition: 'to go from one place to another',
        vietnameseMeaning: 'du lịch, đi lại'
      }
    ],
    examples: [
      'I love to travel to new countries.',
      'She travels for work every month.'
    ],
    collocations: ['travel abroad', 'business travel'],
    synonyms: ['journey', 'tour', 'voyage'],
    antonyms: ['stay', 'remain'],
    category: 'Du Lịch & Ẩm Thực',
    difficulty: 1
  },
  {
    word: 'restaurant',
    pronunciation: '/ˈrestrɒnt/',
    meanings: [
      {
        partOfSpeech: 'noun',
        definition: 'a place where you can buy and eat a meal',
        vietnameseMeaning: 'nhà hàng'
      }
    ],
    examples: [
      'We went to a nice restaurant for dinner.',
      'This restaurant serves delicious Italian food.'
    ],
    collocations: ['go to a restaurant', 'fast food restaurant'],
    synonyms: ['eatery', 'diner', 'cafe'],
    antonyms: [],
    category: 'Du Lịch & Ẩm Thực',
    difficulty: 1
  },
  {
    word: 'healthy',
    pronunciation: '/ˈhelθi/',
    meanings: [
      {
        partOfSpeech: 'adjective',
        definition: 'in good physical condition',
        vietnameseMeaning: 'khỏe mạnh'
      }
    ],
    examples: [
      'Eating vegetables keeps you healthy.',
      'She leads a healthy lifestyle.'
    ],
    collocations: ['healthy food', 'healthy lifestyle'],
    synonyms: ['fit', 'well', 'sound'],
    antonyms: ['unhealthy', 'sick', 'ill'],
    category: 'Sức Khỏe & Thể Thao',
    difficulty: 1
  },
  {
    word: 'exercise',
    pronunciation: '/ˈeksəsaɪz/',
    meanings: [
      {
        partOfSpeech: 'noun',
        definition: 'physical activity to stay healthy',
        vietnameseMeaning: 'tập thể dục'
      },
      {
        partOfSpeech: 'verb',
        definition: 'to do physical activities',
        vietnameseMeaning: 'tập luyện'
      }
    ],
    examples: [
      'Regular exercise is important for health.',
      'I exercise three times a week.'
    ],
    collocations: ['do exercise', 'physical exercise'],
    synonyms: ['workout', 'training'],
    antonyms: ['rest'],
    category: 'Sức Khỏe & Thể Thao',
    difficulty: 1
  },
  {
    word: 'happy',
    pronunciation: '/ˈhæpi/',
    meanings: [
      {
        partOfSpeech: 'adjective',
        definition: 'feeling or showing pleasure',
        vietnameseMeaning: 'hạnh phúc, vui vẻ'
      }
    ],
    examples: [
      'I am very happy today.',
      'She has a happy smile.'
    ],
    collocations: ['feel happy', 'happy birthday'],
    synonyms: ['joyful', 'cheerful', 'glad'],
    antonyms: ['sad', 'unhappy', 'miserable'],
    category: 'Cảm Xúc & Tính Cách',
    difficulty: 1
  },
  {
    word: 'kind',
    pronunciation: '/kaɪnd/',
    meanings: [
      {
        partOfSpeech: 'adjective',
        definition: 'friendly and caring',
        vietnameseMeaning: 'tốt bụng, tử tế'
      }
    ],
    examples: [
      'She is a very kind person.',
      'It was kind of you to help me.'
    ],
    collocations: ['kind person', 'be kind to'],
    synonyms: ['nice', 'gentle', 'caring'],
    antonyms: ['mean', 'cruel', 'unkind'],
    category: 'Cảm Xúc & Tính Cách',
    difficulty: 1
  },
  {
    word: 'computer',
    pronunciation: '/kəmˈpjuːtər/',
    meanings: [
      {
        partOfSpeech: 'noun',
        definition: 'electronic device for processing data',
        vietnameseMeaning: 'máy tính'
      }
    ],
    examples: [
      'I use my computer for work.',
      'She bought a new computer.'
    ],
    collocations: ['use a computer', 'computer screen'],
    synonyms: ['PC', 'laptop'],
    antonyms: [],
    category: 'Công Việc & Học Tập',
    difficulty: 1
  }
];

export const seedVocabulary = async () => {
  try {
    // Xóa dữ liệu cũ
    await VocabularyWord.deleteMany({});
    console.log('Đã xóa dữ liệu vocabulary cũ');

    // Thêm dữ liệu mới
    await VocabularyWord.insertMany(vocabularyWords);
    console.log(`✅ Đã thêm ${vocabularyWords.length} từ vựng`);
  } catch (error) {
    console.error('❌ Lỗi khi seed vocabulary:', error);
    throw error;
  }
};
