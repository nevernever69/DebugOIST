import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { v2 as cloudinary } from 'cloudinary'
import Event from '@/src/Backend/Models/Event'
import mongoose from 'mongoose'
import connect from '@/src/Backend/mongoose'

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
})

interface CloudinaryUploadResult {
  public_id: string
  bytes: number
  duration?: number

  [key: string]: any
}

// upload image to cloudinary and create event
export async function POST(request: NextRequest) {
  try {
    // @ts-ignore
    await connect()
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API ||
      !process.env.CLOUDINARY_SECRET
    ) {
      return NextResponse.json(
        { error: 'cloudinary credentials not found!' },
        { status: 500 }
      )
    }
    const formData = await request.formData()
    const title = formData.get('eventName') as string | null
    const description = formData.get('description') as string | null
    const file = formData.get('thumbnail') as File | null
    const date = formData.get('eventDate') as string | null
    const time = formData.get('eventTime') as string | null
    const registration = formData.get('registrationDate') as string | null

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 })
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(bytes))

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

    const event = await Event.create({
      title: title,
      description: description,
      date: date,
      time: time,
      registration: registration,
      publicId: result.public_id
    })

    return NextResponse.json(
      { event, success: 'Event created successfully!' },
      { status: 201 }
    )
  } catch (e) {
    console.log(e, 'Event creation failed')
    return NextResponse.json(
      { error: 'Event creation failed' },
      { status: 500 }
    )
  } finally {
    await mongoose.disconnect()
  }
}

// fetch the event from Mongo DB

export async function GET() {
  try {
    await connect()
    const events = await Event.find()
    return NextResponse.json({ events }, { status: 200 })
  } catch (e) {
    console.log(e, 'Failed to fetch events')
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  } finally {
    await mongoose.disconnect()
  }
}
