import React from 'react';
import { motion } from 'framer-motion';

function SecondaryButton({
  children,
  onClick,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.95 }}
      className={`
        border-2 border-uitm-primary text-uitm-primary rounded-lg px-6 py-2.5 font-medium text-sm
        hover:bg-uitm-primary hover:text-white
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        inline-flex items-center justify-center gap-2
        ${className}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
}

export default SecondaryButton;
