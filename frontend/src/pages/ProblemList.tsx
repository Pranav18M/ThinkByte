import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProblems } from '../services/api';
import { Problem } from '../types';

export default function ProblemList() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#01084b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#01084b] font-medium">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-[#01084b] mb-2">Problem Set</h1>
              <p className="text-gray-600">Sharpen your coding skills with our curated challenges</p>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01084b] focus:border-transparent shadow-sm hover:border-[#01084b] transition-all font-medium text-gray-700"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-[#01084b]">{problems.length}</div>
              <div className="text-sm text-gray-600">Total Problems</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-700">{problems.filter(p => p.difficulty === 'Easy').length}</div>
              <div className="text-sm text-emerald-600">Easy</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="text-2xl font-bold text-amber-700">{problems.filter(p => p.difficulty === 'Medium').length}</div>
              <div className="text-sm text-amber-600">Medium</div>
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#01084b] to-[#020d66]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Problem
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {problems.map((problem, index) => (
                  <tr 
                    key={problem._id} 
                    className="hover:bg-blue-50 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-5">
                      <Link
                        to={`/problems/${problem._id}`}
                        className="flex items-center gap-3 group-hover:translate-x-1 transition-transform"
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#01084b] to-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                          {index + 1}
                        </span>
                        <span className="text-[#01084b] hover:text-blue-600 font-semibold text-base">
                          {problem.title}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border ${getDifficultyColor(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-[#01084b] text-xs font-medium rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
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

        {problems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No problems found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}