import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Info,
  Scale,
  Target,
  Zap
} from 'lucide-react';

const Profile = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: 25,
    gender: 'male',
    weight: 75,
    height: 175,
    goal: 'muscle_gain',
    activityLevel: 'moderate'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const StepIndicator = () => (
    <div className="flex gap-2 mb-10">
      {[1, 2, 3].map(i => (
        <div 
          key={i} 
          className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-gold' : 'bg-white/10'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
          Personal <span className="text-gold">Profile</span>
        </h1>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
          Configure clinical parameters for performance tailoring
        </p>
      </header>

      <StepIndicator />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-gold/10 text-gold"><User size={20} /></div>
                <h3 className="text-xl font-bold uppercase italic">Physical Stats</h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Age</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white font-black focus:outline-none focus:border-gold/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Gender</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white font-black focus:outline-none focus:border-gold/50 transition-all appearance-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white font-black focus:outline-none focus:border-gold/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Height (cm)</label>
                  <input 
                    type="number" 
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white font-black focus:outline-none focus:border-gold/50 transition-all"
                  />
                </div>
              </div>
            </div>
            <button onClick={nextStep} className="w-full py-5 bg-gold text-black rounded-2xl font-black uppercase tracking-widest hover:bg-gold/80 transition-all flex items-center justify-center gap-2">
              Next Step <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-gold/10 text-gold"><Target size={20} /></div>
                <h3 className="text-xl font-bold uppercase italic">Performance Goals</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'weight_loss', label: 'Weight Loss', desc: 'Shed body fat and lean out' },
                  { id: 'muscle_gain', label: 'Muscle Build', desc: 'Hypertrophy and strength focus' },
                  { id: 'fit', label: 'Stay Fit', desc: 'Maintain current physique and health' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setFormData({...formData, goal: item.id})}
                    className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${formData.goal === item.id ? 'border-gold bg-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border-white/5 hover:border-white/20 bg-white/[0.02]'}`}
                  >
                    <div className="text-left">
                      <p className="font-black uppercase italic text-sm">{item.label}</p>
                      <p className="text-[10px] text-gray-500">{item.desc}</p>
                    </div>
                    {formData.goal === item.id && <div className="text-gold"><Check size={20} /></div>}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button onClick={prevStep} className="p-5 glass text-white rounded-2xl font-black uppercase hover:bg-white/5 transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextStep} className="flex-1 py-5 bg-gold text-black rounded-2xl font-black uppercase tracking-widest hover:bg-gold/80 transition-all flex items-center justify-center gap-2">
                Next Step <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-gold/10 text-gold"><Zap size={20} /></div>
                <h3 className="text-xl font-bold uppercase italic">Activity Level</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'sedentary', label: 'Sedentary', desc: 'Minimal physical activity, office work' },
                  { id: 'moderate', label: 'Moderate', desc: '3-4 workouts per week' },
                  { id: 'active', label: 'Very Active', desc: 'Daily intense training sessions' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setFormData({...formData, activityLevel: item.id})}
                    className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${formData.activityLevel === item.id ? 'border-gold bg-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border-white/5 hover:border-white/20 bg-white/[0.02]'}`}
                  >
                    <div className="text-left">
                      <p className="font-black uppercase italic text-sm">{item.label}</p>
                      <p className="text-[10px] text-gray-500">{item.desc}</p>
                    </div>
                    {formData.activityLevel === item.id && <div className="text-gold"><Check size={20} /></div>}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {!token && (
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username || ''}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white font-black focus:outline-none focus:border-gold/50 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white font-black focus:outline-none focus:border-gold/50 transition-all"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password || ''}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white font-black focus:outline-none focus:border-gold/50 transition-all"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button onClick={prevStep} className="p-5 glass text-white rounded-2xl font-black uppercase hover:bg-white/5 transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={async () => {
                    setLoading(true);
                    setMessage(null);
                    try {
                      if (token) {
                        // Update existing profile
                        const res = await fetch('/api/auth/profile', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                          body: JSON.stringify({ profile: formData })
                        });
                        const j = await res.json();
                        if (!res.ok) throw new Error(j.message || 'Update failed');
                        setMessage('Profile updated successfully');
                      } else {
                        // Register new user
                        const payload = {
                          username: formData.username,
                          email: formData.email,
                          password: formData.password,
                          profile: {
                            age: formData.age,
                            gender: formData.gender,
                            weight: formData.weight,
                            height: formData.height,
                            activityLevel: formData.activityLevel,
                            goal: formData.goal,
                            fitnessLevel: formData.fitnessLevel || 'beginner'
                          }
                        };

                        const res = await fetch('/api/auth/register', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(payload)
                        });
                        const j = await res.json();
                        if (!res.ok) throw new Error(j.message || 'Registration failed');
                        // store token
                        if (j.token) localStorage.setItem('token', j.token);
                        setMessage('Registration successful — welcome to Elite.');
                      }
                    } catch (err) {
                      setMessage(err.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="flex-1 py-5 bg-gold text-black rounded-2xl font-black uppercase tracking-widest hover:bg-gold/80 transition-all flex items-center justify-center gap-2 shadow-[0_10px_40px_rgba(212,175,55,0.2)]"
                >
                  {loading ? 'Processing...' : token ? 'Save Profile' : 'Create Account'}
                </button>
              </div>
              {message && <div className="p-3 text-sm rounded-md bg-white/[0.03] mt-2">{message}</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;

