import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative z-10 w-full max-w-md p-6 bg-[#0b0b0d] rounded-2xl border border-white/5 shadow-lg"
      >
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-md hover:bg-white/5">
          <X size={16} />
        </button>

        <div>{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
