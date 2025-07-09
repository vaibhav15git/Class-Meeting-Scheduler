export const scheduleEventsForDates = (selectedDates, studentData) => {
  if (!selectedDates.length || !studentData.length) return {};

  // Sort students by age (older first)
  const sortedStudents = [...studentData].sort((a, b) => b.age - a.age);
  
  // Create a flattened list of all meetings needed
  const allMeetings = [];
  sortedStudents.forEach(student => {
    for (let i = 0; i < student.meetings; i++) {
      allMeetings.push({
        ...student,
        meetingIndex: i,
        id: `${student.student_name}-${i}`
      });
    }
  });

  // Distribute meetings across dates
  const scheduledEvents = {};
  selectedDates.forEach(date => {
    scheduledEvents[date] = [];
  });

  // Distribute meetings evenly across dates
  allMeetings.forEach((meeting, index) => {
    const dateIndex = index % selectedDates.length;
    const selectedDate = selectedDates[dateIndex];
    
    const event = {
      id: `${meeting.student_name}-${selectedDate}-${meeting.meetingIndex}`,
      studentName: meeting.student_name,
      className: meeting.class_name,
      instructorName: meeting.instructor_name,
      age: meeting.age,
      meetingLink: generateMeetingLink(meeting.student_name, selectedDate),
      attendance: 'Present',
      date: selectedDate,
      time: generateMeetingTime(scheduledEvents[selectedDate].length)
    };

    scheduledEvents[selectedDate].push(event);
  });

  return scheduledEvents;
};

const generateMeetingLink = (studentName, date) => {
  const formattedName = studentName.toLowerCase().replace(/\s+/g, '-');
  const formattedDate = date.replace(/\//g, '-');
  return `https://meetingsite.com/${formattedName}-${formattedDate}`;
};

const generateMeetingTime = (eventCount) => {
  const baseHour = 9; // Start at 9 AM
  const hour = baseHour + Math.floor(eventCount / 2);
  const minute = (eventCount % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

export const getClassWiseBreakdown = (scheduledEvents) => {
  const breakdown = {};
  
  Object.keys(scheduledEvents).forEach(date => {
    const events = scheduledEvents[date];
    const classCount = {};
    const attendanceCount = {
      Present: 0,
      Absent: 0,
      Late: 0
    };

    events.forEach(event => {
      // Class-wise count
      if (!classCount[event.className]) {
        classCount[event.className] = 0;
      }
      classCount[event.className]++;

      // Attendance count
      attendanceCount[event.attendance]++;
    });

    breakdown[date] = {
      classes: classCount,
      attendance: attendanceCount,
      total: events.length
    };
  });

  return breakdown;
};

export const getOverviewStats = (scheduledEvents) => {
  let totalMeetings = 0;
  let totalPresent = 0;
  let totalAbsent = 0;
  let totalLate = 0;
  const classStats = {};

  Object.values(scheduledEvents).forEach(events => {
    events.forEach(event => {
      totalMeetings++;
      
      if (event.attendance === 'Present') totalPresent++;
      else if (event.attendance === 'Absent') totalAbsent++;
      else if (event.attendance === 'Late') totalLate++;

      if (!classStats[event.className]) {
        classStats[event.className] = {
          total: 0,
          present: 0,
          absent: 0,
          late: 0
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
    classStats
  };
};

export const filterStudents = (students, filters) => {
  return students.filter(student => {
    const matchesClass = !filters.className || 
      student.class_name.toLowerCase().includes(filters.className.toLowerCase());
    const matchesStudent = !filters.studentName || 
      student.student_name.toLowerCase().includes(filters.studentName.toLowerCase());
    const matchesInstructor = !filters.instructorName || 
      student.instructor_name.toLowerCase().includes(filters.instructorName.toLowerCase());
    
    return matchesClass && matchesStudent && matchesInstructor;
  });
};