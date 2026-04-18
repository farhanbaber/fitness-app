import React from 'react';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'Dashboard', icon: '󰕒' },
    { id: 'Workouts', icon: '⚡' },
    { id: 'Diet', icon: '🥗' },
    { id: 'Analytics', icon: '📊' },
    { id: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="w-64 h-full bg-[#0A0A0A] border-r border-white/5 flex flex-col p-6">
      <div className="mb-10 px-2">
        <h2 className="text-[#D4AF37] font-black italic text-2xl tracking-tighter">ELITE<span className="text-white">FIT</span></h2>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)} // YE LINE ZAROORI HAI
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold uppercase text-[10px] tracking-widest ${
              activePage === item.id 
              ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
              : 'text-gray-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            {item.id}
          </button>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="mt-auto p-4 bg-white/[0.03] rounded-2xl border border-white/5">
        <p className="text-white text-[10px] font-bold uppercase">Farhan Baber</p>
        <p className="text-[#D4AF37] text-[8px] font-black uppercase tracking-widest mt-1">Pro Member</p>
      </div>
    </aside>
  );
};

export default Sidebar;