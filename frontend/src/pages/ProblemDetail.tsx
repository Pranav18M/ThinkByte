import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblem, submitCode, runCode } from '../services/api';
import { Problem, SubmissionResult, RunResult } from '../types';

export default function ProblemDetail() {
  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [runResult, setRunResult] = useState<RunResult | null>(null);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language]);
    }
  }, [language, problem]);

  const fetchProblem = async () => {
    try {
      const response = await getProblem(id!);
      setProblem(response.data);
      setCode(response.data.starterCode.javascript);
    } catch (error) {
      console.error('Failed to fetch problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    setRunning(true);
    setRunResult(null);
    try {
      const response = await runCode(id!, code, language);
      setRunResult(response.data);
    } catch (error) {
      console.error('Run failed:', error);
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    try {
      const response = await submitCode(id!, code, language);
      setResult(response.data);
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (
  status:
    | 'Accepted'
    | 'Wrong Answer'
    | 'Runtime Error'
    | 'Timeout'
) => {
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


  if (loading) {
    return <div className="text-center py-8">Loading problem...</div>;
  }

  if (!problem) {
    return <div className="text-center py-8">Problem not found</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
      <div className="bg-white p-6 rounded-lg shadow overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
        
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            problem.difficulty === 'Easy' ? 'text-green-600 bg-green-100' :
            problem.difficulty === 'Medium' ? 'text-yellow-600 bg-yellow-100' :
            'text-red-600 bg-red-100'
          }`}>
            {problem.difficulty}
          </span>
        </div>

        <div className="mb-4">
          {problem.tags.map((tag) => (
            <span key={tag} className="mr-2 px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="whitespace-pre-wrap">{problem.description}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between items-center mb-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'javascript' | 'python')}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>

            <div className="space-x-2">
              <button
                onClick={handleRun}
                disabled={running}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-300"
              >
                {running ? 'Running...' : 'Run'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>

          <Editor
            height="400px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>

        {runResult && (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="font-semibold mb-2">Run Result</h3>

    <div className={`inline-block px-3 py-1 rounded mb-3 ${getStatusColor(runResult.status)}`}>
      {runResult.status}
    </div>

    <div className="space-y-2 text-sm">
      <p><span className="font-semibold">Input:</span></p>
      <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(runResult.input, null, 2)}</pre>

      <p><span className="font-semibold">Your Output:</span></p>
      <pre className="bg-gray-100 p-2 rounded">{runResult.output}</pre>

      <p><span className="font-semibold">Expected Output:</span></p>
      <pre className="bg-gray-100 p-2 rounded">
        {JSON.stringify(runResult.expectedOutput, null, 2)}
      </pre>

      {runResult.error && (
        <p className="text-red-600 mt-2">Error: {runResult.error}</p>
      )}
    </div>
  </div>
)}

        {result && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Submission Result</h3>
            <div className={`px-3 py-2 rounded mb-3 ${getStatusColor(result.status)}`}>
              <span className="font-medium">{result.status}</span>
            </div>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Accuracy:</span>{' '}
                <span className={result.accuracy === 100 ? 'text-green-600' : 'text-orange-600'}>
                  {result.accuracy.toFixed(1)}%
                </span>
              </p>
              <p>
                <span className="font-semibold">Test Cases:</span>{' '}
                {result.passedCases} / {result.totalCases} passed
              </p>
              {result.error && (
                <div className="mt-3 p-3 bg-red-50 rounded">
                  <p className="font-semibold text-red-700">Error:</p>
                  <pre className="text-sm text-red-600 whitespace-pre-wrap">{result.error}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}