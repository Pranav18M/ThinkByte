/*export interface TestCase {
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


//  IMPORTANT RULES:
 // - input MUST be array → arguments to function
 // - expectedOutput MUST be real value (not string)
 // - user writes ONLY function body
 

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

export default sampleProblems;*/




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

export const sampleProblems: Problem[] = [
  // ===============================
  // EASY (10)
  // ===============================
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `
Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.
`,
    functionName: 'twoSum',
    starterCode: {
      javascript: `function twoSum(nums, target) {}`,
      python: `def twoSum(nums, target): pass`
    },
    testCases: [
      { input: [[2,7,11,15], 9], expectedOutput: [0,1] },
      { input: [[3,2,4], 6], expectedOutput: [1,2] },
      { input: [[3,3], 6], expectedOutput: [0,1] }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

An input string is valid if:
1. Open brackets are closed by the same type.
2. Open brackets are closed in the correct order.`,
    functionName: 'isValid',
    starterCode: {
      javascript: `function isValid(s) {}`,
      python: `def isValid(s): pass`
    },
    testCases: [
      { input: ["()"], expectedOutput: true },
      { input: ["()[]{}"], expectedOutput: true },
      { input: ["(]"], expectedOutput: false }
    ]
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.
An integer is a palindrome when it reads the same backward as forward.`,
    functionName: 'isPalindrome',
    starterCode: {
      javascript: `function isPalindrome(x) {}`,
      python: `def isPalindrome(x): pass`
    },
    testCases: [
      { input: [121], expectedOutput: true },
      { input: [-121], expectedOutput: false }
    ]
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: `Write a function that reverses a string.
The input string is given as an array of characters s.
You must reverse the string in-place.`,
    functionName: 'reverseString',
    starterCode: {
      javascript: `function reverseString(s) {}`,
      python: `def reverseString(s): pass`
    },
    testCases: [
      { input: [["h","e","l","l","o"]], expectedOutput: ["o","l","l","e","h"] }
    ]
  },
  {
    id: 'max-depth-binary-tree',
    title: 'Max Depth of Binary Tree',
    difficulty: 'Easy',
    description: `Given the root of a binary tree, return its maximum depth.
The maximum depth is the number of nodes along the longest path
from the root node down to the farthest leaf node.`,
    functionName: 'maxDepth',
    starterCode: {
      javascript: `function maxDepth(root) {}`,
      python: `def maxDepth(root): pass`
    },
    testCases: [
      { input: [[3,9,20,null,null,15,7]], expectedOutput: 3 }
    ]
  },
  {
    id: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order.
Merge nums2 into nums1 as one sorted array.`,
    functionName: 'merge',
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {}`,
      python: `def merge(nums1, m, nums2, n): pass`
    },
    testCases: [
      { input: [[1,2,3,0,0,0],3,[2,5,6],3], expectedOutput: [1,2,2,3,5,6] }
    ]
  },
  {
    id: 'single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    description: `Given a non-empty array of integers nums, every element appears twice
except for one. Find that single one.`,
    functionName: 'singleNumber',
    starterCode: {
      javascript: `function singleNumber(nums) {}`,
      python: `def singleNumber(nums): pass`
    },
    testCases: [
      { input: [[4,1,2,1,2]], expectedOutput: 4 }
    ]
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: `You are climbing a staircase. Each time you can climb 1 or 2 steps.
In how many distinct ways can you reach the top?`,
    functionName: 'climbStairs',
    starterCode: {
      javascript: `function climbStairs(n) {}`,
      python: `def climbStairs(n): pass`
    },
    testCases: [
      { input: [2], expectedOutput: 2 },
      { input: [3], expectedOutput: 3 }
    ]
  },
  {
    id: 'best-time-buy-sell',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    description: `You are given an array prices where prices[i] is the price of a stock on day i.
Choose one day to buy and another day to sell to maximize profit.`,
    functionName: 'maxProfit',
    starterCode: {
      javascript: `function maxProfit(prices) {}`,
      python: `def maxProfit(prices): pass`
    },
    testCases: [
      { input: [[7,1,5,3,6,4]], expectedOutput: 5 }
    ]
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    description: `Given an integer array nums, return true if any value appears
at least twice in the array.`,
    functionName: 'containsDuplicate',
    starterCode: {
      javascript: `function containsDuplicate(nums) {}`,
      python: `def containsDuplicate(nums): pass`
    },
    testCases: [
      { input: [[1,2,3,1]], expectedOutput: true }
    ]
  },

  // ===============================
  // MEDIUM (10)
  // ===============================
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    description: `Given an array of strings strs, group the anagrams together.
You can return the answer in any order.`,
    functionName: 'groupAnagrams',
    starterCode: {
      javascript: `function groupAnagrams(strs) {}`,
      python: `def groupAnagrams(strs): pass`
    },
    testCases: [
      { input: [["eat","tea","tan","ate","nat","bat"]], expectedOutput: [["bat"],["nat","tan"],["ate","eat","tea"]] }
    ]
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    description: `Given an integer array nums, find the contiguous subarray
which has the largest sum and return its sum.`,
    functionName: 'maxSubArray',
    starterCode: {
      javascript: `function maxSubArray(nums) {}`,
      python: `def maxSubArray(nums): pass`
    },
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expectedOutput: 6 }
    ]
  },
  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    description: `Given an integer array nums, return an array answer such that
answer[i] is the product of all elements except nums[i].`,
    functionName: 'productExceptSelf',
    starterCode: {
      javascript: `function productExceptSelf(nums) {}`,
      python: `def productExceptSelf(nums): pass`
    },
    testCases: [
      { input: [[1,2,3,4]], expectedOutput: [24,12,8,6] }
    ]
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: `Given a string s, find the length of the longest substring
without repeating characters.`,
    functionName: 'lengthOfLongestSubstring',
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {}`,
      python: `def lengthOfLongestSubstring(s): pass`
    },
    testCases: [
      { input: ["abcabcbb"], expectedOutput: 3 }
    ]
  },
  {
    id: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    description: `Given an integer array nums, return all unique triplets
that sum to zero.
`,
    functionName: 'threeSum',
    starterCode: {
      javascript: `function threeSum(nums) {}`,
      python: `def threeSum(nums): pass`
    },
    testCases: [
      { input: [[-1,0,1,2,-1,-4]], expectedOutput: [[-1,-1,2],[-1,0,1]] }
    ]
  },
  {
    id: 'container-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    description: `Given n non-negative integers representing heights,
find two lines that together with the x-axis form a container
that holds the most water.`,
    functionName: 'maxArea',
    starterCode: {
      javascript: `function maxArea(height) {}`,
      python: `def maxArea(height): pass`
    },
    testCases: [
      { input: [[1,8,6,2,5,4,8,3,7]], expectedOutput: 49 }
    ]
  },
  {
    id: 'search-rotated-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    description: `Search for a target value in a rotated sorted array.
Return its index if found, otherwise return -1.`,
    functionName: 'search',
    starterCode: {
      javascript: `function search(nums, target) {}`,
      python: `def search(nums, target): pass`
    },
    testCases: [
      { input: [[4,5,6,7,0,1,2],0], expectedOutput: 4 }
    ]
  },
  {
    id: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    description: `Given an m x n matrix, return all elements of the matrix
in spiral order.`,
    functionName: 'spiralOrder',
    starterCode: {
      javascript: `function spiralOrder(matrix) {}`,
      python: `def spiralOrder(matrix): pass`
    },
    testCases: [
      { input: [[[1,2,3],[4,5,6],[7,8,9]]], expectedOutput: [1,2,3,6,9,8,7,4,5] }
    ]
  },
  {
    id: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    description: `Given an array nums where each element represents max jump length,
determine if you can reach the last index.`,
    functionName: 'canJump',
    starterCode: {
      javascript: `function canJump(nums) {}`,
      python: `def canJump(nums): pass`
    },
    testCases: [
      { input: [[2,3,1,1,4]], expectedOutput: true }
    ]
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: `Given an array of intervals, merge all overlapping intervals.`,
    functionName: 'mergeIntervals',
    starterCode: {
      javascript: `function mergeIntervals(intervals) {}`,
      python: `def mergeIntervals(intervals): pass`
    },
    testCases: [
      { input: [[[1,3],[2,6],[8,10],[15,18]]], expectedOutput: [[1,6],[8,10],[15,18]] }
    ]
  },

  // ===============================
  // HARD (10)
  // ===============================
  {
    id: 'median-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    description: `Given two sorted arrays nums1 and nums2, return the median
of the two sorted arrays.`,
    functionName: 'findMedianSortedArrays',
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {}`,
      python: `def findMedianSortedArrays(nums1, nums2): pass`
    },
    testCases: [
      { input: [[1,3],[2]], expectedOutput: 2 }
    ]
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    description: `Given n non-negative integers representing elevation heights,
compute how much water it can trap after raining.`,
    functionName: 'trap',
    starterCode: {
      javascript: `function trap(height) {}`,
      python: `def trap(height): pass`
    },
    testCases: [
      { input: [[0,1,0,2,1,0,1,3,2,1,2,1]], expectedOutput: 6 }
    ]
  },
  {
    id: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    description: `Merge k sorted linked lists and return it as one sorted list.`,
    functionName: 'mergeKLists',
    starterCode: {
      javascript: `function mergeKLists(lists) {}`,
      python: `def mergeKLists(lists): pass`
    },
    testCases: [
      { input: [[[1,4,5],[1,3,4],[2,6]]], expectedOutput: [1,1,2,3,4,4,5,6] }
    ]
  },
  {
    id: 'largest-rectangle',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    description: `Given an array of heights representing a histogram,
find the area of the largest rectangle.`,
    functionName: 'largestRectangleArea',
    starterCode: {
      javascript: `function largestRectangleArea(heights) {}`,
      python: `def largestRectangleArea(heights): pass`
    },
    testCases: [
      { input: [[2,1,5,6,2,3]], expectedOutput: 10 }
    ]
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    difficulty: 'Hard',
    description: `Given two words and a dictionary, return the length of
the shortest transformation sequence.`,
    functionName: 'ladderLength',
    starterCode: {
      javascript: `function ladderLength(beginWord, endWord, wordList) {}`,
      python: `def ladderLength(beginWord, endWord, wordList): pass`
    },
    testCases: [
      { input: ["hit","cog",["hot","dot","dog","lot","log","cog"]], expectedOutput: 5 }
    ]
  },
  {
    id: 'min-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    description: `Given two strings s and t, return the minimum window substring
of s that contains all characters of t.`,
    functionName: 'minWindow',
    starterCode: {
      javascript: `function minWindow(s, t) {}`,
      python: `def minWindow(s, t): pass`
    },
    testCases: [
      { input: ["ADOBECODEBANC","ABC"], expectedOutput: "BANC" }
    ]
  },
  {
    id: 'edit-distance',
    title: 'Edit Distance',
    difficulty: 'Hard',
    description: `Given two strings word1 and word2, return the minimum number
of operations required to convert word1 to word2.`,
    functionName: 'minDistance',
    starterCode: {
      javascript: `function minDistance(word1, word2) {}`,
      python: `def minDistance(word1, word2): pass`
    },
    testCases: [
      { input: ["horse","ros"], expectedOutput: 3 }
    ]
  },
  {
    id: 'sliding-window-max',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    description: `Given an array nums and window size k, return the maximum
value in each sliding window.`,
    functionName: 'maxSlidingWindow',
    starterCode: {
      javascript: `function maxSlidingWindow(nums, k) {}`,
      python: `def maxSlidingWindow(nums, k): pass`
    },
    testCases: [
      { input: [[1,3,-1,-3,5,3,6,7],3], expectedOutput: [3,3,5,5,6,7] }
    ]
  },
  {
    id: 'regular-expression-matching',
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    description: `Implement regular expression matching with support for '.' and '*'.`,
    functionName: 'isMatch',
    starterCode: {
      javascript: `function isMatch(s, p) {}`,
      python: `def isMatch(s, p): pass`
    },
    testCases: [
      { input: ["aa","a*"], expectedOutput: true }
    ]
  },
  {
    id: 'burst-balloons',
    title: 'Burst Balloons',
    difficulty: 'Hard',
    description: `Given n balloons, burst them wisely to collect maximum coins.`,
    functionName: 'maxCoins',
    starterCode: {
      javascript: `function maxCoins(nums) {}`,
      python: `def maxCoins(nums): pass`
    },
    testCases: [
      { input: [[3,1,5,8]], expectedOutput: 167 }
    ]
  }
];

export default sampleProblems;
