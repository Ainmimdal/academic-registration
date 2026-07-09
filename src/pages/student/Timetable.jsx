import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import TimetableGrid from '../../components/specific/TimetableGrid';
import PrintWrapper from '../../components/common/PrintWrapper';
import { useApp } from '../../context/AppContext';

function Timetable() {
  const { selectedCourseObjects, selectedSession, user } = useApp();

  return (
    <DashboardLayout pageTitle="Timetable">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Timetable</h1>
            <p className="text-gray-500">{selectedSession?.semesterLabel} | {selectedSession?.academicSession}</p>
          </div>
        </div>

        {selectedCourseObjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-uitm-card-border p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <h2 className="text-lg font-bold text-gray-700 mb-2">No courses registered yet.</h2>
            <p className="text-gray-500">Your registered courses will appear in the timetable here.</p>
          </div>
        ) : (
          <PrintWrapper title="Timetable">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-uitm-card-border mb-4 print-only">
              <h2 className="text-xl font-bold text-center mb-2">My Timetable - {selectedSession?.semesterLabel}</h2>
              <p className="text-center text-sm text-gray-600 mb-1">Session: {selectedSession?.academicSession}</p>
              <p className="text-center text-sm text-gray-600 mb-4">{user?.profile?.name} ({user?.profile?.id})</p>
            </div>
            <TimetableGrid courses={selectedCourseObjects} />
          </PrintWrapper>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

export default Timetable;
