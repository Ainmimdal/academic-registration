import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import AuthLayout from '../layouts/AuthLayout';
import UiTMLogo from '../components/common/UiTMLogo';
import PrimaryButton from '../components/common/PrimaryButton';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sessionId, setSessionId] = useState('current');
  const [loading, setLoading] = useState(false);
  const { academicSessions, login, showToast } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      showToast('Please enter a valid Student ID', 'warning');
      return;
    }
    
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      login(username, sessionId);
      
      if (username === 'demo_advisor' || username === 'demo_lecturer') {
        navigate('/lecturer/dashboard');
      } else if (username === 'demo_admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
      setLoading(false);
    }, 1000);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    showToast('Feature available in production version.', 'info');
  };

  return (
    <AuthLayout showLogo={false}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-4">
          <UiTMLogo size="md" />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-uitm-primary mb-6 tracking-wide">
            ACADEMIC REGISTRATION SYSTEM
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-500 text-sm">Please login to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID / User ID</label>
            <input
              type="text"
              placeholder="Enter ID (e.g. demo_student)"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session / Semester</label>
            <select
              className="input-field"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              required
            >
              {academicSessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Select the academic session before entering the registration system.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-uitm-primary focus:ring-uitm-primary border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                Remember Me
              </label>
            </div>
            <div className="text-sm">
              <button onClick={handleForgot} type="button" className="font-medium text-uitm-primary hover:text-uitm-primary-dark">
                Forgot Password?
              </button>
            </div>
          </div>

          <PrimaryButton type="submit" className="w-full py-3 text-base mt-2" loading={loading}>
            Login
          </PrimaryButton>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Demo accounts: demo_student, demo_advisor, demo_admin</p>
        </div>
      </motion.div>
    </AuthLayout>
  );
}

export default Login;
