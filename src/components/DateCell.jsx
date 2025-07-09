import React from 'react';
import { useScheduler } from '../context/SchedulerContext';

const DateCell = ({ date, isCurrentMonth, isSelected, hasEvents, events }) => {
  const { addSelectedDate, removeSelectedDate } = useScheduler();

  const formatDateKey = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleDateClick = () => {
    if (!isCurrentMonth) return;
    
    const dateKey = formatDateKey(date);
    if (isSelected) {
      removeSelectedDate(dateKey);
    } else {
      addSelectedDate(dateKey);
    }
  };

  const isToday = () => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getCellClasses = () => {
    let classes = "h-16 border border-gray-200 p-1 cursor-pointer transition-all hover:bg-gray-50 flex flex-col";
    
    if (!isCurrentMonth) {
      classes += " bg-gray-100 text-gray-400 cursor-not-allowed";
    } else if (isSelected) {
      classes += " bg-blue-500 text-white hover:bg-blue-600";
    } else if (hasEvents) {
      classes += " bg-green-100 hover:bg-green-200";
    }
    
    if (isToday()) {
      classes += " ring-2 ring-blue-400";
    }
    
    return classes;
  };

  return (
    <div className={getCellClasses()} onClick={handleDateClick}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
          {date.getDate()}
        </span>
        {hasEvents && (
          <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-green-500'}`} />
        )}
      </div>
      
      {events.length > 0 && (
        <div className="mt-1 flex-1 overflow-hidden">
          <div className={`text-xs truncate ${isSelected ? 'text-white' : 'text-gray-600'}`}>
            {events.length} meeting{events.length > 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateCell;