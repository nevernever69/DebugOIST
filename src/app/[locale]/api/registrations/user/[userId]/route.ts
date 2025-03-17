import { NextRequest, NextResponse } from 'next/server';
import connect from '@/src/Backend/mongoose';
import Registration from '@/src/Backend/Models/Registration';
import { auth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

// GET - Get all registrations for a user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connect();

    // Get the current user's ID
    const session = await auth();
    const currentUserId = session.userId;
    const { userId } = params;

    // Ensure the user is authorized to access these registrations
    if (!currentUserId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Users can only access their own registrations
    if (currentUserId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Fetch all registrations for the user with event details
    const registrations = await Registration.find({ userId })
      .populate('eventId')
      .lean();

    return NextResponse.json(
      { registrations },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching user registrations:', error);
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