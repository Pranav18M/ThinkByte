/* import { exec } from 'child_process';
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
  private readonly TIMEOUT = 5000;
  private readonly tempDir = path.join(__dirname, '../../temp');

  constructor() {
    this.ensureTempDir();
  }

  private async ensureTempDir() {
    try {
      await fs.mkdir(this.tempDir, { recursive: true });
    } catch (err) {
      console.error('Temp dir error:', err);
    }
  }

  async execute(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    testCases: TestCase[]
  ): Promise<ExecutionResult> {

    const totalCases = testCases.length;
    let passedCases = 0;
    let timeoutOccurred = false;
    let runtimeError: string | undefined;

    for (const testCase of testCases) {
      const result = await this.runSingleTest(
        code,
        language,
        functionName,
        testCase.input
      );

      if (result.isTimeout) {
        timeoutOccurred = true;
        continue;
      }

      if (result.error) {
        runtimeError = result.error;
        continue;
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

  // 🔹 Deep normalize for order-independent comparison
  private normalize(value: any): any {
    if (Array.isArray(value)) {
      return value.map(v => this.normalize(v)).sort();
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
      const parsedActual = JSON.parse(actual.trim());
      return JSON.stringify(this.normalize(parsedActual)) ===
             JSON.stringify(this.normalize(expected));
    } catch {
      return actual.trim() === String(expected).trim();
    }
  }

  private async runSingleTest(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    input: any
  ): Promise<{ output: string; error?: string; isTimeout?: boolean }> {

    const fileName = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const extension = language === 'javascript' ? 'js' : 'py';
    const filePath = path.join(this.tempDir, `${fileName}.${extension}`);

    try {
      const wrappedCode = this.wrapCode(code, language, functionName, input);
      await fs.writeFile(filePath, wrappedCode);

      const command =
        language === 'javascript'
          ? `node "${filePath}"`
          : `python "${filePath}"`;

      const { stdout, stderr } = await execAsync(command, {
        timeout: this.TIMEOUT,
        maxBuffer: 1024 * 1024
      });

      if (stderr && !stdout) {
        return { output: '', error: stderr };
      }

      return { output: stdout };

    } catch (err: any) {
      if (err.killed || err.signal === 'SIGTERM') {
        return { output: '', error: 'Time Limit Exceeded', isTimeout: true };
      }
      return { output: '', error: err.stderr || err.message };
    } finally {
      try {
        await fs.unlink(filePath);
      } catch {}
    }
  }

 private wrapCode(
  code: string,
  language: 'javascript' | 'python',
  functionName: string,
  input: any
): string {

  const inputStr = JSON.stringify(input);

  // ---------- JAVASCRIPT ----------
  if (language === 'javascript') {
    return `
${code}

const __input = ${inputStr};

let __result;
if (Array.isArray(__input)) {
  __result = ${functionName}(...__input);
} else if (typeof __input === 'object') {
  __result = ${functionName}(...Object.values(__input));
} else {
  __result = ${functionName}(__input);
}

console.log(JSON.stringify(__result));
`;
  }

  // ---------- PYTHON ----------
  return `
import json
${code}

__input = ${inputStr}

if isinstance(__input, list):
    result = ${functionName}(*__input)
elif isinstance(__input, dict):
    result = ${functionName}(*__input.values())
else:
    result = ${functionName}(__input)

print(json.dumps(result))
`;
}
}

export default new CodeExecutor();*/






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
    try {
      await fs.mkdir(this.tempDir, { recursive: true });
    } catch (err) {
      console.error('Temp dir error:', err);
    }
  }

  // ==================== Judge Mode ====================
  async execute(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    testCases: TestCase[],
    mode: 'run' | 'submit' = 'submit' // Add mode for Run vs Submit
  ): Promise<ExecutionResult> {
    const totalCases = testCases.length;
    let passedCases = 0;
    let timeoutOccurred = false;
    let runtimeError: string | undefined;

    for (const testCase of testCases) {
      const result = await this.runSingleTest(
        code,
        language,
        functionName,
        testCase.input
      );

      if (result.isTimeout) {
        timeoutOccurred = true;
        continue;
      }

      if (result.error) {
        runtimeError = result.error;
        continue;
      }

      if (this.compareOutputs(result.output, testCase.expectedOutput)) {
        passedCases++;
      }
    }

    // Determine status
    let status: ExecutionResult['status'] = 'Wrong Answer';
    if (timeoutOccurred) status = 'Timeout';
    else if (runtimeError) status = 'Runtime Error';
    else if (passedCases === totalCases) status = 'Accepted';

    // ==================== Playground Mode Adjustment ====================
    if (mode === 'run') {
      status = 'Accepted'; // Always show output for Run button
    }

    return {
      status,
      accuracy: Number(((passedCases / totalCases) * 100).toFixed(2)),
      passedCases,
      totalCases,
      error: runtimeError
    };
  }

  // ==================== Run Single Test ====================
  public async runSingleTest(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    input: any
  ): Promise<{ output: any; error?: string; isTimeout?: boolean }> {
    const fileName = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const extension = language === 'javascript' ? 'js' : 'py';
    const filePath = path.join(this.tempDir, `${fileName}.${extension}`);

    try {
      const wrappedCode = this.wrapCode(code, language, functionName, input);
      await fs.writeFile(filePath, wrappedCode);

      const command =
        language === 'javascript'
          ? `node "${filePath}"`
          : `python "${filePath}"`;

      const { stdout, stderr } = await execAsync(command, {
        timeout: this.TIMEOUT,
        maxBuffer: 1024 * 1024
      });

      if (stderr && !stdout) return { output: '', error: stderr };

      return { output: stdout.trim() };
    } catch (err: any) {
      if (err.killed || err.signal === 'SIGTERM') {
        return { output: '', error: 'Time Limit Exceeded', isTimeout: true };
      }
      return { output: '', error: err.stderr || err.message };
    } finally {
      try {
        await fs.unlink(filePath);
      } catch {}
    }
  }

  // ==================== Compare Outputs ====================
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
      const parsedActual = JSON.parse(actual.trim());
      return JSON.stringify(this.normalize(parsedActual)) ===
             JSON.stringify(this.normalize(expected));
    } catch {
      return actual.trim() === String(expected).trim();
    }
  }

  // ==================== Wrap Code ====================
  private wrapCode(
    code: string,
    language: 'javascript' | 'python',
    functionName: string,
    input: any
  ): string {
    const inputStr = JSON.stringify(input);

    // ---------- JAVASCRIPT ----------
    if (language === 'javascript') {
      return `
${code}

const __input = ${inputStr};
let __result;

if (Array.isArray(__input)) {
  __result = ${functionName}(...__input);
} else if (typeof __input === 'object') {
  __result = ${functionName}(...Object.values(__input));
} else {
  __result = ${functionName}(__input);
}

console.log(JSON.stringify(__result));
`;
    }

    // ---------- PYTHON ----------
    return `
import json
${code}

__input = json.loads('${inputStr.replace(/'/g, "\\'")}')

if isinstance(__input, list) and len(__input) == 2:
    # For problems like two-sum: [nums, target]
    result = ${functionName}(__input[0], __input[1])
elif isinstance(__input, list):
    result = ${functionName}(*__input)
elif isinstance(__input, dict):
    result = ${functionName}(*__input.values())
else:
    result = ${functionName}(__input)

print(json.dumps(result))
`;
  }
}

export default new CodeExecutor();
