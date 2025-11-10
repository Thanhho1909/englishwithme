# 🚀 Hướng Dẫn Deploy Meu English

Hướng dẫn chi tiết để deploy ứng dụng Meu English lên production.

## 📋 Tổng Quan

Có 2 phương án deploy:

### Phương Án 1: Frontend (Vercel) + Backend (Railway/Render) - **KHUYẾN NGHỊ**
- ✅ Miễn phí hoàn toàn
- ✅ Dễ setup
- ✅ Performance tốt
- ✅ Auto-deploy khi push code

### Phương Án 2: Tất cả trên Vercel (Serverless)
- Phức tạp hơn
- Cần convert backend sang serverless functions
- Giới hạn execution time (10s free tier)

**→ Hướng dẫn này sẽ tập trung vào Phương Án 1**

---

## 🗄️ Bước 1: Setup Database (MongoDB Atlas)

### 1.1. Tạo MongoDB Atlas Account (MIỄN PHÍ)

1. Truy cập [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Đăng ký tài khoản miễn phí
3. Tạo cluster mới:
   - Chọn **M0 Sandbox** (FREE)
   - Cloud Provider: **AWS**
   - Region: **Singapore** (gần Việt Nam nhất)
   - Cluster Name: `meu-english`

### 1.2. Cấu Hình Database

1. **Database Access:**
   - Vào tab "Database Access"
   - Click "Add New Database User"
   - Username: `meuenglish`
   - Password: Tạo password mạnh (lưu lại)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Network Access:**
   - Vào tab "Network Access"
   - Click "Add IP Address"
   - Chọn "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

3. **Lấy Connection String:**
   - Vào tab "Database"
   - Click "Connect" trên cluster của bạn
   - Chọn "Connect your application"
   - Copy connection string:
     ```
     mongodb+srv://meuenglish:<password>@meu-english.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Thay `<password>` bằng password bạn đã tạo**

### 1.3. Seed Dữ Liệu Vào Database

```bash
# Tạo file .env trong thư mục backend với connection string
cd backend
echo "MONGODB_URI=mongodb+srv://meuenglish:YOUR_PASSWORD@meu-english.xxxxx.mongodb.net/meu-english?retryWrites=true&w=majority" > .env

# Thêm các env khác
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env
echo "ANTHROPIC_API_KEY=your_api_key_here" >> .env

# Chạy seed script
npm run seed
```

---

## 🖥️ Bước 2: Deploy Backend

### Phương Án A: Railway (KHUYẾN NGHỊ - Dễ nhất)

#### 2.1. Tạo Railway Account

1. Truy cập [https://railway.app](https://railway.app)
2. Đăng nhập bằng GitHub
3. Click "New Project"
4. Chọn "Deploy from GitHub repo"
5. Chọn repository `englishwithme` của bạn
6. Chọn thư mục: `/backend`

#### 2.2. Cấu Hình Environment Variables

Trong Railway dashboard, vào tab "Variables" và thêm:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://meuenglish:YOUR_PASSWORD@meu-english.xxxxx.mongodb.net/meu-english?retryWrites=true&w=majority
JWT_SECRET=your-random-jwt-secret-here
ANTHROPIC_API_KEY=your_anthropic_api_key
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

**Lưu ý:**
- Thay `YOUR_PASSWORD` bằng password MongoDB của bạn
- `CORS_ORIGIN` sẽ cập nhật sau khi deploy frontend

#### 2.3. Deploy

1. Railway sẽ tự động build và deploy
2. Sau khi deploy xong, copy **Public URL** (ví dụ: `https://meu-english-api.railway.app`)
3. Lưu lại URL này để dùng cho frontend

#### 2.4. Kiểm Tra

Truy cập `https://your-app.railway.app/health` để kiểm tra API đang chạy.

---

### Phương Án B: Render.com (Thay thế)

#### 2.1. Tạo Render Account

1. Truy cập [https://render.com](https://render.com)
2. Đăng nhập bằng GitHub
3. Click "New +" → "Web Service"
4. Connect repository `englishwithme`

#### 2.2. Cấu Hình

- **Name:** `meu-english-api`
- **Region:** `Singapore`
- **Branch:** `main` hoặc branch của bạn
- **Root Directory:** `backend`
- **Environment:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Plan:** `Free`

#### 2.3. Environment Variables

Thêm các biến giống như Railway:

```env
NODE_ENV=production
MONGODB_URI=...
JWT_SECRET=...
ANTHROPIC_API_KEY=...
CORS_ORIGIN=...
```

#### 2.4. Deploy

1. Click "Create Web Service"
2. Đợi build và deploy (5-10 phút)
3. Copy URL (ví dụ: `https://meu-english-api.onrender.com`)

---

## 🌐 Bước 3: Deploy Frontend (Vercel)

### 3.1. Tạo Vercel Account

1. Truy cập [https://vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Click "Add New Project"
4. Import repository `englishwithme`

### 3.2. Cấu Hình Project

- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3.3. Environment Variables

Thêm biến môi trường:

```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

**Thay `your-backend-url.railway.app` bằng URL backend bạn đã deploy ở Bước 2**

### 3.4. Deploy

1. Click "Deploy"
2. Đợi Vercel build (2-3 phút)
3. Deploy thành công! Copy URL (ví dụ: `https://meu-english.vercel.app`)

### 3.5. Cập Nhật CORS

Quay lại Railway/Render và cập nhật biến `CORS_ORIGIN`:

```env
CORS_ORIGIN=https://meu-english.vercel.app
```

Redeploy backend để áp dụng thay đổi.

---

## ✅ Bước 4: Kiểm Tra

### 4.1. Test Backend

```bash
curl https://your-backend-url.railway.app/health
```

Kết quả mong đợi:
```json
{
  "success": true,
  "message": "Meu English API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 4.2. Test Frontend

1. Truy cập `https://your-frontend-url.vercel.app`
2. Thử đăng ký tài khoản mới
3. Đăng nhập
4. Test các tính năng:
   - Phòng Luyện Dịch
   - Phòng Ngữ Pháp
   - Kho Từ Vựng

---

## 🔄 Auto Deployment

### Git Push Auto Deploy

Mỗi khi bạn push code lên GitHub:

**Frontend (Vercel):**
- Tự động detect changes trong `/frontend`
- Tự động build và deploy
- Preview deployment cho mỗi PR

**Backend (Railway/Render):**
- Tự động detect changes trong `/backend`
- Tự động build và deploy
- Zero downtime deployment

### Deploy Workflow

```bash
# 1. Làm thay đổi code
git add .
git commit -m "feat: thêm tính năng mới"

# 2. Push lên GitHub
git push origin main

# 3. Vercel và Railway/Render tự động deploy
# Không cần làm gì thêm!
```

---

## 🎯 Custom Domain (Tùy Chọn)

### Frontend (Vercel)

1. Vào Vercel dashboard
2. Chọn project
3. Tab "Settings" → "Domains"
4. Thêm custom domain của bạn
5. Cập nhật DNS records theo hướng dẫn

### Backend (Railway/Render)

Tương tự, thêm custom domain trong settings.

---

## 🔐 Environment Variables Checklist

### Backend (.env)

```env
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random-secret-here

# AI (ít nhất 1 trong 2)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# CORS
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend.railway.app/api
```

---

## 🐛 Troubleshooting

### Frontend không kết nối được Backend

1. Kiểm tra `VITE_API_URL` đúng chưa
2. Kiểm tra `CORS_ORIGIN` trong backend
3. Xem logs trong Vercel dashboard

### Backend bị crash

1. Kiểm tra logs trong Railway/Render
2. Đảm bảo `MONGODB_URI` đúng
3. Kiểm tra environment variables

### MongoDB connection error

1. Kiểm tra IP whitelist (phải cho phép 0.0.0.0/0)
2. Kiểm tra username/password
3. Kiểm tra connection string format

### AI API không hoạt động

1. Kiểm tra `ANTHROPIC_API_KEY` hoặc `OPENAI_API_KEY`
2. Đảm bảo còn credit trong tài khoản AI
3. Xem logs để debug

---

## 💰 Chi Phí

### Miễn Phí 100%

- **MongoDB Atlas:** M0 Sandbox (512MB, đủ cho development)
- **Railway:** $5 credit/tháng (đủ cho hobby project)
- **Render:** Free tier với 750 giờ/tháng
- **Vercel:** Unlimited cho personal projects

### Nâng Cấp (Nếu Cần)

- **MongoDB Atlas:** $9/tháng (M10 - 10GB)
- **Railway:** $5/tháng cho mỗi GB RAM
- **Render:** $7/tháng (paid plan)
- **Vercel:** $20/tháng (Pro plan)

---

## 📊 Monitoring

### Railway/Render

- Xem logs real-time
- CPU/Memory usage
- Request metrics

### Vercel

- Analytics
- Web Vitals
- Function logs

### MongoDB Atlas

- Database metrics
- Query performance
- Storage usage

---

## 🔄 CI/CD Pipeline

Workflow tự động:

```
1. Developer push code to GitHub
   ↓
2. GitHub triggers webhooks
   ↓
3. Vercel builds frontend (2-3 phút)
   Railway/Render builds backend (5-7 phút)
   ↓
4. Run tests (nếu có)
   ↓
5. Deploy to production
   ↓
6. Send notification (optional)
```

---

## 📝 Checklist Trước Khi Deploy

- [ ] Đã test ứng dụng local
- [ ] Đã tạo MongoDB Atlas cluster
- [ ] Đã seed dữ liệu vào database
- [ ] Đã có API keys (Anthropic/OpenAI)
- [ ] Đã setup environment variables
- [ ] Đã test API endpoints
- [ ] Đã cập nhật CORS_ORIGIN
- [ ] Đã commit và push code lên GitHub

---

## 🎉 Hoàn Thành!

Ứng dụng của bạn đã được deploy thành công!

**URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.railway.app`
- Database: MongoDB Atlas

**Next Steps:**
- Chia sẻ link với bạn bè
- Thêm custom domain
- Setup monitoring
- Thêm tính năng mới

---

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra logs trong dashboard
2. Xem phần Troubleshooting
3. Tạo issue trên GitHub
4. Liên hệ support của từng platform

**Happy Deploying! 🚀**
