import React from 'react';
import EventsList from '@/src/components/EventsPublic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OIST - Programming Club Events',
  description: 'Upcoming and past events from the OIST Programming Club',
};

export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
          Programming Club Events
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Join our upcoming events to enhance your programming skills, network with like-minded individuals, and stay updated with the latest technology trends.
        </p>
      </div>
      
      <EventsList />
    </main>
  );
} 