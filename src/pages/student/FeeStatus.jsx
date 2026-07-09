import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/common/StatusBadge';
import PrimaryButton from '../../components/common/PrimaryButton';
import { feeData } from '../../data/mockData';

function FeeStatus() {
  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount) => {
    return `RM ${amount.toFixed(2)}`;
  };

  return (
    <DashboardLayout pageTitle="Fee Status">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-card border border-uitm-card-border p-8" id="fee-receipt">
          <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Fee Assessment</h1>
              <p className="text-gray-500 mt-1">Receipt No: <span className="font-mono text-gray-700">{feeData.receiptNo}</span></p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-sm font-semibold text-gray-500 uppercase">Status:</span>
                <StatusBadge status="paid" />
              </div>
              <p className="text-sm text-gray-500">Date: {feeData.paymentDate}</p>
            </div>
          </div>

          <div className="mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 text-gray-700">Tuition Fee</td>
                  <td className="py-4 text-gray-700 text-right font-medium">{formatCurrency(feeData.tuitionFee)}</td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-700">Activity Fee</td>
                  <td className="py-4 text-gray-700 text-right font-medium">{formatCurrency(feeData.activityFee)}</td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-700">Technology Fee</td>
                  <td className="py-4 text-gray-700 text-right font-medium">{formatCurrency(feeData.technologyFee)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200">
                  <td className="py-4 text-gray-900 font-bold text-lg">Total Amount</td>
                  <td className="py-4 text-uitm-primary font-bold text-lg text-right">{formatCurrency(feeData.totalAmount)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600 font-medium">Paid Amount</td>
                  <td className="py-2 text-gray-600 font-medium text-right">{formatCurrency(feeData.paidAmount)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-bold rounded-l-lg mt-2 inline-block w-full">Balance Due</td>
                  <td className="py-3 px-4 text-green-600 font-bold text-xl text-right rounded-r-lg">{formatCurrency(feeData.balance)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <PrimaryButton onClick={handlePrint} className="flex items-center gap-2 no-print">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print Receipt
            </PrimaryButton>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default FeeStatus;
