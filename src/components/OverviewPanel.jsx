import React from 'react';
import { BarChart3, Users, Calendar, TrendingUp } from 'lucide-react';
import { useScheduler } from '../context/SchedulerContext';
import { getOverviewStats, getClassWiseBreakdown } from '../utils/schedulerLogic';

const OverviewPanel = () => {
  const { scheduledEvents, selectedDates } = useScheduler();
  
  const overviewStats = getOverviewStats(scheduledEvents);
  const classWiseBreakdown = getClassWiseBreakdown(scheduledEvents);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        </div>
        <Icon className="w-8 h-8" style={{ color }} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Meetings"
          value={overviewStats.totalMeetings}
          icon={Calendar}
          color="#3B82F6"
        />
        <StatCard
          title="Present"
          value={overviewStats.totalPresent}
          icon={Users}
          color="#10B981"
        />
        <StatCard
          title="Absent"
          value={overviewStats.totalAbsent}
          icon={Users}
          color="#EF4444"
        />
        <StatCard
          title="Late"
          value={overviewStats.totalLate}
          icon={TrendingUp}
          color="#F59E0B"
        />
      </div>

      {/* Class-wise Statistics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Class-wise Statistics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 font-medium text-gray-700">Class</th>
                <th className="text-center py-2 px-4 font-medium text-gray-700">Total</th>
                <th className="text-center py-2 px-4 font-medium text-gray-700">Present</th>
                <th className="text-center py-2 px-4 font-medium text-gray-700">Absent</th>
                <th className="text-center py-2 px-4 font-medium text-gray-700">Late</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(overviewStats.classStats).map(([className, stats]) => (
                <tr key={className} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 font-medium">{className}</td>
                  <td className="text-center py-2 px-4">{stats.total}</td>
                  <td className="text-center py-2 px-4 text-green-600">{stats.present}</td>
                  <td className="text-center py-2 px-4 text-red-600">{stats.absent}</td>
                  <td className="text-center py-2 px-4 text-yellow-600">{stats.late}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Date-wise Breakdown */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Date-wise Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedDates.map(date => {
            const breakdown = classWiseBreakdown[date];
            if (!breakdown) return null;
            
            return (
              <div key={date} className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{date}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Meetings:</span>
                    <span className="font-medium">{breakdown.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Present:</span>
                    <span className="font-medium text-green-600">{breakdown.attendance.Present}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Absent:</span>
                    <span className="font-medium text-red-600">{breakdown.attendance.Absent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Late:</span>
                    <span className="font-medium text-yellow-600">{breakdown.attendance.Late}</span>
                  </div>
                </div>
                {Object.keys(breakdown.classes).length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-gray-600 mb-1">Classes:</p>
                    {Object.entries(breakdown.classes).map(([className, count]) => (
                      <div key={className} className="flex justify-between text-xs">
                        <span>{className}:</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;