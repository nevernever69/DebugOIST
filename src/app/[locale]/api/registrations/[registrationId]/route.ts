import { NextRequest, NextResponse } from 'next/server';
import connect from '@/src/Backend/mongoose';
import Registration from '@/src/Backend/Models/Registration';
import { auth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

// PATCH - Update a registration (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { registrationId: string } }
) {
  try {
    await connect();

    // Get the current user's ID
    const session = await auth();
    const userId = session.userId;
    const { registrationId } = params;

    // Ensure the user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Admin check should go here
    // This is a placeholder - implement proper admin check based on your auth system
    const isAdmin = true; // Replace with actual admin check
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Validate registrationId
    if (!mongoose.Types.ObjectId.isValid(registrationId)) {
      return NextResponse.json(
        { error: 'Invalid registration ID format' },
        { status: 400 }
      );
    }

    // Get the request body
    const body = await request.json();
    const { attended } = body;

    if (typeof attended !== 'boolean') {
      return NextResponse.json(
        { error: 'Attended status must be a boolean' },
        { status: 400 }
      );
    }

    // Find and update the registration
    const registration = await Registration.findByIdAndUpdate(
      registrationId,
      { attended },
      { new: true }
    );

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Registration updated successfully',
        registration 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating registration:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update registration' },
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