import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblem, submitCode, runCode } from '../services/api';
import { Problem, SubmissionResult } from '../types';

interface RunResult {
  output: string;
  error?: string | null;
}

export default function ProblemDetail() {
  const { id } = useParams<{ id: string }>();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

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
      const res = await getProblem(id!);
      setProblem(res.data);
      setCode(res.data.starterCode.javascript);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    setRunning(true);
    setRunResult(null);

    try {
      const res = await runCode(id!, code, language);
      setRunResult({
        output: res.data.output ?? '',
        error: res.data.error ?? null
      });
    } catch (err: any) {
      setRunResult({
        output: '',
        error: err?.response?.data?.error || 'Execution failed'
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null);

    try {
      const res = await submitCode(id!, code, language);
      setResult(res.data);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Problem Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400">The problem you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-3 sm:p-4 md:p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          
          {/* LEFT - Problem Description */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden h-[calc(100vh-8rem)] flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{problem.title}</h1>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-100 border border-green-400' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-100 border border-yellow-400' :
                  'bg-red-500/20 text-red-100 border border-red-400'
                }`}>
                  {problem.difficulty || 'Hard'}
                </span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {problem.description}
                </pre>
              </div>
            </div>
          </div>

          {/* RIGHT - Code Editor & Results */}
          <div className="flex flex-col gap-3 sm:gap-4 h-[calc(100vh-8rem)]">
            
            {/* Controls Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                
                {/* Language Selector */}
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="appearance-none px-4 py-2.5 pr-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all cursor-pointer hover:border-blue-400"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleRun}
                    disabled={running}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-700 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {running ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Running...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        ▶ Run
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        ✓ Submit
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex-1 min-h-[300px]">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(v) => setCode(v || '')}
                theme="vs-dark"
                options={{ 
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  padding: { top: 16, bottom: 16 },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  renderLineHighlight: 'all',
                  cursorBlinking: 'smooth',
                }}
              />
            </div>

            {/* Run Output */}
            {runResult && (
              <div className="bg-slate-900 dark:bg-black rounded-xl shadow-lg border border-slate-700 dark:border-slate-800 overflow-hidden">
                <div className="bg-slate-800 dark:bg-slate-900 px-4 py-2 border-b border-slate-700 dark:border-slate-800">
                  <span className="text-white font-semibold text-sm flex items-center gap-2">
                    <span className="text-green-400">▶</span> Run Output
                  </span>
                </div>
                <div className="p-4 max-h-48 overflow-y-auto">
                  {runResult.error ? (
                    <pre className="text-red-400 text-sm font-mono whitespace-pre-wrap">
                      {runResult.error}
                    </pre>
                  ) : runResult.output.trim() ? (
                    <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                      {runResult.output}
                    </pre>
                  ) : (
                    <div className="text-yellow-400 text-sm flex items-center gap-2">
                      <span>⚠</span> No output
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submission Result */}
            {result && (
              <div className={`rounded-xl shadow-lg border overflow-hidden ${
                result.status === 'Accepted' 
                  ? 'bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-800'
              }`}>
                <div className={`px-4 py-3 border-b ${
                  result.status === 'Accepted'
                    ? 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-800'
                    : 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-lg ${
                      result.status === 'Accepted' 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {result.status === 'Accepted' ? '✓ ' : '✗ '}
                      {result.status}
                    </span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      result.status === 'Accepted'
                        ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                        : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                    }`}>
                      {result.passedCases}/{result.totalCases} passed
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          result.status === 'Accepted' 
                            ? 'bg-gradient-to-r from-green-500 to-green-600' 
                            : 'bg-gradient-to-r from-red-500 to-red-600'
                        }`}
                        style={{ width: `${(result.passedCases / result.totalCases) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {Math.round((result.passedCases / result.totalCases) * 100)}%
                    </span>
                  </div>
                  
                  {result.error && (
                    <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-red-200 dark:border-red-800">
                      <pre className="text-red-600 dark:text-red-400 text-sm font-mono whitespace-pre-wrap">
                        {result.error}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}