import React from 'react';
import { motion } from 'framer-motion';

function ValidationStep({ label, passed, detail, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="flex items-start gap-3 py-3"
    >
      {/* Status icon circle */}
      <div
        className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5
          ${passed ? 'bg-green-100' : 'bg-red-100'}
        `}
      >
        {passed ? (
          <svg
            className="w-4.5 h-4.5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg
            className="w-4.5 h-4.5 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {label}
        </p>
        {detail && (
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            {detail}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default ValidationStep;
