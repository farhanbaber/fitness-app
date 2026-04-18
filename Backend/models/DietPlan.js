const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  goal: { 
    type: String, 
    enum: ['fat_loss', 'muscle_gain', 'maintenance', 'endurance'],
    required: true 
  },
  duration: { type: Number, required: true }, // days
  dailyCalories: { type: Number, required: true },
  macros: {
    protein: { type: Number, required: true }, // grams
    carbs: { type: Number, required: true }, // grams
    fats: { type: Number, required: true }, // grams
    fiber: { type: Number, default: 25 }, // grams
    sugar: { type: Number, default: 50 } // grams
  },
  meals: [{
    name: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner', 'evening_snack'],
      required: true 
    },
    time: String, // "08:00", "12:30", etc.
    foods: [{
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true }, // 'g', 'ml', 'cup'
      calories: { type: Number, required: true },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fats: { type: Number, default: 0 },
      isPreWorkout: { type: Boolean, default: false },
      isPostWorkout: { type: Boolean, default: false }
    }],
    totalCalories: Number,
    instructions: String
  }],
  waterIntake: {
    dailyGoal: { type: Number, default: 3000 }, // ml
    currentIntake: { type: Number, default: 0 },
    reminders: [{
      time: String,
      amount: Number // ml
    }]
  },
  supplements: [{
    name: String,
    dosage: String,
    timing: String, // 'pre_workout', 'post_workout', 'with_meal'
    purpose: String
  }],
  restrictions: [String], // allergies, dietary restrictions
  preferences: {
    cuisine: [String],
    avoidFoods: [String],
    cookingMethod: [String]
  },
  isActive: { type: Boolean, default: false },
  adherence: {
    completedDays: [{ type: Date }],
    adherenceRate: { type: Number, default: 0 }, // percentage
    missedMeals: [String],
    cheatMeals: [{ type: Date }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DietPlan', DietPlanSchema);
