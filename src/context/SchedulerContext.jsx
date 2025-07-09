import React, { createContext, useContext, useReducer } from 'react';
import { studentData } from '../data/dummyData';

const SchedulerContext = createContext();

const initialState = {
  selectedDates: [],
  scheduledEvents: {},
  filteredStudents: studentData,
  filters: {
    className: '',
    studentName: '',
    instructorName: ''
  },
  currentDate: new Date(),
  viewMode: 'calendar' // 'calendar' or 'overview'
};

const schedulerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_DATES':
      return {
        ...state,
        selectedDates: action.payload
      };
    case 'ADD_SELECTED_DATE':
      return {
        ...state,
        selectedDates: [...state.selectedDates, action.payload]
      };
    case 'REMOVE_SELECTED_DATE':
      return {
        ...state,
        selectedDates: state.selectedDates.filter(date => date !== action.payload)
      };
    case 'SET_SCHEDULED_EVENTS':
      return {
        ...state,
        scheduledEvents: action.payload
      };
    case 'UPDATE_EVENT_ATTENDANCE':
      return {
        ...state,
        scheduledEvents: {
          ...state.scheduledEvents,
          [action.payload.date]: state.scheduledEvents[action.payload.date]?.map(event =>
            event.id === action.payload.eventId
              ? { ...event, attendance: action.payload.attendance }
              : event
          ) || []
        }
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        scheduledEvents: {
          ...state.scheduledEvents,
          [action.payload.date]: state.scheduledEvents[action.payload.date]?.map(event =>
            event.id === action.payload.eventId
              ? { ...event, ...action.payload.eventData }
              : event
          ) || []
        }
      };
    case 'ADD_EVENT':
      return {
        ...state,
        scheduledEvents: {
          ...state.scheduledEvents,
          [action.payload.date]: [
            ...(state.scheduledEvents[action.payload.date] || []),
            action.payload.event
          ]
        }
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        scheduledEvents: {
          ...state.scheduledEvents,
          [action.payload.date]: state.scheduledEvents[action.payload.date]?.filter(event =>
            event.id !== action.payload.eventId
          ) || []
        }
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload
      };
    case 'SET_FILTERED_STUDENTS':
      return {
        ...state,
        filteredStudents: action.payload
      };
    case 'SET_CURRENT_DATE':
      return {
        ...state,
        currentDate: action.payload
      };
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload
      };
    default:
      return state;
  }
};

export const SchedulerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(schedulerReducer, initialState);

  const actions = {
    setSelectedDates: (dates) => dispatch({ type: 'SET_SELECTED_DATES', payload: dates }),
    addSelectedDate: (date) => dispatch({ type: 'ADD_SELECTED_DATE', payload: date }),
    removeSelectedDate: (date) => dispatch({ type: 'REMOVE_SELECTED_DATE', payload: date }),
    setScheduledEvents: (events) => dispatch({ type: 'SET_SCHEDULED_EVENTS', payload: events }),
    updateEventAttendance: (date, eventId, attendance) => 
      dispatch({ type: 'UPDATE_EVENT_ATTENDANCE', payload: { date, eventId, attendance } }),
    updateEvent: (date, eventId, eventData) =>
      dispatch({ type: 'UPDATE_EVENT', payload: { date, eventId, eventData } }),
    addEvent: (date, event) =>
      dispatch({ type: 'ADD_EVENT', payload: { date, event } }),
    deleteEvent: (date, eventId) =>
      dispatch({ type: 'DELETE_EVENT', payload: { date, eventId } }),
    setFilters: (filters) => dispatch({ type: 'SET_FILTERS', payload: filters }),
    setFilteredStudents: (students) => dispatch({ type: 'SET_FILTERED_STUDENTS', payload: students }),
    setCurrentDate: (date) => dispatch({ type: 'SET_CURRENT_DATE', payload: date }),
    setViewMode: (mode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode })
  };

  return (
    <SchedulerContext.Provider value={{ ...state, ...actions }}>
      {children}
    </SchedulerContext.Provider>
  );
};

export const useScheduler = () => {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error('useScheduler must be used within a SchedulerProvider');
  }
  return context;
};