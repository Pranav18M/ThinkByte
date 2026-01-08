import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function Navbar({
  isAuthenticated,
  onLogout,
  darkMode,
  toggleTheme
}: NavbarProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 shadow-lg border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo */}
          <Link to="/problems" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <img src="/ThinkByte.svg" className="w-9 h-9 sm:w-10 sm:h-10 relative z-10 drop-shadow-lg" alt="ThinkByte Logo" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-white via-cyan-100 to-sky-200 bg-clip-text text-transparent">
              ThinkByte
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <NavLink to="/problems">Problems</NavLink>
              <NavLink to="/submissions">Submissions</NavLink>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95"
                title="Toggle Theme"
                aria-label="Toggle Theme"
              >
                <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full border border-white/20 transition-all duration-300 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg text-base">
                  {user.name?.charAt(0)?.toUpperCase() || 'P'}
                </div>
                <span className="text-white font-medium hidden lg:block">
                  {user.name || 'User'}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isAuthenticated && (
            <div className="md:hidden flex items-center gap-3">
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
                title="Toggle Theme"
                aria-label="Toggle Theme"
              >
                <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
              </button>

              {/* Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
                aria-label="Toggle Menu"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && (
          <div
            className={`
              md:hidden
              overflow-hidden
              transition-all duration-300 ease-in-out
              ${mobileMenuOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="mt-4 p-4 space-y-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl">
              
              {/* Profile Section Mobile */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {user.name?.charAt(0)?.toUpperCase() || 'P'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {user.email || ''}
                  </p>
                </div>
              </div>

              <MobileLink to="/problems" onClick={() => setMobileMenuOpen(false)}>
                Problems
              </MobileLink>

              <MobileLink to="/submissions" onClick={() => setMobileMenuOpen(false)}>
                Submissions
              </MobileLink>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 transform active:scale-95"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const NavLink = ({ to, children }: any) => (
  <Link
    to={to}
    className="text-white/90 hover:text-white font-medium relative group transition-colors duration-300 text-sm lg:text-base"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-300 to-sky-300 group-hover:w-full transition-all duration-300"></span>
  </Link>
);

const MobileLink = ({
  to,
  onClick,
  children
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block w-full px-4 py-3 rounded-xl text-slate-800 dark:text-slate-100 font-medium hover:bg-gradient-to-r hover:from-cyan-50 hover:to-sky-50 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300"
  >
    {children}
  </Link>
);