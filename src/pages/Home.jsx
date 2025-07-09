

// import React from "react";
// import { Play, Users, Calendar as CalendarIcon, Download } from "lucide-react";
// import { useScheduler } from "../context/SchedulerContext";
// import { scheduleEventsForDates } from "../utils/schedulerLogic";
// import { exportToExcel } from "../utils/exportToExcel";
// import Calendar from "../components/Calendar";
// import EventCard from "../components/EventCard";
// import Filters from "../components/Filters";

// const Home = () => {
//   const {
//     selectedDates,
//     scheduledEvents,
//     setScheduledEvents,
//     filteredStudents,
//     setViewMode,
//   } = useScheduler();

//   const handleScheduleMeetings = () => {
//     if (selectedDates.length === 0) {
//       alert("Please select at least one date first!");
//       return;
//     }

//     const events = scheduleEventsForDates(selectedDates, filteredStudents);
//     setScheduledEvents(events);
//   };

//   const handleExportToExcel = () => {
//     if (Object.keys(scheduledEvents).length === 0) {
//       alert("No scheduled events to export!");
//       return;
//     }

//     const overviewStats = getOverviewStats(scheduledEvents);
//     exportToExcel(scheduledEvents, overviewStats);
//   };

//   const getOverviewStats = (events) => {
//     let totalMeetings = 0;
//     let totalPresent = 0;
//     let totalAbsent = 0;
//     let totalLate = 0;
//     const classStats = {};

//     Object.values(events).forEach((eventList) => {
//       eventList.forEach((event) => {
//         totalMeetings++;

//         if (event.attendance === "Present") totalPresent++;
//         else if (event.attendance === "Absent") totalAbsent++;
//         else if (event.attendance === "Late") totalLate++;

//         if (!classStats[event.className]) {
//           classStats[event.className] = {
//             total: 0,
//             present: 0,
//             absent: 0,
//             late: 0,
//           };
//         }

//         classStats[event.className].total++;
//         classStats[event.className][event.attendance.toLowerCase()]++;
//       });
//     });

//     return {
//       totalMeetings,
//       totalPresent,
//       totalAbsent,
//       totalLate,
//       classStats,
//     };
//   };

//   const totalScheduledEvents = Object.values(scheduledEvents).reduce(
//     (sum, events) => sum + events.length,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Class Meeting Scheduler
//           </h1>
//           <p className="text-gray-600">
//             Select dates, schedule meetings, and manage your class sessions
//             efficiently
//           </p>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-wrap items-center gap-4 mb-6">
//           <button
//             onClick={handleScheduleMeetings}
//             disabled={selectedDates.length === 0}
//             className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//           >
//             <Play className="w-5 h-5" />
//             <span>Schedule Meetings</span>
//           </button>

//           <button
//             onClick={() => setViewMode("overview")}
//             className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
//           >
//             <Users className="w-5 h-5" />
//             <span>View Overview</span>
//           </button>

//           <button
//             onClick={handleExportToExcel}
//             disabled={totalScheduledEvents === 0}
//             className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//           >
//             <Download className="w-5 h-5" />
//             <span>Export to Excel</span>
//           </button>
//         </div>

//         {/* Stats Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Selected Dates</p>
//                 <p className="text-2xl font-bold text-blue-600">
//                   {selectedDates.length}
//                 </p>
//               </div>
//               <CalendarIcon className="w-8 h-8 text-blue-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Students</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {filteredStudents.length}
//                 </p>
//               </div>
//               <Users className="w-8 h-8 text-green-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Scheduled Events</p>
//                 <p className="text-2xl font-bold text-purple-600">
//                   {totalScheduledEvents}
//                 </p>
//               </div>
//               <CalendarIcon className="w-8 h-8 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <Filters />

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Calendar */}
//           <div>
//             <Calendar />
//           </div>

