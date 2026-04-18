const express = require('express');
const router = express.Router();
const SwimmingPlan = require('../models/SwimmingPlan');
const auth = require('../middleware/auth');

// Get all swimming plans for user
router.get('/', auth, async (req, res) => {
  try {
    const swimmingPlans = await SwimmingPlan.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(swimmingPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get swimming plan by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const swimmingPlan = await SwimmingPlan.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    if (!swimmingPlan) {
      return res.status(404).json({ message: 'Swimming plan not found' });
    }
    res.json(swimmingPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new swimming plan
router.post('/', auth, async (req, res) => {
  try {
    const swimmingPlan = new SwimmingPlan({
      ...req.body,
      userId: req.user.id
    });
    
    await swimmingPlan.save();
    res.status(201).json(swimmingPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update swimming plan
router.put('/:id', auth, async (req, res) => {
  try {
    const swimmingPlan = await SwimmingPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!swimmingPlan) {
      return res.status(404).json({ message: 'Swimming plan not found' });
    }
    
    res.json(swimmingPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Log swimming session
router.post('/log', auth, async (req, res) => {
  try {
    const { planId, duration, distance, strokeCount, averagePace, technique, notes } = req.body;
    
    // Update swimming plan progress
    const swimmingPlan = await SwimmingPlan.findOneAndUpdate(
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
      type: 'swimming',
      data: {
        swimmingPlanId: planId,
        duration,
        distance,
        pace: averagePace,
        strokeCount
      }
    });
    
    await progress.save();
    
    res.json({ 
      message: 'Swimming session logged successfully',
      session: {
        duration,
        distance,
        pace: averagePace,
        technique,
        date: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get technique guides
router.get('/techniques/:stroke', auth, async (req, res) => {
  try {
    const stroke = req.params.stroke;
    const techniques = require('../data/swimmingTechniques.json');
    
    const strokeTechniques = techniques.filter(technique => 
      technique.stroke === stroke
    );
    
    res.json(strokeTechniques);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get swimming programs by difficulty
router.get('/programs/:difficulty', auth, async (req, res) => {
  try {
    const difficulty = req.params.difficulty;
    const programs = require('../data/swimmingPrograms.json');
    
    const filteredPrograms = programs.filter(program => 
      program.difficulty === difficulty
    );
    
    res.json(filteredPrograms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Calculate swimming metrics
router.post('/calculate/metrics', auth, async (req, res) => {
  try {
    const { distance, time, stroke, efficiency } = req.body;
    
    // Calculate pace (seconds per 25m)
    const pace = time / (distance / 25);
    
    // Estimate calories burned (simplified formula)
    const metValues = {
      freestyle: 8.0,
      backstroke: 7.5,
      breaststroke: 8.5,
      butterfly: 11.0
    };
    
    const user = await require('../models/User').findById(req.user.id);
    const met = metValues[stroke] || 8.0;
    const calories = Math.round((met * user.profile.weight * time) / 200);
    
    // Calculate SWOLF score (Strokes + Time + Flips per length)
    const strokesPerLength = efficiency?.strokesPerLength || 15;
    const swolfScore = strokesPerLength + (time / (distance / 25));
    
    res.json({
      pace: pace.toFixed(2),
      calories: calories,
      swolfScore: Math.round(swolfScore),
      efficiency: efficiency || {
        strokesPerLength,
        timePerLength: time / (distance / 25),
        overallScore: swolfScore
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get safety guidelines
router.get('/safety', auth, async (req, res) => {
  try {
    const safetyGuidelines = require('../data/swimmingSafety.json');
    res.json(safetyGuidelines);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Activate/deactivate swimming plan
router.patch('/:id/activate', auth, async (req, res) => {
  try {
    const { isActive } = req.body;
    
    // Deactivate all other swimming plans for this user
    await SwimmingPlan.updateMany(
      { userId: req.user.id, _id: { $ne: req.params.id } },
      { isActive: false }
    );
    
    // Activate selected swimming plan
    const swimmingPlan = await SwimmingPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isActive },
      { new: true }
    );
    
    if (!swimmingPlan) {
      return res.status(404).json({ message: 'Swimming plan not found' });
    }
    
    res.json(swimmingPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
