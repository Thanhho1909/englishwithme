# 📚 Meu English - Ứng Dụng Học Tiếng Anh Thông Minh

Ứng dụng học tiếng Anh toàn diện với công nghệ AI, được thiết kế dựa trên các phương pháp học tập hiệu quả nhất.

## ✨ Tính Năng Chính

### 1. 🔄 Phòng Luyện Dịch Thuật
- Dịch văn bản tiếng Việt sang tiếng Anh
- AI chấm điểm chi tiết theo 3 tiêu chí:
  - **Ngữ pháp** (40 điểm): Đánh giá thì, động từ, giới từ
  - **Từ vựng** (30 điểm): Đánh giá việc chọn từ phù hợp
  - **Tự nhiên** (30 điểm): Đánh giá độ tự nhiên của câu
- Phản hồi chi tiết với:
  - Đánh dấu lỗi nghiêm trọng (màu đỏ)
  - Đánh dấu phần cần cải thiện (màu vàng)
  - Giải thích bằng tiếng Việt dễ hiểu
  - 2-3 gợi ý cách diễn đạt hay hơn
- Kho lỗi sai cá nhân để theo dõi điểm yếu
- So sánh với bản dịch chuẩn và bản dịch AI

### 2. 📖 Phòng Tập Ngữ Pháp
- **12 chủ đề ngữ pháp** từ cơ bản đến nâng cao:
  1. Thì Hiện Tại Đơn
  2. Thì Hiện Tại Tiếp Diễn
  3. Thì Quá Khứ Đơn
  4. Động Từ To Be và To Have
  5. Danh Từ (Đếm Được / Không Đếm Được)
  6. Mạo Từ (A / An / The)
  7. Giới Từ Cơ Bản
  8. Tính Từ và Trạng Từ
  9. Thì Tương Lai
  10. Câu Hỏi (Wh-questions)
  11. So Sánh Hơn và Nhất
  12. Câu Điều Kiện Loại 1

- **Cấu trúc mỗi bài học:**
  - **Học**: Giải thích ngắn gọn, ví dụ thực tế, mẹo ghi nhớ
  - **Luyện tập**: Điền từ, sửa lỗi, ghép câu
  - **Kiểm tra**: Trắc nghiệm 15 câu với giải thích chi tiết

- Hệ thống theo dõi tiến độ cho từng chủ đề
- AI tạo bài tập dựa trên lỗi sai của bạn

### 3. 💡 Kho Từ Vựng Thông Minh
- **Hệ thống Flashcard** với thuật toán Spaced Repetition (SM-2)
- **Bộ từ vựng theo chủ đề:**
  - Cơ Bản 500
  - Cuộc Sống Hàng Ngày
  - Công Việc & Học Tập
  - Du Lịch & Ẩm Thực
  - Sức Khỏe & Thể Thao
  - Cảm Xúc & Tính Cách

- **Mỗi thẻ từ bao gồm:**
  - Từ tiếng Anh
  - Phiên âm chuẩn (IPA)
  - Nghĩa tiếng Việt (nhiều nghĩa)
  - 2+ ví dụ câu thực tế
  - Từ đi kèm (collocations)
  - Từ đồng nghĩa / trái nghĩa

- **4 chế độ học:**
  - Học: Lướt qua các thẻ
  - Kiểm tra: Trắc nghiệm nhanh
  - Đánh vần: Gõ từ
  - Ngữ cảnh: Đoán nghĩa từ câu

- Thống kê chi tiết: Tổng từ, đã thuộc, đang học, từ khó

### 4. 🎮 Hệ Thống Gamification
- **Level & XP**: Tăng level khi tích lũy điểm kinh nghiệm
- **Streak**: Chuỗi ngày học liên tục
- **Badges**: Huy hiệu cho các thành tựu
- **Dashboard**: Theo dõi tiến độ tổng quan

## 🎓 Phương Pháp Học Được Áp Dụng

1. **Active Recall** - Gợi nhớ chủ động
2. **Spaced Repetition** - Lặp lại ngắt quãng
3. **Immediate Feedback** - Phản hồi tức thì
4. **Personalized Learning** - Học tập cá nhân hóa
5. **Consistency over Intensity** - Kiên trì hơn cường độ
6. **Contextual Learning** - Học qua ngữ cảnh thực tế

## 🛠️ Công Nghệ Sử Dụng

### Backend
- **Node.js** + **Express** + **TypeScript**
- **MongoDB** với Mongoose ODM
- **JWT** cho authentication
- **AI Integration**:
  - Anthropic Claude API (ưu tiên)
  - OpenAI GPT-4 (dự phòng)

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Database Models
- User (người dùng)
- UserProgress (tiến độ học)
- GrammarTopic (chủ đề ngữ pháp)
- VocabularyWord (từ vựng)

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: >= 18.0.0
- **MongoDB**: >= 6.0
- **npm** hoặc **yarn**
- **AI API Key**: Anthropic Claude hoặc OpenAI GPT-4

## 🚀 Cài Đặt và Chạy

### 1. Clone Repository

