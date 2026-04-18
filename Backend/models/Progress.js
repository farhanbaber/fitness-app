const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  type: { 
    type: String, 
    enum: ['workout', 'nutrition', 'cardio', 'swimming', 'weight', 'measurement'],
    required: true 
  },
  data: {
    // Workout Progress
    workoutPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
    exercisesCompleted: [String],
    completionPercentage: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    duration: { type: Number, default: 0 }, // minutes
    intensity: { type: String, enum: ['low', 'medium', 'high'] },
    
    // Nutrition Progress
    dietPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' },
    mealsCompleted: [String],
    caloriesConsumed: { type: Number, default: 0 },
    waterIntake: { type: Number, default: 0 }, // ml
    macrosConsumed: {
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fats: { type: Number, default: 0 }
    },
    adherenceRate: { type: Number, default: 0 },
    
    // Cardio Progress
    cardioPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'CardioPlan' },
    distance: { type: Number, default: 0 }, // km
    pace: { type: Number, default: 0 }, // min/km
    heartRateAvg: { type: Number, default: 0 },
    heartRateZones: {
      zone1: { type: Number, default: 0 }, // minutes
      zone2: { type: Number, default: 0 },
      zone3: { type: Number, default: 0 },
      zone4: { type: Number, default: 0 }
    },
    
    // Swimming Progress
    swimmingPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'SwimmingPlan' },
    distance: { type: Number, default: 0 }, // meters
    pace: { type: Number, default: 0 }, // seconds per 25m
    strokeCount: { type: Number, default: 0 },
    techniqueScores: [{
      technique: String,
      score: { type: Number, default: 0 }, // 1-10
      notes: String
    }],
    
    // Weight & Measurements
    weight: { type: Number, default: 0 }, // kg
    bodyFat: { type: Number, default: 0 }, // percentage
    measurements: {
      chest: { type: Number, default: 0 }, // cm
      waist: { type: Number, default: 0 }, // cm
      arms: { type: Number, default: 0 }, // cm
      thighs: { type: Number, default: 0 }, // cm
      calves: { type: Number, default: 0 } // cm
    }
  },
  achievements: [{
    type: { type: String, enum: ['personal_record', 'milestone', 'streak', 'consistency'] },
    title: String,
    description: String,
    value: Number,
    unit: String,
    date: { type: Date, default: Date.now },
    badge: String
  }],
  notes: [{
    content: String,
    mood: { type: String, enum: ['motivated', 'tired', 'energetic', 'sore', 'normal'] },
    difficulty: { type: String, enum: ['easy', 'moderate', 'hard'] },
    createdAt: { type: Date, default: Date.now }
  }],
  photos: [{
    url: String,
    type: { type: String, enum: ['before', 'after', 'progress'] },
    date: { type: Date, default: Date.now }
  }],
  weeklyStats: {
    workoutsCompleted: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    activeMinutes: { type: Number, default: 0 },
    adherenceRate: { type: Number, default: 0 }
  },
  monthlyStats: {
    workoutsCompleted: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    activeMinutes: { type: Number, default: 0 },
    weightChange: { type: Number, default: 0 },
    adherenceRate: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', ProgressSchema);
