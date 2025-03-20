// app/api/registration/route.js
import { NextRequest, NextResponse } from "next/server";
import { sendRegistrationSuccessEmail } from "@/src/Backend/mail/lib/send-email";

export async function POST(request: NextRequest) {
    try {
        const { to, userName, userEmail, eventName, eventDate } = await request.json();

        if (!to || !userName || !userEmail || !eventName || !eventDate) {
            return NextResponse.json({ error: "Incomplete Data" }, { status: 400 })
        }

        // Send the registration success email
        const info = await sendRegistrationSuccessEmail({ to, userName, userEmail, eventName, eventDate });

        return NextResponse.json({ message: "Email sent successfully", info });
    } catch (error) {
        console.error("Error in registration email API:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
