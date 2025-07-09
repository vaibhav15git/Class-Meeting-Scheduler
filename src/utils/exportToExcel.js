import * as XLSX from 'xlsx';

export const exportToExcel = (scheduledEvents, overviewStats) => {
  const workbook = XLSX.utils.book_new();

  // Create Overview Sheet
  const overviewData = createOverviewSheetData(scheduledEvents, overviewStats);
  const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
  XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview');

  // Create date-wise sheets
  Object.keys(scheduledEvents).forEach(date => {
    const dateData = createDateSheetData(scheduledEvents[date]);
    const dateSheet = XLSX.utils.aoa_to_sheet(dateData);
    const sheetName = `${date.replace(/\//g, '-')}`;
    XLSX.utils.book_append_sheet(workbook, dateSheet, sheetName);
  });

  // Generate filename with current date
  const currentDate = new Date().toISOString().split('T')[0];
  const filename = `class-meeting-scheduler-${currentDate}.xlsx`;

  // Save file
  XLSX.writeFile(workbook, filename);
};

const createOverviewSheetData = (scheduledEvents, overviewStats) => {
  const data = [];
  
  // Header
  data.push(['Class Meeting Scheduler - Overview Report']);
  data.push(['Generated on:', new Date().toLocaleDateString()]);
  data.push([]);

  // Overall Statistics
  data.push(['Overall Statistics']);
  data.push(['Total Meetings:', overviewStats.totalMeetings]);
  data.push(['Total Present:', overviewStats.totalPresent]);
  data.push(['Total Absent:', overviewStats.totalAbsent]);
  data.push(['Total Late:', overviewStats.totalLate]);
  data.push([]);

  // Class-wise Statistics
  data.push(['Class-wise Statistics']);
  data.push(['Class Name', 'Total Meetings', 'Present', 'Absent', 'Late']);
  
  Object.keys(overviewStats.classStats).forEach(className => {
    const stats = overviewStats.classStats[className];
    data.push([className, stats.total, stats.present, stats.absent, stats.late]);
  });
  
  data.push([]);

  // Date-wise Summary
  data.push(['Date-wise Summary']);
  data.push(['Date', 'Total Meetings', 'Present', 'Absent', 'Late']);
  
  Object.keys(scheduledEvents).forEach(date => {
    const events = scheduledEvents[date];
    const present = events.filter(e => e.attendance === 'Present').length;
    const absent = events.filter(e => e.attendance === 'Absent').length;
    const late = events.filter(e => e.attendance === 'Late').length;
    
    data.push([date, events.length, present, absent, late]);
  });

  return data;
};

const createDateSheetData = (events) => {
  const data = [];
  
  // Header
  data.push(['Meeting Details']);
  data.push(['Student Name', 'Class Name', 'Age', 'Instructor', 'Meeting Link', 'Time', 'Attendance Status']);
  
  // Events data
  events.forEach(event => {
    data.push([
      event.studentName,
      event.className,
      event.age,
      event.instructorName,
      event.meetingLink,
      event.time,
      event.attendance
    ]);
  });

  return data;
};

export const exportDateSpecificData = (date, events) => {
  const workbook = XLSX.utils.book_new();
  const data = createDateSheetData(events);
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  
  XLSX.utils.book_append_sheet(workbook, worksheet, date);
  
  const filename = `meetings-${date.replace(/\//g, '-')}.xlsx`;
  XLSX.writeFile(workbook, filename);
};