//           {/* Scheduled Events */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//               Scheduled Events
//             </h2>
//             {selectedDates.length === 0 ? (
//               <div className="bg-white rounded-lg shadow-md p-8 text-center">
//                 <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600">
//                   Select dates from the calendar to view scheduled events
//                 </p>
//               </div>
//             ) : Object.keys(scheduledEvents).length === 0 ? (
//               <div className="bg-white rounded-lg shadow-md p-8 text-center">
//                 <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600 mb-4">
//                   Click "Schedule Meetings" to generate events for selected
//                   dates
//                 </p>
//                 <button
//                   onClick={handleScheduleMeetings}
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Schedule Now
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {selectedDates.map((date) => {
//                   const events = scheduledEvents[date] || [];
//                   return (
//                     <div
//                       key={date}
//                       className="bg-white rounded-lg shadow-md p-6"
//                     >
//                       <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                         {date} ({events.length} meeting
//                         {events.length !== 1 ? "s" : ""})
//                       </h3>
//                       <div className="space-y-4">
//                         {events.map((event) => (
//                           <EventCard key={event.id} event={event} date={date} />
//                         ))}
//                         {events.length === 0 && (
//                           <div className="text-center py-8 text-gray-500">
//                             <CalendarIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
//                             <p>No events scheduled for this date</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import {
  Play,
  Users,
  Calendar as CalendarIcon,
  Download,
  Plus,
} from "lucide-react";
import { useScheduler } from "../context/SchedulerContext";
import { scheduleEventsForDates } from "../utils/schedulerLogic";
import { exportToExcel } from "../utils/exportToExcel";
import Calendar from "../components/Calendar";
import EventTable from "../components/EventTable";
import Filters from "../components/Filters";

const Home = () => {
  const {
    selectedDates,
    scheduledEvents,
    setScheduledEvents,
    filteredStudents,
    setViewMode,
  } = useScheduler();

  const [currentPages, setCurrentPages] = React.useState({});


  const getCurrentPage = (date) => currentPages[date] || 1;

  const setCurrentPage = (date, page) => {
    setCurrentPages((prev) => ({ ...prev, [date]: page }));
  };



  const handleScheduleMeetings = () => {
    if (selectedDates.length === 0) {
      alert("Please select at least one date first!");
      return;
    }

    const events = scheduleEventsForDates(selectedDates, filteredStudents);
    setScheduledEvents(events);
  };

  const handleExportToExcel = () => {
    if (Object.keys(scheduledEvents).length === 0) {
      alert("No scheduled events to export!");
      return;
    }

    const overviewStats = getOverviewStats(scheduledEvents);
    exportToExcel(scheduledEvents, overviewStats);
  };

  const getOverviewStats = (events) => {
    let totalMeetings = 0;
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    const classStats = {};

    Object.values(events).forEach((eventList) => {
      eventList.forEach((event) => {
        totalMeetings++;

        if (event.attendance === "Present") totalPresent++;
        else if (event.attendance === "Absent") totalAbsent++;
        else if (event.attendance === "Late") totalLate++;

        if (!classStats[event.className]) {
          classStats[event.className] = {
            total: 0,
            present: 0,
            absent: 0,
            late: 0,
          };
        }

        classStats[event.className].total++;
        classStats[event.className][event.attendance.toLowerCase()]++;
      });
    });

    return {
      totalMeetings,
      totalPresent,
      totalAbsent,
      totalLate,
      classStats,
    };
  };

  const totalScheduledEvents = Object.values(scheduledEvents).reduce(
    (sum, events) => sum + events.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Class Meeting Scheduler
          </h1>
          <p className="text-gray-600">
            Select dates, schedule meetings, and manage your class sessions
            efficiently
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button
            onClick={handleScheduleMeetings}
            disabled={selectedDates.length === 0}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>Schedule Meetings</span>
          </button>

          <button
            onClick={() => setViewMode("overview")}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>View Overview</span>
          </button>

          <button
            onClick={handleExportToExcel}
            disabled={totalScheduledEvents === 0}
            className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export to Excel</span>
          </button>

        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selected Dates</p>
                <p className="text-2xl font-bold text-blue-600">
                  {selectedDates.length}
                </p>
              </div>
              <CalendarIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredStudents.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled Events</p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalScheduledEvents}
                </p>
              </div>
              <CalendarIcon className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <Filters />

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Calendar */}
          <div>
            <Calendar />
          </div>

          {/* Scheduled Events */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Scheduled Events
            </h2>
            {selectedDates.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Select dates from the calendar to view scheduled events
                </p>
              </div>
            ) : Object.keys(scheduledEvents).length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Click "Schedule Meetings" to generate events for selected
                  dates
                </p>
                <button
                  onClick={handleScheduleMeetings}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Schedule Now
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {selectedDates.map((date) => {
                  const events = scheduledEvents[date] || [];

                  return (
                    <div
                      key={date}
                      className="bg-white rounded-lg shadow-md p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {date} ({events.length} meeting
                          {events.length !== 1 ? "s" : ""})
                        </h3>
                    
                      </div>

                      {events.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg mb-2">
                            No events scheduled for this date
                          </p>
                        
                        </div>
                      ) : (
                        <EventTable
                          events={events}
                          date={date}
                          currentPage={getCurrentPage(date)}
                          onPageChange={(page) => setCurrentPage(date, page)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
