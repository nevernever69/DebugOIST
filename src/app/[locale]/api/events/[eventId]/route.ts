import { NextRequest, NextResponse } from 'next/server'
import Event from '@/src/Backend/Models/Event'
import mongoose from 'mongoose'
import connect from '@/src/Backend/mongoose'

// Fetch a single event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    await connect()
    const { eventId } = params

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      )
    }

    // Check if the ID is a valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID format' },
        { status: 400 }
      )
    }

    // Find the event directly by _id
    const event = await Event.findById(eventId)

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  } finally {
    await mongoose.disconnect()
  }
}

// Update an event by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    await connect()
    const { eventId } = params


    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    
    // Extract data from form
    const title = formData.get('eventName') as string | null
    const description = formData.get('description') as string | null
    const date = formData.get('eventDate') as string | null
    const time = formData.get('eventTime') as string | null
    const registration = formData.get('registrationDate') as string | null
    const file = formData.get('thumbnail') as File | null

    // Prepare update data
    const updateData: any = {
      title,
      description,
      date,
      time,
      registration,
    }

    // Find the existing event by _id only
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID format' },
        { status: 400 }
      )
    }
    
    let existingEvent: any = await Event.findById(eventId);
    
    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Handle thumbnail update if provided
    if (file) {
      // Import cloudinary on demand to avoid import errors
      const { v2: cloudinary } = await import('cloudinary')
      
      // Configure cloudinary
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_SECRET
      })

      // Check if cloudinary is properly configured
      if (
        !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API ||
        !process.env.CLOUDINARY_SECRET
      ) {
        return NextResponse.json(
          { error: 'Cloudinary credentials not found!' },
          { status: 500 }
        )
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(new Uint8Array(bytes))

      // Delete the old image if it exists
      if (existingEvent.publicId) {
        try {
          await new Promise<void>((resolve, reject) => {
            cloudinary.uploader.destroy(existingEvent.publicId, (error: any) => {
              if (error) {
                console.error('Error deleting old image:', error)
                reject(error)
              }
              resolve()
            })
          })
        } catch (error) {
          console.error('Error deleting old image:', error)
        }
      }

      // Upload the new image
      interface CloudinaryUploadResult {
        public_id: string
        bytes: number
        duration?: number
        [key: string]: any
      }

      const result = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'debug-events',
              resource_type: 'image'
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result as CloudinaryUploadResult)
            }
          )
          uploadStream.end(buffer)
        }
      )

      // Add new publicId to update data
      updateData.publicId = result.public_id
    }

    // Update the event, using _id query only
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      updateData,
      { new: true }
    )

    if (!updatedEvent) {
      return NextResponse.json(
        { error: 'Event not found or update failed' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedEvent, { status: 200 })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  } finally {
    await mongoose.disconnect()
  }
} 