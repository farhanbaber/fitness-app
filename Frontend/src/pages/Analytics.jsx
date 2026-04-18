import React from 'react';
import Activitychart from '../components/Activitychart';

const Analytics = () => {
  return (
    <div className="space-y-10">
      <header className="border-b border-white/5 pb-6">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Data <span className="text-[#D4AF37]">Vault</span></h2>
        <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">
          Performance Analytics & Progress Tracking
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart */}
        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem]">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Weekly Activity</h3>
          <Activitychart />
        </div>

        {/* Progress Stats */}
        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Performance Metrics</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-black uppercase">Total Workouts</span>
              <span className="text-2xl font-black text-white">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-black uppercase">Calories Burned</span>
              <span className="text-2xl font-black text-[#D4AF37]">12,450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-black uppercase">Active Days</span>
              <span className="text-2xl font-black text-white">28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-black uppercase">Personal Records</span>
              <span className="text-xl font-black text-[#D4AF37]">New!</span>
            </div>
            <span className="w-3 h-3 rounded-full bg-white/20"></span>
          </div>
        </div>
        <Activitychart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
          <p className="text-[9px] font-black uppercase text-[#D4AF37] mb-2 tracking-[0.2em]">Efficiency Rating</p>
          <p className="text-5xl font-black italic text-white">94.8%</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
          <p className="text-[9px] font-black uppercase text-white mb-2 tracking-[0.2em]">Recovery Index</p>
          <p className="text-5xl font-black italic text-[#D4AF37]">Optimum</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;