import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

interface TestCase {
  input: any;
  expectedOutput: any;
  isHidden?: boolean;
}

interface Constraints {
  timeLimit: number;
  memoryLimit: number;
}

interface TestCaseResult {
  testCaseNumber: number;
  input: any;
  expectedOutput: any;
  actualOutput: any;
  passed: boolean;
  executionTime: number;
  error?: string;
}

interface ExecutionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Timeout' | 'Compilation Error' | 'Memory Limit Exceeded';
  accuracy: number;
  passedCases: number;
  totalCases: number;
  executionTime: number;
  memoryUsed: number;
  error?: string;
  testCaseResults: TestCaseResult[];
  failedTestCase?: TestCaseResult;
  stdout?: string;
}

export class CodeExecutor {
  private readonly tempDir = path.join(__dirname, '../../temp');

  constructor() {
    this.ensureTempDir();
  }

  private async ensureTempDir() {
    try {
      await fs.mkdir(this.tempDir, { recursive: true });
    } catch (err) {
      console.error('Failed to create temp directory:', err);
    }
  }

  async execute(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    testCases: TestCase[],
    constraints?: Constraints
  ): Promise<ExecutionResult> {
    const totalCases = testCases.length;
    const timeLimit = constraints?.timeLimit || 3000;
    let passedCases = 0;
    let runtimeError: string | undefined;
    let timeoutOccurred = false;
    let totalExecutionTime = 0;
    let maxMemory = 0;
    const testCaseResults: TestCaseResult[] = [];
    let failedTestCase: TestCaseResult | undefined;

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const startTime = Date.now();
      
      const result = await this.runSingleTest(
        code,
        language,
        functionName,
        testCase.input,
        timeLimit
      );

      const executionTime = Date.now() - startTime;
      totalExecutionTime += executionTime;
      maxMemory = Math.max(maxMemory, result.memoryUsed || 0);

      const passed = !result.error && this.compareOutputs(result.output, testCase.expectedOutput);
      
      const testResult: TestCaseResult = {
        testCaseNumber: i + 1,
        input: testCase.isHidden ? 'hidden' : testCase.input,
        expectedOutput: testCase.isHidden ? 'hidden' : testCase.expectedOutput,
        actualOutput: testCase.isHidden ? (passed ? 'hidden' : 'wrong') : this.parseOutput(result.output),
        passed,
        executionTime,
        error: result.error
      };

      testCaseResults.push(testResult);

      if (result.isTimeout) {
        timeoutOccurred = true;
        failedTestCase = testResult;
        break;
      }

      if (result.error) {
        runtimeError = result.error;
        failedTestCase = testResult;
        break;
      }

      if (passed) {
        passedCases++;
      } else if (!failedTestCase) {
        failedTestCase = testResult;
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
      executionTime: Math.round(totalExecutionTime / testCases.length),
      memoryUsed: Math.round(maxMemory),
      error: runtimeError,
      testCaseResults,
      failedTestCase
    };
  }

  async runRaw(
    code: string,
    language: 'javascript' | 'python'
  ): Promise<{ stdout: string; stderr: string | null }> {
    const fileName = `run_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const ext = language === 'javascript' ? 'js' : 'py';
    const filePath = path.join(this.tempDir, `${fileName}.${ext}`);

    try {
      await fs.writeFile(filePath, code, 'utf8');

      const command = language === 'javascript'
        ? `node "${filePath}"`
        : `python "${filePath}"`;

      const { stdout, stderr } = await execAsync(command, {
        timeout: 5000,
        maxBuffer: 1024 * 1024,
        windowsHide: true
      });

      return {
        stdout: stdout?.toString().trim() || '',
        stderr: stderr ? stderr.toString() : null
      };
    } catch (err: any) {
      return {
        stdout: err.stdout?.toString().trim() || '',
        stderr: this.cleanErrorMessage(err.stderr?.toString() || err.message, filePath)
      };
    } finally {
      try {
        await fs.unlink(filePath);
      } catch {}
    }
  }

  private async runSingleTest(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    input: any,
    timeLimit: number
  ): Promise<{ output: string; error?: string; isTimeout?: boolean; memoryUsed?: number }> {
    const fileName = `test_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const ext = language === 'javascript' ? 'js' : 'py';
    const filePath = path.join(this.tempDir, `${fileName}.${ext}`);

    try {
      const wrappedCode = this.wrapCode(code, language, functionName, input);
      await fs.writeFile(filePath, wrappedCode, 'utf8');

      const command = language === 'javascript'
        ? `node "${filePath}"`
        : `python "${filePath}"`;

      const { stdout, stderr } = await execAsync(command, {
        timeout: timeLimit,
        maxBuffer: 10 * 1024 * 1024,
        windowsHide: true
      });

      if (stderr && !stdout) {
        return { output: '', error: this.cleanErrorMessage(stderr.toString(), filePath) };
      }

      const memoryUsed = Math.random() * 50 + 10;
      return { output: stdout.toString().trim(), memoryUsed };

    } catch (err: any) {
      if (err.killed || err.code === 'ETIMEDOUT') {
        return { output: '', error: 'Time Limit Exceeded', isTimeout: true };
      }
      const errorMsg = err.stderr?.toString() || err.message;
      return { output: '', error: this.cleanErrorMessage(errorMsg, filePath) };
    } finally {
      try {
        await fs.unlink(filePath);
      } catch {}
    }
  }

  private cleanErrorMessage(error: string, filePath: string): string {
    const fileName = path.basename(filePath);
    return error
      .replace(new RegExp(filePath.replace(/\\/g, '\\\\'), 'g'), 'Solution.js')
      .replace(new RegExp(fileName, 'g'), 'Solution.js')
      .replace(/File ".*?", /g, 'Line ')
      .replace(/at .*?\(.*?\)/g, '')
      .split('\n')
      .filter(line => !line.includes('temp\\') && !line.includes('temp/'))
      .join('\n')
      .trim();
  }

  private parseOutput(output: string): any {
    try {
      return JSON.parse(output);
    } catch {
      return output;
    }
  }

  private normalize(value: any): any {
    if (Array.isArray(value)) {
      return value.map(v => this.normalize(v));
    }
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
      return JSON.stringify(this.normalize(parsed)) === JSON.stringify(this.normalize(expected));
    } catch {
      return actual.trim() === String(expected).trim();
    }
  }

  private wrapCode(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    input: any
  ): string {
    if (language === 'javascript') {
      const inputStr = JSON.stringify(input);
      return `${code}

const __input = ${inputStr};
const __result = Array.isArray(__input) ? ${functionName}(...__input) : ${functionName}(__input);
console.log(JSON.stringify(__result));`;
    }

    const inputStr = JSON.stringify(input);
    return `import json

${code}

__input = json.loads('${inputStr.replace(/'/g, "\\'")}')
if isinstance(__input, list):
    result = ${functionName}(*__input)
else:
    result = ${functionName}(__input)
print(json.dumps(result))`;
  }
}

export default new CodeExecutor();