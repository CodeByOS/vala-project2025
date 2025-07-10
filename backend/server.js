const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());

// Test route for dev
if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.send('✅ API Trading Journal is running');
  });
}

console.log('NODE_ENV:', process.env.NODE_ENV);

// Import routes
const authRoutes = require('./routes/authRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const noteRoutes = require('./routes/noteRoutes');
const goalRoutes = require('./routes/goalRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/goals', goalRoutes);

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------------- Serve Frontend in Production --------------------

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'dist'); // Vite outputs to "dist" by default
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// -------------------- Start Server --------------------

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
