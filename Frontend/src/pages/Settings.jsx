import React, { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const sections = [
    {
      title: "Profile Information",
      fields: [
        { label: "Display Name", value: "Farhan Baber", type: "text" },
        { label: "Email Address", value: "farhan@elitefit.com", type: "email" },
        { label: "Bio", value: "Frontend Developer | Fitness Enthusiast", type: "text" }
      ]
    },
    {
      title: "Account Security",
      fields: [
        { label: "Current Password", value: "********", type: "password" },
        { label: "New Password", value: "", type: "password" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
            Settings <span className="text-[#D4AF37]">Panel</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
            Configure your elite performance environment
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {sections.map((section, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-10">
                <h3 className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                  {section.title}
                </h3>
                <div className="space-y-6">
                  {section.fields.map((field, fIdx) => (
                    <div key={fIdx} className="group">
                      <label className="block text-gray-500 font-bold uppercase text-[9px] mb-2 px-1">
                        {field.label}
                      </label>
                      <input 
                        type={field.type} 
                        defaultValue={field.value}
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all group-hover:border-white/20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Preferences & Toggles */}
          <div className="space-y-8">
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[2.5rem] p-8">
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">Preferences</h3>
              
              <div className="space-y-6">
                {/* Notification Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-[11px] font-bold uppercase">Push Notifications</span>
                  <button 
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-all duration-500 relative ${notifications ? 'bg-[#D4AF37]' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-black transition-all ${notifications ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>

                {/* Privacy Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-[11px] font-bold uppercase">Public Profile</span>
                  <button 
                    onClick={() => setIsPublic(!isPublic)}
                    className={`w-12 h-6 rounded-full transition-all duration-500 relative ${isPublic ? 'bg-[#D4AF37]' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-black transition-all ${isPublic ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>

              <button className="w-full mt-10 bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#D4AF37] transition-colors">
                Save Changes
              </button>
            </div>

            {/* Danger Zone */}
            <div className="border border-red-900/20 bg-red-900/5 rounded-[2.5rem] p-8">
              <h3 className="text-red-500 font-black uppercase tracking-widest text-[10px] mb-4">Danger Zone</h3>
              <p className="text-gray-600 text-[9px] font-bold uppercase mb-6 leading-relaxed">
                Deleting your account will permanently remove all elite performance data.
              </p>
              <button className="text-red-500 text-[9px] font-black uppercase tracking-widest hover:underline">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;