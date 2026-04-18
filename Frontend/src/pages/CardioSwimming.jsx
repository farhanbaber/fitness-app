import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Plus, 
  Download,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Zap,
  Waves,
  Wind,
  Trophy,
  Navigation
} from 'lucide-react';

const CardioSwimming = () => {
  const [activeTab, setActiveTab] = useState('cardio');

  const cardioPlans = [
    {
      name: 'Oxygen Debt HIIT',
      type: 'Sprint Intervals',
      duration: 30,
      difficulty: 'Elite',
      burn: 550,
      lessons: ['Lactic Threshold', 'Recovery Spikes'],
      isActive: true
    },
    {
      name: 'Endurance Flow',
      type: 'Steady State',
      duration: 60,
      difficulty: 'Intermediate',
      burn: 420,
      lessons: ['Fat Oxidation', 'V02 Max Base'],
      isActive: false
    }
  ];

  const swimPlans = [
    {
      name: 'Aquadynamic Labs',
      type: 'Freestyle Technique',
      duration: 45,
      difficulty: 'Master',
      burn: 600,
      tags: ['Drag Reduction', 'Hip Rotation'],
      isActive: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-12 h-[2px] bg-gold"></div>
            <p className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Endurance & Aerobics</p>
          </div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
            Cardio <span className="text-gold text-shadow-gold">& Hydro</span>
          </h1>
        </div>
      </header>

      {/* Premium Tab Switcher */}
      <div className="flex p-2 glass rounded-[2rem] w-fit mx-auto">
        {[
          { id: 'cardio', label: 'Land Cardio', icon: Wind },
          { id: 'swimming', label: 'Hydro Training', icon: Waves }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all duration-500 ${
              activeTab === tab.id 
                ? 'bg-gold text-black shadow-[0_10px_30px_rgba(212,175,55,0.2)]' 
                : 'text-gray-500 hover:text-white'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -30 }}
           className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
           {(activeTab === 'cardio' ? cardioPlans : swimPlans).map((plan, i) => (
             <div key={i} className="group glass rounded-[3rem] p-10 border border-white/5 hover:border-gold/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   {activeTab === 'cardio' ? <Activity size={180} /> : <Waves size={180} />}
                </div>

                <div className="flex justify-between items-start mb-10 relative z-10">
                   <div>
                      <div className="flex items-center gap-2 mb-2 text-gold">
                         <Trophy size={14} />
                         <span className="text-[9px] font-black uppercase tracking-widest">{plan.difficulty} Protocol</span>
                      </div>
                      <h3 className="text-3xl font-black italic uppercase text-white leading-tight">{plan.name}</h3>
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">{plan.type}</p>
                   </div>
                   <button className="p-4 glass rounded-2xl text-gold hover:bg-gold hover:text-black transition-all">
                      <Plus size={24} />
                   </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-10 relative z-10">
                   <div className="p-5 bg-white/[0.03] rounded-3xl text-center border border-white/5">
                      <p className="text-[8px] font-black uppercase text-gray-500 mb-1">Duration</p>
                      <p className="text-xl font-black text-white italic">{plan.duration}<span className="text-gold text-[10px] ml-1">min</span></p>
                   </div>
                   <div className="p-5 bg-white/[0.03] rounded-3xl text-center border border-white/5">
                      <p className="text-[8px] font-black uppercase text-gray-500 mb-1">Intensity</p>
                      <div className="flex justify-center gap-1 mt-1">
                         {[1,2,3,4,5].map(j => <div key={j} className={`w-1 h-3 rounded-full ${j <= 4 ? 'bg-gold' : 'bg-white/10'}`}></div>)}
                      </div>
                   </div>
                   <div className="p-5 bg-white/[0.03] rounded-3xl text-center border border-white/5">
                      <p className="text-[8px] font-black uppercase text-gray-500 mb-1">Avg Burn</p>
                      <p className="text-xl font-black text-white italic">{plan.burn}<span className="text-gold text-[10px] ml-1">cal</span></p>
                   </div>
                </div>

                <div className="space-y-3 relative z-10 mb-10">
                   <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4">Focus Parameters</p>
                   {(plan.lessons || plan.tags).map((tag, ti) => (
                     <div key={ti} className="flex items-center gap-4 group/tag">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover/tag:bg-gold transition-colors"></div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover/tag:text-white transition-colors">{tag}</p>
                     </div>
                   ))}
                </div>

                <button className="w-full py-5 glass-gold rounded-2xl text-gold font-black uppercase text-[10px] tracking-widest hover:bg-gold hover:text-black transition-all flex items-center justify-center gap-3 relative z-10">
                   <Navigation size={16} /> Deploy Session
                </button>
             </div>
           ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CardioSwimming;
