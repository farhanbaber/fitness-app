import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Droplet, 
  Moon, 
  Weight, 
  TrendingUp, 
  Zap, 
  Clock, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import BiometricChart from '../components/BiometricChart';

const data = [
  { name: 'Mon', calories: 2100, weight: 79.2 },
  { name: 'Tue', calories: 1900, weight: 79.0 },
  { name: 'Wed', calories: 2400, weight: 78.8 },
  { name: 'Thu', calories: 1800, weight: 78.9 },
  { name: 'Fri', calories: 2200, weight: 78.6 },
  { name: 'Sat', calories: 2600, weight: 78.5 },
  { name: 'Sun', calories: 2000, weight: 78.4 },
];

const StatCard = ({ icon: Icon, label, value, unit, trend, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass p-5 rounded-[2rem] relative overflow-hidden group hover:border-gold/30 transition-all cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-2xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-black transition-all">
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-3xl font-black text-white leading-none">{value}</h3>
        <span className="text-gold text-xs font-bold uppercase">{unit}</span>
      </div>
    </div>
    <div className="absolute -bottom-2 -right-2 opacity-5 scale-150 rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-700">
      <Icon size={120} />
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-2"
          >
            <div className="w-12 h-[2px] bg-gold"></div>
            <p className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Biometric Live Feed</p>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-6xl font-black italic uppercase tracking-tighter text-white"
          >
            Elite <span className="text-gold text-shadow-gold">Performance</span>
          </motion.h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-white font-black text-2xl italic tracking-tighter">
              {currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              {currentDateTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
          <button className="glass-gold p-4 rounded-2xl text-gold hover:bg-gold hover:text-black transition-all group">
            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Weight} label="Current weight" value="78.5" unit="kg" trend={-0.4} delay={0.1} />
        <StatCard icon={Zap} label="Energy burnt" value="1,840" unit="kcal" trend={12} delay={0.2} />
        <StatCard icon={Activity} label="Heart Rate" value="120" unit="bpm" delay={0.3} />
        <StatCard icon={Moon} label="Sleep Score" value="92" unit="%" trend={5} delay={0.4} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass rounded-[2.5rem] p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black italic uppercase text-white">Performance Metrics</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Last 7 Days Progress</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                <span className="text-[10px] font-bold uppercase text-gray-400">Calories</span>
              </div>
            </div>
          </div>
          
          <BiometricChart data={data} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-[2.5rem] p-8 flex flex-col"
        >
          <h3 className="text-xl font-black italic uppercase text-white mb-6">Daily Goals</h3>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Water Intake', current: 2.4, target: 3.5, unit: 'L', color: 'blue' },
              { label: 'Step Counter', current: 8432, target: 10000, unit: 'steps', color: 'gold' },
              { label: 'Active Minutes', current: 45, target: 60, unit: 'min', color: 'green' }
            ].map((goal, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-black uppercase text-gray-500">{goal.label}</p>
                  <p className="text-xs font-bold text-white">
                    {goal.current}<span className="text-gray-500">/{goal.target}</span> <span className="text-[10px] text-gold">{goal.unit}</span>
                  </p>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                    transition={{ delay: 0.8 + (i * 0.1), duration: 1 }}
                    className={`h-full rounded-full ${goal.color === 'gold' ? 'bg-gold' : goal.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-8 w-full glass-gold py-4 rounded-2xl text-gold font-black uppercase text-[10px] tracking-widest hover:bg-gold hover:text-black transition-all flex items-center justify-center gap-2">
            View Analysis <ChevronRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: TrendingUp, title: 'Running Session', time: '2 hours ago', value: '5.2 km', sub: '320 kcal burnt', type: 'Cardio' },
          { icon: Activity, title: 'Strength Training', time: 'Yesterday', value: '45 mins', sub: '12 sets completed', type: 'Weight' },
          { icon: Droplet, title: 'Hydration Target', time: 'Just now', value: '250 ml', sub: 'Cup of water added', type: 'Nutrition' }
        ].map((activity, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + (i * 0.1) }}
            className="glass p-6 rounded-3xl flex items-center gap-4 hover:border-white/10 transition-all cursor-pointer group"
          >
            <div className="p-4 rounded-2xl bg-white/5 text-gray-400 group-hover:bg-gold group-hover:text-black transition-all">
              <activity.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-[8px] font-black uppercase text-gold tracking-widest mb-1">{activity.type}</p>
                <p className="text-[8px] font-bold text-gray-600">{activity.time}</p>
              </div>
              <h4 className="text-sm font-black text-white uppercase truncate">{activity.title}</h4>
              <p className="text-[10px] text-gray-500">{activity.sub}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-white italic">{activity.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

