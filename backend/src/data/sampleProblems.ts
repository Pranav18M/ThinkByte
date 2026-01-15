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
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1].
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
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1.Open brackets must be closed by the same type of brackets.
2.Open brackets must be closed in the correct order.
3.Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false.`,
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

 

Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.`,
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
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

 

Example 1:

Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
Example 2:

Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]`,
    functionName: 'reverseString',
    starterCode: {
      javascript: `function reverseString(s) {}`,
      python: `def reverseString(s): pass`
    },
    testCases: [
      { input: [["h","e","l","l","o"]], expectedOutput: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], expectedOutput:["h","a","n","n","a","H"]}
    ]
  },
  {
    id: 'max-depth-binary-tree',
    title: 'Max Depth of Binary Tree',
    difficulty: 'Easy',
    description: `Given the root of a binary tree, return its maximum depth.
The maximum depth is the number of nodes along the longest path
from the root node down to the farthest leaf node.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3`,
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
Merge nums2 into nums1 as one sorted array.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

 

Example 1:

Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]`,
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
except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

 

Example 1:

Input: nums = [2,2,1]

Output: 1

Example 2:

Input: nums = [4,1,2,1,2]

Output: 4`,
    functionName: 'singleNumber',
    starterCode: {
      javascript: `function singleNumber(nums) {}`,
      python: `def singleNumber(nums): pass`
    },
    testCases: [
      { input: [[2,2,1]], expectedOutput: 1 },
      { input: [[4,1,2,1,2]], expectedOutput: 4 }

    ]
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: `You are climbing a staircase. Each time you can climb 1 or 2 steps.
In how many distinct ways can you reach the top?

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step`,
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
Choose one day to buy and another day to sell to maximize profit return 0.

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.`,
    functionName: 'maxProfit',
    starterCode: {
      javascript: `function maxProfit(prices) {}`,
      python: `def maxProfit(prices): pass`
    },
    testCases: [
      { input: [[7,1,5,3,6,4]], expectedOutput: 5 },
      { input: [[7,6,4,3,1]], expectedOutput: 0 }

    ]
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    description: `Given an integer array nums, return true if any value appears
at least twice in the array,and return false if every element is distinct.

Example 1:

Input: nums = [1,2,3,1]

Output: true

Explanation:

The element 1 occurs at the indices 0 and 3.

Example 2:

Input: nums = [1,2,3,4]

Output: false

Explanation:

All elements are distinct.`,
    functionName: 'containsDuplicate',
    starterCode: {
      javascript: `function containsDuplicate(nums) {}`,
      python: `def containsDuplicate(nums): pass`
    },
    testCases: [
      { input: [[1,2,3,1]], expectedOutput: true },
      { input: [[1,2,3,4]], expectedOutput: false }

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
You can return the answer in any order.

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]`,
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
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expectedOutput: 6 },
      { input: [[""]], expectedOutput: [""] }

    ]
  },
  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    description: `Given an integer array nums, return an array answer such that
