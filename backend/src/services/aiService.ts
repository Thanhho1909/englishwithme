import axios from 'axios';
import { TranslationResult } from '../types';

class AIService {
  private apiKey: string;
  private provider: 'openai' | 'anthropic';

  constructor() {
    // Ưu tiên sử dụng Anthropic Claude, fallback sang OpenAI
    if (process.env.ANTHROPIC_API_KEY) {
      this.apiKey = process.env.ANTHROPIC_API_KEY;
      this.provider = 'anthropic';
    } else if (process.env.OPENAI_API_KEY) {
      this.apiKey = process.env.OPENAI_API_KEY;
      this.provider = 'openai';
    } else {
      throw new Error('No AI API key configured');
    }
  }

  async translateAndGrade(
    vietnameseText: string,
    userTranslation: string
  ): Promise<TranslationResult> {
    const prompt = this.buildGradingPrompt(vietnameseText, userTranslation);

    try {
      const response = await this.callAI(prompt);
      return this.parseGradingResponse(response, userTranslation);
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to process translation');
    }
  }

  private buildGradingPrompt(vietnamese: string, userTranslation: string): string {
    return `Bạn là một giáo viên tiếng Anh chuyên nghiệp. Hãy đánh giá bản dịch tiếng Anh của học viên.

Đoạn văn tiếng Việt gốc:
"${vietnamese}"

Bản dịch của học viên:
"${userTranslation}"

Hãy thực hiện:
1. Đưa ra bản dịch CHUẨN (standard) nhất bằng tiếng Anh
2. Đưa ra bản dịch KHÁC (alternative) tự nhiên và hay hơn nếu có thể
3. Chấm điểm theo 3 tiêu chí (tổng 100 điểm):
   - Ngữ pháp (Grammar): 40 điểm - đánh giá thì, động từ, giới từ, cấu trúc câu
   - Từ vựng (Vocabulary): 30 điểm - đánh giá việc chọn từ phù hợp, đa dạng
   - Tự nhiên (Naturalness): 30 điểm - câu có tự nhiên như người bản xứ không

4. Phân tích LỖI SAI chi tiết:
   - Đánh dấu "critical" cho lỗi nghiêm trọng (sai ngữ pháp cơ bản, sai nghĩa)
   - Đánh dấu "warning" cho phần có thể cải thiện (từ vựng đơn giản, không tự nhiên)
   - Giải thích BẰNG TIẾNG VIỆT dễ hiểu
   - Đưa ra 2-3 cách diễn đạt hay hơn cho mỗi lỗi

Trả về kết quả theo format JSON:
{
  "standardTranslation": "bản dịch chuẩn",
  "aiTranslation": "bản dịch hay hơn của AI",
  "score": {
    "grammar": 35,
    "vocabulary": 25,
    "naturalness": 20,
    "total": 80
  },
  "feedback": {
    "errors": [
      {
        "type": "critical",
        "text": "phần text bị sai",
        "explanation": "Giải thích bằng tiếng Việt",
        "suggestions": ["cách 1", "cách 2", "cách 3"]
      }
    ],
    "improvements": [
      "Lời khuyên chung 1",
      "Lời khuyên chung 2"
    ]
  }
}`;
  }

  private async callAI(prompt: string): Promise<string> {
    if (this.provider === 'anthropic') {
      return await this.callClaude(prompt);
    } else {
      return await this.callOpenAI(prompt);
    }
  }

  private async callClaude(prompt: string): Promise<string> {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    return response.data.content[0].text;
  }

  private async callOpenAI(prompt: string): Promise<string> {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      }
    );

    return response.data.choices[0].message.content;
  }

  private parseGradingResponse(aiResponse: string, userTranslation: string): TranslationResult {
    try {
      // Trích xuất JSON từ response (có thể có markdown code blocks)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid AI response format');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      return {
        userTranslation,
        standardTranslation: parsed.standardTranslation,
        aiTranslation: parsed.aiTranslation || parsed.standardTranslation,
        score: {
          grammar: parsed.score.grammar || 0,
          vocabulary: parsed.score.vocabulary || 0,
          naturalness: parsed.score.naturalness || 0,
          total: parsed.score.total || 0
        },
        feedback: {
          errors: parsed.feedback.errors || [],
          improvements: parsed.feedback.improvements || []
        }
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Failed to parse AI response');
    }
  }

  async generateExercise(grammarTopic: string, difficulty: number): Promise<any> {
    const prompt = `Tạo 5 câu hỏi trắc nghiệm về chủ đề ngữ pháp "${grammarTopic}" với độ khó ${difficulty}/5.

Mỗi câu hỏi có:
- 1 câu hỏi bằng tiếng Anh
- 4 đáp án
- 1 đáp án đúng
- Giải thích bằng tiếng Việt

Format JSON:
{
  "exercises": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "..."
    }
  ]
}`;

    const response = await this.callAI(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { exercises: [] };
  }
}

export default new AIService();
