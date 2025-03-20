'use server';

import { revalidatePath } from 'next/cache';
import connect from '@/src/Backend/mongoose';
import Event from '@/src/Backend/Models/Event';
import { ObjectId } from 'mongodb';
import { useToast } from '@/src/components/ui/toast';

export async function deleteEvent(formData: FormData) {
    try {
        const eventId = formData.get('eventId') as string;

        if (!eventId) {
            throw new Error('Event ID is required');
        }

        await connect();
        await Event.findByIdAndDelete(new ObjectId(eventId));
        revalidatePath('/admin/events');
        return { success: true, message: 'Event deleted successfully' };
    } catch (error) {
        console.error('Error deleting event:', error);
        return { success: false, message: 'Failed to delete event' };
    }
}

export async function createEvent(formData: FormData) {
    try {
        console.log("formData", formData);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const date = formData.get('date') as string;
        const time = formData.get('time') as string;
        const venue = formData.get('venue') as string;
        const category = formData.get('category') as string;
        const registrationDeadline = formData.get('registrationDeadline') as string;
        const image = formData.get('image') as File;

        if (!title || !description || !date || !time || !venue || !category || !image) {
            throw new Error('All fields are required');
        }


        revalidatePath('/admin/events');
        return { success: true, message: 'Event created successfully' };
    } catch (error) {
        console.error('Error creating event:', error);
        return { success: false, message: 'Failed to create event' };
    }
}

export async function updateEvent(formData: FormData) {
    try {
        const eventId = formData.get('eventId') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const date = formData.get('date') as string;
        const time = formData.get('time') as string;
        const venue = formData.get('venue') as string;
        const category = formData.get('category') as string;
        const registrationDeadline = formData.get('registrationDeadline') as string;

        if (!eventId || !title || !description || !date || !time || !venue || !category) {
            throw new Error('All fields are required');
        }

        await connect();
        await Event.findByIdAndUpdate(
            new ObjectId(eventId),
            {
                title,
                description,
                date,
                time,
                venue,
                category,
                registrationDeadline: registrationDeadline || null,
                registration: registrationDeadline || date
            }
        );

        revalidatePath('/admin/events');
        return { success: true, message: 'Event updated successfully' };
    } catch (error) {
        console.error('Error updating event:', error);
        return { success: false, message: 'Failed to update event' };
    }
} 