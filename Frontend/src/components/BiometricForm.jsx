import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

const BiometricForm = ({ onClose }) => {
  const { addBiometric } = useApp();
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = { heartRate, weight, recordedAt: new Date().toISOString() };
    addBiometric(entry);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-white/90 font-black uppercase text-sm">Log Biometrics</h3>

      <label className="block">
        <span className="text-xs text-gray-400">Heart Rate</span>
        <input value={heartRate} onChange={(e)=>setHeartRate(e.target.value)} className="w-full mt-1 p-2 rounded-md bg-black/20 border border-white/5" placeholder="e.g. 72 bpm" />
      </label>

      <label className="block">
        <span className="text-xs text-gray-400">Weight</span>
        <input value={weight} onChange={(e)=>setWeight(e.target.value)} className="w-full mt-1 p-2 rounded-md bg-black/20 border border-white/5" placeholder="e.g. 72 kg" />
      </label>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-gold text-black rounded-lg font-bold">Save</button>
      </div>
    </form>
  );
};

export default BiometricForm;
