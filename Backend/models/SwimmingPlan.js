const mongoose = require('mongoose');

const SwimmingPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    enum: ['freestyle', 'backstroke', 'breaststroke', 'butterfly', 'mixed', 'drills'],
    required: true 
  },
  goal: { 
    type: String, 
    enum: ['technique_improvement', 'endurance', 'speed', 'distance', 'competition_prep'],
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
    type: { type: String, enum: ['technique', 'endurance', 'speed', 'drills', 'rest'] },
    duration: Number, // minutes
    exercises: [{
      name: String,
      sets: Number,
      reps: Number,
      distance: Number, // meters
      restTime: Number, // seconds
      intensity: { type: String, enum: ['low', 'medium', 'high'] },
      focus: String, // 'breathing', 'kick', 'pull', 'timing'
      description: String,
      technique: String
    }]
  }],
  techniques: [{
    name: String,
    description: String,
    keyPoints: [String],
    commonMistakes: [String],
    videoUrl: String
  }],
  benefits: [String],
  risks: [String],
  safetyGuidelines: [{
    title: String,
    description: String,
    importance: { type: String, enum: ['critical', 'important', 'recommended'] }
  }],
  equipment: [String],
  progression: {
    currentLevel: String,
    nextLevel: String,
    requirements: [String],
    milestones: [{
      distance: Number, // meters
      time: Number, // seconds
      technique: String,
      achieved: { type: Boolean, default: false }
    }]
  },
  performanceMetrics: {
    strokeCount: { type: Number, default: 0 },
    averagePace: { type: Number, default: 0 }, // seconds per 25m
    heartRateZones: {
      zone1: { min: Number, max: Number },
      zone2: { min: Number, max: Number },
      zone3: { min: Number, max: Number },
      zone4: { min: Number, max: Number }
    },
    efficiency: { type: Number, default: 0 } // percentage
  },
  prerequisites: [{
    skillLevel: String,
    maxDistance: Number, // meters
    maxDuration: Number, // minutes
    requiredTechniques: [String]
  }],
  isActive: { type: Boolean, default: false },
  progress: {
    completedSessions: [{ type: Date }],
    totalDistance: { type: Number, default: 0 }, // meters
    totalTime: { type: Number, default: 0 }, // minutes
    averagePace: { type: Number, default: 0 }, // seconds per 25m
    currentWeek: { type: Number, default: 1 },
    techniqueMastery: [{
      technique: String,
      masteryLevel: { type: Number, default: 0 }, // 1-10 scale
      lastPracticed: Date
    }],
    adherenceRate: { type: Number, default: 0 } // percentage
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SwimmingPlan', SwimmingPlanSchema);
