import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { v2 as cloudinary } from 'cloudinary'
import Event from '@/src/Backend/Models/Event'
import mongoose from 'mongoose'

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

export async function POST(request: NextRequest) {
  try {
    // @ts-ignore
    const { userId } = auth()
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
    const file = formData.get('file') as File | null
    const title = formData.get('title') as string | null
    const description = formData.get('description') as string | null
    const Date = formData.get('Date') as string | null
    const registration = formData.get('registration') as string | null

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
      title,
      description,
      Date,
      registration,
      publicId: result.public_id
    })

    return NextResponse.json(
      { event, success: 'Event created successfully!' },
      { status: 201 }
    )
  } catch (e) {
    console.log(e, 'Upload video failed')
    return NextResponse.json({ error: 'upload video failed' }, { status: 500 })
  } finally {
    await mongoose.disconnect()
  }
}
