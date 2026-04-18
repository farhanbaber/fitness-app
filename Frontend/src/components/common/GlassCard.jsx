import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', variant = 'default', ...props }) => {
  const base = 'glass rounded-xl p-4';
  const variants = {
    default: base + ' bg-[var(--color-elite-card)] border-[var(--color-elite-border)]',
    gold: base + ' glass-gold',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
      transition={{ duration: 0.36, ease: 'easeOut' }}
      className={`${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
