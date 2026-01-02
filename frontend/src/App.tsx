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

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8">
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
      </div>
    </BrowserRouter>
  );
}

export default App;