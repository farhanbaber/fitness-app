import React from 'react';

const Statcard = ({ label, value, unit, trend, color }) => {
  const isGold = color === '#D4AF37';
  
  return (
    <div className="bg-white/[0.03] p-6 rounded-[2rem] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 group relative overflow-hidden cursor-default">
      {/* Background Glow Effect */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#D4AF37]/5 blur-3xl group-hover:bg-[#D4AF37]/10 transition-all"></div>
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</span>
        <div className={`w-1.5 h-1.5 rounded-full ${isGold ? 'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]' : 'bg-white/20'}`}></div>
      </div>

      <div className="flex items-baseline gap-2 relative z-10">
        <h2 className={`text-4xl font-black italic tracking-tighter transition-transform duration-500 group-hover:scale-105 ${isGold ? 'text-[#D4AF37]' : 'text-white'}`}>
          {value}
        </h2>
        <span className="text-[10px] font-bold text-gray-600 uppercase">{unit}</span>
      </div>
      {trend && (
        <div className="mt-2 text-[8px] font-bold uppercase" style={{ color: isGold ? '#D4AF37' : '#ffffff80' }}>
          {trend}
        </div>
      )}
    </div>
  );
};

export default Statcard;