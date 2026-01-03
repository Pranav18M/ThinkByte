import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#01084b] to-[#020d66] shadow-2xl border-b border-blue-900/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          <Link
            to="/problems"
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img
                src="/ThinkByte.svg"
                alt="ThinkByte"
                className="w-8 h-8 sm:w-10 sm:h-10 relative z-10 drop-shadow-2xl"
              />
            </div>
            <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent tracking-tight">
              ThinkByte
            </span>
          </Link>

          {/* Mobile menu button */}
          {isAuthenticated && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}

          {/* Desktop menu */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link
                to="/problems"
                className="text-white/90 hover:text-white font-medium text-sm lg:text-base transition-all duration-200 hover:scale-105 relative group"
              >
                Problems
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/submissions"
                className="text-white/90 hover:text-white font-medium text-sm lg:text-base transition-all duration-200 hover:scale-105 relative group"
              >
                Submissions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <div className="flex items-center space-x-4 pl-4 border-l border-white/20">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 lg:px-4 py-2 rounded-full border border-white/20">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white font-medium text-sm lg:text-base hidden lg:block">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm lg:text-base"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-3 sm:space-x-4">
              <Link
                to="/login"
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-white text-sm sm:text-base font-medium hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm sm:text-base font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              to="/problems"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white/90 hover:text-white font-medium py-2"
            >
              Problems
            </Link>
            <Link
              to="/submissions"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white/90 hover:text-white font-medium py-2"
            >
              Submissions
            </Link>
            <div className="pt-3 border-t border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-medium">{user.name}</span>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}