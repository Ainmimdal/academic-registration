import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import ApprovalCard from '../../components/specific/ApprovalCard';
import StatCard from '../../components/common/StatCard';
import { useApp } from '../../context/AppContext';
import { pendingStudents as initialPendingStudents } from '../../data/mockData';

function LecturerDashboard() {
  const { user, showToast } = useApp();
  const [students, setStudents] = useState(initialPendingStudents);

  const pendingStudents = students.filter(s => s.status === 'pending');
  const approvedStudents = students.filter(s => s.status === 'approved');
  const rejectedStudents = students.filter(s => s.status === 'rejected');

  const handleApprove = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    showToast('Registration approved successfully.', 'success');
  };

  const handleReject = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
    showToast('Registration rejected.', 'warning');
  };

  return (
    <DashboardLayout pageTitle="Advisor Dashboard">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome, {user?.profile?.name}!</h1>
          <p className="text-gray-500">Academic Advisor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Pending Approvals"
          value={pendingStudents.length}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="yellow"
        />
        <StatCard
          title="Approved Registrations"
          value={approvedStudents.length}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="green"
        />
        <StatCard
          title="Total Advisees"
          value={students.length}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          color="blue"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-uitm-card-border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">Pending Approvals</h2>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full">
            {pendingStudents.length} action required
          </span>
        </div>
        
        <div className="p-6 bg-gray-50/30 min-h-[300px]">
          {pendingStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-gray-500">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-lg font-medium text-gray-600">All caught up!</p>
              <p className="text-sm">No pending registrations to review at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {pendingStudents.map(student => (
                  <ApprovalCard 
                    key={student.id} 
                    student={student} 
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LecturerDashboard;
