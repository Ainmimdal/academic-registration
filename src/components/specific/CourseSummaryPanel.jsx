import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PrimaryButton from '../common/PrimaryButton';
import { formatClassGroupOptionLabel } from '../../utils/helpers';

function CourseSummaryPanel() {
  const {
    selectedCourseObjects,
    totalCredits,
    maxCredits,
    registrationPhase,
    selectedSession,
    user,
    removeCourse,
    changeCourseGroup,
    clearSelectedCourses,
  } = useApp();
  const navigate = useNavigate();

  const isOverLimit = totalCredits > maxCredits;
  const hasSubmitted = registrationPhase !== 'draft';

  return (
    <div className="bg-white rounded-xl shadow-card border border-uitm-card-border overflow-hidden sticky top-24">
      <div className="bg-uitm-primary text-white p-4">
        <h3 className="font-semibold text-lg flex items-center justify-between">
          Selected Courses
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{selectedCourseObjects.length}</span>
        </h3>
      </div>

      {hasSubmitted && (
        <div className="mx-4 mt-4 rounded-lg border border-uitm-primary/20 bg-uitm-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-uitm-primary">Advisor Approval Status</p>
          <p className="mt-1 text-sm font-semibold capitalize text-gray-800">{registrationPhase}</p>
        </div>
      )}

      <div className="p-4 max-h-[400px] overflow-y-auto">
        {selectedCourseObjects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="text-sm">No courses selected yet.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {selectedCourseObjects.map((course) => (
              <li key={course.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-uitm-primary/30 transition-colors group">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-uitm-primary text-sm">{course.code}</span>
                      <span className="text-xs bg-purple-100 text-uitm-primary px-1.5 py-0.5 rounded">{course.credits} Cr</span>
                      <span className="text-xs bg-white border border-uitm-primary/20 text-uitm-primary px-1.5 py-0.5 rounded">
                        {course.selectedGroupDisplayLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1 mt-1">{course.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.selectedGroup?.day} {course.selectedGroup?.startTime}-{course.selectedGroup?.endTime}
                    </p>
                  </div>
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                    aria-label="Drop course"
                    title="Drop course"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <label className="mt-3 block">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Change Group</span>
                  <select
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 focus:border-uitm-primary focus:outline-none focus:ring-2 focus:ring-uitm-primary/20"
                    value={course.selectedGroupId || ''}
                    onChange={(event) => changeCourseGroup(course.id, event.target.value)}
                  >
                    {(course.classGroups || []).map((group) => (
                      <option
                        key={group.id}
                        value={group.id}
                        disabled={group.availableSeats === 0 && group.id !== course.selectedGroupId}
                      >
                        {formatClassGroupOptionLabel(group, user?.profile?.program, selectedSession?.semester)}
                      </option>
                    ))}
                  </select>
                  <span className="mt-1 block text-xs text-gray-500">
                    {course.selectedGroup?.venue} | {course.selectedGroup?.availableSeats}/{course.selectedGroup?.totalSeats} seats
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-gray-100 p-4 bg-gray-50/50">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Total Credits</p>
            <div className={`font-bold text-2xl leading-none ${isOverLimit ? 'text-red-500' : 'text-uitm-primary'}`}>
              {totalCredits} <span className="text-sm font-medium text-gray-400">/ {maxCredits}</span>
            </div>
          </div>
          {selectedCourseObjects.length > 0 && (
            <button
              onClick={clearSelectedCourses}
              className="text-xs text-red-500 hover:text-red-700 font-medium hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        <PrimaryButton
          className="w-full py-3"
          disabled={selectedCourseObjects.length === 0}
          onClick={() => navigate('/student/validation')}
        >
          Proceed to Validation
        </PrimaryButton>
      </div>
    </div>
  );
}

export default CourseSummaryPanel;
