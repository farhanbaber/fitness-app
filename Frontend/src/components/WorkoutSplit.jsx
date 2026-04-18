import React, { useState } from 'react';

const WorkoutSplit = () => {
  const [selectedSplit, setSelectedSplit] = useState('push');
  const [selectedDay, setSelectedDay] = useState(0);

  const workoutSplits = {
    push: {
      name: 'Push Day',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 8, rest: 90, muscle: 'chest' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: 12, rest: 60, muscle: 'chest' },
        { name: 'Overhead Press', sets: 4, reps: 10, rest: 90, muscle: 'shoulders' },
        { name: 'Tricep Pushdowns', sets: 3, reps: 15, rest: 60, muscle: 'triceps' },
        { name: 'Lateral Raises', sets: 3, reps: 15, rest: 45, muscle: 'shoulders' },
        { name: 'Cable Flys', sets: 3, reps: 12, rest: 60, muscle: 'chest' }
      ]
    },
    pull: {
      name: 'Pull Day',
      exercises: [
        { name: 'Pull-ups', sets: 4, reps: 8, rest: 90, muscle: 'back' },
        { name: 'Bent Over Rows', sets: 4, reps: 10, rest: 90, muscle: 'back' },
        { name: 'Deadlifts', sets: 4, reps: 6, rest: 120, muscle: 'back' },
        { name: 'Lat Pulldowns', sets: 3, reps: 12, rest: 60, muscle: 'back' },
        { name: 'Bicep Curls', sets: 3, reps: 15, rest: 45, muscle: 'biceps' },
        { name: 'Face Pulls', sets: 3, reps: 12, rest: 60, muscle: 'back' }
      ]
    },
    legs: {
      name: 'Leg Day',
      exercises: [
        { name: 'Squats', sets: 4, reps: 10, rest: 120, muscle: 'quads' },
        { name: 'Leg Press', sets: 4, reps: 12, rest: 90, muscle: 'quads' },
        { name: 'Romanian Deadlifts', sets: 3, reps: 10, rest: 90, muscle: 'hamstrings' },
        { name: 'Leg Curls', sets: 3, reps: 15, rest: 60, muscle: 'hamstrings' },
        { name: 'Calf Raises', sets: 4, reps: 20, rest: 45, muscle: 'calves' },
        { name: 'Leg Extensions', sets: 3, reps: 15, rest: 60, muscle: 'quads' }
      ]
    }
  };

  const weeklySchedule = [
    { day: 'Monday', split: 'push' },
    { day: 'Tuesday', split: 'pull' },
    { day: 'Wednesday', split: 'legs' },
    { day: 'Thursday', split: 'rest' },
    { day: 'Friday', split: 'push' },
    { day: 'Saturday', split: 'pull' },
    { day: 'Sunday', split: 'legs' }
  ];

  const getMuscleColor = (muscle) => {
    const colors = {
      chest: '#D4AF37',
      back: '#3B82F6',
      shoulders: '#F59E0B',
      triceps: '#EF4444',
      biceps: '#EF4444',
      quads: '#10B981',
      hamstrings: '#F59E0B',
      calves: '#6B7280'
    };
    return colors[muscle] || '#ffffff';
  };

  const currentWorkout = workoutSplits[selectedSplit];

  return (
    <div className="space-y-8">
      <header className="border-b border-white/5 pb-6">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          Workout <span className="text-[#D4AF37]">Splits</span>
        </h2>
        <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">
          Professional Training Programs
        </p>
      </header>

      {/* Weekly Schedule */}
      <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Weekly Schedule</h3>
        <div className="grid grid-cols-7 gap-2">
          {weeklySchedule.map((day, index) => (
            <div 
              key={day.day}
              onClick={() => setSelectedDay(index)}
              className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                day.split === 'rest' 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white/[0.02] border-white/5 hover:border-[#D4AF37]/50'
              } ${selectedDay === index ? 'ring-2 ring-[#D4AF37]' : ''}`}
            >
              <p className="text-[8px] font-black uppercase text-gray-400">{day.day.slice(0, 3)}</p>
              <p className="text-[10px] font-black uppercase mt-1" style={{ 
                color: day.split === 'rest' ? '#6B7280' : '#D4AF37' 
              }}>
                {day.split === 'rest' ? 'REST' : day.split.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Split Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(workoutSplits).map(([key, split]) => (
          <div
            key={key}
            onClick={() => setSelectedSplit(key)}
            className={`bg-white/[0.02] border p-6 rounded-[2rem] cursor-pointer transition-all ${
              selectedSplit === key 
                ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
                : 'border-white/5 hover:border-white/20'
            }`}
          >
            <h3 className="text-xl font-black italic uppercase text-white mb-4">{split.name}</h3>
            <div className="space-y-2">
              {split.exercises.slice(0, 3).map((exercise, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[9px] text-gray-400">{exercise.name}</span>
                  <span className="text-[9px] text-white font-black">
                    {exercise.sets}×{exercise.reps}
                  </span>
                </div>
              ))}
              {split.exercises.length > 3 && (
                <p className="text-[8px] text-[#D4AF37] font-black">
                  +{split.exercises.length - 3} more exercises
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Current Workout Details */}
      <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black italic uppercase text-white">
            {currentWorkout.name} - <span className="text-[#D4AF37]">Exercises</span>
          </h3>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-[#D4AF37]/20 rounded-full text-[8px] font-black text-[#D4AF37]">
              {currentWorkout.exercises.length} Exercises
            </span>
            <span className="px-3 py-1 bg-blue-600/20 rounded-full text-[8px] font-black text-blue-400">
              ~45 min
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {currentWorkout.exercises.map((exercise, index) => (
            <div 
              key={index} 
              className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-black italic uppercase text-white mb-2">
                    {exercise.name}
                  </h4>
                  <div className="flex gap-6">
                    <span 
                      className="text-[8px] font-black uppercase px-2 py-1 rounded"
                      style={{ backgroundColor: `${getMuscleColor(exercise.muscle)}20` }}
                    >
                      {exercise.muscle}
                    </span>
                    <span className="text-[8px] text-gray-400 font-black uppercase">
                      {exercise.sets} sets × {exercise.reps} reps
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[8px] text-gray-400 font-black uppercase mb-1">
                    Rest Time
                  </div>
                  <div className="text-2xl font-black text-[#D4AF37]">
                    {exercise.rest}s
                  </div>
                </div>
              </div>

              {/* Exercise Details */}
              <div className="grid grid-cols-4 gap-4 text-[8px]">
                <div>
                  <span className="text-gray-400 font-black uppercase">Target</span>
                  <span className="text-white font-black">
                    {exercise.sets} × {exercise.reps}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-black uppercase">Volume</span>
                  <span className="text-white font-black">
                    {exercise.sets * exercise.reps} reps
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-black uppercase">Intensity</span>
                  <span className="text-white font-black">
                    {exercise.reps <= 8 ? 'High' : exercise.reps <= 12 ? 'Medium' : 'Endurance'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-black uppercase">Rest</span>
                  <span className="text-white font-black">{exercise.rest}s</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-[8px] font-black uppercase mb-2">
                  <span>Exercise Progress</span>
                  <span>0/{exercise.sets} sets</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/60 transition-all duration-500" 
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutSplit;
