const express = require('express');
const router = express.Router();
const WorkoutPlan = require('../models/WorkoutPlan');
const auth = require('../middleware/auth');

// Get all workout plans for user
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await WorkoutPlan.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get workout plan by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await WorkoutPlan.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    if (!workout) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get exercises by muscle group
router.get('/exercises/:muscleGroup', auth, async (req, res) => {
  try {
    const exercises = require('../data/exercises.json');
    const muscleGroup = req.params.muscleGroup;
    
    const filteredExercises = exercises.filter(exercise => 
      exercise.muscleGroup === muscleGroup
    );
    
    res.json(filteredExercises);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new workout plan
router.post('/', auth, async (req, res) => {
  try {
    const workoutPlan = new WorkoutPlan({
      ...req.body,
      userId: req.user.id
    });
    
    await workoutPlan.save();
    res.status(201).json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update workout plan
router.put('/:id', auth, async (req, res) => {
  try {
    const workout = await WorkoutPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update workout progress
router.put('/:id/progress', auth, async (req, res) => {
  try {
    const { completedExercise, completionPercentage } = req.body;
    
    const workout = await WorkoutPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { 
        $push: { 
          'progress.completedExercises': completedExercise 
        },
        'progress.completionPercentage': completionPercentage,
        'progress.lastCompleted': new Date(),
        $inc: { 'progress.totalCompleted': 1 }
      },
      { new: true }
    );
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete workout plan
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await WorkoutPlan.findOneAndDelete({
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    
    res.json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Activate/deactivate workout plan
router.patch('/:id/activate', auth, async (req, res) => {
  try {
    const { isActive } = req.body;
    
    // Deactivate all other workout plans for this user
    await WorkoutPlan.updateMany(
      { userId: req.user.id, _id: { $ne: req.params.id } },
      { isActive: false }
    );
    
    // Activate selected workout plan
    const workout = await WorkoutPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isActive },
      { new: true }
    );
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
