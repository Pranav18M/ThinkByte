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
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Wrong Answer':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'Runtime Error':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Timeout':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#01084b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#01084b] font-medium">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-6">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#01084b] mb-2">Your Submissions</h1>
          <p className="text-gray-600">Track your progress and review past attempts</p>
        </div>

        {submissions.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-[#01084b]">{submissions.length}</div>
              <div className="text-sm text-gray-600">Total Submissions</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-700">
                {submissions.filter(s => s.status === 'Accepted').length}
              </div>
              <div className="text-sm text-emerald-600">Accepted</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="text-2xl font-bold text-amber-700">
                {Math.round(submissions.reduce((sum, s) => sum + s.accuracy, 0) / submissions.length)}%
              </div>
              <div className="text-sm text-amber-600">Avg Accuracy</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">
                {new Set(submissions.map(s => s.problemId?._id).filter(Boolean)).size}
              </div>
              <div className="text-sm text-blue-600">Problems Attempted</div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#01084b] to-[#020d66]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Problem
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-5">
                      <div>
                        <div className="font-semibold text-[#01084b]">
                          {submission.problemId?.title ?? 'Problem Deleted'}
                        </div>
                        <div className={`text-xs font-medium mt-1 ${
                          submission.problemId?.difficulty === 'Easy' ? 'text-emerald-600' :
                          submission.problemId?.difficulty === 'Medium' ? 'text-amber-600' :
                          'text-rose-600'
                        }`}>
                          {submission.problemId?.difficulty ?? '—'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-blue-50 text-[#01084b] text-sm font-medium rounded-lg border border-blue-100">
                        {submission.language}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden max-w-[120px]">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              submission.accuracy === 100 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                              submission.accuracy >= 50 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                              'bg-gradient-to-r from-rose-400 to-rose-500'
                            }`}
                            style={{ width: `${submission.accuracy}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-bold ${
                          submission.accuracy === 100 ? 'text-emerald-600' :
                          submission.accuracy >= 50 ? 'text-amber-600' :
                          'text-rose-600'
                        }`}>
                          {submission.accuracy.toFixed(0)}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {submission.passedCases}/{submission.totalCases} tests passed
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {formatDate(submission.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {submissions.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border-4 border-blue-200">
              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No submissions yet</h3>
            <p className="text-gray-500">Start solving problems to see your submission history</p>
          </div>
        )}
      </div>
    </div>
  );
}