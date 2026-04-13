const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Load env
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/agent', require('./routes/agent'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    
    // Automatically use in-memory database if we are trying to connect to localhost 
    // to avoid users seeing connection errors when they don't have MongoDB installed locally
    if(mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
      console.log('Local MongoDB URI detected. Spinning up in-memory MongoDB server for testing...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected successfully!');
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Database connection error:', err);
    // Continue running server so frontend doesn't totally 404
    app.listen(PORT, () => console.log(`Server running on port ${PORT} without DB`));
  }
};

startServer();
