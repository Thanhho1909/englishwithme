#!/bin/bash

# Script kiểm tra cấu hình trước khi deploy

echo "🔍 Kiểm tra cấu hình deployment..."
echo ""

# Check if .env exists in backend
if [ ! -f "backend/.env" ]; then
    echo "❌ THIẾU: backend/.env"
    echo "   Tạo file .env trong thư mục backend với các biến cần thiết"
    exit 1
else
    echo "✅ backend/.env exists"
fi

# Check if MONGODB_URI is set
if ! grep -q "MONGODB_URI" backend/.env; then
    echo "❌ THIẾU: MONGODB_URI trong backend/.env"
    exit 1
else
    echo "✅ MONGODB_URI configured"
fi

# Check if JWT_SECRET is set
if ! grep -q "JWT_SECRET" backend/.env; then
    echo "❌ THIẾU: JWT_SECRET trong backend/.env"
    exit 1
else
    echo "✅ JWT_SECRET configured"
fi

# Check if AI key is set
if ! grep -q "ANTHROPIC_API_KEY\|OPENAI_API_KEY" backend/.env; then
    echo "⚠️  CẢNH BÁO: Không có ANTHROPIC_API_KEY hoặc OPENAI_API_KEY"
    echo "   Tính năng dịch thuật sẽ không hoạt động"
else
    echo "✅ AI API key configured"
fi

# Check if frontend env exists
if [ ! -f "frontend/.env" ]; then
    echo "⚠️  CẢNH BÁO: frontend/.env không tồn tại"
    echo "   Tạo file này với VITE_API_URL khi deploy lên production"
else
    echo "✅ frontend/.env exists"
fi

# Check if node_modules exists
if [ ! -d "backend/node_modules" ]; then
    echo "⚠️  CẢNH BÁO: backend/node_modules chưa được cài đặt"
    echo "   Chạy: cd backend && npm install"
else
    echo "✅ backend dependencies installed"
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "⚠️  CẢNH BÁO: frontend/node_modules chưa được cài đặt"
    echo "   Chạy: cd frontend && npm install"
else
    echo "✅ frontend dependencies installed"
fi

echo ""
echo "📋 Checklist Deploy:"
echo "  1. ✅ Đã tạo MongoDB Atlas cluster"
echo "  2. ✅ Đã cấu hình environment variables"
echo "  3. ✅ Đã cài đặt dependencies"
echo "  4. ⏳ Đã test local (chạy: npm run dev)"
echo "  5. ⏳ Đã seed dữ liệu (chạy: cd backend && npm run seed)"
echo "  6. ⏳ Đã commit code lên GitHub"
echo "  7. ⏳ Đã tạo project trên Vercel"
echo "  8. ⏳ Đã tạo project trên Railway/Render"
echo ""
echo "📖 Xem hướng dẫn chi tiết trong DEPLOYMENT.md"
