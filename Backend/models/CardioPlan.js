const mongoose = require('mongoose');

const CardioPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    enum: ['jogging', 'hiit', 'interval_training', 'steady_state', 'fartlek'],
    required: true 
  },
  goal: { 
    type: String, 
    enum: ['weight_loss', 'endurance', 'speed', 'marathon_training'],
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true 
  },
  duration: { type: Number, required: true }, // weeks
  weeklySchedule: [{
    day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    type: { type: String, enum: ['easy', 'moderate', 'hard', 'rest'] },
    duration: Number, // minutes
    intensity: { type: String, enum: ['low', 'medium', 'high', 'very_high'] },
    heartRateZone: { min: Number, max: Number },
    exercises: [{
      name: String,
      duration: Number, // minutes
      intensity: String,
      distance: Number, // km
      pace: String, // min/km
      restTime: Number, // seconds
      description: String
    }]
  }],
  benefits: [String],
  risks: [String],
  equipment: [String],
  caloriesEstimation: {
    perMinute: Number,
    perSession: Number,
    perWeek: Number
  },
  progression: {
    weeklyIncrease: Number, // percentage
    intensityProgression: String,
    distanceProgression: Number // km per week
  },
  prerequisites: [{
    fitnessLevel: String,
    maxDistance: Number, // km
    maxDuration: Number // minutes
  }],
  isActive: { type: Boolean, default: false },
  progress: {
    completedSessions: [{ type: Date }],
    totalDistance: { type: Number, default: 0 }, // km
    totalTime: { type: Number, default: 0 }, // minutes
    averagePace: { type: Number, default: 0 }, // min/km
    currentWeek: { type: Number, default: 1 },
    adherenceRate: { type: Number, default: 0 } // percentage
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CardioPlan', CardioPlanSchema);
