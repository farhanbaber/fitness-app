const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    age: { type: Number, required: true },
    gender: { 
      type: String, 
      enum: ['male', 'female', 'other'],
      required: true 
    },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'moderate', 'active'],
      required: true
    },
    goal: { 
      type: String, 
      enum: ['weight_loss', 'muscle_gain', 'endurance', 'strength', 'fit'],
      required: true 
    },
    fitnessLevel: { 
      type: String, 
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true 
    }
  },
  stats: {
    weightHistory: [{
      weight: Number,
      date: { type: Date, default: Date.now }
    }],
    workoutHistory: [{
      type: String,
      duration: Number,
      calories: Number,
      date: { type: Date, default: Date.now }
    }],
    personalRecords: {
      benchPress: Number,
      squat: Number,
      deadlift: Number,
      mileRun: Number
    }
  },
  preferences: {
    units: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
    notifications: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
