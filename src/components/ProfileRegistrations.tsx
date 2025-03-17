'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import useEventRegistration, { EventRegistration } from '@/src/store/EventRegistration';
import { motion } from 'framer-motion';
import { useToast } from '@/src/components/ui/toast';

export default function ProfileRegistrations() {
  const { userId, isSignedIn, isLoaded } = useAuth();
  const { getRegistrations, registrations, loading } = useEventRegistration();
  const { addToast } = useToast();
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && userId) {
      getRegistrations(userId);
    }
  }, [isLoaded, isSignedIn, userId, getRegistrations]);

  // Format date for display
  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'TBA';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (timestamp: number) => {
    if (!timestamp) return 'TBA';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-2">
          Sign in to view your registrations
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          You need to be signed in to view your event registrations.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading your registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow">
      <div className="border-b border-neutral-200 dark:border-neutral-800 p-6">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-white">
          My Event Registrations
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          View all your registered events.
        </p>
      </div>

      {registrations.length === 0 ? (
        <div className="p-8 text-center">
          <svg 
            className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h4 className="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            No registrations yet
          </h4>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            You haven't registered for any events yet. Browse our events page to find exciting events to join.
          </p>
          <a 
            href="/events" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Explore Events
          </a>
        </div>
      ) : (
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {registrations.map((registration) => {
            const event = registration.eventId as any; // The populated event data
            const isExpanded = expandedEventId === registration._id;
            
            return (
              <motion.div 
                key={registration._id}
                className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setExpandedEventId(isExpanded ? null : registration._id!)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-neutral-800 dark:text-white">
                      {event?.title || 'Event'}
                    </h4>
                    
                    <div className="mt-2 flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event?.date ? formatDate(event.date) : 'Date not available'}
                    </div>
                    
                    <div className="mt-1 flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event?.time ? formatTime(event.time) : 'Time not available'}
                    </div>
                    
                    <div className="mt-2">
                      <span 
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          registration.attended 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500'
                        }`}
                      >
                        {registration.attended ? 'Attended' : 'Registered'}
                      </span>
                    </div>
                  </div>
                  
                  <svg 
                    className={`w-5 h-5 text-neutral-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {isExpanded && (
                  <motion.div 
                    className="mt-4 text-neutral-600 dark:text-neutral-400"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-3">
                      {event?.description || 'No description available'}
                    </p>
                    
                    <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-md">
                      <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Registration Details
                      </h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-neutral-500 dark:text-neutral-400">Registered on:</div>
                        <div className="text-neutral-700 dark:text-neutral-300">
                          {new Date(registration.registeredAt).toLocaleString()}
                        </div>
                        
                        <div className="text-neutral-500 dark:text-neutral-400">Email:</div>
                        <div className="text-neutral-700 dark:text-neutral-300">{registration.userEmail}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
} 