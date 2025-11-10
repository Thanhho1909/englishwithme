#!/bin/bash

# Script tạo JWT secret ngẫu nhiên

echo "🔐 Tạo JWT Secret..."
echo ""

SECRET=$(openssl rand -base64 32)

echo "JWT_SECRET=$SECRET"
echo ""
echo "📋 Copy dòng trên và thêm vào:"
echo "   - backend/.env (cho local)"
echo "   - Railway/Render environment variables (cho production)"
