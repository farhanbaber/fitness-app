const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['cardio', 'strength', 'flexibility', 'balance'], required: true },
  muscleGroup: { type: String, required: true },
  instructions: { type: String, required: true },
  equipment: [String],
  // Align difficulty enum with other models (lowercase)
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  // Recommended/default duration in minutes (can be used by planners)
  recommendedDurationMinutes: { type: Number, default: 10 },
  caloriesPerMinute: { type: Number, default: 5 },
  intensity: { type: String, enum: ['low', 'moderate', 'high'], default: 'moderate' },
  gifUrl: { type: String } // For exercise demonstrations
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
