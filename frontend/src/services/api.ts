import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (name: string, email: string, password: string) =>
  api.post('/auth/register', { name, email, password });

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const getProfile = () =>
  api.get('/auth/profile');

// Problems
export const getProblems = (difficulty?: string, tag?: string) =>
  api.get('/problems', { params: { difficulty, tag } });

export const getProblem = (id: string) =>
  api.get(`/problems/${id}`);

export const createProblem = (data: any) =>
  api.post('/problems', data);

// Submissions
export const submitCode = (problemId: string, code: string, language: string) =>
  api.post('/submissions/submit', { problemId, code, language });

export const runCode = (problemId: string, code: string, language: string) =>
  api.post('/submissions/run', { problemId, code, language });

export const getSubmissions = (problemId?: string) =>
  api.get('/submissions', { params: { problemId } });

export const getSubmission = (id: string) =>
  api.get(`/submissions/${id}`);

export default api;