const mongoose = require('mongoose');

const UserStatsSchema = new mongoose.Schema({
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  caloriesTarget: { type: Number, default: 2500 },
  caloriesConsumed: { type: Number, default: 0 },
  waterIntake: { type: Number, default: 0 },
  // Reference to daily biometric logs (detailed timestamped entries)
  dailyLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BiometricLog' }],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserStats', UserStatsSchema);