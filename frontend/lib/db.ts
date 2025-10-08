import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

export async function connectToDatabase() {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}