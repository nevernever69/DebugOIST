import React from 'react';
import { Metadata } from 'next';
import EventRegistrations from '@/src/components/admin/EventRegistrations';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connect from '@/src/Backend/mongoose';
import Event from '@/src/Backend/Models/Event';

export const metadata: Metadata = {
  title: 'Admin - Event Registrations',
  description: 'Manage registrations for your events',
};

// Generate static parameters
export async function generateStaticParams() {
  await connect();
  const events = await Event.find();
  
  return events.map((event) => ({
    eventId: event._id.toString(),
  }));
}

async function getEvent(eventId: string) {
  await connect();
  return Event.findById(eventId);
}

export default async function EventRegistrationsPage({ params }: { params: { eventId: string } }) {
  const session = await auth();
  const userId = session.userId;
  
  // Redirect if not logged in
  if (!userId) {
    redirect('/sign-in');
  }
  
  // In production, check if user is admin
  // const isAdmin = await checkIfUserIsAdmin(userId);
  // if (!isAdmin) {
  //   redirect('/dashboard');
  // }
  
  const event = await getEvent(params.eventId);
  
  if (!event) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-500">Event not found</h2>
          <p className="text-red-700 dark:text-red-400 mt-2">The event you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <a 
          href="/admin/events" 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg 
            className="w-4 h-4 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </a>
      </div>
      
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
          Registrations for {event.title}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Manage attendees and track participation for this event.
        </p>
      </div>
      
      <EventRegistrations eventId={params.eventId} eventTitle={event.title} />
    </main>
  );
} 