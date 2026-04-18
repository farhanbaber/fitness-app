const mongoose = require('mongoose');

const BiometricLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    }
  },
  weight: { type: Number }, // in kg
  caloriesConsumed: { type: Number, default: 0 },
  caloriesBurnt: { type: Number, default: 0 },
  waterIntake: { type: Number, default: 0 }, // in ml
  sleepScore: { type: Number, min: 0, max: 100 },
  sleepHours: { type: Number },
  heartRateAvg: { type: Number },
  steps: { type: Number, default: 0 },
  mood: { type: String, enum: ['exhausted', 'tired', 'normal', 'energetic', 'peak'] },
  createdAt: { type: Date, default: Date.now }
});

// Ensure only one log per user per day
BiometricLogSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('BiometricLog', BiometricLogSchema);
