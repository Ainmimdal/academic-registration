import React from 'react';

function PrintWrapper({ children, title }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Print button — hidden when printing */}
      <div className="no-print flex items-center justify-between mb-4">
        {title && (
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        )}
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                     text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print
        </button>
      </div>

      {/* Printable content area */}
      <div className="print-content">
        {children}
      </div>
    </div>
  );
}

export default PrintWrapper;
