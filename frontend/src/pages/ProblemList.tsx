import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProblems } from '../services/api';
import { Problem } from '../types';

export default function ProblemList() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchProblems();
  }, [filter]);

  const fetchProblems = async () => {
    try {
      const response = await getProblems(filter);
      setProblems(response.data);
    } catch (error) {
      console.error('Failed to fetch problems:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter problems based on search query
  const filteredProblems = problems.filter(problem =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-700 bg-green-50 border-green-300 dark:text-green-400 dark:bg-green-950 dark:border-green-800';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-300 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800';
      case 'Hard':
        return 'text-red-700 bg-red-50 border-red-300 dark:text-red-400 dark:bg-red-950 dark:border-red-800';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-300 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 dark:text-slate-300 font-semibold text-lg">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Problem Set
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                  Sharpen your coding skills with our curated challenges
                </p>
              </div>
              
              {/* Filter Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full sm:w-auto appearance-none pl-6 pr-12 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  <option value="">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems by title or tags..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {problems.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">Total Problems</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950 rounded-2xl p-6 shadow-lg border-2 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                {problems.filter(p => p.difficulty === 'Easy').length}
              </div>
              <div className="text-sm text-green-600 dark:text-green-500 font-medium mt-1">Easy</div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-950 rounded-2xl p-6 shadow-lg border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
                {problems.filter(p => p.difficulty === 'Medium').length}
              </div>
              <div className="text-sm text-yellow-600 dark:text-yellow-500 font-medium mt-1">Medium</div>
            </div>

            <div className="bg-red-50 dark:bg-red-950 rounded-2xl p-6 shadow-lg border-2 border-red-200 dark:border-red-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-red-700 dark:text-red-400">
                {problems.filter(p => p.difficulty === 'Hard').length}
              </div>
              <div className="text-sm text-red-600 dark:text-red-500 font-medium mt-1">Hard</div>
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-700 dark:via-purple-700 dark:to-blue-700">
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Problem
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider hidden sm:table-cell">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredProblems.map((problem, index) => (
                  <tr 
                    key={problem._id} 
                    className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200 group"
                  >
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <Link
                        to={`/problems/${problem._id}`}
                        className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-200"
                      >
                        <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-sm sm:text-base font-bold shadow-md group-hover:shadow-lg transition-shadow">
                          {index + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-semibold text-sm sm:text-base transition-colors">
                            {problem.title}
                          </span>
                          {/* Tags for mobile */}
                          <div className="flex flex-wrap gap-1 mt-1 sm:hidden">
                            {problem.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <span
                        className={`inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 shadow-sm ${getDifficultyColor(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 hidden sm:table-cell">
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 mt-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">No problems found</h3>
            <p className="text-slate-600 dark:text-slate-400">
              {searchQuery ? 'Try a different search term' : 'Try adjusting your filters to see more problems'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}