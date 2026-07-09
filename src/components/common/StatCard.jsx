import React from 'react';
import { motion } from 'framer-motion';

function StatCard({ title, value, icon, color = '#0F4C81', onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -2 }}
      className={`
        bg-white rounded-xl shadow-card hover:shadow-card-hover
        transition-all duration-300
        p-5 flex items-center gap-4
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {/* Icon in colored circle */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <div className="w-6 h-6" style={{ color }}>
          {icon}
        </div>
      </div>

      {/* Text content */}
      <div className="min-w-0">
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {value}
        </p>
        <p className="text-sm text-gray-500 mt-0.5 truncate">
          {title}
        </p>
      </div>
    </motion.div>
  );
}

export default StatCard;
