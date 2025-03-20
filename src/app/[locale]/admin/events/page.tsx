"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import useEvent, { EventProps } from '@/src/store/Event';
import { useToast } from '@/src/components/ui/toast';


export default function AdminEventsPage() {

  // In production, check if user is admin
  // const isAdmin = await checkIfUserIsAdmin(userId);
  // if (!isAdmin) {
  //   redirect('/dashboard');
  // }
  const { addToast } = useToast()
  const { events, deleteEvent, getEvents } = useEvent();

  useEffect(() => {
    getEvents()
  }, [])
  useEffect(() => {
    getEvents()
  }, [getEvents, events, deleteEvent])

  async function handleDelete(eventId: string) {
    try {
      await deleteEvent(eventId)
      addToast({
        title: "Deleted successfully",
        description: `Event with ID: ${eventId} has beed Deleted.`,
        variant: "success"

      })
    } catch (e: any) {
      console.log("Error deleting event");
      addToast({
        title: "Failed to delete",
        description: `Failed to delete Event with ID: ${eventId}\nTry Again.`,
        variant: "error"

      })
    }

  }


  return (
    <div className="relative min-h-screen bg-black text-zinc-100">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-32 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-8">
          {/* Header section */}
          <div className="bg-zinc-900/50 backdrop-blur-lg border border-zinc-800/50 rounded-xl p-6 shadow-lg my-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                  Manage Events
                </h1>
                <p className="text-zinc-400 mt-2">Create and manage all events</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="text-sm py-1.5 bg-zinc-900/70 border-zinc-700">
                    Total Events: {events.length}
                  </Badge>
                  <Badge variant="outline" className="text-sm py-1.5 bg-zinc-900/70 border-zinc-700">
                    Upcoming: {events.filter(e => new Date(e.date) > new Date()).length}
                  </Badge>
                </div>
                <Link href="/admin/events/new">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-700/20">
                    <Plus className="w-4 h-4 mr-2" />
                    New Event
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Empty state */}
          {events.length === 0 && (
            <div className="text-center py-20 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl">
              <h3 className="text-xl font-medium text-zinc-300">No events available</h3>
              <p className="text-zinc-500 mt-2">Create your first event to get started.</p>
              <Link href="/admin/events/new">
                <Button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-700/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </Link>
            </div>
          )}

          {/* Events grid */}
          {events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event: EventProps) => {
                const isUpcoming = new Date(event.date) > new Date();
                return (
                  <Card
                    key={event?._id?.toString()}
                    className="group bg-zinc-900/30 backdrop-blur-md border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Display event image if available */}
                    {event?.publicId && (
                      <img
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${event?.publicId}.jpg`}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                    )}

                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant={isUpcoming ? "success" : "secondary"}
                          className="capitalize py-1 px-3"
                        >
                          {isUpcoming ? "Upcoming" : "Past"}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/events/${event._id}/edit`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-zinc-400 hover:text-purple-400"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-zinc-400 hover:text-red-400"
                            type="button"
                            onClick={() => handleDelete(event?._id?.toString() || "")}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                        {event.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <div className="space-y-4">
                        <div className="space-y-2 text-zinc-300">
                          <p className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-purple-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            {format(new Date(event.date), "PPP")}
                          </p>
                          <p className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-purple-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {event.time}
                          </p>
                          <p className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-purple-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {event?.venue}
                          </p>
                        </div>

                        <div className="prose prose-invert max-w-none">
                          <p className="text-zinc-400 line-clamp-3">
                            {event.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                          <Link href={`/admin/events/${event._id}/registrations`}>
                            <Button
                              variant="default"
                              className="text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-700/20"
                            >
                              View Registrations
                            </Button>
                          </Link>
                          <Link href={`/admin/events/${event._id}/edit`}>
                            <Button className="text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-700/20">
                              Edit Event
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 