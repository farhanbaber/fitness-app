const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
require('dotenv').config();

const sampleExercises = [
  {
    name: 'Push-ups',
    category: 'strength',
    muscleGroup: 'chest',
    instructions: 'Start in plank position. Lower your body until chest nearly touches the floor. Push back up to starting position.',
    equipment: ['None'],
    difficulty: 'Beginner',
    caloriesPerMinute: 8
  },
  {
    name: 'Squats',
    category: 'strength',
    muscleGroup: 'legs',
    instructions: 'Stand with feet shoulder-width apart. Lower your body as if sitting in a chair. Keep your back straight and chest up.',
    equipment: ['None'],
    difficulty: 'Beginner',
    caloriesPerMinute: 10
  },
  {
    name: 'Running',
    category: 'cardio',
    muscleGroup: 'full_body',
    instructions: 'Maintain steady pace, pump arms, land on mid-foot. Keep breathing rhythm steady.',
    equipment: ['Running Shoes'],
    difficulty: 'Intermediate',
    caloriesPerMinute: 12
  },
  {
    name: 'Plank',
    category: 'strength',
    muscleGroup: 'core',
    instructions: 'Hold push-up position with body in straight line. Engage core and glutes. Keep breathing steady.',
    equipment: ['None'],
    difficulty: 'Beginner',
    caloriesPerMinute: 5
  },
  {
    name: 'Jumping Jacks',
    category: 'cardio',
    muscleGroup: 'full_body',
    instructions: 'Jump while spreading legs and raising arms overhead. Return to starting position with next jump.',
    equipment: ['None'],
    difficulty: 'Beginner',
    caloriesPerMinute: 10
  },
  {
    name: 'Lunges',
    category: 'strength',
    muscleGroup: 'legs',
    instructions: 'Step forward with one leg, lowering hips until both knees are bent at 90 degrees. Return to start and alternate.',
    equipment: ['None'],
    difficulty: 'Intermediate',
    caloriesPerMinute: 8
  },
  {
    name: 'Burpees',
    category: 'cardio',
    muscleGroup: 'full_body',
    instructions: 'Start standing, drop to plank, do push-up, jump feet to hands, then jump up with arms overhead.',
    equipment: ['None'],
    difficulty: 'Advanced',
    caloriesPerMinute: 15
  },
  {
    name: 'Mountain Climbers',
    category: 'cardio',
    muscleGroup: 'core',
    instructions: 'In plank position, alternate bringing knees toward chest as if running horizontally.',
    equipment: ['None'],
    difficulty: 'Intermediate',
    caloriesPerMinute: 12
  }
];

async function seedExercises() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://farhanbaber:farhanbaber1122@cluster0.8jfdf5t.mongodb.net/fitnessDB?retryWrites=true&w=majority&appName=Cluster0");
    
    await Exercise.deleteMany({});
    await Exercise.insertMany(sampleExercises);
    
    console.log('✅ Sample exercises seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding exercises:', error);
    process.exit(1);
  }
}

seedExercises();
