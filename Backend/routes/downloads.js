const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const WorkoutPlan = require('../models/WorkoutPlan');
const DietPlan = require('../models/DietPlan');
const CardioPlan = require('../models/CardioPlan');
const SwimmingPlan = require('../models/SwimmingPlan');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

// Download workout plan as PDF
router.get('/workout/:id/pdf', auth, async (req, res) => {
  try {
    const workout = await WorkoutPlan.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    // Create PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${workout.name}.pdf"`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(20).text('Workout Plan: ' + workout.name, { align: 'center' });
    doc.moveDown(30);
    
    doc.fontSize(14).text('Muscle Group: ' + workout.muscleGroup);
    doc.moveDown(20);
    
    doc.fontSize(14).text('Difficulty: ' + workout.difficulty);
    doc.moveDown(20);
    
    doc.fontSize(14).text('Duration: ' + workout.duration + ' minutes');
    doc.moveDown(30);
    
    doc.fontSize(16).text('Exercises:', { underline: true });
    doc.moveDown(20);
    
    workout.exercises.forEach((exercise, index) => {
      doc.fontSize(14).text(`${index + 1}. ${exercise.name}`);
      doc.moveDown(10);
      doc.fontSize(12).text(`   Sets: ${exercise.sets} | Reps: ${exercise.reps} | Rest: ${exercise.restTime}s`);
      doc.moveDown(10);
      doc.fontSize(10).text(`   Instructions: ${exercise.instructions}`);
      doc.moveDown(20);
    });
    
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Download diet plan as JSON
router.get('/diet/:id/json', auth, async (req, res) => {
  try {
    const dietPlan = await DietPlan.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }

    // Set response headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${dietPlan.name}.json"`);

    // Send JSON data
    const dietData = {
      name: dietPlan.name,
      description: dietPlan.description,
      goal: dietPlan.goal,
      duration: dietPlan.duration,
      dailyCalories: dietPlan.dailyCalories,
      macros: dietPlan.macros,
      meals: dietPlan.meals,
      waterIntake: dietPlan.waterIntake,
      supplements: dietPlan.supplements,
      restrictions: dietPlan.restrictions,
      preferences: dietPlan.preferences
    };

    res.json(dietData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Download weekly schedule as PDF
router.get('/schedule/:userId/pdf', auth, async (req, res) => {
  try {
    // Get user's active plans
    const [workout, diet, cardio] = await Promise.all([
      WorkoutPlan.findOne({ userId: req.user.id, isActive: true }),
      DietPlan.findOne({ userId: req.user.id, isActive: true }),
      CardioPlan.findOne({ userId: req.user.id, isActive: true })
    ]);

    // Create PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="weekly-schedule.pdf"');

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(20).text('Weekly Fitness Schedule', { align: 'center' });
    doc.moveDown(30);
    
    // Days of the week
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    days.forEach(day => {
      doc.fontSize(16).text(day, { underline: true });
      doc.moveDown(20);
      
      if (workout && workout.schedule?.days?.includes(day.toLowerCase())) {
        doc.fontSize(12).text(`Workout: ${workout.name}`);
        doc.moveDown(10);
        doc.fontSize(10).text(`Duration: ${workout.duration} minutes`);
        doc.moveDown(15);
      }
      
      if (diet && diet.meals && diet.meals.length > 0) {
        doc.fontSize(12).text('Nutrition:');
        doc.moveDown(10);
        diet.meals.forEach(meal => {
          doc.fontSize(10).text(`  ${meal.name}: ${meal.totalCalories} calories`);
          doc.moveDown(8);
        });
        doc.moveDown(10);
      }
      
      if (cardio && cardio.weeklySchedule) {
        const daySchedule = cardio.weeklySchedule.find(s => s.day === day.toLowerCase());
        if (daySchedule && daySchedule.type !== 'rest') {
          doc.fontSize(12).text(`Cardio: ${daySchedule.duration} minutes`);
          doc.moveDown(10);
          doc.fontSize(10).text(`Intensity: ${daySchedule.intensity}`);
          doc.moveDown(15);
        }
      }
      
      doc.moveDown(10);
    });
    
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Download progress report as PDF
router.get('/progress/:userId/pdf', auth, async (req, res) => {
  try {
    // Get user's progress data
    const progress = await Progress.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(30); // Last 30 days

    // Create PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="progress-report.pdf"');

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(20).text('Progress Report', { align: 'center' });
    doc.moveDown(30);
    
    doc.fontSize(14).text(`Report Generated: ${new Date().toLocaleDateString()}`);
    doc.moveDown(20);
    
    // Group progress by type
    const workoutProgress = progress.filter(p => p.type === 'workout');
    const nutritionProgress = progress.filter(p => p.type === 'nutrition');
    const cardioProgress = progress.filter(p => p.type === 'cardio');
    const swimmingProgress = progress.filter(p => p.type === 'swimming');

    if (workoutProgress.length > 0) {
      doc.fontSize(16).text('Workout Progress:', { underline: true });
      doc.moveDown(15);
      
      workoutProgress.forEach(record => {
        doc.fontSize(12).text(`Date: ${record.date.toLocaleDateString()}`);
        doc.fontSize(10).text(`  Completion: ${record.data.completionPercentage}%`);
        doc.fontSize(10).text(`  Calories Burned: ${record.data.caloriesBurned}`);
        doc.moveDown(15);
      });
    }

    if (nutritionProgress.length > 0) {
      doc.fontSize(16).text('Nutrition Progress:', { underline: true });
      doc.moveDown(15);
      
      nutritionProgress.forEach(record => {
        doc.fontSize(12).text(`Date: ${record.date.toLocaleDateString()}`);
        doc.fontSize(10).text(`  Calories Consumed: ${record.data.caloriesConsumed}`);
        doc.fontSize(10).text(`  Adherence Rate: ${record.data.adherenceRate}%`);
        doc.moveDown(15);
      });
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Download cardio plan as PDF
router.get('/cardio/:id/pdf', auth, async (req, res) => {
  try {
    const cardioPlan = await CardioPlan.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!cardioPlan) {
      return res.status(404).json({ message: 'Cardio plan not found' });
    }

    // Create PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${cardioPlan.name}.pdf"`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(20).text('Cardio Plan: ' + cardioPlan.name, { align: 'center' });
    doc.moveDown(30);
    
    doc.fontSize(14).text('Type: ' + cardioPlan.type);
    doc.moveDown(20);
    
    doc.fontSize(14).text('Goal: ' + cardioPlan.goal);
    doc.moveDown(20);
    
    doc.fontSize(14).text('Duration: ' + cardioPlan.duration + ' weeks');
    doc.moveDown(20);
    
    doc.fontSize(14).text('Difficulty: ' + cardioPlan.difficulty);
    doc.moveDown(30);
    
    doc.fontSize(16).text('Weekly Schedule:', { underline: true });
    doc.moveDown(20);
    
    cardioPlan.weeklySchedule.forEach(day => {
      doc.fontSize(14).text(day.day.charAt(0).toUpperCase() + day.day.slice(1));
      doc.moveDown(10);
      doc.fontSize(12).text(`  Type: ${day.type}`);
      doc.fontSize(12).text(`  Duration: ${day.duration} minutes`);
      doc.fontSize(12).text(`  Intensity: ${day.intensity}`);
      doc.moveDown(15);
    });
    
    doc.fontSize(16).text('Benefits:', { underline: true });
    doc.moveDown(15);
    
    cardioPlan.benefits.forEach(benefit => {
      doc.fontSize(12).text('• ' + benefit);
      doc.moveDown(10);
    });
    
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Download swimming plan as PDF
router.get('/swimming/:id/pdf', auth, async (req, res) => {
  try {
    const swimmingPlan = await SwimmingPlan.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!swimmingPlan) {
      return res.status(404).json({ message: 'Swimming plan not found' });
    }

    // Create PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${swimmingPlan.name}.pdf"`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(20).text('Swimming Plan: ' + swimmingPlan.name, { align: 'center' });
    doc.moveDown(30);
    
    doc.fontSize(14).text('Type: ' + swimmingPlan.type);
    doc.moveDown(20);
    
    doc.fontSize(14).text('Goal: ' + swimmingPlan.goal);
    doc.moveDown(20);
    
    doc.fontSize(14).text('Duration: ' + swimmingPlan.duration + ' weeks');
    doc.moveDown(20);
    
    doc.fontSize(14).text('Difficulty: ' + swimmingPlan.difficulty);
    doc.moveDown(30);
    
    doc.fontSize(16).text('Techniques:', { underline: true });
    doc.moveDown(20);
    
    swimmingPlan.techniques.forEach(technique => {
      doc.fontSize(14).text(technique.name);
      doc.fontSize(10).text(technique.description);
      doc.moveDown(15);
    });
    
    doc.fontSize(16).text('Safety Guidelines:', { underline: true });
    doc.moveDown(15);
    
    swimmingPlan.safetyGuidelines.forEach(guideline => {
      doc.fontSize(12).text(guideline.title + ':');
      doc.fontSize(10).text(guideline.description);
      doc.moveDown(15);
    });
    
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
