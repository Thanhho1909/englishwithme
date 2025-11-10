/**
 * Spaced Repetition Service
 * Thuật toán SM-2 (SuperMemo 2) để tối ưu hóa việc ôn tập
 */

export interface ReviewResult {
  quality: number; // 0-5: mức độ nhớ từ (0: quên hoàn toàn, 5: nhớ rất tốt)
}

export interface CardData {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: Date;
}

class SpacedRepetitionService {
  /**
   * Tính toán lịch ôn tập tiếp theo dựa trên thuật toán SM-2
   * @param currentData - Dữ liệu hiện tại của thẻ từ
   * @param quality - Chất lượng trả lời (0-5)
   * @returns Dữ liệu cập nhật cho lần ôn tập tiếp theo
   */
  calculateNextReview(currentData: CardData, quality: number): CardData {
    let { easeFactor, interval, repetitions } = currentData;

    // Nếu trả lời kém (quality < 3), reset về đầu
    if (quality < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      // Tính toán ease factor mới
      easeFactor = Math.max(
        1.3,
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
      );

      // Tính toán interval mới
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }

      repetitions++;
    }

    // Tính toán ngày ôn tập tiếp theo
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return {
      easeFactor,
      interval,
      repetitions,
      nextReview
    };
  }

  /**
   * Lấy danh sách các thẻ từ cần ôn tập hôm nay
   * @param vocabularyProgress - Map chứa tiến độ học của tất cả các từ
   * @returns Array các ID từ cần ôn tập
   */
  getDueCards(vocabularyProgress: Map<string, any>): string[] {
    const now = new Date();
    const dueCards: string[] = [];

    vocabularyProgress.forEach((progress, wordId) => {
      const nextReview = new Date(progress.nextReview);
      if (nextReview <= now) {
        dueCards.push(wordId);
      }
    });

    return dueCards;
  }

  /**
   * Tính toán số lượng từ mới nên học dựa trên tiến độ hiện tại
   * @param totalLearned - Tổng số từ đã học
   * @param dueCount - Số từ cần ôn tập hôm nay
   * @returns Số từ mới khuyên học
   */
  calculateNewWordsLimit(totalLearned: number, dueCount: number): number {
    // Không học từ mới nếu có quá nhiều từ cần ôn
    if (dueCount > 50) return 0;
    if (dueCount > 30) return 5;
    if (dueCount > 20) return 10;

    // Giới hạn tối đa 20 từ mới/ngày
    return Math.min(20, Math.floor(50 - dueCount));
  }

  /**
   * Phân loại từ theo mức độ khó (dựa trên số lần sai)
   */
  getDifficultWords(
    vocabularyProgress: Map<string, any>,
    threshold: number = 3
  ): string[] {
    const difficultWords: string[] = [];

    vocabularyProgress.forEach((progress, wordId) => {
      if (progress.incorrect >= threshold &&
          progress.correct < progress.incorrect * 2) {
        difficultWords.push(wordId);
      }
    });

    return difficultWords;
  }

  /**
   * Tính toán thống kê học tập
   */
  getStudyStats(vocabularyProgress: Map<string, any>) {
    let total = 0;
    let mastered = 0;
    let learning = 0;
    let difficult = 0;

    vocabularyProgress.forEach((progress) => {
      total++;

      if (progress.repetitions >= 5 && progress.easeFactor >= 2.5) {
        mastered++;
      } else if (progress.incorrect > progress.correct) {
        difficult++;
      } else {
        learning++;
      }
    });

    return {
      total,
      mastered,
      learning,
      difficult,
      masteryRate: total > 0 ? (mastered / total) * 100 : 0
    };
  }
}

export default new SpacedRepetitionService();
