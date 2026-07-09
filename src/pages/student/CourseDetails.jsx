import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';
import StatusBadge from '../../components/common/StatusBadge';
import { useApp } from '../../context/AppContext';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, selectedCourses, selectedCourseGroups, addCourse, removeCourse, changeCourseGroup } = useApp();
  const [draftGroupId, setDraftGroupId] = useState('');
  
  const course = courses.find((c) => c.id === id);
  
  if (!course) {
    return (
      <DashboardLayout pageTitle="Course Details">
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Course not found</h2>
          <button onClick={() => navigate('/student/courses')} className="text-uitm-primary hover:underline">
            ← Back to course list
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const isSelected = selectedCourses.includes(course.id);
  const activeGroupId = selectedCourseGroups[course.id] || draftGroupId || course.classGroups?.[0]?.id;
  const activeGroup = course.classGroups?.find((group) => group.id === activeGroupId);
  const isFull = !activeGroup || activeGroup.availableSeats === 0;
  const seatPercentage = activeGroup ? Math.round((activeGroup.availableSeats / activeGroup.totalSeats) * 100) : 0;

  return (
    <DashboardLayout pageTitle="Course Details">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <button onClick={() => navigate('/student/courses')} className="text-sm text-gray-500 hover:text-uitm-primary flex items-center gap-1 mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Courses
        </button>

        <div className="bg-white rounded-xl shadow-card border border-uitm-card-border overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md">{course.code}</span>
                {isSelected && <StatusBadge status="selected" />}
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{course.name}</h1>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-uitm-primary leading-none">{course.credits}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Credit Hours</div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Lecturer</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <span className="font-medium text-gray-800">{course.lecturer}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Schedule</h3>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="font-medium">{activeGroup?.day || course.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{activeGroup?.startTime || course.startTime} - {activeGroup?.endTime || course.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>{activeGroup?.venue || course.venue}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Prerequisites</h3>
                {course.prerequisites && course.prerequisites.length > 0 ? (
                  <div className="flex gap-2">
                    {course.prerequisites.map(req => (
                      <span key={req} className="bg-red-50 text-red-700 px-3 py-1 rounded-md text-sm font-medium border border-red-100">
                        {req}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 italic">None</span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 flex justify-between">
                  Seat Availability
                  <span className={`${isFull ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                    {activeGroup ? `${activeGroup.availableSeats} / ${activeGroup.totalSeats}` : '0 / 0'}
                  </span>
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-2.5 rounded-full ${isFull ? 'bg-red-500' : seatPercentage < 20 ? 'bg-orange-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.max(0, 100 - seatPercentage)}%` }}
                  ></div>
                </div>
                {isFull && <p className="text-xs text-red-500 mt-2 font-medium">This course is currently full.</p>}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Class Group</h3>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-uitm-primary focus:outline-none focus:ring-2 focus:ring-uitm-primary/20"
                  value={activeGroupId || ''}
                  onChange={(event) => {
                    if (isSelected) {
                      changeCourseGroup(course.id, event.target.value);
                    } else {
                      setDraftGroupId(event.target.value);
                    }
                  }}
                >
                  {(course.classGroups || []).map((group) => (
                    <option
                      key={group.id}
                      value={group.id}
                      disabled={group.availableSeats === 0 && group.id !== activeGroupId}
                    >
                      {group.label} - {group.day} {group.startTime} ({group.availableSeats}/{group.totalSeats})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-end gap-3">
            {isSelected ? (
              <SecondaryButton onClick={() => removeCourse(course.id)}>
                Drop Course
              </SecondaryButton>
            ) : (
              <PrimaryButton 
                onClick={() => addCourse(course.id, activeGroupId)} 
                disabled={isFull}
                className="px-8"
              >
                Add to Registration
              </PrimaryButton>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default CourseDetails;
