import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import CourseDataTable from '../../components/specific/CourseDataTable';
import CourseSummaryPanel from '../../components/specific/CourseSummaryPanel';
import { useApp } from '../../context/AppContext';

function CourseRegistration() {
  const { courses, selectedCourses, addCourse } = useApp();
  const navigate = useNavigate();

  const handleRegister = (courseId) => {
    addCourse(courseId);
  };

  const handleViewDetails = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  return (
    <DashboardLayout pageTitle="Course Registration">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Available Courses</h2>
          </div>
          <CourseDataTable
            courses={courses}
            selectedCourses={selectedCourses}
            onRegister={handleRegister}
            onViewDetails={handleViewDetails}
          />
        </div>
        
        <div className="lg:col-span-1">
          <CourseSummaryPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CourseRegistration;
