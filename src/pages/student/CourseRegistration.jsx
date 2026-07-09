import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import CourseDataTable from '../../components/specific/CourseDataTable';
import CourseSummaryPanel from '../../components/specific/CourseSummaryPanel';
import { useApp } from '../../context/AppContext';

function CourseRegistration() {
  const { courses, selectedCourses, selectedSession, addCourse } = useApp();
  const navigate = useNavigate();

  const handleRegister = (courseId, groupId) => {
    addCourse(courseId, groupId);
  };

  const handleViewDetails = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  return (
    <DashboardLayout pageTitle="Course Registration">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <div className="min-w-0 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Available Courses</h2>
              <p className="text-sm text-gray-500">{selectedSession?.label}</p>
            </div>
          </div>
          <CourseDataTable
            courses={courses}
            selectedCourses={selectedCourses}
            onRegister={handleRegister}
            onViewDetails={handleViewDetails}
          />
        </div>
        
        <div className="min-w-0">
          <CourseSummaryPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CourseRegistration;
