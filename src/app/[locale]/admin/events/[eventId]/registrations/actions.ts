'use server';

import connect from '@/src/Backend/mongoose';
import TeamRegistration from '@/src/Backend/Models/TeamRegistration';
import { revalidatePath } from 'next/cache';
import axios from 'axios';
import Event from '@/src/Backend/Models/Event';

export async function updateRegistrationStatus(formData: FormData) {
    try {
        await connect();

        const registrationId = formData.get('registrationId') as string;
        const status = formData.get('status') as string;
        const eventId = formData.get('eventId') as string;

        if (!status || !['approved', 'rejected'].includes(status)) {
            throw new Error('Invalid status');
        }

        const event = await Event.findById(eventId);

        const registration = await TeamRegistration.findByIdAndUpdate(
            registrationId,
            { status },
            { new: true }
        );

        console.log("Registraion Detials", registration);


        if (!registration) {
            throw new Error('Registration not found');
        }


        if (status === "approved") {

            const mailData = {
                "to": registration.email,
                "userName": registration.name,
                "userEmail": registration.email,
                "eventName": event?.title,
                "eventDate": event?.date,
            }
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event-registration/mail`, mailData, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        revalidatePath(`/admin/events/${eventId}/registrations`);
    } catch (error) {
        console.error('Error updating registration status:', error);
        throw error;
    }
} 