answer[i] is the product of all elements except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

 

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 `,
    functionName: 'productExceptSelf',
    starterCode: {
      javascript: `function productExceptSelf(nums) {}`,
      python: `def productExceptSelf(nums): pass`
    },
    testCases: [
      { input: [[1,2,3,4]], expectedOutput: [24,12,8,6] },
      { input: [[-1,1,0,-3,3]], expectedOutput: [0,0,9,0,0] }

    ]
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: `Given a string s, find the length of the longest substring
without repeating characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.`,
    functionName: 'lengthOfLongestSubstring',
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {}`,
      python: `def lengthOfLongestSubstring(s): pass`
    },
    testCases: [
      { input: ["abcabcbb"], expectedOutput: 3 },
      { input: ["bbbb"], expectedOutput: 1 }

    ]
  },
  {
    id: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    description: `Given an integer array nums, return all unique triplets
that sum to zero.
Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
`,
    functionName: 'threeSum',
    starterCode: {
      javascript: `function threeSum(nums) {}`,
      python: `def threeSum(nums): pass`
    },
    testCases: [
      { input: [[-1,0,1,2,-1,-4]], expectedOutput: [[-1,-1,2],[-1,0,1]] },
      { input: [[0,1,1]], expectedOutput: [] }

    ]
  },
  {
    id: 'container-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

Example 2:
Input: height = [1,1]
Output: 1`,
    functionName: 'maxArea',
    starterCode: {
      javascript: `function maxArea(height) {}`,
      python: `def maxArea(height): pass`
    },
    testCases: [
      { input: [[1,8,6,2,5,4,8,3,7]], expectedOutput: 49 },
      { input: [[1,1]], expectedOutput: 1 }

    ]
  },
  {
    id: 'search-rotated-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    description: `There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1`,
    functionName: 'search',
    starterCode: {
      javascript: `function search(nums, target) {}`,
      python: `def search(nums, target): pass`
    },
    testCases: [
      { input: [[4,5,6,7,0,1,2],0], expectedOutput: 4 },
            { input: [[4,5,6,7,0,1,2],3], expectedOutput: -1 }

    ]
  },
  {
    id: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    description: `Given an m x n matrix, return all elements of the matrix
in spiral order.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Example 2:
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]`,
    functionName: 'spiralOrder',
    starterCode: {
      javascript: `function spiralOrder(matrix) {}`,
      python: `def spiralOrder(matrix): pass`
    },
    testCases: [
      { input: [[[1,2,3],[4,5,6],[7,8,9]]], expectedOutput: [1,2,3,6,9,8,7,4,5] },
            { input: [[[1,2,3,4],[5,6,7,8],[9,10,11,12]]], expectedOutput: [1,2,3,4,8,12,11,10,9,5,6,7] }

    ]
  },
  {
    id: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    description: `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
 `,
    functionName: 'canJump',
    starterCode: {
      javascript: `function canJump(nums) {}`,
      python: `def canJump(nums): pass`
    },
    testCases: [
      { input: [[2,3,1,1,4]], expectedOutput: true },
            { input: [[3,2,1,0,4]], expectedOutput: false }

    ]
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.`,
    functionName: 'mergeIntervals',
    starterCode: {
      javascript: `function mergeIntervals(intervals) {}`,
      python: `def mergeIntervals(intervals): pass`
    },
    testCases: [
      { input: [[[1,3],[2,6],[8,10],[15,18]]], expectedOutput: [[1,6],[8,10],[15,18]] },
            { input: [[[1,4],[4,5]]], expectedOutput: [[1,4],[4,5]] }

    ]
  },

  // ===============================
  // HARD (10)
  // ===============================
  {
    id: 'median-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.`,
    functionName: 'findMedianSortedArrays',
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {}`,
      python: `def findMedianSortedArrays(nums1, nums2): pass`
    },
    testCases: [
      { input: [[1,3],[2]], expectedOutput: 2.00000 },
            { input: [[1,2],[3,4]], expectedOutput: 2.50000 }

    ]
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

 

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9`,
    functionName: 'trap',
    starterCode: {
      javascript: `function trap(height) {}`,
      python: `def trap(height): pass`
    },
    testCases: [
      { input: [[0,1,0,2,1,0,1,3,2,1,2,1]], expectedOutput: 6 },
            { input: [[4,2,0,3,2,5]], expectedOutput: 9 }

    ]
  },
  {
    id: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

 

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []`,
    functionName: 'mergeKLists',
    starterCode: {
      javascript: `function mergeKLists(lists) {}`,
      python: `def mergeKLists(lists): pass`
    },
    testCases: [
      { input: [[[1,4,5],[1,3,4],[2,6]]], expectedOutput: [1,1,2,3,4,4,5,6] },
            { input: [[]], expectedOutput: [] }

    ]
  },
  {
    id: 'largest-rectangle',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    description: `Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.

Example 2:
Input: heights = [2,4]
Output: 4`,
    functionName: 'largestRectangleArea',
    starterCode: {
      javascript: `function largestRectangleArea(heights) {}`,
      python: `def largestRectangleArea(heights): pass`
    },
    testCases: [
      { input: [[2,1,5,6,2,3]], expectedOutput: 10 },
            { input: [[2,4]], expectedOutput: 4 }

    ]
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    difficulty: 'Hard',
    description: `A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

 

Example 1:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.

Example 2:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.`,
    functionName: 'ladderLength',
    starterCode: {
      javascript: `function ladderLength(beginWord, endWord, wordList) {}`,
      python: `def ladderLength(beginWord, endWord, wordList): pass`
    },
    testCases: [
      { input: ["hit","cog",["hot","dot","dog","lot","log","cog"]], expectedOutput: 5 },
            { input: ["hit","cog",["hot","dot","dog","lot","log"]], expectedOutput: 0 }

    ]
  },
  {
    id: 'min-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    description: `Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.`,
    functionName: 'minWindow',
    starterCode: {
      javascript: `function minWindow(s, t) {}`,
      python: `def minWindow(s, t): pass`
    },
    testCases: [
      { input: ["ADOBECODEBANC","ABC"], expectedOutput: "BANC" },
            { input: ["a","t"], expectedOutput: "a" }

    ]
  },
  {
    id: 'edit-distance',
    title: 'Edit Distance',
    difficulty: 'Hard',
    description: `Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character
 

Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')`,
    functionName: 'minDistance',
    starterCode: {
      javascript: `function minDistance(word1, word2) {}`,
      python: `def minDistance(word1, word2): pass`
    },
    testCases: [
      { input: ["horse","ros"], expectedOutput: 3 },
            { input: ["intention","rexecution"], expectedOutput: 5 }

    ]
  },
  {
    id: 'sliding-window-max',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    description: `You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

 

Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

 Example 2:

Input: nums = [1], k = 1
Output: [1]`,
    functionName: 'maxSlidingWindow',
    starterCode: {
      javascript: `function maxSlidingWindow(nums, k) {}`,
      python: `def maxSlidingWindow(nums, k): pass`
    },
    testCases: [
      { input: [[1,3,-1,-3,5,3,6,7],3], expectedOutput: [3,3,5,5,6,7] },
            { input: [[1],1], expectedOutput: [1] }

    ]
  },
  {
    id: 'regular-expression-matching',
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    description: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

 

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".`,
    functionName: 'isMatch',
    starterCode: {
      javascript: `function isMatch(s, p) {}`,
      python: `def isMatch(s, p): pass`
    },
    testCases: [
      { input: ["aa","a"], expectedOutput: false },
            { input: ["aa","a*"], expectedOutput: true }

    ]
  },
  {
    id: 'burst-balloons',
    title: 'Burst Balloons',
    difficulty: 'Hard',
    description: `You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.

If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.

 

Example 1:

Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167

Example 2:

Input: nums = [1,5]
Output: 10`,
    functionName: 'maxCoins',
    starterCode: {
      javascript: `function maxCoins(nums) {}`,
      python: `def maxCoins(nums): pass`
    },
    testCases: [
      { input: [[3,1,5,8]], expectedOutput: 167 },
            { input: [[1,5]], expectedOutput: 10 }

    ]
  }
];

export default sampleProblems;
