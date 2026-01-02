export interface TestCase {
  input: any;
  expectedOutput: any;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  functionName: string;
  starterCode: {
    javascript: string;
    python: string;
  };
  testCases: TestCase[];
}

/**
 * IMPORTANT RULES:
 * - input MUST be array → arguments to function
 * - expectedOutput MUST be real value (not string)
 * - user writes ONLY function body
 */

export const sampleProblems: Problem[] = [
  // ===============================
  // 1️⃣ TWO SUM
  // ===============================
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `
Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution,
and you may not use the same element twice.
`,
    functionName: 'twoSum',
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your code here
}`,
      python: `def twoSum(nums, target):
    # Write your code here
    pass`
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expectedOutput: [0, 1] },
      { input: [[3, 2, 4], 6], expectedOutput: [1, 2] },
      { input: [[3, 3], 6], expectedOutput: [0, 1] }
    ]
  },

  // ===============================
  // 2️⃣ GROUP ANAGRAMS
  // ===============================
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    description: `
Given an array of strings strs, group the anagrams together.
You can return the answer in any order.
`,
    functionName: 'groupAnagrams',
    starterCode: {
      javascript: `function groupAnagrams(strs) {
  // Write your code here
}`,
      python: `def groupAnagrams(strs):
    # Write your code here
    pass`
    },
    testCases: [
      {
        input: [["eat", "tea", "tan", "ate", "nat", "bat"]],
        expectedOutput: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
      }
    ]
  },

  // ===============================
  // 3️⃣ VALID PARENTHESES
  // ===============================
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: `
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.
`,
    functionName: 'isValid',
    starterCode: {
      javascript: `function isValid(s) {
  // Write your code here
}`,
      python: `def isValid(s):
    # Write your code here
    pass`
    },
    testCases: [
      { input: ["()"], expectedOutput: true },
      { input: ["()[]{}"], expectedOutput: true },
      { input: ["(]"], expectedOutput: false },
      { input: ["([)]"], expectedOutput: false }
    ]
  },

  // ===============================
  // 4️⃣ MAXIMUM SUBARRAY
  // ===============================
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    description: `
Given an integer array nums, find the contiguous subarray
which has the largest sum and return its sum.
`,
    functionName: 'maxSubArray',
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your code here
}`,
      python: `def maxSubArray(nums):
    # Write your code here
    pass`
    },
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expectedOutput: 6 },
      { input: [[1]], expectedOutput: 1 },
      { input: [[5,4,-1,7,8]], expectedOutput: 23 }
    ]
  }
];

export default sampleProblems;
