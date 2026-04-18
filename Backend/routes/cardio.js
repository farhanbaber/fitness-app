const express = require('express');
const router = express.Router();
const CardioPlan = require('../models/CardioPlan');
const auth = require('../middleware/auth');

// Get all cardio plans for user
router.get('/', auth, async (req, res) => {
  try {
    const cardioPlans = await CardioPlan.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(cardioPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get cardio plan by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const cardioPlan = await CardioPlan.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    if (!cardioPlan) {
      return res.status(404).json({ message: 'Cardio plan not found' });
    }
    res.json(cardioPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new cardio plan
router.post('/', auth, async (req, res) => {
  try {
    const cardioPlan = new CardioPlan({
      ...req.body,
      userId: req.user.id
    });
    
    await cardioPlan.save();
    res.status(201).json(cardioPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cardio plan
router.put('/:id', auth, async (req, res) => {
  try {
    const cardioPlan = await CardioPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!cardioPlan) {
      return res.status(404).json({ message: 'Cardio plan not found' });
    }
    
    res.json(cardioPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Log cardio session
router.post('/log', auth, async (req, res) => {
  try {
    const { planId, duration, distance, averageHeartRate, calories, notes } = req.body;
    
    // Update cardio plan progress
    const cardioPlan = await CardioPlan.findOneAndUpdate(
      { _id: planId, userId: req.user.id },
      { 
        $push: { 
          'progress.completedSessions': new Date()
        },
        $inc: { 
          'progress.totalDistance': distance || 0,
          'progress.totalTime': duration || 0,
          'progress.adherenceRate': 5
        }
      },
      { new: true }
    );
    
    // Create progress record
    const Progress = require('../models/Progress');
    const progress = new Progress({
      userId: req.user.id,
      type: 'cardio',
      data: {
        cardioPlanId: planId,
        duration,
        distance,
        heartRateAvg: averageHeartRate,
        caloriesBurned: calories
      }
    });
    
    await progress.save();
    
    res.json({ 
      message: 'Cardio session logged successfully',
      session: {
        duration,
        distance,
        calories,
        date: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get jogging plans
router.get('/plans/jogging', auth, async (req, res) => {
  try {
    const joggingPlans = require('../data/joggingPlans.json');
    
    // Filter by user's fitness level
    const user = await require('../models/User').findById(req.user.id);
    const filteredPlans = joggingPlans.filter(plan => 
      plan.difficulty === user.profile.fitnessLevel || 
      plan.difficulty === 'beginner'
    );
    
    res.json(filteredPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get interval training plans
router.get('/plans/interval', auth, async (req, res) => {
  try {
    const intervalPlans = require('../data/intervalPlans.json');
    
    // Filter by user's fitness level
    const user = await require('../models/User').findById(req.user.id);
    const filteredPlans = intervalPlans.filter(plan => 
      plan.difficulty === user.profile.fitnessLevel || 
      plan.difficulty === 'beginner'
    );
    
    res.json(filteredPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Calculate calories burned
router.post('/calculate/calories', auth, async (req, res) => {
  try {
    const { weight, duration, intensity, type } = req.body;
    
    // MET values for different activities
    const metValues = {
      walking: 3.5,
      jogging: 7.0,
      running: 9.8,
      hiit: 12.0,
      cycling: 8.0,
      swimming: 7.0
    };
    
    const met = metValues[type] || 7.0;
    const caloriesPerMinute = (met * weight * 3.5) / 200; // Simplified calculation
    
    // Adjust for intensity
    const intensityMultiplier = {
      low: 0.8,
      medium: 1.0,
      high: 1.2,
      very_high: 1.4
    };
    
    const totalCalories = Math.round(
      caloriesPerMinute * duration * (intensityMultiplier[intensity] || 1.0)
    );
    
    res.json({
      calories: totalCalories,
      met: met,
      duration,
      intensity,
      weight
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Activate/deactivate cardio plan
router.patch('/:id/activate', auth, async (req, res) => {
  try {
    const { isActive } = req.body;
    
    // Deactivate all other cardio plans for this user
    await CardioPlan.updateMany(
      { userId: req.user.id, _id: { $ne: req.params.id } },
      { isActive: false }
    );
    
    // Activate selected cardio plan
    const cardioPlan = await CardioPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isActive },
      { new: true }
    );
    
    if (!cardioPlan) {
      return res.status(404).json({ message: 'Cardio plan not found' });
    }
    
    res.json(cardioPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
