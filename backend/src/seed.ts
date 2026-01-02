import mongoose from 'mongoose';
import { sampleProblems } from './data/sampleProblems';

const MONGODB_URI =
  'mongodb+srv://Pranav:Pranav_018@atsresumescanner.sbuvn4m.mongodb.net/CodeMetric_db?retryWrites=true&w=majority';

const problemSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  difficulty: String,
  functionName: String,
  starterCode: {
    javascript: String,
    python: String
  },
  testCases: [
    {
      input: mongoose.Schema.Types.Mixed,
      expectedOutput: mongoose.Schema.Types.Mixed
    }
  ]
});

const Problem = mongoose.model('Problem', problemSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Problem.deleteMany({});
    console.log('🗑️ Old problems deleted');

    await Problem.insertMany(sampleProblems);
    console.log(`✅ Inserted ${sampleProblems.length} problems`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();