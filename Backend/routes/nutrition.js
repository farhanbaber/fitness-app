const express = require('express');
const router = express.Router();
const DietPlan = require('../models/DietPlan');
const auth = require('../middleware/auth');

// Get all diet plans for user
router.get('/', auth, async (req, res) => {
  try {
    const dietPlans = await DietPlan.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(dietPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get diet plan by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const dietPlan = await DietPlan.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    res.json(dietPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new diet plan
router.post('/', auth, async (req, res) => {
  try {
    const dietPlan = new DietPlan({
      ...req.body,
      userId: req.user.id
    });
    
    await dietPlan.save();
    res.status(201).json(dietPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update diet plan
router.put('/:id', auth, async (req, res) => {
  try {
    const dietPlan = await DietPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    
    res.json(dietPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Track meal completion
router.post('/:id/track', auth, async (req, res) => {
  try {
    const { mealType, foods, calories } = req.body;
    
    const dietPlan = await DietPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { 
        $push: { 
          'adherence.completedDays': new Date(),
          'adherence.missedMeals': mealType 
        },
        $inc: { 
          'adherence.adherenceRate': calories > 0 ? 5 : -5 
        }
      },
      { new: true }
    );
    
    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    
    res.json({ message: 'Meal tracked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get macro breakdown
router.get('/:id/macros', auth, async (req, res) => {
  try {
    const dietPlan = await DietPlan.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    
    // Calculate macro percentages
    const totalMacros = dietPlan.macros.protein + dietPlan.macros.carbs + dietPlan.macros.fats;
    const macroPercentages = {
      protein: ((dietPlan.macros.protein * 4) / dietPlan.dailyCalories * 100).toFixed(1),
      carbs: ((dietPlan.macros.carbs * 4) / dietPlan.dailyCalories * 100).toFixed(1),
      fats: ((dietPlan.macros.fats * 9) / dietPlan.dailyCalories * 100).toFixed(1)
    };
    
    res.json({
      macros: dietPlan.macros,
      percentages: macroPercentages,
      dailyCalories: dietPlan.dailyCalories
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Track water intake
router.post('/water/track', auth, async (req, res) => {
  try {
    const { amount, planId } = req.body;
    
    // Update user's water intake in their active diet plan
    const dietPlan = await DietPlan.findOneAndUpdate(
      { _id: planId, userId: req.user.id },
      { 
        $inc: { 'waterIntake.currentIntake': amount }
      },
      { new: true }
    );
    
    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    
    res.json({ 
      message: 'Water intake tracked successfully',
      currentIntake: dietPlan.waterIntake.currentIntake + amount,
      dailyGoal: dietPlan.waterIntake.dailyGoal
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get healthy food suggestions
router.get('/foods/suggestions', auth, async (req, res) => {
  try {
    const { goal, macro, cuisine } = req.query;
    
    const foods = require('../data/healthyFoods.json');
    
    let suggestions = foods;
    
    // Filter by goal
    if (goal) {
      suggestions = suggestions.filter(food => food.goals.includes(goal));
    }
    
    // Filter by macro focus
    if (macro) {
      suggestions = suggestions.filter(food => food.highInMacro === macro);
    }
    
    // Filter by cuisine
    if (cuisine) {
      suggestions = suggestions.filter(food => food.cuisine === cuisine);
    }
    
    res.json(suggestions.slice(0, 20)); // Return top 20 suggestions
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Activate/deactivate diet plan
router.patch('/:id/activate', auth, async (req, res) => {
  try {
    const { isActive } = req.body;
    
    // Deactivate all other diet plans for this user
    await DietPlan.updateMany(
      { userId: req.user.id, _id: { $ne: req.params.id } },
      { isActive: false }
    );
    
    // Activate selected diet plan
    const dietPlan = await DietPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isActive },
      { new: true }
    );
    
    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    
    res.json(dietPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
