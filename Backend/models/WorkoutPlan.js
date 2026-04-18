const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  muscleGroup: { 
    type: String, 
    enum: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'legs', 'abs'],
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true 
  },
  duration: { type: Number, required: true }, // minutes
  exercises: [{
    name: { type: String, required: true },
    instructions: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    restTime: { type: Number, required: true }, // seconds
    weight: { type: Number }, // kg
    formTips: [String],
    videoUrl: String
  }],
  caloriesBurned: { type: Number, required: true },
  equipment: [String],
  tags: [String],
  isActive: { type: Boolean, default: false },
  progress: {
    completedExercises: [{ type: String }],
    completionPercentage: { type: Number, default: 0 },
    lastCompleted: Date,
    totalCompleted: { type: Number, default: 0 }
  },
  schedule: {
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'weekly' },
    days: [String], // ['monday', 'tuesday', etc.]
    timeOfDay: String // 'morning', 'afternoon', 'evening'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);
