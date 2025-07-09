// import React, { useState } from 'react';
// import { Clock, User, BookOpen, ExternalLink, Edit2, Save, X } from 'lucide-react';
// import { useScheduler } from '../context/SchedulerContext';

// const EventCard = ({ event, date }) => {
//   const { updateEventAttendance, updateEvent, deleteEvent } = useScheduler();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     studentName: event.studentName,
//     className: event.className,
//     instructorName: event.instructorName,
//     age: event.age,
//     time: event.time,
//     meetingLink: event.meetingLink
//   });

//   const handleAttendanceChange = (newAttendance) => {
//     updateEventAttendance(date, event.id, newAttendance);
//   };

//   const handleEditSave = () => {
//     updateEvent(date, event.id, editData);
//     setIsEditing(false);
//   };

//   const handleEditCancel = () => {
//     setEditData({
//       studentName: event.studentName,
//       className: event.className,
//       instructorName: event.instructorName,
//       age: event.age,
//       time: event.time,
//       meetingLink: event.meetingLink
//     });
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       deleteEvent(date, event.id);
//     }
//   };

//   const getAttendanceColor = (attendance) => {
//     switch (attendance) {
//       case 'Present':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'Absent':
//         return 'bg-red-100 text-red-800 border-red-200';
//       case 'Late':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   if (isEditing) {
//     return (
//       <div className="bg-white rounded-lg border-2 border-blue-300 p-4 shadow-md">
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Student Name
//               </label>
//               <input
//                 type="text"
//                 value={editData.studentName}
//                 onChange={(e) => setEditData({ ...editData, studentName: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Class Name
//               </label>
//               <input
//                 type="text"
//                 value={editData.className}
//                 onChange={(e) => setEditData({ ...editData, className: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Instructor Name
//               </label>
//               <input
//                 type="text"
//                 value={editData.instructorName}
//                 onChange={(e) => setEditData({ ...editData, instructorName: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Age
//               </label>
//               <input
//                 type="number"
//                 value={editData.age}
//                 onChange={(e) => setEditData({ ...editData, age: parseInt(e.target.value) })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Time
//               </label>
//               <input
//                 type="time"
//                 value={editData.time}
//                 onChange={(e) => setEditData({ ...editData, time: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Meeting Link
//               </label>
//               <input
//                 type="url"
//                 value={editData.meetingLink}
//                 onChange={(e) => setEditData({ ...editData, meetingLink: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center justify-between pt-4 border-t">
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={handleEditSave}
//                 className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
//               >
//                 <Save className="w-4 h-4" />
//                 <span>Save</span>
//               </button>
//               <button
//                 onClick={handleEditCancel}
//                 className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
//               >
//                 <X className="w-4 h-4" />
//                 <span>Cancel</span>
//               </button>
//             </div>
//             <button
//               onClick={handleDelete}
//               className="text-red-600 hover:text-red-800 text-sm font-medium"
//             >
//               Delete Event
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex-1">
//           <h3 className="font-semibold text-gray-900 mb-1">{event.studentName}</h3>
//           <div className="flex items-center text-sm text-gray-600 mb-1">
//             <BookOpen className="w-4 h-4 mr-1" />
//             {event.className}
//           </div>
//           <div className="flex items-center text-sm text-gray-600">
//             <User className="w-4 h-4 mr-1" />
//             {event.instructorName}
//           </div>
//         </div>
//         <div className="text-right">
//           <span className="text-sm font-medium text-gray-900">Age: {event.age}</span>
//           <div className="flex items-center text-sm text-gray-600 mt-1">
//             <Clock className="w-4 h-4 mr-1" />
//             {event.time}
//           </div>
//         </div>
//       </div>

//       <div className="border-t pt-3">
//         <div className="flex items-center justify-between mb-2">
//           <a
//             href={event.meetingLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
//           >
//             <ExternalLink className="w-4 h-4 mr-1" />
//             Join Meeting
//           </a>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setIsEditing(true)}
//               className="flex items-center text-gray-600 hover:text-gray-800 text-sm"
//             >
//               <Edit2 className="w-4 h-4 mr-1" />
//               Edit
//             </button>
//           </div>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <span className="text-sm text-gray-600">Status:</span>
//           <select
//             value={event.attendance}
//             onChange={(e) => handleAttendanceChange(e.target.value)}
//             className={`px-2 py-1 text-xs rounded-md border ${getAttendanceColor(event.attendance)} font-medium`}
//           >
//             <option value="Present">Present</option>
//             <option value="Absent">Absent</option>
//             <option value="Late">Late</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;

import React, { useState } from "react";
import {
  Clock,
  User,
  BookOpen,
  ExternalLink,
  Edit2,
  Save,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useScheduler } from "../context/SchedulerContext";

const EventTable = ({ events, date, currentPage, onPageChange }) => {
  const { updateEventAttendance, updateEvent, deleteEvent } = useScheduler();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const ITEMS_PER_PAGE = 10;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedEvents = events.slice(startIndex, endIndex);
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  const handleAttendanceChange = (eventId, newAttendance) => {
    updateEventAttendance(date, eventId, newAttendance);
  };

  const handleEditStart = (event) => {
    setEditingId(event.id);
    setEditData({
      studentName: event.studentName,
      className: event.className,
      instructorName: event.instructorName,
      age: event.age,
      time: event.time,
      meetingLink: event.meetingLink,
    });
  };

  const handleEditSave = (eventId) => {
    updateEvent(date, eventId, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(date, eventId);
    }
  };

  const getAttendanceColor = (attendance) => {
    switch (attendance) {
      case "Present":
        return "bg-green-100 text-green-700 border-green-200";
      case "Absent":
        return "bg-red-100 text-red-700 border-red-200";
      case "Late":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const PaginationControls = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (start > 1) {
          pages.push(1);
          if (start > 2) pages.push("...");
        }

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (end < totalPages) {
          if (end < totalPages - 1) pages.push("...");
          pages.push(totalPages);
        }
      }

      return pages;
    };

    return (
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, events.length)} of{" "}
          {events.length} events
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-sm text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Student
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Class
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Instructor
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Age
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Meeting Link
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Attendance
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedEvents.map((event, index) => (
              <tr
                key={event.id}
                className={`hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-25"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === event.id ? (
                    <input
                      type="text"
                      value={editData.studentName}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          studentName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {event.studentName}
                      </div>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === event.id ? (
                    <input
                      type="text"
                      value={editData.className}
                      onChange={(e) =>
                        setEditData({ ...editData, className: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {event.className}
                      </span>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === event.id ? (
                    <input
                      type="text"
                      value={editData.instructorName}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          instructorName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">
                      {event.instructorName}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === event.id ? (
                    <input
                      type="number"
                      value={editData.age}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          age: parseInt(e.target.value),
                        })
                      }
                      className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{event.age}</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === event.id ? (
                    <input
                      type="time"
                      value={editData.time}
                      onChange={(e) =>
                        setEditData({ ...editData, time: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {event.time}
                      </span>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === event.id ? (
                    <input
                      type="url"
                      value={editData.meetingLink}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          meetingLink: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <a
                      href={event.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Join
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={event.attendance}
                    onChange={(e) =>
                      handleAttendanceChange(event.id, e.target.value)
                    }
                    disabled={editingId === event.id}
                    className={`px-3 py-1 text-sm rounded-md border font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getAttendanceColor(
                      event.attendance
                    )} ${
                      editingId === event.id
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:shadow-sm"
                    }`}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {editingId === event.id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(event.id)}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
                          title="Save"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditStart(event)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls />
    </div>
  );
};

export default EventTable;