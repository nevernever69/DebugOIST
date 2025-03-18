import React from 'react';
import { Metadata } from 'next';
import ProfileRegistrations from '@/src/components/ProfileRegistrations';

export const metadata: Metadata = {
  title: 'Debug Club - Dashboard',
  description: 'View your Debug Programming Club registrations and account details.',
};

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
          Debug Club Dashboard
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Manage your Debug Programming Club event registrations and account details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileRegistrations />
      </div>
    </main>
  );
}
