const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  intensity: { type: String, enum: ['Low', 'Medium', 'High', 'Elite'], required: true },
  status: { type: String, enum: ['Pending', 'Active', 'Completed'], default: 'Pending' },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number
  }],
  caloriesBurned: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

module.exports = mongoose.model('Workout', WorkoutSchema);