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
        return 'text-green-600 bg-green-100';
      case 'Wrong Answer':
        return 'text-red-600 bg-red-100';
      case 'Runtime Error':
        return 'text-orange-600 bg-orange-100';
      case 'Timeout':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="text-center py-8">Loading submissions...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Submissions</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Problem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Language
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Accuracy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Submitted
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {submission.problemId.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {submission.problemId.difficulty}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                    {submission.language}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      submission.status
                    )}`}
                  >
                    {submission.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className={`font-medium ${
                      submission.accuracy === 100 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {submission.accuracy.toFixed(1)}%
                    </div>
                    <div className="text-gray-500">
                      {submission.passedCases}/{submission.totalCases}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(submission.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {submissions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No submissions yet
        </div>
      )}
    </div>
  );
}