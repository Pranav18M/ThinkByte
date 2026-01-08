import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';
import Submissions from './pages/Submissions';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        
        {isAuthenticated && (
          <Navbar
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />
        )}

        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/problems" />
              ) : (
                <Login onLogin={() => setIsAuthenticated(true)} />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/problems" />
              ) : (
                <Register onRegister={() => setIsAuthenticated(true)} />
              )
            }
          />

          <Route
            path="/problems"
            element={
              isAuthenticated ? <ProblemList /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/problems/:id"
            element={
              isAuthenticated ? <ProblemDetail /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/submissions"
            element={
              isAuthenticated ? <Submissions /> : <Navigate to="/login" />
            }
          />

          <Route path="/" element={<Navigate to="/problems" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;