import React, { useState } from 'react';

const Diet = () => {
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const macros = [
    { label: 'Protein', value: '180g', target: '200g', pct: '90%', color: '#D4AF37' },
    { label: 'Carbs', value: '240g', target: '300g', pct: '80%', color: '#ffffff' },
    { label: 'Fats', value: '65g', target: '70g', pct: '92%', color: '#D4AF37' }
  ];

  const dailyMeals = [
    { 
      time: '06:00 AM', 
      name: 'Pre-Workout Fuel', 
      items: ['Oatmeal with Berries', 'Greek Yogurt', 'Green Tea'],
      calories: 420,
      protein: 25,
      carbs: 65,
      fats: 8
    },
    { 
      time: '09:00 AM', 
      name: 'Post-Workout Recovery', 
      items: ['Grilled Chicken Breast', 'Brown Rice', 'Steamed Broccoli', 'Olive Oil'],
      calories: 550,
      protein: 45,
      carbs: 60,
      fats: 15
    },
    { 
      time: '12:30 PM', 
      name: 'Power Lunch', 
      items: ['Salmon Fillet', 'Quinoa', 'Mixed Greens', 'Avocado'],
      calories: 680,
      protein: 52,
      carbs: 45,
      fats: 28
    },
    { 
      time: '03:30 PM', 
      name: 'Afternoon Snack', 
      items: ['Protein Shake', 'Almonds', 'Apple'],
      calories: 320,
      protein: 28,
      carbs: 35,
      fats: 12
    },
    { 
      time: '07:00 PM', 
      name: 'Dinner Recovery', 
      items: ['Lean Beef', 'Sweet Potato', 'Asparagus', 'Coconut Oil'],
      calories: 590,
      protein: 48,
      carbs: 55,
      fats: 18
    },
    { 
      time: '09:30 PM', 
      name: 'Evening Fuel', 
      items: ['Cottage Cheese', 'Casein Protein', 'Blueberries'],
      calories: 280,
      protein: 35,
      carbs: 20,
      fats: 6
    }
  ];

  const getCurrentMeal = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    for (let meal of dailyMeals) {
      const [hours, minutes] = meal.time.split(':');
      const [period] = meal.time.split(' ');
      let hour24 = parseInt(hours);
      if (period === 'PM' && hour24 !== 12) hour24 += 12;
      if (period === 'AM' && hour24 === 12) hour24 = 0;
      const mealTime = hour24 * 60 + parseInt(minutes);
      if (now >= mealTime) return meal;
    }
    return dailyMeals[0];
  };

  return (
    <div className="space-y-10">
      <header className="border-b border-white/5 pb-6">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Fuel <span className="text-[#D4AF37]">Logistics</span></h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Macro Tracking */}
        <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] space-y-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Macro Breakdown</h3>
          {macros.map((m, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-lg font-black italic uppercase text-white">{m.label}</span>
                <span className="text-[10px] font-bold text-gray-500">{m.value} / {m.target}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full transition-all duration-1000" style={{ width: m.pct, backgroundColor: m.color }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Meal Card */}
        <div className="bg-[#D4AF37] p-10 rounded-[3rem] flex flex-col justify-between text-black">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1 rounded-full">Current Time: {currentTime.toLocaleTimeString()}</span>
            <h3 className="text-4xl font-black italic uppercase mt-6 leading-none">{getCurrentMeal().name}</h3>
            <p className="font-bold uppercase text-[10px] mt-4 opacity-70">Scheduled for {getCurrentMeal().time}</p>
            <div className="mt-4 space-y-2">
              {getCurrentMeal().items.map((item, i) => (
                <p key={i} className="text-[9px] font-bold">• {item}</p>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-[9px] font-black">
              <span>🔥 {getCurrentMeal().calories} kcal</span>
              <span>💪 {getCurrentMeal().protein}g protein</span>
            </div>
          </div>
          <button 
            onClick={() => setShowFullMenu(!showFullMenu)}
            className="mt-10 border-2 border-black py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all"
          >
            {showFullMenu ? 'Hide Full Menu' : 'View Full Menu'}
          </button>
        </div>
      </div>

      {/* Full Menu Modal */}
      {showFullMenu && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-10 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-black italic uppercase text-white">Daily <span className="text-[#D4AF37]">Meal Plan</span></h3>
              <button 
                onClick={() => setShowFullMenu(false)}
                className="text-white/60 hover:text-white text-2xl font-black"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              {dailyMeals.map((meal, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-black italic uppercase text-white">{meal.name}</h4>
                      <p className="text-[#D4AF37] text-[10px] font-black mt-1">{meal.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-black">{meal.calories} kcal</p>
                      <div className="text-[8px] text-gray-500 mt-1">
                        P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {meal.items.map((item, j) => (
                      <p key={j} className="text-[9px] text-gray-400">• {item}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diet;