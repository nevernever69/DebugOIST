import { NextRequest, NextResponse } from 'next/server';
import connect from '@/src/Backend/mongoose';
import Registration from '@/src/Backend/Models/Registration';
import { auth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

// GET - Get all registrations for an event (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    await connect();

    // Get the current user's ID
    const session = await auth();
    const userId = session.userId;
    const { eventId } = params;

    // Ensure the user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Admin check should go here - check for admin role
    // This is a placeholder - implement proper admin check based on your auth system
    const isAdmin = true; // Replace with actual admin check
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Validate eventId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID format' },
        { status: 400 }
      );
    }

    // Fetch all registrations for the event
    const registrations = await Registration.find({
      eventId: new mongoose.Types.ObjectId(eventId)
    });

    return NextResponse.json(
      { registrations },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching event registrations:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch registrations' },
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