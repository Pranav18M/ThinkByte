import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup pending request on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (loading) return;

      setError('');
      setLoading(true);

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (!trimmedEmail || !trimmedPassword) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      try {
        abortControllerRef.current = new AbortController();

        const response = await login(
          trimmedEmail,
          trimmedPassword,
          abortControllerRef.current.signal
        );

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        onLogin();
        navigate('/problems', { replace: true });
      } catch (err: any) {
        if (err.name === 'CanceledError') return;

        setError(err.response?.data?.error || 'Invalid email or password');
      } finally {
        setLoading(false);
      }
    },
    [email, password, loading, navigate, onLogin]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01084b] via-[#020d66] to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 border border-white/20">
            <img
              src="/ThinkByte.svg"
              alt="ThinkByte"
              className="w-16 h-16 drop-shadow-2xl"
              loading="lazy"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-blue-200 text-sm md:text-base">
            Sign in to continue your coding journey
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">

          {error && (
            <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium text-sm md:text-base">❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01084b] transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01084b] transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#01084b] to-[#020d66] text-white font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm md:text-base">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#01084b] font-semibold hover:underline"
              >
                Create one now →
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-blue-200 text-xs md:text-sm mt-6">
          © 2026 ThinkByte. All rights reserved.
        </p>
      </div>
    </div>
  );
}
