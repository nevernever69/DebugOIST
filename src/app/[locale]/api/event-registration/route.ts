import { NextResponse } from 'next/server';
import Event from '@/src/Backend/Models/Event';
import connect from '@/src/Backend/mongoose';
import TeamRegistration from '@/src/Backend/Models/TeamRegistration';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    try {
        await connect();
        const body = await request.json();
        const { eventId, ...registrationData } = body;

        if (!eventId) {
            return NextResponse.json(
                { error: 'Event ID is required' },
                { status: 400 }
            );
        }

        // Check if event exists and registration is still open
        const event = await Event.findById(eventId);
        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        const now = new Date();
        const registrationEnd = new Date(event.registration);
        if (now > registrationEnd) {
            return NextResponse.json(
                { error: 'Registration period has ended' },
                { status: 400 }
            );
        }

        // Create registration
        const registration = new TeamRegistration({
            eventId: new mongoose.Types.ObjectId(eventId),
            ...registrationData,
            status: 'pending',
            createdAt: new Date()
        });

        await registration.save();

        return NextResponse.json({
            message: 'Registration successful',
            registrationId: registration._id
        });

    } catch (error: any) {
        console.error('Registration error:', error);

        // Handle duplicate key errors
        if (error.code === 11000) {
            const keyPattern = error.keyPattern;

            if (keyPattern.leaderEmail) {
                return NextResponse.json(
                    { error: 'This email is already registered for this event' },
                    { status: 400 }
                );
            }

            if (keyPattern.leaderRoll || keyPattern.member1Roll || keyPattern.member2Roll) {
                return NextResponse.json(
                    { error: 'One or more roll numbers are already registered for this event' },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { error: 'Failed to register team' },
            { status: 500 }
        );
    } finally {
        // Close the connection if it was opened
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
    }
} 