import React from 'react';
import { motion } from 'framer-motion';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/helpers';

function ApprovalCard({ student, onApprove, onReject }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-card border border-uitm-card-border p-5 hover:shadow-card-hover transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-800 text-lg">{student.studentName}</h4>
          <p className="text-sm text-gray-500 font-medium">{student.studentId}</p>
        </div>
        {student.status !== 'pending' && (
          <StatusBadge status={student.status} />
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
        <div>
          <span className="text-gray-400 block text-xs">Program</span>
          <span className="text-gray-700 font-medium truncate block" title={student.program}>{student.program}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-xs">Semester</span>
          <span className="text-gray-700 font-medium">{student.semester}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-400 block text-xs mb-1">Requested Courses ({student.totalCredits} Credits)</span>
          <div className="flex flex-wrap gap-1">
            {student.coursesRequested.map(code => (
              <span key={code} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">
                {code}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
        <span className="text-xs text-gray-400">
          Submitted: {formatDate(student.submittedAt)}
        </span>
        
        {student.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onReject(student.id)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors active:scale-95"
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(student.id)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors active:scale-95 shadow-sm"
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ApprovalCard;
