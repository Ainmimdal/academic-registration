import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { useApp } from '../../context/AppContext';

function AdminDashboard() {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <DashboardLayout pageTitle="Admin Dashboard">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">System Administration</h1>
          <p className="text-gray-500">Welcome back, {user?.profile?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value="14,258"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          color="blue"
        />
        <StatCard
          title="Active Registrations"
          value="8,543"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="green"
        />
        <StatCard
          title="Pending Approvals"
          value="1,204"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="yellow"
        />
        <StatCard
          title="System Load"
          value="24%"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-uitm-card-border p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
            Registration Progress
            <button onClick={() => navigate('/admin/reports')} className="text-sm text-uitm-primary font-medium hover:underline">View Reports</button>
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Completed</span>
                <span className="text-gray-800 font-bold">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Pending Review</span>
                <span className="text-gray-800 font-bold">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Not Started</span>
                <span className="text-gray-800 font-bold">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-uitm-card-border p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl border border-gray-200 hover:border-uitm-primary hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-700 hover:text-uitm-primary group">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <span className="font-medium text-sm">Open Registration Phase</span>
            </button>
            <button className="p-4 rounded-xl border border-gray-200 hover:border-uitm-primary hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-700 hover:text-uitm-primary group">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <span className="font-medium text-sm">System Settings</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
