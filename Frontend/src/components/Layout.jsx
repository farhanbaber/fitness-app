import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Apple, 
  LineChart, 
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-black uppercase text-[10px] tracking-[0.2em] ${
        active 
        ? 'bg-gold text-black shadow-[0_0_25px_rgba(212,175,55,0.25)]' 
        : 'text-gray-500 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </motion.div>
  </Link>
);

const Layout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/workouts', label: 'Training', icon: Dumbbell },
    { path: '/nutrition', label: 'Nutrition', icon: Apple },
    { path: '/analytics', label: 'Analytics', icon: LineChart },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-elite-bg text-whitesmoke font-outfit">
      {/* Sidebar */}
      <aside className="w-72 h-screen sticky top-0 border-r border-white/5 flex flex-col p-8 z-50 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[80px] rounded-full -mr-16 -mt-16 animate-pulse"></div>
        
        <div className="mb-12 relative">
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black font-black italic text-xl group-hover:rotate-12 transition-transform duration-500">
              E
            </div>
            <h2 className="text-xl font-black italic tracking-tighter uppercase">
              Elite<span className="text-gold">Fit</span>
            </h2>
          </Link>
        </div>

        <nav className="space-y-3 flex-1">
          {menuItems.map((item) => (
            <SidebarLink 
              key={item.path}
              to={item.path}
              label={item.label}
              icon={item.icon}
              active={location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/')}
            />
          ))}
        </nav>

        {/* User Profile */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="glass p-5 rounded-[2rem] border border-white/10 hover:border-gold/30 transition-all group cursor-pointer relative overflow-hidden">
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                <User size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-widest truncate">Farhan Baber</p>
                <p className="text-[8px] font-bold text-gold uppercase opacity-60">Elite Member</p>
              </div>
            </div>
            {/* Hover Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-gold/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </div>
          
          <button className="w-full mt-4 flex items-center gap-4 px-6 py-4 text-gray-600 hover:text-red-400 text-[9px] font-black uppercase tracking-widest transition-colors group">
            <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none"></div>
        
        <div className="relative z-10">
          {/* Subtle Top Navigation for Mobile or Extra Stats can go here */}
          <div className="md:hidden p-6 flex justify-between items-center border-b border-white/5">
             <h2 className="text-xl font-black italic tracking-tighter uppercase">Elite<span className="text-gold">Fit</span></h2>
             <button className="p-2 glass rounded-lg"><Settings size={20} /></button>
          </div>
          
          <div className="p-2 md:p-4">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
