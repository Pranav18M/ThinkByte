import { useState, useEffect } from 'react';
import { getSubmissions } from '../services/api';
import { Submission } from '../types';

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await getSubmissions();
      setSubmissions(response.data);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-700 bg-green-50 border-green-300 dark:text-green-400 dark:bg-green-950 dark:border-green-800';
      case 'Wrong Answer':
        return 'text-red-700 bg-red-50 border-red-300 dark:text-red-400 dark:bg-red-950 dark:border-red-800';
      case 'Runtime Error':
        return 'text-orange-700 bg-orange-50 border-orange-300 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800';
      case 'Timeout':
        return 'text-purple-700 bg-purple-50 border-purple-300 dark:text-purple-400 dark:bg-purple-950 dark:border-purple-800';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-300 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 dark:text-slate-300 font-semibold text-lg">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Your Submissions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Track your progress and review past attempts
          </p>
        </div>

        {submissions.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {submissions.length}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">Total Submissions</div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <span className="text-xl sm:text-2xl">📝</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-2xl p-4 sm:p-6 shadow-lg border border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-400">
                    {submissions.filter(s => s.status === 'Accepted').length}
                  </div>
                  <div className="text-xs sm:text-sm text-green-600 dark:text-green-500 font-medium mt-1">Accepted</div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500 dark:bg-green-600 flex items-center justify-center shadow-lg">
                  <span className="text-xl sm:text-2xl">✓</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-2xl p-4 sm:p-6 shadow-lg border border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-700 dark:text-yellow-400">
                    {Math.round(submissions.reduce((sum, s) => sum + s.accuracy, 0) / submissions.length)}%
                  </div>
                  <div className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-500 font-medium mt-1">Avg Accuracy</div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-500 dark:bg-yellow-600 flex items-center justify-center shadow-lg">
                  <span className="text-xl sm:text-2xl">📊</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400">
                    {new Set(submissions.map(s => s.problemId?._id).filter(Boolean)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-500 font-medium mt-1">Problems Attempted</div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500 dark:bg-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-xl sm:text-2xl">🎯</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-700 dark:via-purple-700 dark:to-blue-700">
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Problem
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider hidden md:table-cell">
                    Language
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider hidden lg:table-cell">
                    Accuracy
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider hidden sm:table-cell">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {submissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200">
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                          {submission.problemId?.title ?? 'Problem Deleted'}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            submission.problemId?.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                            submission.problemId?.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {submission.problemId?.difficulty ?? '—'}
                          </span>
                          <span className="md:hidden text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-medium">
                            {submission.language}
                          </span>
                        </div>
                        {/* Mobile Accuracy */}
                        <div className="lg:hidden mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden max-w-[100px]">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  submission.accuracy === 100 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                  submission.accuracy >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                                  'bg-gradient-to-r from-red-400 to-red-500'
                                }`}
                                style={{ width: `${submission.accuracy}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              {submission.accuracy.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 hidden md:table-cell">
                      <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-200 dark:border-blue-800">
                        {submission.language}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <span className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 hidden lg:table-cell">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden max-w-[140px]">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              submission.accuracy === 100 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                              submission.accuracy >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                              'bg-gradient-to-r from-red-400 to-red-500'
                            }`}
                            style={{ width: `${submission.accuracy}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-bold ${
                          submission.accuracy === 100 ? 'text-green-600 dark:text-green-400' :
                          submission.accuracy >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {submission.accuracy.toFixed(0)}%
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        {submission.passedCases}/{submission.totalCases} tests passed
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hidden sm:table-cell">
                      {formatDate(submission.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {submissions.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center border-4 border-blue-200 dark:border-blue-800 shadow-lg">
              <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">No submissions yet</h3>
            <p className="text-slate-600 dark:text-slate-400">Start solving problems to see your submission history</p>
          </div>
        )}
      </div>
    </div>
  );
}