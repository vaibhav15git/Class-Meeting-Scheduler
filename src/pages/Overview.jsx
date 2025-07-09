import React from 'react';
import { ArrowLeft, Download, Calendar } from 'lucide-react';
import { useScheduler } from '../context/SchedulerContext';
import { exportToExcel } from '../utils/exportToExcel';
import { getOverviewStats } from '../utils/schedulerLogic';
import OverviewPanel from '../components/OverviewPanel';

const Overview = () => {
  const { scheduledEvents, setViewMode, selectedDates } = useScheduler();

  const handleExportToExcel = () => {
    if (Object.keys(scheduledEvents).length === 0) {
      alert('No scheduled events to export!');
      return;
    }
    
    const overviewStats = getOverviewStats(scheduledEvents);
    exportToExcel(scheduledEvents, overviewStats);
  };

  const totalScheduledEvents = Object.values(scheduledEvents).reduce((sum, events) => sum + events.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('calendar')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Calendar</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Overview Dashboard</h1>
              <p className="text-gray-600">Meeting statistics and analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportToExcel}
              disabled={totalScheduledEvents === 0}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Export to Excel</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {totalScheduledEvents === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Events Scheduled</h2>
            <p className="text-gray-600 mb-6">You need to schedule some meetings first to view the overview.</p>
            <button
              onClick={() => setViewMode('calendar')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Calendar
            </button>
          </div>
        ) : (
          <OverviewPanel />
        )}
      </div>
    </div>
  );
};

export default Overview;