import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';
import { useApp } from '../../context/AppContext';

function RegistrationSuccess() {
  const { registrationPhase } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationPhase !== 'approved') {
      navigate('/student/dashboard');
    }
  }, [registrationPhase, navigate]);

  if (registrationPhase !== 'approved') {
    return null;
  }

  return (
    <DashboardLayout pageTitle="Registration Successful">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-16 rounded-2xl shadow-card border border-uitm-card-border text-center w-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>

          <div className="flex justify-center mb-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 shadow-inner"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-green-600 mb-3"
          >
            Congratulations!
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-10 max-w-sm mx-auto leading-relaxed text-lg"
          >
            Your course registration has been successfully completed and approved by your advisor.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <PrimaryButton onClick={() => navigate('/student/slip')} className="px-8 py-3">
              View Registration Slip
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/student/timetable')} className="px-8 py-3">
              View Timetable
            </SecondaryButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/student/dashboard" className="text-sm text-gray-500 hover:text-uitm-primary transition-colors font-medium">
              Back to Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default RegistrationSuccess;
