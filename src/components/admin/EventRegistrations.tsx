'use client';

import React, { useEffect, useState } from 'react';
import useEventRegistration, { EventRegistration } from '@/src/store/EventRegistration';
import { useToast } from '@/src/components/ui/toast';

interface EventRegistrationsProps {
  eventId: string;
  eventTitle: string;
}

export default function EventRegistrations({ eventId, eventTitle }: EventRegistrationsProps) {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [attendanceLoading, setAttendanceLoading] = useState<string | null>(null);
  const { getEventRegistrations, markAttendance } = useEventRegistration();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadRegistrations() {
      try {
        setLoading(true);
        const data = await getEventRegistrations(eventId);
        setRegistrations(data);
      } catch (error: any) {
        addToast({
          title: 'Failed to load registrations',
          description: error.message || 'An error occurred while loading registrations',
          variant: 'error',
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }

    loadRegistrations();
  }, [eventId, getEventRegistrations, addToast]);

  const handleAttendanceChange = async (registrationId: string, attended: boolean) => {
    try {
      setAttendanceLoading(registrationId);
      await markAttendance(registrationId, attended);
      
      // Update local state
      setRegistrations(prev => 
        prev.map(reg => 
          reg._id === registrationId ? { ...reg, attended } : reg
        )
      );
      
      addToast({
        title: 'Attendance updated',
        description: `Attendance status ${attended ? 'marked' : 'unmarked'} successfully`,
        variant: 'success',
        duration: 3000,
      });
    } catch (error: any) {
      addToast({
        title: 'Failed to update attendance',
        description: error.message || 'An error occurred',
        variant: 'error',
        duration: 5000,
      });
    } finally {
      setAttendanceLoading(null);
    }
  };

  const exportToCSV = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Registration Date', 'Attended'];
    const rows = registrations.map(reg => [
      reg.userName,
      reg.userEmail,
      new Date(reg.registeredAt).toLocaleString(),
      reg.attended ? 'Yes' : 'No'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${eventTitle.replace(/\s+/g, '-')}-registrations.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-neutral-600 dark:text-neutral-400">Loading registrations...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-neutral-900">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 py-3 sm:py-4 px-3 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-10 gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-white">
            Registrations
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            {registrations.length} total registrant{registrations.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors text-sm sm:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {registrations.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 h-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-neutral-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium">No registrations yet for this event</p>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">When users register, they'll appear here</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="min-w-[640px]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-300 sticky top-0 z-10">
                <tr>
                  <th className="px-4 sm:px-6 py-3">Name</th>
                  <th className="px-4 sm:px-6 py-3">Email</th>
                  <th className="px-4 sm:px-6 py-3">Registration Date</th>
                  <th className="px-4 sm:px-6 py-3 text-center">Attended</th>
                  <th className="px-4 sm:px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {registrations.map((registration) => (
                  <tr 
                    key={registration._id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-neutral-800 dark:text-white">
                      {registration.userName}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                      {registration.userEmail}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                      {new Date(registration.registeredAt).toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                      <span 
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          registration.attended 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
                        }`}
                      >
                        {registration.attended ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAttendanceChange(registration._id!, !registration.attended)}
                        disabled={attendanceLoading === registration._id}
                        className={`text-xs px-3 py-1 rounded-md ${
                          registration.attended
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        } transition-colors disabled:opacity-50`}
                      >
                        {attendanceLoading === registration._id ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : registration.attended ? 'Mark as Absent' : 'Mark as Attended'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 