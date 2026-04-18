import React from 'react';
import GlassCard from './common/GlassCard';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import Modal from './common/Modal';
import BiometricForm from './BiometricForm';

const Activitychart = () => {
  const data = [
    { day: 'Mon', value: 60 }, { day: 'Tue', value: 85 }, { day: 'Wed', value: 40 },
    { day: 'Thu', value: 95 }, { day: 'Fri', value: 70 }, { day: 'Sat', value: 30 }, { day: 'Sun', value: 50 }
  ];

  const { modalOpen, openModal, closeModal, addWorkout } = useApp();

  const handleAddWorkout = () => {
    const sample = { id: Date.now(), name: 'Quick HIIT', createdAt: new Date().toISOString() };
    addWorkout(sample);
    openModal();
  };

  return (
    <GlassCard className=""> 
      <h3 className="text-sm font-semibold text-white/90 mb-3">Weekly Activity</h3>
      <div className="flex items-end justify-between h-48 gap-3 px-2" role="img" aria-label="Weekly activity bar chart">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full">
            <div
              className="w-full bg-white/5 rounded-t-xl relative overflow-hidden group-hover:bg-gold/20 transition-all duration-500 border-t border-white/5"
              style={{ height: `${item.value}%` }}
              aria-hidden="false"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/[0.02]"></div>
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase group-hover:text-gold transition-colors">{item.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddWorkout}
          className="px-4 py-2 bg-gold text-black rounded-lg font-bold"
        >
          Add Workout
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
          className="px-3 py-2 border border-white/5 rounded-lg text-sm"
        >
          Log Biometrics
        </motion.button>
      </div>

      <Modal open={modalOpen} onClose={closeModal}>
        <BiometricForm onClose={closeModal} />
      </Modal>
    </GlassCard>
  );
};

export default Activitychart;