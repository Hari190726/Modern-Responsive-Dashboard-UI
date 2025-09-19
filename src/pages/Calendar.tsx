import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  time: string;
  duration: string;
  location?: string;
  attendees?: number;
  color: string;
  date: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  const events: Event[] = [
    {
      id: 1,
      title: 'Team Meeting',
      time: '09:00',
      duration: '1h',
      location: 'Conference Room A',
      attendees: 8,
      color: 'bg-blue-500',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Client Presentation',
      time: '14:00',
      duration: '2h',
      location: 'Virtual',
      attendees: 5,
      color: 'bg-green-500',
      date: '2024-01-15'
    },
    {
      id: 3,
      title: 'Design Review',
      time: '11:00',
      duration: '1.5h',
      location: 'Design Studio',
      attendees: 4,
      color: 'bg-purple-500',
      date: '2024-01-16'
    },
    {
      id: 4,
      title: 'Project Planning',
      time: '10:00',
      duration: '3h',
      attendees: 12,
      color: 'bg-orange-500',
      date: '2024-01-17'
    },
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const handleEventClick = (event: Event) => {
    console.log('Event clicked:', event);
  };

  const handleAddEvent = () => {
    console.log('Add new event');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Calendar</h1>
        <p className="text-gray-400">Manage your schedule and appointments</p>
      </div>

      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-semibold text-white min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex bg-gray-800 rounded-lg p-1">
            {(['month', 'week', 'day'] as const).map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-1 rounded text-sm transition-colors duration-200 capitalize ${
                  view === viewType ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddEvent}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3 bg-gray-800 rounded-2xl p-6">
          {view === 'month' && (
            <>
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth().map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border border-gray-700 rounded-lg ${
                      day ? 'hover:bg-gray-700 cursor-pointer' : ''
                    } transition-colors duration-200`}
                  >
                    {day && (
                      <>
                        <div className="text-sm font-medium text-white mb-1">{day}</div>
                        <div className="space-y-1">
                          {getEventsForDate(day).map((event) => (
                            <div
                              key={event.id}
                              onClick={() => handleEventClick(event)}
                              className={`${event.color} text-white text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200`}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="opacity-90">{event.time}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {view !== 'month' && (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">📅</div>
                <p className="text-gray-400 capitalize">{view} view coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
          
          <div className="space-y-4">
            {events.slice(0, 4).map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className="p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 ${event.color} rounded-full mt-1 flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{event.title}</h4>
                    <div className="flex items-center space-x-1 mt-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-1 mt-1 text-xs text-gray-400">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                    {event.attendees && (
                      <div className="flex items-center space-x-1 mt-1 text-xs text-gray-400">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddEvent}
            className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
          >
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;