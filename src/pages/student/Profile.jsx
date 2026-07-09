import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useApp } from '../../context/AppContext';

function StudentProfile() {
  const { user, selectedSession, showToast } = useApp();
  const profile = user?.profile;

  const handleEditProfile = () => {
    showToast('Feature available in production version.', 'info');
  };

  return (
    <DashboardLayout pageTitle="Student Profile">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto flex flex-col gap-6"
      >
        <div className="bg-white rounded-xl shadow-card border border-uitm-card-border p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-uitm-primary text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-md">
              {profile?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profile?.name}</h2>
              <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                {profile?.id}
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleEditProfile}
            className="px-5 py-2.5 border-2 border-uitm-primary text-uitm-primary rounded-lg font-medium hover:bg-uitm-primary hover:text-white transition-colors active:scale-95"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-card border border-uitm-card-border p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Academic & Personal Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
              <p className="text-gray-800 font-medium">{profile?.name}</p>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Student ID</label>
              <p className="text-gray-800 font-medium">{profile?.id}</p>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Faculty</label>
              <p className="text-gray-800 font-medium">{profile?.faculty}</p>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Programme</label>
              <p className="text-gray-800 font-medium">{profile?.program}</p>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Semester</label>
              <p className="text-gray-800 font-medium">{selectedSession?.semesterLabel}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Academic Session</label>
              <p className="text-gray-800 font-medium">{selectedSession?.academicSession}</p>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current CGPA</label>
              <p className="text-gray-800 font-medium">{profile?.cgpa}</p>
            </div>
            
            <div className="md:col-span-2 border-t pt-6 mt-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
              <p className="text-gray-800 font-medium">{profile?.email}</p>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
              <p className="text-gray-800 font-medium">{profile?.phone}</p>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</label>
              <p className="text-gray-800 font-medium">{profile?.address}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default StudentProfile;
