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

  // =========================
  // RUN (REAL VS CODE MODE)
  // =========================
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

  // =========================
  // SUBMIT (JUDGE MODE)
  // =========================
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

  if (loading) return <div className="p-10">Loading...</div>;
  if (!problem) return <div className="p-10">Problem not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* LEFT */}
      <div className="bg-white rounded-xl shadow p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">
          {problem.description}
        </pre>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-3">
        {/* CONTROLS */}
        <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="px-3 py-2 rounded bg-gray-800 text-white"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={handleRun}
              disabled={running}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
              {running ? 'Running...' : 'Run'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        {/* EDITOR */}
        <div className="bg-white rounded-xl shadow overflow-hidden h-96">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(v) => setCode(v || '')}
            theme="vs-dark"
            options={{ minimap: { enabled: false } }}
          />
        </div>

        {/* =========================
            RUN OUTPUT (VS CODE)
           ========================= */}
        {runResult && (
          <div className="bg-black text-green-400 rounded-xl p-4 font-mono text-sm border border-gray-800">
            <div className="text-white font-semibold mb-2">
              ▶ Run Output
            </div>

            {runResult.error ? (
              <pre className="text-red-400 whitespace-pre-wrap">
                {runResult.error}
              </pre>
            ) : runResult.output.trim() ? (
              <pre className="whitespace-pre-wrap">
                {runResult.output}
              </pre>
            ) : (
              <div className="text-yellow-400">⚠ No output</div>
            )}
          </div>
        )}

        {/* SUBMISSION RESULT */}
        {result && (
          <div className="bg-white rounded-xl shadow p-4">
            <p className="font-bold">{result.status}</p>
            <p>
              {result.passedCases}/{result.totalCases} test cases passed
            </p>
            {result.error && (
              <pre className="text-red-600 whitespace-pre-wrap mt-2">
                {result.error}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
