import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import sv from 'date-fns/locale/sv'; 

const locales = { sv };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales, defaultLocale: 'sv' });

const events = [
  {
    title: 'Morning Shift',
    start: new Date(2024, 9, 1, 8, 0),
    end: new Date(2024, 9, 1, 16, 0),
  },
  {
    title: 'Evening Shift',
    start: new Date(2024, 9, 2, 16, 0),
    end: new Date(2024, 9, 2, 22, 0),
  },
];

const Schedule = () => {
  return (
    <div style={{ height: 500, margin: '50px 0' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week']}
      />
    </div>
  );
};

export default Schedule;
