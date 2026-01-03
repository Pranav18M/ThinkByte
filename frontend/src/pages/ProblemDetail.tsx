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

  const getStatusColor = (status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Timeout') => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#01084b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#01084b] font-medium">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-[#01084b] mb-2">Problem Not Found</h2>
          <p className="text-gray-600">The problem you're looking for doesn't exist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 min-h-screen lg:h-screen">
        
        {/* Left Panel - Problem Description */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-[#01084b] to-[#020d66] p-4 sm:p-5 lg:p-6 text-white">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-3">{problem.title}</h1>
            <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
              <span className={`px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-xs sm:text-sm font-semibold ${
                problem.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400' :
                problem.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-200 border border-amber-400' :
                'bg-rose-500/20 text-rose-200 border border-rose-400'
              }`}>
                {problem.difficulty}
              </span>
              {problem.tags.map((tag) => (
                <span key={tag} className="px-2 lg:px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm rounded-lg border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="p-4 sm:p-5 lg:p-6 overflow-y-auto max-h-96 lg:h-[calc(100vh-14rem)]">
            <div className="prose max-w-none">
              <h3 className="text-base sm:text-lg font-bold text-[#01084b] mb-2 lg:mb-3">Description</h3>
              <div className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
                {problem.description}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex flex-col gap-3 lg:gap-4">
          
          {/* Editor Header */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'javascript' | 'python')}
                className="px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-[#01084b] to-[#020d66] text-white rounded-lg lg:rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer text-sm lg:text-base [&>option]:text-gray-900 [&>option]:bg-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>

              <div className="flex gap-2 lg:gap-3">
                <button
                  onClick={handleRun}
                  disabled={running}
                  className="flex-1 sm:flex-none px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg lg:rounded-xl text-sm lg:text-base font-semibold hover:from-gray-700 hover:to-gray-800 disabled:from-gray-300 disabled:to-gray-400 transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {running ? '⏳ Running...' : '▶️ Run'}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg lg:rounded-xl text-sm lg:text-base font-semibold hover:from-emerald-600 hover:to-emerald-700 disabled:from-emerald-300 disabled:to-emerald-400 transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {submitting ? '⏳ Submitting...' : '✓ Submit'}
                </button>
              </div>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-96 lg:flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'Fira Code', 'Consolas', monospace",
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
              }}
            />
          </div>

          {/* Run Result */}
          {runResult && (
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 border border-gray-100 max-h-64 overflow-y-auto">
              <h3 className="font-bold text-base sm:text-lg text-[#01084b] mb-2 lg:mb-3">🏃 Run Result</h3>
              <div className={`inline-flex items-center px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl mb-3 lg:mb-4 text-sm lg:text-base font-semibold border ${getStatusColor(runResult.status)}`}>
                {runResult.status}
              </div>
              <div className="space-y-2 lg:space-y-3 text-xs sm:text-sm">
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Input:</p>
                  <pre className="bg-gray-50 p-2 lg:p-3 rounded-lg border border-gray-200 overflow-x-auto text-xs">{JSON.stringify(runResult.input, null, 2)}</pre>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Expected Output:</p>
                  <pre className="bg-gray-50 p-2 lg:p-3 rounded-lg border border-gray-200 overflow-x-auto text-xs">{JSON.stringify(runResult.expectedOutput, null, 2)}</pre>
                </div>
                {runResult.error && (
                  <div className="bg-rose-50 border border-rose-200 p-2 lg:p-3 rounded-lg">
                    <p className="font-semibold text-rose-700">❌ Error:</p>
                    <pre className="text-rose-600 text-xs mt-1 whitespace-pre-wrap">{runResult.error}</pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submission Result */}
          {result && (
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 border border-gray-100">
              <h3 className="font-bold text-base sm:text-lg text-[#01084b] mb-2 lg:mb-3">📊 Submission Result</h3>
              <div className={`inline-flex items-center px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl mb-3 lg:mb-4 text-sm lg:text-base font-semibold border ${getStatusColor(result.status)}`}>
                {result.status}
              </div>
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 text-sm lg:text-base">Accuracy:</span>
                  <span className={`text-xl lg:text-2xl font-bold ${result.accuracy === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {result.accuracy.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 text-sm lg:text-base">Test Cases:</span>
                  <span className="text-base lg:text-lg font-semibold text-[#01084b]">
                    {result.passedCases} / {result.totalCases} passed
                  </span>
                </div>
                {result.error && (
                  <div className="bg-rose-50 border border-rose-200 p-3 lg:p-4 rounded-xl">
                    <p className="font-semibold text-rose-700 mb-2 text-sm lg:text-base">❌ Error:</p>
                    <pre className="text-xs sm:text-sm text-rose-600 whitespace-pre-wrap">{result.error}</pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}