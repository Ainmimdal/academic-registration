import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/common/StatusBadge';
import SecondaryButton from '../../components/common/SecondaryButton';
import { useApp } from '../../context/AppContext';

function PendingApproval() {
  const { registrationPhase } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationPhase === 'approved') {
      navigate('/student/success');
    }
  }, [registrationPhase, navigate]);

  if (registrationPhase === 'draft') {
    return (
      <DashboardLayout pageTitle="Advisor Approval">
        <div className="text-center py-20">
          <p>Please submit your registration first.</p>
          <button onClick={() => navigate('/student/courses')} className="mt-4 text-uitm-primary underline">Go to Courses</button>
        </div>
      </DashboardLayout>
    );
  }

  const isRejected = registrationPhase === 'rejected';

  return (
    <DashboardLayout pageTitle="Advisor Approval">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-16 rounded-2xl shadow-card border border-uitm-card-border text-center w-full relative overflow-hidden"
        >
          {isRejected && <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>}
          {!isRejected && <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>}

          <div className="flex justify-center mb-6">
            {isRejected ? (
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            ) : (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500"
              >
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </motion.div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {isRejected ? 'Registration Rejected' : 'Advisor Approval'}
          </h2>
          
          <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
            {isRejected 
              ? 'Your course registration has been rejected by your academic advisor. Please review your selections and try again.'
              : 'Your registration is pending approval from your academic advisor. You will be notified once a decision is made.'}
          </p>

          <div className="mb-8">
            <StatusBadge status={registrationPhase} />
          </div>

          <SecondaryButton onClick={() => navigate('/student/dashboard')}>
            Back to Dashboard
          </SecondaryButton>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default PendingApproval;
