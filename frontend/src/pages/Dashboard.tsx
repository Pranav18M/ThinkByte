import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "💻",
      title: "Solve Problems",
      description: "Practice coding challenges to sharpen your skills"
    },
    {
      icon: "🐍",
      title: "Python & JavaScript",
      description: "Code in your preferred language"
    },
    {
      icon: "📝",
      title: "Submit Solutions",
      description: "Get instant feedback on your code"
    },
    {
      icon: "📊",
      title: "Track Progress",
      description: "Monitor your submission history"
    },
    {
      icon: "⚡",
      title: "Real-time Testing",
      description: "Run test cases and debug instantly"
    },
    {
      icon: "🎯",
      title: "Master Algorithms",
      description: "Build strong programming fundamentals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Mobile Hero Section */}
      <div className="lg:hidden relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-6 py-12">
        <div className="absolute inset-0 bg-[url('/dashboard.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-3 leading-tight">
            Explore<br />ThinkByte
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Solve coding problems and track your progress
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        
        {/* Desktop Left Side - Fixed Image */}
        <div className="hidden lg:flex lg:w-2/5 xl:w-1/3 lg:fixed lg:left-0 lg:top-[80px] lg:h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 items-center justify-center p-8 xl:p-12 overflow-hidden">
          <div className="relative w-full max-w-md xl:max-w-lg">
            <img
              src="/dashboard.jpg"
              alt="Dashboard"
              className="w-full h-auto object-contain drop-shadow-2xl animate-float-slow"
            />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-gradient-to-b from-blue-400/30 to-transparent blur-2xl rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:ml-[40%] xl:ml-[33.333%] lg:w-[60%] xl:w-[66.667%] px-6 sm:px-8 lg:px-10 xl:px-16 py-8 sm:py-10 lg:py-14">
          
          {/* Desktop Header */}
          <div className="hidden lg:block mb-12">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
              Explore ThinkByte
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Your platform for solving coding problems with Python and JavaScript
            </p>
          </div>

          {/* Features Section */}
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              What You Can Do
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 sm:p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl sm:text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Support */}
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Supported Languages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="text-4xl mb-3">🐍</div>
                <h3 className="text-xl font-bold mb-2">Python</h3>
                <p className="text-blue-100 text-sm">Clean, readable syntax for elegant solutions</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-xl font-bold mb-2">JavaScript</h3>
                <p className="text-yellow-100 text-sm">Modern features for powerful solutions</p>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center mb-10 shadow-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Ready to Code?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg mb-6 leading-relaxed">
              Start solving problems and improve your skills
            </p>
            <button 
              onClick={() => navigate('/problems')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-bold text-base sm:text-lg rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Browse Problems
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                30+
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold">
                Problems
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                2
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold">
                Languages
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                ∞
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold">
                Practice
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                24/7
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold">
                Available
              </div>
            </div>
          </div>

          <div className="h-8"></div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        @media (min-width: 1024px) {
          .lg\\:fixed {
            position: fixed;
          }
        }
        
        @media (max-height: 800px) and (min-width: 1024px) {
          .lg\\:top-\\[80px\\] { top: 60px; }
          .lg\\:h-\\[calc\\(100vh-80px\\)\\] { height: calc(100vh - 60px); }
        }
      `}</style>
    </div>
  );
}