import React, { useState, useEffect } from 'react';
import WorkoutSplit from '../components/WorkoutSplit';

const Workouts = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workouts');
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
        // Fallback to demo data if API fails
        setWorkouts([
          { _id: '1', name: 'Hypertrophy Upper', duration: 55, intensity: 'High', status: 'Completed', color: '#D4AF37' },
          { _id: '2', name: 'Core Stability', duration: 20, intensity: 'Medium', status: 'Active', color: '#ffffff' },
          { _id: '3', name: 'Leg Power Alpha', duration: 75, intensity: 'Elite', status: 'Pending', color: '#D4AF37' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const updateWorkoutStatus = async (workoutId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/workouts/${workoutId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setWorkouts(workouts.map(w => 
          w._id === workoutId ? { ...w, status: newStatus } : w
        ));
      }
    } catch (error) {
      console.error('Failed to update workout:', error);
    }
  };

  return (
    <div className="space-y-8">
      <header className="border-b border-white/5 pb-6">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Workout <span className="text-[#D4AF37]">Center</span></h2>
        <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Professional training programs</p>
      </header>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('sessions')}
          className={`px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-wider transition-all ${
            activeTab === 'sessions' 
              ? 'bg-[#D4AF37] text-black' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Sessions
        </button>
        <button
          onClick={() => setActiveTab('splits')}
          className={`px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-wider transition-all ${
            activeTab === 'splits' 
              ? 'bg-[#D4AF37] text-black' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Workout Splits
        </button>
      </div>

      {activeTab === 'sessions' && (
        <div>
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-[10px] font-bold uppercase">Loading workouts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workouts.map((workout, i) => (
                <div key={workout._id} className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-[#D4AF37]/5 transition-all cursor-pointer overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <span className="text-4xl font-black italic">0{i+1}</span>
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-2`} style={{ color: workout.intensity === 'High' || workout.intensity === 'Elite' ? '#D4AF37' : '#ffffff' }}>
                    {workout.intensity} Intensity
                  </p>
                  <h3 className="text-xl font-black italic uppercase text-white mb-4">{workout.name}</h3>
                  <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold">
                    <span>⏱ {workout.duration} min</span>
                    <span>🔥 {workout.status}</span>
                  </div>
                  <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] transition-all duration-1000" style={{ width: workout.status === 'Completed' ? '100%' : workout.status === 'Active' ? '60%' : '30%' }}></div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    {workout.status !== 'Active' && (
                      <button 
                        onClick={() => updateWorkoutStatus(workout._id, 'Active')}
                        className="flex-1 bg-[#D4AF37] text-black py-2 rounded-xl font-black uppercase text-[8px] tracking-wider hover:bg-white transition-all"
                      >
                        Start
                      </button>
                    )}
                    {workout.status === 'Active' && (
                      <button 
                        onClick={() => updateWorkoutStatus(workout._id, 'Completed')}
                        className="flex-1 bg-green-600 text-white py-2 rounded-xl font-black uppercase text-[8px] tracking-wider hover:bg-green-700 transition-all"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'splits' && <WorkoutSplit />}
    </div>
  );
};

export default Workouts;