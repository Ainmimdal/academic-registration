import React from 'react';
import { timetableDays, timetableHours, courseColors } from '../../data/mockData';
import { getCourseDuration } from '../../utils/helpers';

function TimetableGrid({ courses }) {
  const getCourseForSlot = (day, hour) => {
    return courses.find((c) => {
      if (c.day !== day) return false;
      const [startHour] = c.startTime.split(':');
      const currentHour = hour.split(':')[0];
      return startHour === currentHour;
    });
  };

  const isSlotCovered = (day, hour) => {
    return courses.some((c) => {
      if (c.day !== day) return false;
      const startHour = parseInt(c.startTime.split(':')[0], 10);
      const endHour = parseInt(c.endTime.split(':')[0], 10);
      const currentHour = parseInt(hour.split(':')[0], 10);
      return currentHour > startHour && currentHour < endHour;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-uitm-card-border overflow-hidden overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="bg-gray-50 border-b border-r border-gray-200 p-3 w-24 sticky left-0 z-10 text-gray-500 font-semibold uppercase text-xs">
              Day / Time
            </th>
            {timetableHours.map((hour) => (
              <th key={hour} className="bg-gray-50 border-b border-gray-200 p-3 text-center text-gray-500 font-medium">
                {hour}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {timetableDays.map((day) => (
            <tr key={day}>
              <td className="bg-gray-50/50 border-r border-gray-200 p-3 font-medium text-gray-700 sticky left-0 z-10">
                {day}
              </td>
              {timetableHours.map((hour) => {
                if (isSlotCovered(day, hour)) return null;

                const course = getCourseForSlot(day, hour);
                if (course) {
                  const duration = getCourseDuration(course.startTime, course.endTime);
                  const colorClass = courseColors[courses.findIndex(c => c.id === course.id) % courseColors.length];

                  return (
                    <td key={hour} colSpan={duration} className="p-1 border-r border-gray-100 relative">
                      <div className={`h-full min-h-[4rem] rounded-lg border p-2 flex flex-col justify-center ${colorClass} transition-transform hover:scale-[1.02]`}>
                        <span className="font-bold block">{course.code}</span>
                        <span className="text-xs opacity-90 truncate block">{course.name}</span>
                        <span className="text-xs font-medium mt-1">{course.venue}</span>
                      </div>
                    </td>
                  );
                }

                return (
                  <td key={hour} className="border-r border-gray-100 p-3 text-center">
                    <span className="text-gray-200">-</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimetableGrid;
