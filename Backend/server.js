const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import models
const User = require('./models/User');
const WorkoutPlan = require('./models/WorkoutPlan');
const DietPlan = require('./models/DietPlan');
const CardioPlan = require('./models/CardioPlan');
const SwimmingPlan = require('./models/SwimmingPlan');
const Progress = require('./models/Progress');
const BiometricLog = require('./models/BiometricLog');


// Import routes
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');
const nutritionRoutes = require('./routes/nutrition');
const cardioRoutes = require('./routes/cardio');
const swimmingRoutes = require('./routes/swimming');
const downloadRoutes = require('./routes/downloads');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection (commented out for now)
// mongoose.connect('mongodb://localhost:27017/fitness-app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Database Connected'))
// .catch(err => console.log('Error:', err));

console.log('Starting Ultra Pro Fitness API without database...');

// --- API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/cardio', cardioRoutes);
app.use('/api/swimming', swimmingRoutes);
app.use('/api/download', downloadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Ultra Pro Fitness API is running',
    timestamp: new Date()
  });
});

// Real-time stats endpoint
app.get('/api/realtime-stats', async (req, res) => {
  try {
    // Simulate real-time fitness data
    const stats = {
      weight: 78.5 + (Math.random() * 2 - 1),
      caloriesConsumed: 1840 + (Math.random() * 200 - 100),
      heartRate: Math.floor(Math.random() * (130 - 110) + 110),
      sleepScore: Math.floor(Math.random() * (100 - 85) + 85),
      activeCalories: Math.floor(Math.random() * 500 + 200),
      waterIntake: 2800 + (Math.random() * 400 - 200),
      workoutStreak: Math.floor(Math.random() * 14 + 1),
      bodyFat: 18.5 + (Math.random() * 4 - 2),
      muscleMass: 62.3 + (Math.random() * 3 - 1.5)
    };
    
    res.json({
      ...stats,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get real-time stats' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Ultra Pro Fitness API running on Port ${PORT}`));