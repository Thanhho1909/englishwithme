import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../context/authStore';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Meu English</span>
          </Link>

          {user && (
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                to="/translation"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Dịch thuật
              </Link>
              <Link
                to="/grammar"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Ngữ pháp
              </Link>
              <Link
                to="/vocabulary"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Từ vựng
              </Link>

              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-300">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.username}
                  </span>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                    Lv. {user.level}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
