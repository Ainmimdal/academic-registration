import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import UiTMLogo from '../../components/common/UiTMLogo';
import SecondaryButton from '../../components/common/SecondaryButton';
import { useApp } from '../../context/AppContext';
import { generateSlipNumber } from '../../utils/helpers';

function RegistrationSlip() {
  const { user, selectedSession, selectedCourseObjects, totalCredits, showToast } = useApp();
  const profile = user?.profile;
  const slipNumber = generateSlipNumber();

  const handleDownloadPDF = () => {
    showToast('Feature available in production version.', 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout pageTitle="Registration Slip">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-end gap-3 mb-6 no-print">
          <SecondaryButton onClick={handleDownloadPDF} className="flex items-center gap-2 bg-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download PDF
          </SecondaryButton>
          <button 
            onClick={handlePrint}
            className="px-6 py-2.5 bg-uitm-primary text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-uitm-primary-dark transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print
          </button>
        </div>

        <div className="bg-white shadow-lg border border-gray-300 mx-auto print-content text-black" style={{ minHeight: '297mm', padding: '10mm 15mm' }}>
          {/* Header */}
          <div className="text-center mb-8 border-b-2 border-black pb-6">
            <div className="flex justify-center mb-4">
              <UiTMLogo size="lg" />
            </div>
            <h1 className="text-xl font-bold uppercase tracking-wider mb-1">Universiti Teknologi MARA</h1>
            <h2 className="text-lg font-bold uppercase tracking-widest text-gray-700">Academic Registration Slip</h2>
            <div className="text-sm mt-2 font-medium">Session: {selectedSession?.academicSession}</div>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mb-10 text-sm">
            <div className="flex">
              <span className="w-32 font-bold">Name</span>
              <span className="mr-2">:</span>
              <span className="font-semibold uppercase flex-1">{profile?.name}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-bold">Student ID</span>
              <span className="mr-2">:</span>
              <span className="font-semibold">{profile?.id}</span>
            </div>
            <div className="flex md:col-span-2">
              <span className="w-32 font-bold">Programme</span>
              <span className="mr-2">:</span>
              <span className="font-semibold">{profile?.program}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-bold">Faculty</span>
              <span className="mr-2">:</span>
              <span className="font-semibold">{profile?.faculty}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-bold">Semester</span>
              <span className="mr-2">:</span>
              <span className="font-semibold">{selectedSession?.semesterLabel}</span>
            </div>
          </div>

          {/* Course Table */}
          <div className="mb-10">
            <h3 className="font-bold mb-3 border-b border-gray-400 pb-1">Registered Courses</h3>
            <table className="w-full text-left text-sm border border-gray-400">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-400">
                  <th className="p-2 border-r border-gray-400 w-12 text-center">No.</th>
                  <th className="p-2 border-r border-gray-400 w-32">Course Code</th>
                  <th className="p-2 border-r border-gray-400">Course Name</th>
                  <th className="p-2 border-r border-gray-400 w-28">Group</th>
                  <th className="p-2 w-20 text-center">Credit</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourseObjects.length > 0 ? (
                  selectedCourseObjects.map((course, index) => (
                    <tr key={course.id} className="border-b border-gray-300 last:border-b-0">
                      <td className="p-2 border-r border-gray-400 text-center">{index + 1}</td>
                      <td className="p-2 border-r border-gray-400 font-semibold">{course.code}</td>
                      <td className="p-2 border-r border-gray-400 uppercase">{course.name}</td>
                      <td className="p-2 border-r border-gray-400">{course.selectedGroupDisplayLabel || '-'}</td>
                      <td className="p-2 text-center">{course.credits}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center italic text-gray-500 border-t border-gray-400">
                      No courses registered.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-black bg-gray-50">
                  <td colSpan="4" className="p-2 text-right font-bold border-r border-gray-400">Total Credit Hour</td>
                  <td className="p-2 text-center font-bold text-lg">{totalCredits}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-20 border-t border-gray-300 flex justify-between items-end text-xs text-gray-500">
            <div>
              <p>Reference No: {slipNumber}</p>
              <p>Date Printed: {new Date().toLocaleDateString('en-MY')} {new Date().toLocaleTimeString('en-MY')}</p>
            </div>
            <div className="text-right italic">
              <p>This is a computer generated document.</p>
              <p>No signature is required.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default RegistrationSlip;
