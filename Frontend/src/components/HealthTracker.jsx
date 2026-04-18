import React, { useState, useEffect } from 'react';

const HealthTracker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [precautions, setPrecautions] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time health monitoring
    const healthData = {
      morning: {
        symptoms: ['Mild Fatigue', 'Slight Muscle Soreness'],
        precautions: ['Increase Water Intake', 'Light Stretching Recommended', 'Protein Intake +20g']
      },
      afternoon: {
        symptoms: ['Energy Levels Good', 'Focus Optimal'],
        precautions: ['Maintain Hydration', 'Ready for Intense Workout', 'Post-Workout Recovery Shake']
      },
      evening: {
        symptoms: ['Moderate Fatigue', 'Muscle Recovery Phase'],
        precautions: ['Light Meal Only', 'Sleep 8+ Hours', 'Magnesium Supplement']
      }
    };

    const hour = currentTime.getHours();
    let period = 'morning';
    if (hour >= 12 && hour < 18) period = 'afternoon';
    else if (hour >= 18) period = 'evening';

    setSymptoms(healthData[period].symptoms);
    setPrecautions(healthData[period].precautions);
  }, [currentTime]);

  const getSeverityColor = (symptom) => {
    if (symptom.includes('Mild') || symptom.includes('Slight')) return '#10B981';
    if (symptom.includes('Moderate')) return '#F59E0B';
    if (symptom.includes('Severe')) return '#EF4444';
    return '#6B7280';
  };

  const getPriorityIcon = (precaution) => {
    if (precaution.includes('Recommended')) return '⚠️';
    if (precaution.includes('Intense')) return '🔥';
    if (precaution.includes('Recovery')) return '🔄';
    if (precaution.includes('Sleep')) return '😴';
    return '✅';
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Health Monitor</h3>
        <span className="text-[8px] text-[#D4AF37] font-black">
          {currentTime.toLocaleTimeString()}
        </span>
      </div>

      {/* Current Symptoms */}
      <div className="space-y-4">
        <h4 className="text-[9px] font-black uppercase text-gray-500">Current Symptoms</h4>
        <div className="space-y-2">
          {symptoms.map((symptom, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: getSeverityColor(symptom) }}
              />
              <span className="text-[9px] text-white font-medium">{symptom}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Precautions */}
      <div className="space-y-4">
        <h4 className="text-[9px] font-black uppercase text-gray-500">Recommended Precautions</h4>
        <div className="space-y-2">
          {precautions.map((precaution, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/20">
              <span className="text-lg flex-shrink-0">{getPriorityIcon(precaution)}</span>
              <span className="text-[9px] text-white font-medium">{precaution}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Health Score */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl border border-green-500/30">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-black text-gray-400">Overall Health Score</span>
          <span className="text-2xl font-black text-green-400">92%</span>
        </div>
        <div className="mt-2 h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-1000" style={{ width: '92%' }} />
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;
