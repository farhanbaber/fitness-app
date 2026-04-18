import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Plus, 
  Download,
  Droplet,
  Flame,
  TrendingUp,
  Calendar,
  Target,
  ChevronRight,
  Coffee,
  Sun,
  Moon
} from 'lucide-react';

const Nutrition = () => {
  const [waterIntake, setWaterIntake] = useState(1250);
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  const dietPlans = [
    {
      name: 'Anabolic Shred',
      type: 'muscle_gain',
      dailyCalories: 2800,
      macroSplit: { protein: 35, carbs: 45, fats: 20 },
      isActive: true
    },
    {
      name: 'Ketogenic Lean',
      type: 'weight_loss',
      dailyCalories: 2100,
      macroSplit: { protein: 25, carbs: 5, fats: 70 },
      isActive: false
    }
  ];

  const meals = [
    { id: 'breakfast', name: 'Breakfast', time: '07:30 AM', icon: Coffee, items: ['Oatmeal with Blueberries', '4 Egg Whites', 'Protein Shake'], cals: 550 },
    { id: 'lunch', name: 'Lunch', time: '01:00 PM', icon: Sun, items: ['Grilled Chicken Breast', 'Quinoa Portfolio', 'Steamed Asparagus'], cals: 720 },
    { id: 'dinner', name: 'Dinner', time: '08:00 PM', icon: Moon, items: ['Salmon Fillet', 'Sweet Potato Mash', 'Mixed Greens'], cals: 680 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-12 h-[2px] bg-gold"></div>
            <p className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Fueling & Nutrition</p>
          </div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
            Metabolic <span className="text-gold text-shadow-gold">Fuel</span>
          </h1>
        </div>
        <div className="flex gap-4">
           <button className="glass-gold px-8 py-4 rounded-2xl text-gold font-black uppercase text-[10px] tracking-widest hover:bg-gold hover:text-black transition-all flex items-center gap-2">
             <Plus size={16} /> Log Meal
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Macros & Plans */}
        <div className="lg:col-span-4 space-y-8">
           <section className="glass rounded-[2.5rem] p-8">
              <h3 className="text-xl font-black italic uppercase text-white mb-6">Active Protocol</h3>
              {dietPlans.map((plan, i) => (
                <div key={i} className={`p-6 rounded-3xl border transition-all ${plan.isActive ? 'border-gold/30 bg-gold/5' : 'border-white/5 opacity-50'}`}>
                   <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-black uppercase italic text-white">{plan.name}</h4>
                      {plan.isActive && <span className="text-[8px] font-black uppercase bg-gold text-black px-2 py-1 rounded-full">Primary</span>}
                   </div>
                   <div className="grid grid-cols-3 gap-2">
                      {Object.entries(plan.macroSplit).map(([key, val]) => (
                        <div key={key} className="text-center p-3 bg-white/5 rounded-2xl">
                           <p className="text-[8px] font-black uppercase text-gray-500">{key}</p>
                           <p className="text-xs font-black text-gold">{val}%</p>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </section>

           <section className="glass rounded-[2.5rem] p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover:scale-110 transition-transform duration-700">
                 <Droplet size={120} />
              </div>
              <h3 className="text-xl font-black italic uppercase text-white mb-6 underline decoration-gold underline-offset-8">Hydration</h3>
              <div className="space-y-6 relative z-10">
                 <div className="flex items-center justify-between">
                    <div>
                        <p className="text-4xl font-black text-white italic">{waterIntake}<span className="text-gold text-sm ml-1">ml</span></p>
                        <p className="text-[10px] font-black uppercase text-gray-500 mt-1">Goal: 3,500ml</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-2 border-white/5 border-t-gold flex items-center justify-center animate-spin-slow">
                       <span className="text-[10px] font-black text-white">{Math.round((waterIntake/3500)*100)}%</span>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setWaterIntake(w => w + 250)} className="py-3 bg-white/5 hover:bg-gold hover:text-black rounded-2xl text-[10px] font-black uppercase transition-all">+250ml</button>
                    <button onClick={() => setWaterIntake(w => w + 500)} className="py-3 bg-white/5 hover:bg-gold hover:text-black rounded-2xl text-[10px] font-black uppercase transition-all">+500ml</button>
                 </div>
              </div>
           </section>
        </div>

        {/* Right: Meal Plan */}
        <div className="lg:col-span-8 space-y-8">
           <section className="glass rounded-[3rem] p-10">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black italic uppercase text-white">Daily Meal Matrix</h3>
                 <div className="p-3 glass rounded-2xl text-gold font-black text-[10px] uppercase">
                    Total: 1,950 / 2,800 kcal
                 </div>
              </div>

              <div className="space-y-6">
                 {meals.map((meal, i) => (
                   <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={meal.id} 
                    className="group flex flex-col md:flex-row gap-6 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-all"
                   >
                      <div className="flex items-center gap-6 flex-1">
                         <div className="p-5 rounded-3xl bg-white/5 text-gold group-hover:bg-gold group-hover:text-black transition-all">
                            <meal.icon size={28} />
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <h4 className="text-xl font-black uppercase italic text-white leading-none">{meal.name}</h4>
                               <span className="text-[9px] font-black uppercase text-gold/60">{meal.time}</span>
                            </div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase">{meal.items.join(' • ')}</p>
                         </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-8">
                         <div className="text-right">
                             <p className="text-2xl font-black text-white italic leading-none">{meal.cals}</p>
                             <p className="text-[9px] font-black text-gray-600 uppercase">Calories</p>
                         </div>
                         <button className="p-4 glass rounded-2xl text-gray-500 hover:text-gold transition-all">
                            <Plus size={20} />
                         </button>
                      </div>
                   </motion.div>
                 ))}
              </div>

              <div className="mt-12 bg-gold/5 p-8 rounded-[2rem] border border-gold/10 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="flex items-center gap-4">
                    <div className="p-4 bg-gold rounded-2xl text-black">
                       <Target size={24} />
                    </div>
                    <div>
                       <h4 className="text-white font-black uppercase italic">Nutrition Integrity</h4>
                       <p className="text-[10px] text-gray-400 font-black uppercase">You have reached 85% of your protein target today.</p>
                    </div>
                 </div>
                 <button className="glass-gold px-8 py-4 rounded-2xl text-gold font-black uppercase text-[10px] tracking-widest hover:bg-gold hover:text-black transition-all">
                    View Full Analysis
                 </button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;

