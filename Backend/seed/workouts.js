const mongoose = require('mongoose');
const Workout = require('../models/Workout');
require('dotenv').config();

const sampleWorkouts = [
  {
    name: 'Hypertrophy Upper',
    duration: 55,
    intensity: 'High',
    status: 'Completed',
    exercises: [
      { name: 'Push-ups', sets: 4, reps: 12, weight: 0 },
      { name: 'Squats', sets: 4, reps: 15, weight: 0 },
      { name: 'Plank', sets: 3, reps: 1, weight: 0 }
    ],
    caloriesBurned: 320,
    completedAt: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    name: 'Core Stability',
    duration: 20,
    intensity: 'Medium',
    status: 'Active',
    exercises: [
      { name: 'Plank', sets: 3, reps: 1, weight: 0 },
      { name: 'Mountain Climbers', sets: 3, reps: 20, weight: 0 }
    ],
    caloriesBurned: 150
  },
  {
    name: 'Leg Power Alpha',
    duration: 75,
    intensity: 'Elite',
    status: 'Pending',
    exercises: [
      { name: 'Squats', sets: 5, reps: 20, weight: 0 },
      { name: 'Lunges', sets: 4, reps: 15, weight: 0 },
      { name: 'Jumping Jacks', sets: 3, reps: 30, weight: 0 }
    ],
    caloriesBurned: 450
  },
  {
    name: 'Cardio Blast',
    duration: 30,
    intensity: 'High',
    status: 'Pending',
    exercises: [
      { name: 'Running', sets: 1, reps: 1, weight: 0 },
      { name: 'Burpees', sets: 3, reps: 10, weight: 0 },
      { name: 'Jumping Jacks', sets: 3, reps: 25, weight: 0 }
    ],
    caloriesBurned: 280
  }
];

async function seedWorkouts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://farhanbaber:farhanbaber1122@cluster0.8jfdf5t.mongodb.net/fitnessDB?retryWrites=true&w=majority&appName=Cluster0");
    
    await Workout.deleteMany({});
    await Workout.insertMany(sampleWorkouts);
    
    console.log('✅ Sample workouts seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding workouts:', error);
    process.exit(1);
  }
}

seedWorkouts();
