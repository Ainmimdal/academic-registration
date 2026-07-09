import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { useApp } from '../../context/AppContext';

function StudentDashboard() {
  const { user, registrationPhase, selectedSession } = useApp();
  const navigate = useNavigate();
  
  const firstName = user?.profile?.name?.split(' ')[0] || 'Student';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome, {firstName}!</h1>
          <p className="text-gray-500">{user?.profile?.program}</p>
          <p className="text-gray-400 text-sm">{selectedSession?.semesterLabel} | {selectedSession?.academicSession}</p>
        </div>
        
        {registrationPhase !== 'draft' && (
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3">
            <span className="text-sm text-gray-500">Status:</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
              registrationPhase === 'approved' ? 'bg-green-100 text-green-700' :
              registrationPhase === 'rejected' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {registrationPhase}
            </span>
          </div>
        )}
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <motion.div variants={item}>
          <StatCard
            title="Register for available courses"
            value="Course Registration"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            color="blue"
            onClick={() => navigate('/student/courses')}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="View your class schedule"
            value="Timetable"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            color="green"
            onClick={() => navigate('/student/timetable')}
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Check your payment status"
            value="Fee Status"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            color="yellow"
            onClick={() => navigate('/student/fees')}
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="View and download your registration slip"
            value="Registration Slip"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            color="purple"
            onClick={() => navigate('/student/slip')}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="View your student details"
            value="Profile"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            color="teal"
            onClick={() => navigate('/student/profile')}
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Check registration requirements"
            value="Validation"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            color="orange"
            onClick={() => navigate('/student/validation')}
          />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
