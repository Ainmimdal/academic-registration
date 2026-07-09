import React from 'react';

const statusConfig = {
  approved: {
    label: 'Approved',
    classes: 'bg-green-100 text-green-700',
  },
  passed: {
    label: 'Passed',
    classes: 'bg-green-100 text-green-700',
  },
  pending: {
    label: 'Pending',
    classes: 'bg-yellow-100 text-yellow-700',
  },
  rejected: {
    label: 'Rejected',
    classes: 'bg-red-100 text-red-700',
  },
  failed: {
    label: 'Failed',
    classes: 'bg-red-100 text-red-700',
  },
  paid: {
    label: 'Paid',
    classes: 'bg-green-100 text-green-700',
  },
};

function StatusBadge({ status }) {
  const config = statusConfig[status] || {
    label: status,
    classes: 'bg-gray-100 text-gray-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.classes}`}
    >
      {/* Small dot indicator */}
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          config.classes.includes('green')
            ? 'bg-green-500'
            : config.classes.includes('yellow')
            ? 'bg-yellow-500'
            : config.classes.includes('red')
            ? 'bg-red-500'
            : 'bg-gray-500'
        }`}
      />
      {config.label}
    </span>
  );
}

export default StatusBadge;
