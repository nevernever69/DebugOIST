'use server';

import connect from '@/src/Backend/mongoose';
import TeamRegistration from '@/src/Backend/Models/TeamRegistration';
import { revalidatePath } from 'next/cache';

export async function updateRegistrationStatus(formData: FormData) {
    try {
        await connect();
        
        const registrationId = formData.get('registrationId') as string;
        const status = formData.get('status') as string;
        const eventId = formData.get('eventId') as string;

        if (!status || !['approved', 'rejected'].includes(status)) {
            throw new Error('Invalid status');
        }

        const registration = await TeamRegistration.findByIdAndUpdate(
            registrationId,
            { status },
            { new: true }
        );

        if (!registration) {
            throw new Error('Registration not found');
        }

        revalidatePath(`/admin/events/${eventId}/registrations`);
    } catch (error) {
        console.error('Error updating registration status:', error);
        throw error;
    }
} 