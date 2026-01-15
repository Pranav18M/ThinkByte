import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblem, submitCode, runCode } from '../services/api';
import { Problem, SubmissionResult, RunResult} from '../types';

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
  const [activeTab, setActiveTab] = useState<'description' | 'examples' | 'hints'>('description');
  const [showTestCases, setShowTestCases] = useState(false);

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
    setResult(null);

    try {
      const res = await runCode(id!, code, language);
      setRunResult(res.data);
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
    setRunResult(null);

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
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{problem.title}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                  problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-100 border-green-400' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-100 border-yellow-400' :
                  'bg-red-500/20 text-red-100 border-red-400'
                }`}>
                  {problem.difficulty}
                </span>
                {problem.acceptanceRate !== undefined && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                    Acceptance: {problem.acceptanceRate.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-3 font-semibold text-sm transition-all ${
                  activeTab === 'description'
                    ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400 bg-white dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Description
              </button>
              {problem.examples && problem.examples.length > 0 && (
                <button
                  onClick={() => setActiveTab('examples')}
                  className={`px-6 py-3 font-semibold text-sm transition-all ${
                    activeTab === 'examples'
                      ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400 bg-white dark:bg-slate-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Examples
                </button>
              )}
              {problem.hints && problem.hints.length > 0 && (
                <button
                  onClick={() => setActiveTab('hints')}
                  className={`px-6 py-3 font-semibold text-sm transition-all ${
                    activeTab === 'hints'
                      ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400 bg-white dark:bg-slate-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Hints
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {problem.description}
                    </pre>
                  </div>

                  {problem.constraints && (
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Constraints:</h3>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Time Limit: {problem.constraints.timeLimit}ms</li>
                        <li>• Memory Limit: {problem.constraints.memoryLimit}MB</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'examples' && problem.examples && (
                <div className="space-y-4">
                  {problem.examples.map((example, idx) => (
                    <div key={idx} className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Example {idx + 1}:</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Input:</span>
                          <pre className="mt-1 p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
                            {example.input}
                          </pre>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Output:</span>
                          <pre className="mt-1 p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
                            {example.output}
                          </pre>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Explanation:</span>
                            <p className="mt-1 text-slate-600 dark:text-slate-400">{example.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'hints' && problem.hints && (
                <div className="space-y-3">
                  {problem.hints.map((hint, idx) => (
                    <div key={idx} className="bg-yellow-50 dark:bg-yellow-950 rounded-xl p-4 border-l-4 border-yellow-500">
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-bold">Hint {idx + 1}:</span> {hint}
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
                    className="appearance-none px-4 py-2.5 pr-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium border-2 border-slate-300 dark:border-slate-600 focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-all cursor-pointer hover:border-cyan-400"
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
                      '▶ Run'
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
                      '✓ Submit'
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

            {/* Run Output with Test Cases */}
            {runResult && (
              <div className="bg-slate-900 dark:bg-black rounded-xl shadow-lg border border-slate-700 dark:border-slate-800 overflow-hidden max-h-64 flex flex-col">
                <div className="bg-slate-800 dark:bg-slate-900 px-4 py-2 border-b border-slate-700 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm flex items-center gap-2">
                    <span className="text-green-400">▶</span> Run Output
                  </span>
                  {runResult.testCaseResults && runResult.testCaseResults.length > 0 && (
                    <button
                      onClick={() => setShowTestCases(!showTestCases)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {showTestCases ? 'Hide' : 'Show'} Test Cases
                    </button>
                  )}
                </div>
                <div className="p-4 overflow-y-auto flex-1">
                  {runResult.error ? (
                    <pre className="text-red-400 text-sm font-mono whitespace-pre-wrap">
                      {runResult.error}
                    </pre>
                  ) : showTestCases && runResult.testCaseResults ? (
                    <div className="space-y-2">
                      {runResult.testCaseResults.map((tc, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border ${
                          tc.passed 
                            ? 'bg-green-950 border-green-800' 
                            : 'bg-red-950 border-red-800'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-semibold text-sm ${tc.passed ? 'text-green-400' : 'text-red-400'}`}>
                              Test Case {tc.testCaseNumber}: {tc.passed ? '✓ Passed' : '✗ Failed'}
                            </span>
                            <span className="text-xs text-slate-400">{tc.executionTime}ms</span>
                          </div>
                          {!tc.passed && (
                            <div className="text-xs space-y-1">
                              <div><span className="text-slate-400">Input:</span> <span className="text-white">{JSON.stringify(tc.input)}</span></div>
                              <div><span className="text-slate-400">Expected:</span> <span className="text-green-400">{JSON.stringify(tc.expectedOutput)}</span></div>
                              <div><span className="text-slate-400">Got:</span> <span className="text-red-400">{JSON.stringify(tc.actualOutput)}</span></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className={`font-bold text-lg ${
                      result.status === 'Accepted' 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {result.status === 'Accepted' ? '✓ ' : '✗ '}
                      {result.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        result.status === 'Accepted'
                          ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                          : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                      }`}>
                        {result.passedCases}/{result.totalCases} passed
                      </span>
                      {result.executionTime && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {result.executionTime}ms
                        </span>
                      )}
                      {result.memoryUsed && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {result.memoryUsed.toFixed(1)}MB
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
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

                  {result.failedTestCase && result.failedTestCase.input !== 'hidden' && (
                    <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-red-200 dark:border-red-800">
                      <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2">Failed Test Case {result.failedTestCase.testCaseNumber}:</h4>
                      <div className="text-xs space-y-1 font-mono">
                        <div><span className="text-slate-600 dark:text-slate-400">Input:</span> <span className="text-slate-800 dark:text-slate-100">{JSON.stringify(result.failedTestCase.input)}</span></div>
                        <div><span className="text-slate-600 dark:text-slate-400">Expected:</span> <span className="text-green-600 dark:text-green-400">{JSON.stringify(result.failedTestCase.expectedOutput)}</span></div>
                        <div><span className="text-slate-600 dark:text-slate-400">Your Output:</span> <span className="text-red-600 dark:text-red-400">{JSON.stringify(result.failedTestCase.actualOutput)}</span></div>
                      </div>
                    </div>
                  )}
                  
                  {result.error && (
                    <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-red-200 dark:border-red-800">
                      <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2">Error:</h4>
                      <pre className="text-red-600 dark:text-red-400 text-xs font-mono whitespace-pre-wrap">
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