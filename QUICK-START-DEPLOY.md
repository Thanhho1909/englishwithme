# 🚀 Quick Start Deploy - 15 Phút

Hướng dẫn deploy nhanh Meu English lên production trong **15 phút**.

## ⚡ Checklist 15 Phút

### ☁️ Bước 1: Setup MongoDB Atlas (3 phút)

1. Vào [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register)
2. Đăng ký → Tạo FREE cluster (M0 Sandbox)
3. Chọn AWS + Singapore region
4. Database Access → Add user (username: `meuenglish`, tạo password)
5. Network Access → Allow 0.0.0.0/0
6. Copy connection string:
   ```
   mongodb+srv://meuenglish:PASSWORD@cluster.xxxxx.mongodb.net/meu-english
   ```

✅ Done! Lưu connection string lại.

---

### 🚂 Bước 2: Deploy Backend lên Railway (5 phút)

1. Vào [railway.app](https://railway.app) → Login with GitHub
2. New Project → Deploy from GitHub repo → Chọn `englishwithme`
3. Chọn thư mục `backend`
4. Add Variables:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<paste connection string từ bước 1>
   JWT_SECRET=<chạy: openssl rand -base64 32>
   ANTHROPIC_API_KEY=<your key>
   CORS_ORIGIN=*
   ```
5. Deploy → Copy URL: `https://xxxxx.railway.app`

✅ Test: Vào `https://xxxxx.railway.app/health`

---

### ▲ Bước 3: Deploy Frontend lên Vercel (5 phút)

1. Vào [vercel.com](https://vercel.com) → Login with GitHub
2. Add New Project → Import `englishwithme`
3. Configure:
   - Framework: **Vite**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Environment Variables:
   ```env
   VITE_API_URL=https://xxxxx.railway.app/api
   ```
   (Thay `xxxxx.railway.app` bằng URL Railway từ bước 2)
5. Deploy → Copy URL: `https://xxxxx.vercel.app`

✅ Done!

---

### 🔄 Bước 4: Update CORS (2 phút)

1. Quay lại Railway
2. Update biến `CORS_ORIGIN`:
   ```env
   CORS_ORIGIN=https://xxxxx.vercel.app
   ```
   (Thay bằng URL Vercel từ bước 3)
3. Redeploy

✅ Hoàn tất!

---

## 🎯 URLs Cuối Cùng

```
Frontend: https://your-app.vercel.app
Backend:  https://your-app.railway.app
Database: MongoDB Atlas
```

---

## 🧪 Test Deployment

1. Vào frontend URL
2. Đăng ký tài khoản mới
3. Đăng nhập
4. Test 3 tính năng:
   - ✅ Phòng Luyện Dịch
   - ✅ Phòng Ngữ Pháp
   - ✅ Kho Từ Vựng

---

## 🐛 Nếu Có Lỗi

### Frontend không kết nối Backend
→ Kiểm tra `VITE_API_URL` trong Vercel

### Backend crash
→ Xem logs trong Railway → Kiểm tra `MONGODB_URI`

### CORS error
→ Cập nhật `CORS_ORIGIN` trong Railway

---

## 📚 Xem Thêm

Chi tiết đầy đủ: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 💡 Pro Tips

### Auto Deploy
- Push code lên GitHub → Tự động deploy cả frontend và backend
- Không cần làm gì thêm!

### Seed Data
```bash
# Local
cd backend
MONGODB_URI="<atlas-uri>" npm run seed

# Hoặc thêm seed script trong Railway
```

### Monitor
- Railway: Xem logs, metrics
- Vercel: Analytics, Web Vitals
- MongoDB: Database metrics

---

## ✅ Checklist

- [ ] MongoDB Atlas cluster đã tạo
- [ ] Backend deployed trên Railway
- [ ] Frontend deployed trên Vercel
- [ ] CORS_ORIGIN đã update
- [ ] Test 3 tính năng chính
- [ ] Seed dữ liệu (optional)

---

**Chúc mừng! Ứng dụng đã live! 🎉**

Share link: `https://your-app.vercel.app`
