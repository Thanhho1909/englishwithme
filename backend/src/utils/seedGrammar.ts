import GrammarTopic from '../models/GrammarTopic';

const grammarTopics = [
  {
    topicId: 1,
    title: 'Simple Present Tense',
    titleVi: 'Thì Hiện Tại Đơn',
    difficulty: 1,
    order: 1,
    content: {
      explanation: `Thì hiện tại đơn được dùng để diễn tả:
- Thói quen, hành động lặp đi lặp lại
- Sự thật hiển nhiên, chân lý
- Lịch trình, thời gian biểu

Công thức:
- Khẳng định: S + V(s/es)
- Phủ định: S + don't/doesn't + V
- Nghi vấn: Do/Does + S + V?`,
      visualAid: 'Subject + Verb (+ s/es for he/she/it)',
      examples: [
        {
          english: 'I go to school every day.',
          vietnamese: 'Tôi đi học mỗi ngày.'
        },
        {
          english: 'She likes coffee.',
          vietnamese: 'Cô ấy thích cà phê.'
        },
        {
          english: 'The sun rises in the east.',
          vietnamese: 'Mặt trời mọc ở hướng đông.'
        },
        {
          english: 'They don\'t eat meat.',
          vietnamese: 'Họ không ăn thịt.'
        },
        {
          english: 'Do you speak English?',
          vietnamese: 'Bạn có nói tiếng Anh không?'
        }
      ],
      tips: [
        'Nhớ thêm s/es cho ngôi thứ 3 số ít (he, she, it)',
        'Dùng "doesn\'t" cho phủ định với he/she/it',
        'Các trạng từ thường gặp: always, usually, often, sometimes, never'
      ]
    },
    exercises: {
      fillInBlanks: [
        { question: 'She _____ (work) at a hospital.', answer: 'works' },
        { question: 'I _____ (not like) spicy food.', answer: "don't like" },
        { question: 'They _____ (play) tennis every weekend.', answer: 'play' },
        { question: 'He _____ (watch) TV every evening.', answer: 'watches' },
        { question: 'We _____ (study) English together.', answer: 'study' }
      ],
      findErrors: [
        {
          incorrectSentence: 'She go to work by bus.',
          correctSentence: 'She goes to work by bus.',
          explanation: 'Phải thêm "s" vào động từ "go" vì chủ ngữ là "she" (ngôi thứ 3 số ít)'
        },
        {
          incorrectSentence: 'He don\'t like pizza.',
          correctSentence: 'He doesn\'t like pizza.',
          explanation: 'Dùng "doesn\'t" thay vì "don\'t" với ngôi thứ 3 số ít'
        }
      ],
      sentenceArrange: [
        {
          words: ['every', 'morning', 'I', 'coffee', 'drink'],
          correctSentence: 'I drink coffee every morning'
        },
        {
          words: ['work', 'doesn\'t', 'she', 'Sundays', 'on'],
          correctSentence: 'She doesn\'t work on Sundays'
        }
      ],
      quiz: [
        {
          question: 'Which sentence is correct?',
          options: [
            'He go to school every day',
            'He goes to school every day',
            'He going to school every day',
            'He is go to school every day'
          ],
          correctAnswer: 1,
          explanation: 'Với ngôi thứ 3 số ít (he), động từ "go" phải thêm "es" thành "goes"'
        }
      ]
    }
  },
  {
    topicId: 2,
    title: 'Present Continuous Tense',
    titleVi: 'Thì Hiện Tại Tiếp Diễn',
    difficulty: 1,
    order: 2,
    content: {
      explanation: `Thì hiện tại tiếp diễn được dùng để diễn tả:
- Hành động đang xảy ra tại thời điểm nói
- Hành động xảy ra xung quanh thời điểm nói
- Kế hoạch trong tương lai gần

Công thức:
- Khẳng định: S + am/is/are + V-ing
- Phủ định: S + am/is/are + not + V-ing
- Nghi vấn: Am/Is/Are + S + V-ing?`,
      visualAid: 'Subject + am/is/are + Verb-ing',
      examples: [
        {
          english: 'I am studying English now.',
          vietnamese: 'Tôi đang học tiếng Anh bây giờ.'
        },
        {
          english: 'She is working on a project.',
          vietnamese: 'Cô ấy đang làm một dự án.'
        },
        {
          english: 'They are not listening to music.',
          vietnamese: 'Họ không đang nghe nhạc.'
        },
        {
          english: 'Are you watching TV?',
          vietnamese: 'Bạn đang xem TV à?'
        },
        {
          english: 'We are meeting tomorrow.',
          vietnamese: 'Chúng ta sẽ gặp nhau vào ngày mai.'
        }
      ],
      tips: [
        'Thêm -ing vào động từ (work → working)',
        'Với động từ kết thúc bằng "e", bỏ "e" rồi thêm -ing (make → making)',
        'Dùng am với I, is với he/she/it, are với you/we/they',
        'Các từ tín hiệu: now, at the moment, currently, right now'
      ]
    },
    exercises: {
      fillInBlanks: [
        { question: 'She _____ (read) a book right now.', answer: 'is reading' },
        { question: 'They _____ (not play) football at the moment.', answer: "aren't playing" },
        { question: 'I _____ (watch) a movie now.', answer: 'am watching' },
        { question: 'He _____ (cook) dinner.', answer: 'is cooking' },
        { question: 'We _____ (study) for the exam.', answer: 'are studying' }
      ],
      findErrors: [
        {
          incorrectSentence: 'She is cook dinner now.',
          correctSentence: 'She is cooking dinner now.',
          explanation: 'Phải thêm -ing vào động từ "cook" trong thì hiện tại tiếp diễn'
        },
        {
          incorrectSentence: 'I am play tennis.',
          correctSentence: 'I am playing tennis.',
          explanation: 'Động từ "play" phải thêm -ing thành "playing"'
        }
      ],
      sentenceArrange: [
        {
          words: ['now', 'is', 'he', 'sleeping'],
          correctSentence: 'He is sleeping now'
        },
        {
          words: ['are', 'not', 'they', 'working', 'today'],
          correctSentence: 'They are not working today'
        }
      ],
      quiz: [
        {
          question: 'Which sentence is in present continuous?',
          options: [
            'I work every day',
            'I am working now',
            'I worked yesterday',
            'I will work tomorrow'
          ],
          correctAnswer: 1,
          explanation: 'Thì hiện tại tiếp diễn có cấu trúc: am/is/are + V-ing'
        }
      ]
    }
  },
  {
    topicId: 3,
    title: 'Simple Past Tense',
    titleVi: 'Thì Quá Khứ Đơn',
    difficulty: 2,
    order: 3,
    content: {
      explanation: `Thì quá khứ đơn được dùng để diễn tả:
- Hành động đã xảy ra và kết thúc trong quá khứ
- Chuỗi hành động trong quá khứ
- Thói quen trong quá khứ

Công thức:
- Khẳng định: S + V2/ed
- Phủ định: S + didn't + V
- Nghi vấn: Did + S + V?`,
      visualAid: 'Subject + Verb (past form)',
      examples: [
        {
          english: 'I visited Paris last year.',
          vietnamese: 'Tôi đã thăm Paris năm ngoái.'
        },
        {
          english: 'She didn\'t go to the party.',
          vietnamese: 'Cô ấy không đi dự tiệc.'
        },
        {
          english: 'Did you watch the movie?',
          vietnamese: 'Bạn đã xem bộ phim chưa?'
        },
        {
          english: 'They worked hard yesterday.',
          vietnamese: 'Họ đã làm việc chăm chỉ hôm qua.'
        },
        {
          english: 'He ate breakfast at 7 AM.',
          vietnamese: 'Anh ấy đã ăn sáng lúc 7 giờ.'
        }
      ],
      tips: [
        'Động từ có quy tắc: thêm -ed (work → worked)',
        'Động từ bất quy tắc: go → went, eat → ate, see → saw',
        'Từ tín hiệu: yesterday, last week/month/year, ago, in 2020',
        'Dùng "didn\'t" cho phủ định, không thêm -ed vào động từ sau didn\'t'
      ]
    },
    exercises: {
      fillInBlanks: [
        { question: 'I _____ (visit) my grandparents last weekend.', answer: 'visited' },
        { question: 'She _____ (not go) to work yesterday.', answer: "didn't go" },
        { question: 'They _____ (play) soccer last Sunday.', answer: 'played' },
        { question: 'He _____ (buy) a new car last month.', answer: 'bought' },
        { question: 'We _____ (watch) a movie last night.', answer: 'watched' }
      ],
      findErrors: [
        {
          incorrectSentence: 'I go to the beach yesterday.',
          correctSentence: 'I went to the beach yesterday.',
          explanation: 'Phải dùng quá khứ "went" thay vì hiện tại "go" vì có "yesterday"'
        },
        {
          incorrectSentence: 'She didn\'t went to school.',
          correctSentence: 'She didn\'t go to school.',
          explanation: 'Sau "didn\'t" phải dùng động từ nguyên mẫu, không thêm -ed'
        }
      ],
      sentenceArrange: [
        {
          words: ['last', 'I', 'week', 'London', 'visited'],
          correctSentence: 'I visited London last week'
        },
        {
          words: ['didn\'t', 'she', 'eat', 'breakfast'],
          correctSentence: 'She didn\'t eat breakfast'
        }
      ],
      quiz: [
        {
          question: 'What is the past form of "eat"?',
          options: ['eated', 'eat', 'ate', 'eating'],
          correctAnswer: 2,
          explanation: '"Eat" là động từ bất quy tắc, quá khứ là "ate"'
        }
      ]
    }
  }
  // Các topics khác có thể thêm tương tự...
];

export const seedGrammar = async () => {
  try {
    // Xóa dữ liệu cũ
    await GrammarTopic.deleteMany({});
    console.log('Đã xóa dữ liệu grammar cũ');

    // Thêm dữ liệu mới
    await GrammarTopic.insertMany(grammarTopics);
    console.log(`✅ Đã thêm ${grammarTopics.length} chủ đề ngữ pháp`);
  } catch (error) {
    console.error('❌ Lỗi khi seed grammar:', error);
    throw error;
  }
};
