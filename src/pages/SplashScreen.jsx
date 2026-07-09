import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import UiTMLogo from '../components/common/UiTMLogo';

function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center uitm-gradient overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <div className="bg-white/10 p-8 rounded-full backdrop-blur-sm border border-white/20 mb-8 shadow-2xl">
          <UiTMLogo size="xl" className="text-white drop-shadow-lg" />
        </div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white text-3xl md:text-5xl font-bold tracking-wider mb-4 drop-shadow-md"
        >
          ACADEMIC REGISTRATION SYSTEM
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-blue-200 text-lg md:text-xl italic mb-12"
        >
          Register with Ease. Learn with Confidence.
        </motion.p>
        
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="bg-white text-uitm-primary rounded-full px-8 py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow flex items-center gap-2 group"
        >
          Get Started
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default SplashScreen;
