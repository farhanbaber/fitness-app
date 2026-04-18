import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Plus, 
  Play, 
  Pause,
  Download,
  Clock,
  Zap,
  Target,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

const WorkoutPlanner = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('chest');
  const [exercises, setExercises] = useState([]);

  const muscleGroups = [
    { id: 'chest', name: 'Chest', icon: 'P' },
    { id: 'back', name: 'Back', icon: 'B' },
    { id: 'shoulders', name: 'Shoulders', icon: 'S' },
    { id: 'biceps', name: 'Biceps', icon: 'Bi' },
    { id: 'triceps', name: 'Triceps', icon: 'T' },
    { id: 'legs', name: 'Legs', icon: 'L' },
    { id: 'abs', name: 'Abs', icon: 'A' }
  ];

  const mockWorkoutPlans = [
    {
      name: 'Hypertrophy Alpha',
      type: 'full_body',
      difficulty: 'Advanced',
      duration: 8,
      weeklySchedule: ['Mon', 'Wed', 'Fri'],
      isActive: true,
      color: 'gold'
    },
    {
      name: 'Endurance Core',
      type: 'split',
      difficulty: 'Intermediate',
      duration: 6,
      weeklySchedule: ['Tue', 'Thu', 'Sat'],
      isActive: false,
      color: 'blue'
    }
  ];

  const mockExercises = {
    chest: [
      { name: 'Bench Press', sets: 4, reps: 12, weight: '80kg', rest: '90s', intensity: 85 },
      { name: 'Incline DB Press', sets: 3, reps: 10, weight: '30kg', rest: '60s', intensity: 75 },
      { name: 'Cable Flyes', sets: 3, reps: 15, weight: '20kg', rest: '45s', intensity: 65 }
    ],
    back: [
      { name: 'Deadlifts', sets: 4, reps: 8, weight: '120kg', rest: '120s', intensity: 95 },
      { name: 'Weighted Pull-ups', sets: 3, reps: 10, weight: '+10kg', rest: '90s', intensity: 80 },
      { name: 'Barbell Rows', sets: 3, reps: 12, weight: '60kg', rest: '60s', intensity: 75 }
    ]
  };

  useEffect(() => {
    setWorkoutPlans(mockWorkoutPlans);
    setExercises(mockExercises[selectedMuscleGroup] || mockExercises['chest']);
  }, [selectedMuscleGroup]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-12 h-[2px] bg-gold"></div>
            <p className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Training Intelligence</p>
          </div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
            Workout <span className="text-gold text-shadow-gold">Planner</span>
          </h1>
        </div>
        <div className="flex gap-4">
           <button className="glass-gold px-8 py-4 rounded-2xl text-gold font-black uppercase text-[10px] tracking-widest hover:bg-gold hover:text-black transition-all flex items-center gap-2">
             <Plus size={16} /> New Program
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Muscle Groups & Programs */}
        <div className="lg:col-span-4 space-y-8">
          <section className="glass rounded-[2.5rem] p-8">
            <h3 className="text-xl font-black italic uppercase text-white mb-6">Anatomy Focus</h3>
            <div className="grid grid-cols-3 gap-3">
              {muscleGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedMuscleGroup(group.id)}
                  className={`group relative p-4 rounded-2xl transition-all overflow-hidden ${
                    selectedMuscleGroup === group.id 
                      ? 'bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-lg font-black mb-1 opacity-40">{group.icon}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest">{group.name}</div>
                  </div>
                  {selectedMuscleGroup !== group.id && (
                    <div className="absolute inset-0 bg-gold/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
             <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4">Current Assignments</h3>
             {workoutPlans.map((plan, i) => (
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 key={i} 
                 className={`glass p-6 rounded-[2rem] border transition-all cursor-pointer ${plan.isActive ? 'border-gold/30 bg-gold/5' : 'border-white/5 hover:border-white/10'}`}
               >
                 <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${plan.isActive ? 'bg-gold text-black' : 'bg-white/5 text-gray-400'}`}>
                       <Dumbbell size={18} />
                    </div>
                    {plan.isActive && <span className="text-[8px] font-black uppercase bg-gold/10 text-gold px-2 py-1 rounded-full">Active</span>}
                 </div>
                 <h4 className="text-lg font-black uppercase italic text-white mb-1">{plan.name}</h4>
                 <div className="flex items-center gap-3 text-gray-500 text-[9px] font-bold uppercase">
                    <span>{plan.type.replace('_', ' ')}</span>
                    <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                    <span>{plan.difficulty}</span>
                 </div>
                 
                 <div className="mt-6 flex gap-2">
                    {plan.weeklySchedule.map((day, di) => (
                      <div key={di} className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-[8px] font-black text-gray-400 uppercase">
                        {day}
                      </div>
                    ))}
                 </div>
               </motion.div>
             ))}
          </section>
        </div>

        {/* Right Column: Exercises & Execution */}
        <div className="lg:col-span-8 space-y-8">
           <section className="glass rounded-[2.5rem] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Target size={200} />
              </div>

              <div className="flex justify-between items-end mb-10 relative z-10">
                 <div>
                   <h3 className="text-3xl font-black italic uppercase text-white leading-none">Routine Execution</h3>
                   <p className="text-gold text-[10px] font-black uppercase tracking-widest mt-2">{selectedMuscleGroup} Focus Layer</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="text-right">
                       <p className="text-white font-black text-xl italic">45 <span className="text-gold text-xs">min</span></p>
                       <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Est. Duration</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedMuscleGroup}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {exercises.map((ex, index) => (
                      <div key={index} className="group glass p-6 rounded-3xl border border-white/5 hover:border-gold/30 transition-all flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white font-black italic group-hover:bg-gold group-hover:text-black transition-all">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-black uppercase italic text-white group-hover:text-gold transition-colors">{ex.name}</h4>
                          <div className="flex gap-4 mt-1">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                               <Clock size={10} className="text-gold" /> <span>{ex.rest} rest</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                               <TrendingUp size={10} className="text-green-500" /> <span>{ex.intensity}% intensity</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 items-center">
                           <div className="text-right">
                              <p className="text-white font-black text-lg">{ex.sets}<span className="text-gray-600 text-[10px] ml-1">x</span>{ex.reps}</p>
                              <p className="text-[9px] font-black text-gold uppercase tracking-widest">{ex.weight}</p>
                           </div>
                           <button className="p-4 rounded-2xl bg-gold/10 text-gold hover:bg-gold hover:text-black transition-all">
                              <Play size={16} fill="currentColor" />
                           </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5 flex justify-between items-center">
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                       <Award size={20} className="text-gold" />
                       <div>
                          <p className="text-white font-black text-sm uppercase">650 <span className="text-gray-500 text-[10px]">kcal</span></p>
                          <p className="text-[8px] font-black text-gray-500 uppercase">Projected Burn</p>
                       </div>
                    </div>
                 </div>
                 <button className="glass-gold px-10 py-5 rounded-2xl text-gold font-black uppercase text-[10px] tracking-widest hover:bg-gold hover:text-black transition-all shadow-[0_10px_30px_rgba(212,175,55,0.1)]">
                    Begin Session
                 </button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanner;

