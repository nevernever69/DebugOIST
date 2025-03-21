"use client"
import { Button } from '@/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { format, parse } from "date-fns";
import axios from 'axios';
import Link from 'next/link';

interface PageProps {
    params: {
        eventId: string;
    };
}

async function getEvent(eventId: string) {
    try {
        const { data: event } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${eventId}`);
        return event;
    } catch (error) {
        console.error("Error fetching event:", error);
        return null;
    }
}

export default async function EventDetailPage({ params }: PageProps) {
    const event = await getEvent(params.eventId);
    if (!event) {
        return <div className="flex flex-col items-center justify-center min-h-screen w-full text-center text-white py-10">
            <h2 className="text-2xl mb-4">
                Event Not Found!
            </h2>
            <Button className="w-fit bg-gradient-to-r from-blue-600/80 to-blue-600/80 hover:from-blue-600 hover:to-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium">
                <Link href={"/events"}>
                    Go To Events
                </Link>
            </Button>
        </div>

    }

    return (
        <div className="relative min-h-screen bg-black text-zinc-100">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute top-32 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
                <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
            </div>

            {/* Hero Banner Section */}
            <section
                className="relative w-full h-[60vh] flex items-center justify-center"
                style={{
                    backgroundImage: event.publicId
                        ? `url(https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${event.publicId})`
                        : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">{event.title}</h1>
                    <div className="flex justify-center gap-4 mt-4">
                        {new Date(event.date) > new Date() && (
                            <Badge variant="default" className="bg-green-600 text-white">
                                Upcoming
                            </Badge>
                        )}
                        {event.category && (
                            <Badge variant="default" className="bg-blue-600 text-white">
                                {event.category}
                            </Badge>
                        )}
                    </div>
                    <p className="mt-4 text-lg text-zinc-300">
                        {format(new Date(event.date), "PPP")} at{" "}
                        {format(parse(event.time, "HH:mm", new Date()), "hh:mm a")}
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Left Column: Event Description & Registration Deadline */}
                    <div className="space-y-6">
                        <div className="p-6 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
                            <h2 className="text-2xl font-bold text-white mb-4">About the Event</h2>
                            <p className="text-zinc-400">{event.description}</p>
                        </div>
                        <div className="p-6 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
                            <h2 className="text-xl font-bold text-white mb-2">Registration Deadline</h2>
                            <p className="text-zinc-300">{format(new Date(event.registration), "PPP")}</p>
                        </div>
                    </div>
                    {/* Right Column: Date, Time, Venue & Call-to-Action */}
                    <div className="space-y-6">
                        <div className="p-6 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
                            <h2 className="text-xl font-bold text-white mb-2">Event Details</h2>
                            <div className="space-y-4 text-zinc-300">
                                <div>
                                    <span className="text-zinc-500 text-sm">Date: </span>
                                    <span>{format(new Date(event.date), "PPP")}</span>
                                </div>
                                <div>
                                    <span className="text-zinc-500 text-sm">Time: </span>
                                    <span>{format(parse(event.time, "HH:mm", new Date()), "hh:mm a")}</span>
                                </div>
                                <div>
                                    <span className="text-zinc-500 text-sm">Venue: </span>
                                    <span>{event.venue}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-zinc-900/30 rounded-xl border border-zinc-800/50 flex items-center justify-center">
                            <Button className="w-fit bg-gradient-to-r from-blue-600/80 to-blue-600/80 hover:from-blue-600 hover:to-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium">
                                <Link href={"/events"}>
                                    Go Back
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