```bash
git clone <repository-url>
cd englishwithme
```

### 2. Cài Đặt Dependencies

```bash
# Cài đặt dependencies cho toàn bộ project
npm install

# Hoặc cài đặt riêng cho backend và frontend
cd backend && npm install
cd ../frontend && npm install
```

### 3. Cấu Hình Environment Variables

Tạo file `.env` trong thư mục `backend`:

```env
# Backend Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/meu-english

# AI API Keys (Chọn một trong hai)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
# OPENAI_API_KEY=your_openai_api_key_here

# JWT Secret
JWT_SECRET=your_jwt_secret_here_change_in_production

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 4. Khởi Động MongoDB

```bash
# Nếu dùng MongoDB local
mongod

# Hoặc dùng MongoDB Atlas (cloud)
# Cập nhật MONGODB_URI trong .env
```

### 5. Seed Dữ Liệu Mẫu

```bash
cd backend
npm run seed
```

Lệnh này sẽ tạo:
- 3 chủ đề ngữ pháp mẫu (có thể mở rộng)
- 12 từ vựng mẫu từ các chủ đề khác nhau

### 6. Chạy Ứng Dụng

#### Development Mode (Chạy cả backend và frontend)

```bash
# Từ thư mục root
npm run dev
```

Hoặc chạy riêng:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Ứng dụng sẽ chạy tại:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### 7. Build cho Production

```bash
# Build cả frontend và backend
npm run build

# Hoặc build riêng
cd backend && npm run build
cd frontend && npm run build
```

## 📱 Sử Dụng Ứng Dụng

### 1. Đăng Ký / Đăng Nhập
- Tạo tài khoản mới với email, username, password
- Hoặc đăng nhập nếu đã có tài khoản

### 2. Dashboard
- Xem tổng quan tiến độ học tập
- Level, XP, Streak hiện tại
- Truy cập nhanh vào các phòng học

### 3. Phòng Luyện Dịch
- Chọn câu mẫu hoặc nhập đoạn văn tiếng Việt
- Dịch sang tiếng Anh
- Nhận phản hồi chi tiết từ AI
- Xem lỗi thường mắc

### 4. Phòng Ngữ Pháp
- Chọn chủ đề ngữ pháp
- Học lý thuyết với ví dụ
- Làm bài tập thực hành
- Kiểm tra với quiz

### 5. Kho Từ Vựng
- Ôn tập các từ đến hạn
- Học từ mới theo chủ đề
- Đánh giá mức độ nhớ từ
- Xem thống kê học tập

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin user
- `PUT /api/auth/profile` - Cập nhật profile

### Translation
- `POST /api/translation/translate` - Dịch và chấm điểm
- `GET /api/translation/history` - Lịch sử dịch
- `GET /api/translation/common-errors` - Lỗi thường mắc

### Grammar
- `GET /api/grammar/topics` - Danh sách topics
- `GET /api/grammar/topics/:id` - Chi tiết topic
- `POST /api/grammar/submit` - Nộp bài tập
- `GET /api/grammar/progress` - Tiến độ học

### Vocabulary
- `GET /api/vocabulary/categories` - Danh sách categories
- `GET /api/vocabulary/category/:name` - Từ theo category
- `GET /api/vocabulary/due-cards` - Thẻ cần ôn
- `POST /api/vocabulary/review` - Đánh giá thẻ
- `GET /api/vocabulary/stats` - Thống kê
- `GET /api/vocabulary/difficult` - Từ khó

## 📊 Cấu Trúc Dự Án

```
englishwithme/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Controllers cho routes
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic (AI, Spaced Repetition)
│   │   ├── middleware/        # Auth middleware
│   │   ├── utils/             # Utilities (DB, seed data)
│   │   ├── types/             # TypeScript types
│   │   └── server.ts          # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── context/           # State management (Zustand)
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── package.json               # Root package.json
├── .env.example               # Environment variables example
└── README.md                  # This file
```

## 🎯 Roadmap / Tính Năng Tương Lai

- [ ] Thêm 9 chủ đề ngữ pháp còn lại (hiện tại có 3/12)
- [ ] Mở rộng kho từ vựng (500+ từ mỗi category)
- [ ] Tính năng nghe và phát âm (Speech-to-Text)
- [ ] Bài tập nghe hiểu (Listening exercises)
- [ ] Chế độ luyện nói với AI
- [ ] Bảng xếp hạng (Leaderboard)
- [ ] Chế độ học nhóm
- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native)
- [ ] Nhiều ngôn ngữ UI hơn

## 🤝 Đóng Góp

Mọi đóng góp đều được hoan nghênh! Vui lòng:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

Dự án này được phát hành dưới giấy phép MIT.

## 👨‍💻 Tác Giả

**Meu English Team**

## 🙏 Cảm Ơn

- [Anthropic](https://www.anthropic.com/) - Claude API
- [OpenAI](https://openai.com/) - GPT API
- Cộng đồng open source

## 📞 Liên Hệ

- Email: support@meuenglish.com
- Website: https://meuenglish.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/englishwithme/issues)

---

**Happy Learning! 📚✨**
