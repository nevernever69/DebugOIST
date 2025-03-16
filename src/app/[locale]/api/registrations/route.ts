import { NextRequest, NextResponse } from 'next/server';
import connect from '@/src/Backend/mongoose';
import Event from '@/src/Backend/Models/Event';
import Registration from '@/src/Backend/Models/Registration';
import { auth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

// POST - Create a new registration
export async function POST(request: NextRequest) {
  let connection = null;
  try {
    connection = await connect();

    // Get the authenticated user info
    const session = await auth();
    const userId = session.userId;
    const user = await currentUser();

    // Check if user is authenticated
    if (!userId || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Check if event exists and is open for registration
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if registration is still open
    const now = new Date().getTime();
    const registrationDeadline = event.registration ? new Date(event.registration).getTime() : 0;
    if (registrationDeadline && now > registrationDeadline) {
      return NextResponse.json(
        { error: 'Registration for this event has closed' },
        { status: 400 }
      );
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({
      eventId: new mongoose.Types.ObjectId(eventId),
      userId
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'You are already registered for this event' },
        { status: 400 }
      );
    }

    // Create the registration with safe access to user properties
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const userName = `${firstName} ${lastName}`.trim() || 'Anonymous User';
    const userEmail = user.emailAddresses && user.emailAddresses.length > 0 
      ? user.emailAddresses[0].emailAddress || '' 
      : '';

    const registration = new Registration({
      eventId: new mongoose.Types.ObjectId(eventId),
      userId,
      userName,
      userEmail,
      registeredAt: new Date(),
      attended: false
    });

    await registration.save();

    return NextResponse.json(
      { 
        message: 'Registration successful',
        registration
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create registration' },
      { status: 500 }
    );
  } finally {
    if (mongoose.connection.readyState === 1) {
      try {
        await mongoose.disconnect();
      } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
      }
    }
  }
} 