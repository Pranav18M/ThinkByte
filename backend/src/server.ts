import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import problemRoutes from './routes/problems';
import submissionRoutes from './routes/submissions';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Pranav:Pranav_018@atsresumescanner.sbuvn4m.mongodb.net/CodeMetric_db?retryWrites=true&w=majority';

// OPTIMIZED: Added connection pooling and timeout settings for MongoDB Atlas free tier
mongoose.connect(MONGODB_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // CRITICAL: Ensure indexes are created on startup
    try {
      if (mongoose.connection.db) {
        await mongoose.connection.db.collection('users').createIndex({ email: 1 });
        console.log('✅ Database indexes verified');
      }
    } catch (error) {
      console.log('ℹ️  Index already exists or creation failed:', error);
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

export default app;
