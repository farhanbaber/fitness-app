import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [zone, setZone] = useState('Rest');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    // Calculate heart rate zone based on time
    if (isRunning) {
      const minutes = Math.floor(time / 60000);
      if (minutes < 5) setZone('Warm-up');
      else if (minutes < 15) setZone('Fat Burn');
      else if (minutes < 25) setZone('Cardio');
      else setZone('Peak');
    } else {
      setZone('Rest');
    }
  }, [time, isRunning]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const getZoneColor = () => {
    switch(zone) {
      case 'Warm-up': return '#3B82F6';
      case 'Fat Burn': return '#10B981';
      case 'Cardio': return '#F59E0B';
      case 'Peak': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setZone('Rest');
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] space-y-6">
      <div className="text-center">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Activity Timer</h3>
        
        {/* Time Display */}
        <div className="text-6xl font-black italic text-white mb-4 font-mono">
          {formatTime(time)}
        </div>
        
        {/* Zone Display */}
        <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: `${getZoneColor()}20` }}>
          <span className="text-[10px] font-black uppercase" style={{ color: getZoneColor() }}>
            {zone} Zone
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleStartStop}
          className={`flex-1 py-3 rounded-2xl font-black uppercase text-[10px] tracking-wider transition-all ${
            isRunning 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-[#D4AF37] text-black hover:bg-white'
          }`}
        >
          {isRunning ? 'STOP' : 'START'}
        </button>
        <button
          onClick={handleReset}
          className="px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-wider bg-white/10 text-white hover:bg-white/20 transition-all"
        >
          RESET
        </button>
      </div>

      {/* Zone Info */}
      <div className="text-[8px] text-gray-500 space-y-1">
        <p>• Warm-up: 0-5 min (Blue Zone)</p>
        <p>• Fat Burn: 5-15 min (Green Zone)</p>
        <p>• Cardio: 15-25 min (Orange Zone)</p>
        <p>• Peak: 25+ min (Red Zone)</p>
      </div>
    </div>
  );
};

export default Stopwatch;
