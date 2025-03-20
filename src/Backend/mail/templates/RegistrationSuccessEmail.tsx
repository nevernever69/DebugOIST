import React from 'react';
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Heading,
    Text,
    Link,
    Preview,
    Hr,
} from '@react-email/components';
import { format } from 'date-fns';

interface RegistrationSuccessEmailProps {
    userName: string;
    eventName: string;
    eventDate: string;
}

export const RegistrationSuccessEmail = ({
    userName,
    eventName,
    eventDate,
}: RegistrationSuccessEmailProps) => {
    const formattedEventDate = format(new Date(eventDate), "EEEE, MMMM do, yyyy");

    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>You're Officially Registered!</Preview>
                {/* Header */}
                <Container style={header}>
                    <div style={logoContainer}>
                        {/* <div style={logoIcon}>D</div> */}
                        <div style={logoText}>Debug</div>
                    </div>
                </Container>
                {/* Main Content */}
                <Container style={content}>
                    <Heading style={heading}>🎉 You're Officially Registered!</Heading>
                    <Text style={paragraph}>
                        Hi <strong>{userName}</strong>,
                    </Text>
                    <Text style={paragraph}>
                        Thank you for registering for <strong>{eventName}</strong>! We're excited to have you join us for an unforgettable event.
                    </Text>
                    <Text style={paragraph}>
                        <strong>Event Details:</strong>
                    </Text>
                    <Text style={paragraph}>
                        📅 <strong>Date:</strong> {formattedEventDate}
                    </Text>
                    <Link href="http://debug-oist.vercel.app/en/events" style={ctaButton}>
                        View Event Details
                    </Link>
                </Container>
                {/* Footer */}
                <Container style={footer}>
                    <Hr style={hr} />
                    <Text style={footerText}>
                        🚀 See you at the event! <br /><strong>- The Debug Club Team</strong>
                    </Text>
                    <Text style={footerText}>
                        For any inquiries, email us at{' '}
                        <Link href="mailto:support@debugclub.com" style={footerLink}>
                            support@debugclub.com
                        </Link>
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default RegistrationSuccessEmail;

// Inline Styles

const main = {
    backgroundColor: '#121212',
    color: '#ffffff', // Using a brighter base color for text
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: 0,
};

const header = {
    backgroundColor: '#1f1f1f',
    padding: '30px 20px',
    textAlign: 'center' as const,
    borderBottom: '2px solid #333',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
};

const logoContainer = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const logoIcon = {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #1e90ff, #8a2be2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 'bold' as const,
    color: '#fff',
    marginRight: '12px',
};

const logoText = {
    fontSize: '32px',
    fontWeight: 'bold' as const,
    background: 'linear-gradient(90deg, #1e90ff, #8a2be2)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    padding: "4px"
};

const content = {
    backgroundColor: '#181818',
    padding: '40px 20px',
    textAlign: 'center' as const,
    margin: '20px auto',
    maxWidth: '600px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
};

const heading = {
    fontSize: '28px',
    fontWeight: 'bold' as const,
    color: '#BB86FC',
    marginBottom: '20px',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '24px',
    color: '#ffffff', // Brighter text for better readability
};

const ctaButton = {
    backgroundColor: '#BB86FC',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    display: 'inline-block',
    marginTop: '20px',
    textDecoration: 'none',
};

const footer = {
    backgroundColor: '#1f1f1f',
    padding: '20px',
    textAlign: 'center' as const,
    fontSize: '14px',
    color: '#ffffff', // Brighter footer text
    borderTop: '2px solid #333',
};

const hr = {
    borderColor: '#333',
    margin: '20px 0',
};

const footerText = {
    marginBottom: '10px',
    color: '#ffffff', // Ensuring footer text is bright
};

const footerLink = {
    color: '#BB86FC',
    textDecoration: 'none',
};
