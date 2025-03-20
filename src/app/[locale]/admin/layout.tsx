import type { Metadata } from 'next'
import React from 'react'
import { Protect } from '@clerk/nextjs'
import Unauthorized from '@/src/app/[locale]/components/Unauthorized'

export const metadata: Metadata = {
    title: 'Admin Panel | Debug OIST',
    description: 'Official programming club of OIST bhopal'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main className='min-h-screen'>
            <Protect role={'org:admin'} fallback={<Unauthorized />}>
                {children}
            </Protect>
        </main>
    )
}