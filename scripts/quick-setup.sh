#!/bin/bash

# Script setup nhanh cho local development

echo "🚀 Quick Setup - Meu English"
echo ""

# Install root dependencies
echo "📦 Cài đặt root dependencies..."
npm install

# Install backend dependencies
echo "📦 Cài đặt backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "📦 Cài đặt frontend dependencies..."
cd ../frontend
npm install

cd ..

# Create .env files if not exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Tạo backend/.env từ .env.example..."
    cp .env.example backend/.env
    echo "⚠️  Vui lòng cập nhật backend/.env với thông tin thực tế"
fi

if [ ! -f "frontend/.env" ]; then
    echo "📝 Tạo frontend/.env..."
    echo "VITE_API_URL=http://localhost:5000/api" > frontend/.env
fi

echo ""
echo "✅ Setup hoàn tất!"
echo ""
echo "📋 Các bước tiếp theo:"
echo "  1. Cập nhật backend/.env với:"
echo "     - MONGODB_URI (MongoDB connection string)"
echo "     - JWT_SECRET (chạy: npm run generate-secret)"
echo "     - ANTHROPIC_API_KEY hoặc OPENAI_API_KEY"
echo ""
echo "  2. Seed dữ liệu:"
echo "     cd backend && npm run seed"
echo ""
echo "  3. Chạy ứng dụng:"
echo "     npm run dev"
echo ""
echo "  4. Truy cập:"
echo "     Frontend: http://localhost:5173"
echo "     Backend: http://localhost:5000"
