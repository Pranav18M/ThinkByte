import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Welcome() {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/login.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  const handleSignIn = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/login');
    }, 600);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 transition-all duration-700 ${isTransitioning ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
      
      {/* Optimized Background Image with Loading State */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <img
          src="/login.jpg"
          alt="ThinkByte Platform"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/60 to-purple-800/70"></div>
      </div>

      {/* Content Overlay - Immediate Load */}
      <div className={`relative z-10 min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-20 xl:px-32 transition-all duration-700 ${isTransitioning ? 'translate-x-[-100px] opacity-0' : 'translate-x-0 opacity-100'}`}>
        <div className="max-w-2xl animate-fadeInUp">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-6 sm:mb-8 leading-tight drop-shadow-2xl">
            Welcome to<br />ThinkByte
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-10 leading-relaxed max-w-xl drop-shadow-lg">
            The best platform to enhance your skills, expand your knowledge and prepare for technical interviews.
          </p>

          <button
            onClick={handleSignIn}
            disabled={isTransitioning}
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-white text-purple-900 font-bold text-base sm:text-lg rounded-xl hover:bg-purple-50 transition-all duration-300 shadow-2xl hover:shadow-white/30 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @media (max-width: 640px) {
          .min-h-screen { min-height: 100dvh; }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        }
        
        @media (max-height: 700px) {
          h1 { font-size: 3rem; margin-bottom: 1.5rem; }
          p { font-size: 1.125rem; margin-bottom: 1.5rem; }
        }
        
        @media (max-height: 600px) {
          h1 { font-size: 2.5rem; margin-bottom: 1rem; }
          p { font-size: 1rem; margin-bottom: 1rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeInUp {
            animation: none;
            opacity: 1;
          }
          .transition-all {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}