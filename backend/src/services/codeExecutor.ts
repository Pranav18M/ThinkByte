import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

interface TestCase {
  input: any;
  expectedOutput: any;
}

interface ExecutionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Timeout';
  accuracy: number;
  passedCases: number;
  totalCases: number;
  error?: string;
}

export class CodeExecutor {
  private readonly TIMEOUT = 10000;
  private readonly tempDir = path.join(__dirname, '../../temp');

  constructor() {
    this.ensureTempDir();
  }

  private async ensureTempDir() {
    await fs.mkdir(this.tempDir, { recursive: true });
  }

  // ====================
  // JUDGE MODE (SUBMIT)
  // ====================
  async execute(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    testCases: TestCase[]
  ): Promise<ExecutionResult> {
    const totalCases = testCases.length;
    let passedCases = 0;
    let runtimeError: string | undefined;
    let timeoutOccurred = false;

    for (const testCase of testCases) {
      const result = await this.runSingleTest(
        code,
        language,
        functionName,
        testCase.input
      );

      if (result.isTimeout) {
        timeoutOccurred = true;
        break;
      }

      if (result.error) {
        runtimeError = result.error;
        break;
      }

      if (this.compareOutputs(result.output, testCase.expectedOutput)) {
        passedCases++;
      }
    }

    let status: ExecutionResult['status'] = 'Wrong Answer';
    if (timeoutOccurred) status = 'Timeout';
    else if (runtimeError) status = 'Runtime Error';
    else if (passedCases === totalCases) status = 'Accepted';

    return {
      status,
      accuracy: Number(((passedCases / totalCases) * 100).toFixed(2)),
      passedCases,
      totalCases,
      error: runtimeError
    };
  }

  // ====================
  // RUN MODE (LEETCODE STYLE)
  // ====================
  async runRaw(
    code: string,
    language: 'javascript' | 'python'
  ): Promise<{ stdout: string; stderr: string | null }> {

    const fileName = `run_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const ext = language === 'javascript' ? 'js' : 'py';
    const filePath = path.join(this.tempDir, `${fileName}.${ext}`);

    try {
      await fs.writeFile(filePath, code);

      const command =
        language === 'javascript'
          ? `node "${filePath}"`
          : process.platform === 'win32'
            ? `python "${filePath}"`
            : `python3 "${filePath}"`;

      const { stdout, stderr } = await execAsync(command, {
        timeout: this.TIMEOUT,
        maxBuffer: 1024 * 1024
      });

      return {
        stdout: stdout?.toString().trim() || '',
        stderr: stderr ? stderr.toString() : null
      };
    } catch (err: any) {
      return {
        stdout: '',
        stderr: err.stderr?.toString() || err.message
      };
    } finally {
      try { await fs.unlink(filePath); } catch {}
    }
  }

  // ====================
  // SINGLE TEST EXECUTION
  // ====================
  async runSingleTest(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    input: any
  ): Promise<{ output: string; error?: string; isTimeout?: boolean }> {

    const fileName = `test_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const ext = language === 'javascript' ? 'js' : 'py';
    const filePath = path.join(this.tempDir, `${fileName}.${ext}`);

    try {
      const wrappedCode = this.wrapCode(code, language, functionName, input);
      await fs.writeFile(filePath, wrappedCode);

      const command =
        language === 'javascript'
          ? `node "${filePath}"`
          : process.platform === 'win32'
            ? `python "${filePath}"`
            : `python3 "${filePath}"`;

      const { stdout, stderr } = await execAsync(command, {
        timeout: this.TIMEOUT,
        maxBuffer: 1024 * 1024
      });

      if (stderr) {
        return { output: '', error: stderr.toString() };
      }

      return { output: stdout.toString().trim() };

    } catch (err: any) {
      if (err.killed) {
        return { output: '', error: 'Time Limit Exceeded', isTimeout: true };
      }
      return { output: '', error: err.stderr?.toString() || err.message };
    } finally {
      try { await fs.unlink(filePath); } catch {}
    }
  }

  // ====================
  // OUTPUT COMPARISON
  // ====================
  private normalize(value: any): any {
    if (Array.isArray(value)) return value.map(v => this.normalize(v)).sort();
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value)
        .sort()
        .reduce((acc: any, key) => {
          acc[key] = this.normalize(value[key]);
          return acc;
        }, {});
    }
    return value;
  }

  private compareOutputs(actual: string, expected: any): boolean {
    try {
      const parsed = JSON.parse(actual);
      return JSON.stringify(this.normalize(parsed)) ===
             JSON.stringify(this.normalize(expected));
    } catch {
      return actual.trim() === String(expected).trim();
    }
  }

  // ====================
  // CODE WRAPPER
  // ====================
  private wrapCode(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    input: any
  ): string {
    const inputStr = JSON.stringify(input);

    if (language === 'javascript') {
      return `
${code}
const __input = ${inputStr};
const __result = Array.isArray(__input)
  ? ${functionName}(...__input)
  : ${functionName}(__input);
console.log(JSON.stringify(__result));
`;
    }

    return `
import json
${code}
__input = json.loads("""${inputStr}""")
if isinstance(__input, list):
    result = ${functionName}(*__input)
else:
    result = ${functionName}(__input)
print(json.dumps(result))
`;
  }
}

export default new CodeExecutor();
