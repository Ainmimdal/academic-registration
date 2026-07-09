import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import PrimaryButton from '../../components/common/PrimaryButton';
import { useApp } from '../../context/AppContext';

function AdminReports() {
  const { showToast } = useApp();

  const handleGenerate = () => {
    showToast('Report generation will be available in the production environment.', 'info');
  };

  const reports = [
    { title: 'Registration Status Summary', desc: 'Overall statistics of student registration by faculty.', type: 'PDF / Excel' },
    { title: 'Unregistered Students List', desc: 'List of active students who have not initiated registration.', type: 'Excel' },
    { title: 'Course Demand Analysis', desc: 'Analysis of course popularity and seat utilization.', type: 'PDF / Excel' },
    { title: 'Advisor Workload Report', desc: 'Summary of pending and processed approvals per advisor.', type: 'PDF' },
  ];

  return (
    <DashboardLayout pageTitle="Reports & Analytics">
      <div className="bg-white rounded-xl shadow-sm border border-uitm-card-border overflow-hidden mb-6">
        <div className="p-6 md:p-8 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Generate Reports</h2>
          <p className="text-gray-500 text-sm">Select a report type to generate for the current academic session.</p>
        </div>
        
        <div className="divide-y divide-gray-100">
          {reports.map((report, idx) => (
            <div key={idx} className="p-6 hover:bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
              <div>
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-uitm-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  {report.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{report.desc}</p>
                <span className="inline-block mt-2 text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Format: {report.type}
                </span>
              </div>
              <PrimaryButton onClick={handleGenerate} className="whitespace-nowrap px-6 py-2">
                Generate
              </PrimaryButton>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminReports;
