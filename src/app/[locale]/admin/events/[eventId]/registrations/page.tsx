import connect from '@/src/Backend/mongoose';
import IndividualRegistration from '@/src/Backend/Models/TeamRegistration';
import Event from '@/src/Backend/Models/Event';
import { ObjectId } from 'mongodb';
import { Button } from '@/components/ui/button';
import { updateRegistrationStatus } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { format } from "date-fns";

interface PageProps {
    params: {
        eventId: string;
    };
}

async function getRegistrations(eventId: string) {
    await connect();
    const registrations = await IndividualRegistration.find({ eventId: new ObjectId(eventId) }).sort({ createdAt: -1 });
    return registrations;
}

async function getEvent(eventId: string) {
    await connect();
    const event = await Event.findById(eventId);
    return event;
}

export default async function RegistrationsPage({ params }: PageProps) {
    const [registrations, event] = await Promise.all([getRegistrations(params.eventId), getEvent(params.eventId)]);

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
                    <div className="bg-zinc-900/50 backdrop-blur-lg border border-zinc-800/50 rounded-xl p-6 shadow-lg my-16">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                                    {event?.title} Registrations
                                </h1>
                                <p className="text-zinc-400 mt-2">Manage registrations and approve participants</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className="text-sm py-1.5 bg-zinc-900/70 border-zinc-700">
                                    Total Registrations: {registrations.length}
                                </Badge>
                                <Badge variant="outline" className="text-sm py-1.5 bg-zinc-900/70 border-zinc-700">
                                    Pending: {registrations.filter(r => r.status === 'pending').length}
                                </Badge>
                                <Badge variant="outline" className="text-sm py-1.5 bg-zinc-900/70 border-zinc-700">
                                    Approved: {registrations.filter(r => r.status === 'approved').length}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Empty state */}
                    {registrations.length === 0 && (
                        <div className="text-center py-20 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl">
                            <h3 className="text-xl font-medium text-zinc-300">No registrations yet</h3>
                            <p className="text-zinc-500 mt-2">When individuals register for this event, they will appear here.</p>
                        </div>
                    )}

                    {/* Registrations list */}
                    {registrations.length > 0 && (
                        <ScrollArea className="h-[calc(100vh-250px)]">
                            <div className="grid gap-6">
                                {registrations.map((registration) => (
                                    <Card
                                        key={registration._id.toString()}
                                        className="group bg-zinc-900/30 backdrop-blur-md border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                            <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                                                {registration.name}
                                            </CardTitle>
                                            <Badge
                                                variant={registration.status === 'approved' ? 'success' :
                                                    registration.status === 'rejected' ? 'destructive' : 'secondary'}
                                                className="capitalize py-1 px-3"
                                            >
                                                {registration.status}
                                            </Badge>
                                        </CardHeader>

                                        <CardContent className="relative z-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Registrant Info */}
                                                <div className="bg-black/20 rounded-lg p-4 border border-zinc-800/50">
                                                    <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                            <circle cx="12" cy="7" r="4"></circle>
                                                        </svg>
                                                        Registrant Info
                                                    </h3>
                                                    <div className="space-y-2 text-zinc-300">
                                                        <p><span className="text-zinc-500">Name:</span> {registration.name}</p>
                                                        <p><span className="text-zinc-500">Email:</span> {registration.email}</p>
                                                        <p><span className="text-zinc-500">Phone:</span> {registration.phone}</p>
                                                        <p><span className="text-zinc-500">Roll:</span> {registration.roll}</p>
                                                    </div>
                                                </div>

                                                {/* Event Details */}
                                                <div className="bg-black/20 rounded-lg p-4 border border-zinc-800/50">
                                                    <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M21 7v12H3"></path>
                                                            <path d="M3 3h18"></path>
                                                            <path d="M3 7h18"></path>
                                                            <path d="M3 11h18"></path>
                                                        </svg>
                                                        Event Details
                                                    </h3>
                                                    <div className="space-y-2 text-zinc-300">
                                                        <p><span className="text-zinc-500">Event:</span> {event?.title}</p>
                                                        <p>
                                                            <span className="text-zinc-500">Date:</span> {event?.date ? format(new Date(event.date), 'PPP') : 'TBA'}
                                                        </p>
                                                        <p>
                                                            <span className="text-zinc-500">Time:</span> {event?.time ? event.time : 'TBA'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Registration Metadata */}
                                            <div className="mt-4 bg-black/20 rounded-lg p-4 border border-zinc-800/50">
                                                <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    Registration Details
                                                </h3>
                                                <div className="space-y-2 text-zinc-300">
                                                    <p>
                                                        <span className="text-zinc-500">Registered On:</span> {format(new Date(registration.createdAt), 'PPP')}
                                                    </p>
                                                    <p>
                                                        <span className="text-zinc-500">Status:</span>
                                                        <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${registration.status === 'approved'
                                                                ? 'bg-green-500/20 text-green-400'
                                                                : registration.status === 'rejected'
                                                                    ? 'bg-red-500/20 text-red-400'
                                                                    : 'bg-yellow-500/20 text-yellow-400'
                                                            }`}>
                                                            {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="mt-4 bg-black/20 rounded-lg p-4 border border-zinc-800/50">
                                                <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12 20h9"></path>
                                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                                    </svg>
                                                    Actions
                                                </h3>
                                                <form action={updateRegistrationStatus} className="flex gap-3">
                                                    <input type="hidden" name="registrationId" value={registration._id.toString()} />
                                                    <input type="hidden" name="eventId" value={params.eventId} />
                                                    <Button
                                                        type="submit"
                                                        name="status"
                                                        value="approved"
                                                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-700/20"
                                                        disabled={registration.status === 'approved'}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        name="status"
                                                        value="rejected"
                                                        className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg shadow-red-700/20"
                                                        disabled={registration.status === 'rejected'}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                        Reject
                                                    </Button>
                                                </form>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>
            </div>
        </div>
    );
}
