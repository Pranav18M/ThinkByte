# CodePractice – Online Coding Practice Platform

A full-stack web application for solving coding problems with JavaScript and Python support, featuring an online code editor with real-time code execution and accuracy scoring.

## 🚀 Features

- **User Authentication**: JWT-based register/login system
- **Problem Management**: Browse problems by difficulty (Easy/Medium/Hard)
- **Monaco Code Editor**: Professional code editing experience
- **Multi-Language Support**: JavaScript and Python
- **Code Execution**: Safe code execution with timeout handling
- **Accuracy Tracking**: Percentage-based scoring system
- **Submission History**: Track all your submissions with detailed results

## 🛠️ Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Monaco Editor for code editing
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- bcrypt.js for password hashing

### Code Execution
- Node.js child_process for safe code execution
- Timeout handling (5 seconds)
- Test case validation

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (v5+)
- Python 3 (for Python code execution)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

### Seed Sample Problems

```bash
cd backend
node seed.js
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/codepractice
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get problem by ID
- `POST /api/problems` - Create problem (protected)
- `PUT /api/problems/:id` - Update problem (protected)
- `DELETE /api/problems/:id` - Delete problem (protected)

### Submissions
- `POST /api/submissions/submit` - Submit code (protected)
- `POST /api/submissions/run` - Run code (protected)
- `GET /api/submissions` - Get user submissions (protected)
- `GET /api/submissions/:id` - Get submission by ID (protected)

## 🎯 Usage Flow

1. **Register/Login**: Create an account or log in
2. **Browse Problems**: View problems filtered by difficulty
3. **Solve Problem**: 
   - Read problem description
   - Write code in Monaco editor
   - Switch between JavaScript/Python
   - Run code to test with first test case
   - Submit to test against all test cases
4. **View Results**: See accuracy percentage and detailed results
5. **Track Progress**: View submission history

## 📊 Accuracy Calculation

```
Accuracy (%) = (Passed Test Cases / Total Test Cases) × 100
```

**Status Types:**
- **Accepted**: 100% accuracy
- **Partial**: 1-99% accuracy (shown as "Wrong Answer")
- **Runtime Error**: Code execution error
- **Timeout**: Execution exceeded 5 seconds

## 🗂️ Database Schema

### User
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  solvedProblems: ObjectId[]
  createdAt: Date
}
```

### Problem
```typescript
{
  title: string (unique)
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  testCases: [{
    input: string
    expectedOutput: string
  }]
  starterCode: {
    javascript: string
    python: string
  }
  createdAt: Date
}
```

### Submission
```typescript
{
  userId: ObjectId
  problemId: ObjectId
  code: string
  language: 'javascript' | 'python'
  status: string
  accuracy: number
  passedCases: number
  totalCases: number
  error?: string
  createdAt: Date
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- Code execution timeout
- MongoDB injection protection

## 🚀 Deployment

### Backend
1. Set production environment variables
2. Build: `npm run build`
3. Start: `npm start`

### Frontend
1. Set production API URL
2. Build: `npm run build`
3. Serve the `dist` folder

## 🛡️ Code Execution Safety

- **Timeout**: 5-second execution limit
- **Isolated Execution**: Each submission runs in separate process
- **Temp Files**: Automatic cleanup after execution
- **Error Handling**: Graceful error messages

## 📝 Adding New Problems

Problems can be added through the API or by modifying the seed script:

```javascript
{
  title: "Problem Title",
  description: "Problem description...",
  difficulty: "Easy", // or "Medium" or "Hard"
  tags: ["Array", "String"],
  testCases: [
    {
      input: "test input",
      expectedOutput: "expected output"
    }
  ],
  starterCode: {
    javascript: "// JS starter code",
    python: "# Python starter code"
  }
}
```

## 🐛 Known Limitations

- No Docker containerization (uses child_process)
- Admin features not role-protected
- Limited to JavaScript and Python
- Single server execution (not distributed)
- No rate limiting on submissions

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize!

## 📄 License

MIT License - Free to use for learning and personal projects

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack TypeScript development
- RESTful API design
- JWT authentication
- MongoDB schema design
- Safe code execution
- React state management
- Professional UI/UX with Tailwind
- Real-time code editing with Monaco

---

Built with ❤️ as a mid-level developer portfolio project