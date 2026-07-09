import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import ValidationStep from '../../components/common/ValidationStep';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';
import { useApp } from '../../context/AppContext';

function Validation() {
  const { selectedCourses, validationResults, allValidationsPassed, submitRegistration } = useApp();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitRegistration();
      navigate('/student/pending');
    }, 1500);
  };

  if (selectedCourses.length === 0) {
    return (
      <DashboardLayout pageTitle="Validation">
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-uitm-card-border">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h2 className="text-xl font-bold text-gray-700 mb-2">No Courses Selected</h2>
          <p className="text-gray-500 mb-6 text-center max-w-md">You haven't selected any courses yet. Please register for courses before proceeding to validation.</p>
          <PrimaryButton onClick={() => navigate('/student/courses')}>
            Go to Course Registration
          </PrimaryButton>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Validation">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-card border border-uitm-card-border overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Registration Checking</h2>
            <p className="text-gray-500 text-sm">System is validating your course selections against academic rules.</p>
          </div>

          <div className="p-6 md:p-8 space-y-6 bg-gray-50/30">
            {validationResults.map((result, index) => (
              <ValidationStep
                key={result.label}
                label={result.label}
                passed={result.passed}
                detail={result.detail}
                delay={index * 0.3}
              />
            ))}
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
            <SecondaryButton onClick={() => navigate('/student/courses')} disabled={isSubmitting}>
              Cancel
            </SecondaryButton>
            <PrimaryButton 
              onClick={handleSubmit} 
              disabled={!allValidationsPassed || isSubmitting}
              loading={isSubmitting}
              className="px-8"
            >
              Submit Registration
            </PrimaryButton>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Validation;
