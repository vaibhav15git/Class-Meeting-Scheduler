import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useScheduler } from '../context/SchedulerContext';
import { filterStudents } from '../utils/schedulerLogic';
import { studentData } from '../data/dummyData';

const Filters = () => {
  const { filters, setFilters, setFilteredStudents } = useScheduler();

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Apply filters to student data
    const filtered = filterStudents(studentData, newFilters);
    setFilteredStudents(filtered);
  };

  const clearFilters = () => {
    const emptyFilters = { className: '', studentName: '', instructorName: '' };
    setFilters(emptyFilters);
    setFilteredStudents(studentData);
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  // Get unique values for dropdowns
  const uniqueClasses = [...new Set(studentData.map(student => student.class_name))];
  const uniqueInstructors = [...new Set(studentData.map(student => student.instructor_name))];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Student Name Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search student..."
              value={filters.studentName}
              onChange={(e) => handleFilterChange('studentName', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Class Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class
          </label>
          <select
            value={filters.className}
            onChange={(e) => handleFilterChange('className', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Classes</option>
            {uniqueClasses.map(className => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>

        {/* Instructor Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructor
          </label>
          <select
            value={filters.instructorName}
            onChange={(e) => handleFilterChange('instructorName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Instructors</option>
            {uniqueInstructors.map(instructor => (
              <option key={instructor} value={instructor}>
                {instructor}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Active filters:</span>
            {filters.studentName && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Student: {filters.studentName}
              </span>
            )}
            {filters.className && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Class: {filters.className}
              </span>
            )}
            {filters.instructorName && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Instructor: {filters.instructorName}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;