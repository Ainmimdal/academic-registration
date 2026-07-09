import React, { useState } from 'react';
import PrimaryButton from '../common/PrimaryButton';
import StatusBadge from '../common/StatusBadge';

function CourseDataTable({ courses, onRegister, onViewDetails, selectedCourses }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroups, setSelectedGroups] = useState({});

  const filteredCourses = courses.filter((course) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      course.code.toLowerCase().includes(searchLower) ||
      course.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search course code or name..."
          className="input-field pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-uitm-card-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="table-header">Code</th>
                <th className="table-header">Course Name</th>
                <th className="table-header text-center">Credit</th>
                <th className="table-header">Group</th>
                <th className="table-header">Lecturer</th>
                <th className="table-header text-center">Seats</th>
                <th className="table-header text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan="7" className="table-cell text-center py-8 text-gray-500">
                    No courses found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => {
                  const isSelected = selectedCourses.includes(course.id);
                  const selectedGroupId = selectedGroups[course.id] || course.classGroups?.[0]?.id;
                  const selectedGroup = course.classGroups?.find((group) => group.id === selectedGroupId);
                  const isFull = !selectedGroup || selectedGroup.availableSeats === 0;

                  return (
                    <tr
                      key={course.id}
                      className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                      onClick={() => onViewDetails(course.id)}
                    >
                      <td className="table-cell font-semibold text-uitm-primary">{course.code}</td>
                      <td className="table-cell font-medium text-gray-800">{course.name}</td>
                      <td className="table-cell text-center">{course.credits}</td>
                      <td className="table-cell" onClick={(e) => e.stopPropagation()}>
                        <select
                          className="w-44 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 focus:border-uitm-primary focus:outline-none focus:ring-2 focus:ring-uitm-primary/20"
                          value={selectedGroupId || ''}
                          disabled={isSelected}
                          onChange={(e) => setSelectedGroups((current) => ({
                            ...current,
                            [course.id]: e.target.value,
                          }))}
                        >
                          {(course.classGroups || []).map((group) => (
                            <option key={group.id} value={group.id} disabled={group.availableSeats === 0}>
                              {group.label} - {group.day} {group.startTime} ({group.availableSeats}/{group.totalSeats})
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="table-cell text-gray-600">{course.lecturer}</td>
                      <td className="table-cell text-center">
                        <span className={`font-medium ${isFull ? 'text-red-500' : 'text-gray-700'}`}>
                          {selectedGroup ? `${selectedGroup.availableSeats}/${selectedGroup.totalSeats}` : '0/0'}
                        </span>
                      </td>
                      <td className="table-cell text-center" onClick={(e) => e.stopPropagation()}>
                        {isSelected ? (
                          <StatusBadge status="selected" />
                        ) : (
                          <PrimaryButton
                            onClick={() => onRegister(course.id, selectedGroupId)}
                            disabled={isFull}
                            className="py-1.5 px-4 text-xs"
                          >
                            {isFull ? 'Full' : 'Register'}
                          </PrimaryButton>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourseDataTable;
