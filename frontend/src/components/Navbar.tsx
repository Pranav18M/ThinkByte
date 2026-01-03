import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
  <nav className="bg-white shadow-lg">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        
        <Link
          to="/problems"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <img
            src="/ThinkByte.svg"
            alt="ThinkByte Logo"
            className="w-8 h-8"
          />
          ThinkByte
        </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <Link
                to="/problems"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Problems
              </Link>
              <Link
                to="/submissions"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Submissions
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{user.name}</span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-blue-600 hover:text-blue-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}