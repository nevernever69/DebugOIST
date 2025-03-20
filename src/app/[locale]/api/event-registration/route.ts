import { NextResponse } from 'next/server';
import Event from '@/src/Backend/Models/Event';
import connect from '@/src/Backend/mongoose';
import TeamRegistration from '@/src/Backend/Models/TeamRegistration';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const { eventId, name, roll, email, phone } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    if (!name || !roll || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields (name, roll, email, phone) are required' },
        { status: 400 }
      );
    }

    // Check if the event exists and registration is still open
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

    // Create registration document (using the TeamRegistration model)
    // Note: If needed, consider renaming your model to IndividualRegistration
    const registration = new TeamRegistration({
      eventId: new mongoose.Types.ObjectId(eventId),
      name,
      roll,
      email,
      phone,
      status: 'pending',
      createdAt: new Date(),
    });

    await registration.save();

    return NextResponse.json({
      message: 'Registration successful',
      registrationId: registration._id,
    });
  } catch (error: any) {
    console.error('Registration error:', error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      const keyPattern = error.keyPattern;
      if (keyPattern.email) {
        return NextResponse.json(
          { error: 'This email is already registered for this event' },
          { status: 400 }
        );
      }
      if (keyPattern.roll) {
        return NextResponse.json(
          { error: 'This roll number is already registered for this event' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to register' },
      { status: 500 }
    );
  } finally {
    // Close the connection if it was opened
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
}
