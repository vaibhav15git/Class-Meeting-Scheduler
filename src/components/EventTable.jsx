
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